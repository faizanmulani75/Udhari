// src/services/exportService.js
// Business logic for generating CSV and PDF exports.
// Generates downloadable files for customer lists and transaction ledgers.

const prisma = require("../config/prisma");
const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");
const ApiError = require("../utils/ApiError");

/**
 * Export all customers as CSV.
 * @param {string} shopId
 * @returns {Promise<string>} CSV string
 */
const exportCustomersCSV = async (shopId) => {
  const customers = await prisma.customer.findMany({
    where: { shopId, deletedAt: null },
    orderBy: { name: "asc" },
    select: {
      name: true,
      phone: true,
      email: true,
      address: true,
      balance: true,
      creditLimit: true,
      isActive: true,
      createdAt: true,
    },
  });

  if (customers.length === 0) {
    throw ApiError.notFound("No customers found to export");
  }

  const fields = [
    { label: "Name", value: "name" },
    { label: "Phone", value: "phone" },
    { label: "Email", value: (row) => row.email || "-" },
    { label: "Address", value: (row) => row.address || "-" },
    { label: "Balance (₹)", value: (row) => parseFloat(row.balance).toFixed(2) },
    { label: "Credit Limit (₹)", value: (row) => parseFloat(row.creditLimit).toFixed(2) },
    { label: "Status", value: (row) => (row.isActive ? "Active" : "Inactive") },
    { label: "Created", value: (row) => new Date(row.createdAt).toLocaleDateString("en-IN") },
  ];

  const parser = new Parser({ fields });
  return parser.parse(customers);
};

/**
 * Export transactions as CSV.
 * @param {string} shopId
 * @param {object} filters - { customerId?, from?, to? }
 * @returns {Promise<string>} CSV string
 */
const exportTransactionsCSV = async (shopId, filters = {}) => {
  const where = {
    shopId,
    deletedAt: null,
  };

  if (filters.customerId) {
    where.customerId = filters.customerId;
  }
  if (filters.from || filters.to) {
    where.transactionDate = {};
    if (filters.from) where.transactionDate.gte = new Date(filters.from);
    if (filters.to) where.transactionDate.lte = new Date(filters.to);
  }

  const transactions = await prisma.transaction.findMany({
    where,
    orderBy: { transactionDate: "desc" },
    include: {
      customer: { select: { name: true, phone: true } },
    },
  });

  if (transactions.length === 0) {
    throw ApiError.notFound("No transactions found for the given filters");
  }

  const fields = [
    { label: "Date", value: (row) => new Date(row.transactionDate).toLocaleDateString("en-IN") },
    { label: "Customer", value: "customer.name" },
    { label: "Phone", value: "customer.phone" },
    { label: "Type", value: "type" },
    { label: "Amount (₹)", value: (row) => parseFloat(row.amount).toFixed(2) },
    { label: "Balance After (₹)", value: (row) => parseFloat(row.balanceAfter).toFixed(2) },
    { label: "Description", value: (row) => row.description || "-" },
    { label: "Reference", value: (row) => row.referenceNumber || "-" },
    { label: "Payment Method", value: (row) => row.paymentMethod || "-" },
  ];

  const parser = new Parser({ fields });
  return parser.parse(transactions);
};

/**
 * Generate a PDF statement for a customer.
 * @param {string} shopId
 * @param {string} customerId
 * @param {object} filters - { from?, to? }
 * @returns {Promise<PDFDocument>} PDF document stream
 */
const exportTransactionsPDF = async (shopId, customerId, filters = {}) => {
  // Fetch customer
  const customer = await prisma.customer.findFirst({
    where: { id: customerId, shopId, deletedAt: null },
    include: {
      shop: { select: { name: true, phone: true, address: true, currency: true, upiId: true } },
    },
  });

  if (!customer) {
    throw ApiError.notFound("Customer not found");
  }

  // Fetch transactions
  const where = {
    shopId,
    customerId,
    deletedAt: null,
  };

  if (filters.from || filters.to) {
    where.transactionDate = {};
    if (filters.from) where.transactionDate.gte = new Date(filters.from);
    if (filters.to) where.transactionDate.lte = new Date(filters.to);
  }

  const transactions = await prisma.transaction.findMany({
    where,
    orderBy: { transactionDate: "desc" },
  });

  // Build PDF
  const doc = new PDFDocument({ size: "A4", margin: 50, bufferPages: true });

  // ── Header ──
  doc.fontSize(22).font("Helvetica-Bold").text(customer.shop.name, { align: "center" });
  doc.fontSize(10).font("Helvetica").fillColor("#666666");
  if (customer.shop.address) {
    doc.text(customer.shop.address, { align: "center" });
  }
  if (customer.shop.phone) {
    doc.text(`Phone: ${customer.shop.phone}`, { align: "center" });
  }
  doc.moveDown(0.5);

  // Divider
  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor("#CCCCCC").stroke();
  doc.moveDown(0.8);

  // ── Customer Info ──
  doc.fontSize(14).font("Helvetica-Bold").fillColor("#000000").text("CUSTOMER STATEMENT");
  doc.moveDown(0.3);
  doc.fontSize(10).font("Helvetica").fillColor("#333333");
  doc.text(`Customer: ${customer.name}`);
  doc.text(`Phone: ${customer.phone}`);

  const balanceVal = parseFloat(customer.balance);
  const balanceLabel = balanceVal > 0 ? "Outstanding Due" : balanceVal < 0 ? "Advance Balance" : "Settled";
  const balanceColor = balanceVal > 0 ? "#DC2626" : balanceVal < 0 ? "#059669" : "#6B7280";
  doc.fillColor(balanceColor).font("Helvetica-Bold")
    .text(`${balanceLabel}: ${customer.shop.currency} ${Math.abs(balanceVal).toFixed(2)}`);
  doc.fillColor("#333333").font("Helvetica");

  const dateRange = [];
  if (filters.from) dateRange.push(`From: ${new Date(filters.from).toLocaleDateString("en-IN")}`);
  if (filters.to) dateRange.push(`To: ${new Date(filters.to).toLocaleDateString("en-IN")}`);
  if (dateRange.length > 0) {
    doc.text(`Period: ${dateRange.join(" | ")}`);
  }

  doc.text(`Generated: ${new Date().toLocaleDateString("en-IN")} ${new Date().toLocaleTimeString("en-IN")}`);
  doc.moveDown(1);

  // ── Transaction Table ──
  if (transactions.length === 0) {
    doc.fontSize(12).fillColor("#999999").text("No transactions found for this period.", { align: "center" });
  } else {
    // Table header
    const tableTop = doc.y;
    const colWidths = [75, 70, 90, 90, 170];
    const headers = ["Date", "Type", "Amount", "Balance", "Description"];

    doc.fontSize(9).font("Helvetica-Bold").fillColor("#FFFFFF");
    doc.rect(50, tableTop, 495, 20).fill("#1F2937");
    headers.forEach((header, i) => {
      let x = 55;
      for (let j = 0; j < i; j++) x += colWidths[j];
      doc.fillColor("#FFFFFF").text(header, x, tableTop + 5, { width: colWidths[i] - 10 });
    });

    doc.y = tableTop + 25;

    // Table rows
    doc.font("Helvetica").fontSize(8).fillColor("#333333");
    transactions.forEach((tx, index) => {
      // Page break check
      if (doc.y > 730) {
        doc.addPage();
        doc.y = 50;
      }

      const rowY = doc.y;
      const bgColor = index % 2 === 0 ? "#F9FAFB" : "#FFFFFF";
      doc.rect(50, rowY, 495, 18).fill(bgColor);

      const typeColor = tx.type === "CREDIT" ? "#DC2626" : tx.type === "PAYMENT" ? "#059669" : "#F59E0B";
      const rowData = [
        new Date(tx.transactionDate).toLocaleDateString("en-IN"),
        tx.type,
        `${customer.shop.currency} ${parseFloat(tx.amount).toFixed(2)}`,
        `${customer.shop.currency} ${parseFloat(tx.balanceAfter).toFixed(2)}`,
        tx.description || "-",
      ];

      rowData.forEach((cell, i) => {
        let x = 55;
        for (let j = 0; j < i; j++) x += colWidths[j];
        const color = i === 1 ? typeColor : "#333333";
        doc.fillColor(color).text(cell, x, rowY + 4, { width: colWidths[i] - 10, lineBreak: false });
      });

      doc.y = rowY + 20;
    });

    doc.moveDown(1);
    doc.fontSize(9).fillColor("#666666").font("Helvetica")
      .text(`Total Transactions: ${transactions.length}`, { align: "right" });
  }

  // ── Footer ──
  doc.moveDown(2);
  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor("#CCCCCC").stroke();
  doc.moveDown(0.5);
  doc.fontSize(8).fillColor("#999999").font("Helvetica")
    .text("This is a computer-generated statement from UdhariTrack. No signature required.", { align: "center" });

  if (customer.shop.upiId) {
    doc.text(`UPI Payment: ${customer.shop.upiId}`, { align: "center" });
  }

  doc.end();
  return doc;
};

module.exports = {
  exportCustomersCSV,
  exportTransactionsCSV,
  exportTransactionsPDF,
};
