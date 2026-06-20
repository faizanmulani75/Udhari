// src/services/authService.js
// Business logic for authentication.
// Supports both mock authentication (for local dev) and real Supabase Auth.

const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const supabaseConfig = require("../config/supabase");
const ApiError = require("../utils/ApiError");

const JWT_SECRET = process.env.JWT_SECRET || "fallback-jwt-secret-min-32-chars-long";
const JWT_EXPIRES_IN = "7d";

// Memory cache for OTPs in mock mode: phone -> { otp, expiresAt }
const mockOtpCache = new Map();

/**
 * Helper to generate a consistent UUID from a phone number for mock authId.
 * This ensures the same phone number gets the same authId in development.
 */
const getMockAuthId = (phone) => {
  // Simple deterministic UUID generator from phone
  const cleanPhone = phone.replace(/\D/g, "");
  const padded = cleanPhone.padEnd(12, "0").substring(0, 12);
  return `00000000-0000-4000-8000-${padded}`;
};

/**
 * Request OTP to be sent to a phone number.
 * @param {string} phone - Country-coded phone number (e.g. +919876543210)
 * @returns {Promise<object>}
 */
const sendOtp = async (phone) => {
  if (!phone) {
    throw ApiError.badRequest("Phone number is required");
  }

  // Validate phone format (+ followed by digits, e.g., +919876543210)
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  if (!phoneRegex.test(phone)) {
    throw ApiError.badRequest("Invalid phone number format. Must include country code, e.g., +919876543210");
  }

  if (supabaseConfig.isMockMode) {
    // Generate a 6-digit OTP (for dev, use 123456 or a random code)
    const otp = process.env.NODE_ENV === "production" 
      ? Math.floor(100000 + Math.random() * 900000).toString()
      : "123456"; // Easier local testing

    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins expiry
    mockOtpCache.set(phone, { otp, expiresAt });

    console.log(`\n--- 📱 MOCK SMS GATEWAY ---`);
    console.log(`To: ${phone}`);
    console.log(`OTP Code: ${otp}`);
    console.log(`---------------------------\n`);

    return {
      success: true,
      message: "OTP sent successfully (mock mode)",
    };
  } else {
    // Real Supabase Auth OTP send
    try {
      const { error } = await supabaseConfig.supabaseAnon.auth.signInWithOtp({
        phone,
      });

      if (error) {
        // Fall back to Mock OTP if the phone provider is unsupported, SMS config is missing, etc.
        console.warn(`⚠️ Supabase returned SMS error (${error.message}). Falling back to MOCK OTP for this session.`);
        const otp = "123456";
        const expiresAt = Date.now() + 5 * 60 * 1000;
        mockOtpCache.set(phone, { otp, expiresAt, isFallback: true });

        console.log(`\n--- 📱 MOCK SMS GATEWAY (FALLBACK) ---`);
        console.log(`To: ${phone}`);
        console.log(`OTP Code: ${otp}`);
        console.log(`-------------------------------------\n`);

        return {
          success: true,
          message: "OTP sent successfully (mock fallback)",
        };
      }

      return {
        success: true,
        message: "OTP sent successfully",
      };
    } catch (err) {
      console.warn(`⚠️ Supabase connection error (${err.message}). Falling back to MOCK OTP.`);
      const otp = "123456";
      const expiresAt = Date.now() + 5 * 60 * 1000;
      mockOtpCache.set(phone, { otp, expiresAt, isFallback: true });

      console.log(`\n--- 📱 MOCK SMS GATEWAY (FALLBACK) ---`);
      console.log(`To: ${phone}`);
      console.log(`OTP Code: ${otp}`);
      console.log(`-------------------------------------\n`);

      return {
        success: true,
        message: "OTP sent successfully (mock fallback)",
      };
    }
  }
};

/**
 * Verify OTP code and return auth details.
 * @param {string} phone - Phone number
 * @param {string} otp - 6-digit code
 * @returns {Promise<object>} - { accessToken, user, shop }
 */
const verifyOtp = async (phone, otp) => {
  if (!phone || !otp) {
    throw ApiError.badRequest("Phone number and OTP code are required");
  }

  let authId = null;

  // Check if we have an active mock fallback OTP for this phone
  const fallbackCached = mockOtpCache.get(phone);
  
  if (fallbackCached && fallbackCached.isFallback) {
    if (Date.now() > fallbackCached.expiresAt) {
      mockOtpCache.delete(phone);
      throw ApiError.badRequest("OTP has expired");
    }

    if (fallbackCached.otp !== otp) {
      throw ApiError.badRequest("Invalid OTP code");
    }

    // Success - clean cache and use deterministic mock authId
    mockOtpCache.delete(phone);
    authId = getMockAuthId(phone);
  } else if (supabaseConfig.isMockMode) {
    const cached = mockOtpCache.get(phone);
    if (!cached) {
      throw ApiError.badRequest("No OTP request found for this phone number");
    }

    if (Date.now() > cached.expiresAt) {
      mockOtpCache.delete(phone);
      throw ApiError.badRequest("OTP has expired");
    }

    if (cached.otp !== otp) {
      throw ApiError.badRequest("Invalid OTP code");
    }

    // Success - clean cache and set deterministic authId
    mockOtpCache.delete(phone);
    authId = getMockAuthId(phone);
  } else {
    // Real Supabase Auth OTP verification
    const { data, error } = await supabaseConfig.supabaseAnon.auth.verifyOtp({
      phone,
      token: otp,
      type: "sms",
    });

    if (error || !data.user) {
      throw ApiError.badRequest(error ? error.message : "Authentication failed");
    }

    authId = data.user.id;
  }

  // Look up user in our PostgreSQL database using authId
  let dbUser = await prisma.user.findFirst({
    where: {
      authId,
      deletedAt: null,
      isActive: true,
    },
    include: {
      shop: true,
    },
  });

  // If not found by authId, see if they were invited by phone (no authId mapped yet)
  if (!dbUser) {
    dbUser = await prisma.user.findFirst({
      where: {
        phone,
        deletedAt: null,
        isActive: true,
      },
      include: {
        shop: true,
      },
    });

    if (dbUser) {
      // Link the authenticated authId dynamically
      dbUser = await prisma.user.update({
        where: { id: dbUser.id },
        data: { authId },
        include: {
          shop: true,
        },
      });
    }
  }

  // Generate JWT access token
  const tokenPayload = {
    authId,
    phone,
    userId: dbUser ? dbUser.id : null,
    shopId: dbUser ? dbUser.shopId : null,
  };

  const accessToken = jwt.sign(tokenPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return {
    accessToken,
    user: dbUser
      ? {
          id: dbUser.id,
          name: dbUser.name,
          phone: dbUser.phone,
          email: dbUser.email,
          role: dbUser.role,
        }
      : null,
    shop: dbUser && dbUser.shop
      ? {
          id: dbUser.shop.id,
          name: dbUser.shop.name,
          phone: dbUser.shop.phone,
          currency: dbUser.shop.currency,
          upiId: dbUser.shop.upiId,
        }
      : null,
  };
};

/**
 * Get current user profile details by authId.
 * @param {string} authId - The UUID from the JWT
 * @returns {Promise<object>}
 */
const getProfile = async (authId) => {
  const dbUser = await prisma.user.findFirst({
    where: {
      authId,
      deletedAt: null,
      isActive: true,
    },
    include: {
      shop: true,
    },
  });

  if (!dbUser) {
    throw ApiError.notFound("User profile not found. Complete shop setup onboarding first.");
  }

  return {
    user: {
      id: dbUser.id,
      name: dbUser.name,
      phone: dbUser.phone,
      email: dbUser.email,
      role: dbUser.role,
    },
    shop: {
      id: dbUser.shop.id,
      name: dbUser.shop.name,
      phone: dbUser.shop.phone,
      currency: dbUser.shop.currency,
      address: dbUser.shop.address,
      logoUrl: dbUser.shop.logoUrl,
      upiId: dbUser.shop.upiId,
    },
  };
};

module.exports = {
  sendOtp,
  verifyOtp,
  getProfile,
};
