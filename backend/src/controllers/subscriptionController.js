// src/controllers/subscriptionController.js
// Controller to fetch and manage SaaS subscriptions.

const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

/**
 * Fetch the active subscription details for the authenticated shop.
 */
exports.getSubscription = async (req, res, next) => {
  try {
    const shopId = req.shopId;

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
      return res.json({
        success: true,
        data: {
          plan: "FREE",
          status: "ACTIVE",
          maxCustomers: 10,
          maxUsers: 1,
          amount: "0.00",
          expiresAt: null,
        },
      });
    }

    return res.json({
      success: true,
      data: subscription,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Upgrade the shop's subscription plan (simulated payment).
 */
exports.upgradeSubscription = async (req, res, next) => {
  try {
    const shopId = req.shopId;
    const { plan } = req.body; // 'FREE', 'BASIC', 'PRO'

    if (!["FREE", "BASIC", "PRO"].includes(plan)) {
      throw ApiError.badRequest("Invalid subscription plan");
    }

    // Determine plan limits and prices
    let maxCustomers = 10;
    let maxUsers = 1;
    let amount = 0.00;

    if (plan === "BASIC") {
      maxCustomers = 100;
      maxUsers = 2;
      amount = 299.00;
    } else if (plan === "PRO") {
      maxCustomers = 99999; // Unlimited
      maxUsers = 5;
      amount = 999.00;
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days billing cycle

    const updatedSubscription = await prisma.$transaction(async (tx) => {
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

    return res.json({
      success: true,
      message: `Successfully upgraded to ${plan} plan!`,
      data: updatedSubscription,
    });
  } catch (err) {
    next(err);
  }
};
