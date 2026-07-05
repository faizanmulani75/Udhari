// verify_upi_flow.js
// Verification script to test the backend payment claims transactions.

require("dotenv").config();
const prisma = require("./src/config/prisma");
const portalService = require("./src/services/portalService");
const paymentClaimService = require("./src/services/paymentClaimService");

async function run() {
  console.log("⚡ Starting UPI Intent Flow Verification...");
  
  // 1. Find a customer
  const customer = await prisma.customer.findFirst({
    where: { deletedAt: null },
    include: { shop: true },
  });

  if (!customer) {
    console.log("❌ No customer found in DB. Add a customer first.");
    return;
  }

  console.log(`👤 Found customer: ${customer.name} (Balance: ${customer.balance})`);
  
  const token = customer.qrToken || customer.id;
  const amount = 50.00;
  const txnRef = `TESTREF${Date.now()}`;

  // 2. Submit payment claim
  console.log("📤 Submitting payment claim...");
  const claim = await portalService.createPaymentClaim(token, amount, txnRef);
  console.log(`✅ Payment claim created: ID=${claim.id}, Status=${claim.status}`);

  // 3. Retrieve shop claims
  console.log("📥 Fetching pending claims for shop...");
  const claims = await paymentClaimService.getShopClaims(customer.shopId, { status: "PENDING_SHOP_CONFIRM" });
  console.log(`✅ Found ${claims.length} pending claims.`);

  // 4. Verify/Confirm payment claim
  console.log("⚙️ Confirming payment claim...");
  // Find owner or staff user
  const user = await prisma.user.findFirst({
    where: { shopId: customer.shopId, deletedAt: null },
  });

  if (!user) {
    console.log("❌ No user found for this shop. Cannot confirm.");
    return;
  }

  const updatedClaim = await paymentClaimService.verifyPaymentClaim(
    customer.shopId,
    claim.id,
    true, // confirmed = true
    user.id
  );

  console.log(`✅ Claim updated status: ${updatedClaim.status}`);

  // 5. Check customer balance & ledger entry
  const updatedCustomer = await prisma.customer.findUnique({
    where: { id: customer.id },
  });

  console.log(`👤 Updated customer balance: ${updatedCustomer.balance} (Expected: ${parseFloat(customer.balance) - amount})`);

  const ledgerEntry = await prisma.transaction.findFirst({
    where: { referenceNumber: txnRef },
  });

  if (ledgerEntry) {
    console.log(`✅ Ledger transaction created successfully! Type=${ledgerEntry.type}, Amount=${ledgerEntry.amount}`);
  } else {
    console.log("❌ Failed to find ledger transaction.");
  }

  console.log("✨ UPI Intent Flow Verification Completed successfully!");
}

run().catch(console.error);
