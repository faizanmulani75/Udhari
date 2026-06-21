// src/controllers/subscriptionController.js
// Controller to fetch and manage SaaS subscriptions.

const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const crypto = require("crypto");
const { razorpay, isMockMode, keyId } = require("../config/razorpay");

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

/**
 * Create a Razorpay Order for subscription upgrade
 */
exports.createOrder = async (req, res, next) => {
  try {
    const { plan } = req.body;
    const shopId = req.shopId;

    if (!["BASIC", "PRO"].includes(plan)) {
      throw ApiError.badRequest("Invalid subscription plan selected");
    }

    // Determine pricing in INR paise (1 INR = 100 paise)
    let amount = 0;
    if (plan === "BASIC") {
      amount = 29900; // Rs. 299
    } else if (plan === "PRO") {
      amount = 99900; // Rs. 999
    }

    if (isMockMode) {
      // Return a simulated order structure
      return res.json({
        success: true,
        isMock: true,
        orderId: `mock_order_${Math.random().toString(36).substring(2, 15)}`,
        amount: amount,
        currency: "INR",
        keyId: null
      });
    }

    // Create a real Razorpay order
    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_sub_${shopId.substring(0, 8)}_${Date.now()}`,
      notes: {
        shopId,
        plan
      }
    };

    const order = await razorpay.orders.create(options);

    return res.json({
      success: true,
      isMock: false,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: keyId
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Verify payment signature and activate the subscription
 */
exports.verifyPayment = async (req, res, next) => {
  try {
    const shopId = req.shopId;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;

    if (!["BASIC", "PRO"].includes(plan)) {
      throw ApiError.badRequest("Invalid subscription plan");
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw ApiError.badRequest("Missing signature verification parameters");
    }

    // Verify Signature
    if (isMockMode) {
      if (razorpay_signature !== "mock_signature") {
        throw ApiError.badRequest("Invalid mock payment signature");
      }
    } else {
      const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
      shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const digest = shasum.digest("hex");

      if (digest !== razorpay_signature) {
        throw ApiError.badRequest("Payment signature verification failed");
      }
    }

    // Determine limits
    let maxCustomers = 10;
    let maxUsers = 1;
    let amount = 0.00;

    if (plan === "BASIC") {
      maxCustomers = 100;
      maxUsers = 2;
      amount = 299.00;
    } else if (plan === "PRO") {
      maxCustomers = 99999;
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
      message: `Successfully upgraded to ${plan} plan via Razorpay!`,
      data: updatedSubscription,
    });
  } catch (err) {
    next(err);
  }
};
