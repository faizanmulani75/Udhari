module.paths.push("/Users/faizanmulani/Desktop/root/udhari-saas/backend/node_modules");

require("dotenv").config({ path: "/Users/faizanmulani/Desktop/root/udhari-saas/backend/.env" });

const prisma = require("/Users/faizanmulani/Desktop/root/udhari-saas/backend/src/config/prisma");
const aiController = require("/Users/faizanmulani/Desktop/root/udhari-saas/backend/src/controllers/aiController");

const runTest = async () => {
  // 1. Fetch a user and shop to get valid IDs
  const user = await prisma.user.findFirst({
    where: { isActive: true, deletedAt: null },
    include: { shop: true }
  });

  if (!user) {
    console.error("No active user found in DB to test with.");
    process.exit(1);
  }

  const shopId = user.shopId;
  const userId = user.id;

  console.log(`Testing with User ID: ${userId}, Shop ID: ${shopId}`);

  // Fetch or create a test customer for the shop to test matching
  let customer = await prisma.customer.findFirst({
    where: { shopId, isActive: true, deletedAt: null }
  });

  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        shopId,
        name: "Test Customer",
        phone: "1234567890",
        balance: 0.00
      }
    });
    console.log(`Created test customer: ${customer.name}`);
  } else {
    console.log(`Using existing customer: ${customer.name}`);
  }

  // 2. Mock request & response
  const req = {
    body: {
      text: `Give 500 rupees credit to ${customer.name} for groceries`
    },
    shopId,
    userId
  };

  const res = {
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      console.log(`Response [${this.statusCode}]:`, JSON.stringify(data, null, 2));
    }
  };

  const next = (err) => {
    if (err) {
      console.error("Next received error:", err);
    }
  };

  console.log(`Calling voiceEntry with text: "${req.body.text}"`);
  try {
    await aiController.voiceEntry(req, res, next);
  } catch (err) {
    console.error("Unhandle exception in controller execution:", err);
  }

  // Close connection pool
  await prisma.$disconnect();
};

runTest();
