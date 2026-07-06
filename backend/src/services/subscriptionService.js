const prisma = require("../config/prisma");

/**
 * Fetch the active subscription details for the shop, dynamically enforcing the expiration date.
 * If a subscription has expired, it automatically updates its status to EXPIRED in the database and returns null.
 *
 * @param {string} shopId
 * @returns {Promise<object|null>} The active subscription or null if on FREE tier / expired
 */
const getActiveSubscription = async (shopId) => {
  const subscription = await prisma.subscription.findFirst({
    where: {
      shopId,
      status: "ACTIVE",
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!subscription) {
    return null;
  }

  // If the expiration date is set and has passed, expire the subscription in the DB
  if (subscription.expiresAt && new Date(subscription.expiresAt) < new Date()) {
    console.log(`[Subscription] Shop ${shopId} subscription (${subscription.plan}) has expired on ${subscription.expiresAt}. Updating status to EXPIRED.`);
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { status: "EXPIRED" },
    });
    return null;
  }

  return subscription;
};

/**
 * Core business logic to activate a subscription for a shop.
 * Deactivates existing active subscriptions and creates a new ACTIVE one for 30 days.
 *
 * @param {string} shopId - Shop UUID
 * @param {string} plan   - Plan to activate ("PRO")
 * @returns {Promise<object>} The newly created subscription record
 */
const activateSubscription = async (shopId, plan) => {
  if (plan !== "PRO") {
    throw new Error("Invalid subscription plan");
  }

  // Determine limits
  let maxCustomers = 99999;
  let maxUsers = 5;
  let amount = 299.00;

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 days billing cycle

  return await prisma.$transaction(async (tx) => {
    // 1. Deactivate current active subscriptions
    await tx.subscription.updateMany({
      where: {
        shopId,
        status: "ACTIVE",
      },
      data: {
        status: "CANCELLED",
        cancelledAt: new Date(),
      },
    });

    // 2. Create the new subscription
    return await tx.subscription.create({
      data: {
        shopId,
        plan,
        status: "ACTIVE",
        maxCustomers,
        maxUsers,
        amount,
        billingCycle: "monthly",
        expiresAt,
      },
    });
  });
};

module.exports = {
  getActiveSubscription,
  activateSubscription,
};
