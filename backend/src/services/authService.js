// src/services/authService.js
// Business logic for authentication.
// Supports both mock authentication (for local dev) and real Supabase Auth.

const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const supabaseConfig = require("../config/supabase");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const JWT_SECRET = process.env.JWT_SECRET || "fallback-jwt-secret-min-32-chars-long";
const JWT_EXPIRES_IN = "7d";

// Memory cache for OTPs in mock mode: phone -> { otp, expiresAt }
const mockOtpCache = new Map();

// Memory cache for registration OTPs: email -> { name, phone, passwordHash, otp, expiresAt }
const registrationCache = new Map();

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
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

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
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
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
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
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

/**
 * Request verification OTP for registering a new user.
 * Sends OTP to the provided email.
 */
const registerRequest = async (name, phone, email, password) => {
  let cachedData = null;
  if (email && !name && !phone && !password) {
    cachedData = registrationCache.get(email);
    if (!cachedData) {
      throw ApiError.badRequest("Registration session has expired. Please sign up again.");
    }
  } else if (!name || !phone || !email || !password) {
    throw ApiError.badRequest("All fields are required");
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw ApiError.badRequest("Invalid email address format");
  }

  const finalName = name || cachedData.name;
  const finalPhone = phone || cachedData.phone;

  // Validate phone format (+ followed by digits, e.g. +919876543210)
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  if (!phoneRegex.test(finalPhone)) {
    throw ApiError.badRequest("Invalid phone number format. Must include country code, e.g., +919876543210");
  }

  // Check if phone or email already registered in DB (only for new registration, not resend)
  if (!cachedData) {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email, deletedAt: null },
          { phone: finalPhone, deletedAt: null }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw ApiError.conflict("User with this email is already registered");
      }
      if (existingUser.phone === finalPhone) {
        throw ApiError.conflict("User with this phone number is already registered");
      }
    }
  }

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  // Hash password
  const passwordHash = cachedData ? cachedData.passwordHash : await bcrypt.hash(password, 10);

  // Store in cache
  registrationCache.set(email, {
    name: finalName,
    phone: finalPhone,
    passwordHash,
    otp,
    expiresAt
  });

  // Send email OTP
  const brevoApiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "no-reply@udhari-tracking.vercel.app";

  console.log(`📧 [Auth Service] registerRequest: API Key present = ${!!brevoApiKey}, Sender = ${senderEmail}`);

  if (brevoApiKey) {
    try {
      console.log(`📧 [Auth Service] Attempting to send email via Brevo to ${email}...`);
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": brevoApiKey,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          sender: { name: "Udhari", email: senderEmail },
          to: [{ email }],
          subject: "Udhari - Verify your registration",
          htmlContent: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Udhari Verification Code</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0d0d12; color: #e2e8f0;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0d0d12; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 500px; background-color: #121217; border-radius: 20px; border: 1px solid #1f1f2e; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
                      <tr>
                        <td align="center" style="background-color: #6366f1; padding: 30px 20px;">
                          <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td align="center" style="background-color: rgba(255, 255, 255, 0.2); width: 60px; height: 60px; border-radius: 30px; font-size: 32px; font-weight: bold; color: #ffffff; line-height: 60px;">₹</td>
                            </tr>
                          </table>
                          <h1 style="margin: 15px 0 0 0; font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: 1px;">Udhari</h1>
                          <p style="margin: 5px 0 0 0; font-size: 13px; color: #c7d2fe; letter-spacing: 0.5px;">Smart Ledger & Credit Management</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 40px 30px; text-align: center;">
                          <h2 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 700; color: #ffffff;">Verify Your Account</h2>
                          <p style="margin: 0 0 30px 0; font-size: 14px; color: #94a3b8; line-height: 22px;">
                            Thank you for choosing Udhari. Please use the verification code below to complete your registration process.
                          </p>
                          <table align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto 30px auto;">
                            <tr>
                              <td align="center" style="background-color: #1e1e2f; border: 1px dashed #6366f1; border-radius: 12px; padding: 15px 40px;">
                                <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: bold; color: #10b981; letter-spacing: 6px; line-height: 44px; display: inline-block; padding-left: 6px;">${otp}</span>
                              </td>
                            </tr>
                          </table>
                          <p style="margin: 0 0 20px 0; font-size: 13px; color: #64748b;">
                            This OTP is valid for the next <strong style="color: #cbd5e1;">5 minutes</strong> and can only be used once.
                          </p>
                          <hr style="border: 0; border-top: 1px solid #1f1f2e; margin: 30px 0;" />
                          <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 18px;">
                            If you did not initiate this request, you can safely ignore this email. Your password is secure and has not been compromised.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="background-color: #0a0a0f; padding: 20px; border-top: 1px solid #1f1f2e; text-align: center;">
                          <p style="margin: 0; font-size: 11px; color: #475569; line-height: 16px;">
                            &copy; 2026 Udhari Inc. All rights reserved.<br>
                            This is an automated security message. Please do not reply to this email.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ [Brevo Email Service] Error response:", errorText);
        throw new Error("Failed to send verification email via Brevo");
      }
    } catch (err) {
      console.error("❌ [Brevo Email Service] Connection failed:", err.message);
      if (process.env.NODE_ENV !== "production") {
        console.log(`\n--- 📧 MOCK EMAIL GATEWAY (FALLBACK) ---`);
        console.log(`To: ${email}`);
        console.log(`OTP Code: ${otp}`);
        console.log(`-------------------------------------\n`);
      } else {
        throw ApiError.internal("Failed to send verification email. Please try again later.");
      }
    }
  } else {
    // Mock / Local Dev Mode
    console.log(`\n--- 📧 MOCK EMAIL GATEWAY ---`);
    console.log(`To: ${email}`);
    console.log(`OTP Code: ${otp}`);
    console.log(`-----------------------------\n`);
  }

  return {
    success: true,
    message: "Verification OTP code sent to your email"
  };
};

/**
 * Verify OTP and complete registration.
 */
const registerVerify = async (email, otp) => {
  if (!email || !otp) {
    throw ApiError.badRequest("Email and OTP code are required");
  }

  const cached = registrationCache.get(email);
  if (!cached) {
    throw ApiError.badRequest("No registration request found for this email");
  }

  if (Date.now() > cached.expiresAt) {
    registrationCache.delete(email);
    throw ApiError.badRequest("OTP has expired");
  }

  if (cached.otp !== otp) {
    throw ApiError.badRequest("Invalid OTP code");
  }

  // OTP verified! Create user in database
  const { name, phone, passwordHash } = cached;
  registrationCache.delete(email);

  const authId = crypto.randomUUID();

  const user = await prisma.user.create({
    data: {
      authId,
      name,
      phone,
      email,
      passwordHash,
      role: "owner",
      isActive: true
    }
  });

  // Generate JWT access token
  const tokenPayload = {
    authId,
    phone,
    userId: user.id,
    shopId: null,
  };

  const accessToken = jwt.sign(tokenPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role
    },
    shop: null
  };
};

/**
 * Log in a user using email or phone number and password.
 */
const login = async (identifier, password) => {
  if (!identifier || !password) {
    throw ApiError.badRequest("Mobile number/email and password are required");
  }

  const cleanIdentifier = identifier.trim();
  const lowerIdentifier = cleanIdentifier.toLowerCase();
  
  // Normalize phone number
  // Remove non-numeric characters except +
  let normalizedPhone = cleanIdentifier.replace(/[^\d+]/g, "");
  // If it's a 10-digit number without +, assume +91 (India)
  if (/^\d{10}$/.test(normalizedPhone)) {
    normalizedPhone = `+91${normalizedPhone}`;
  }

  // Find user by phone or email (case-insensitive email search)
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: { equals: lowerIdentifier, mode: "insensitive" }, deletedAt: null, isActive: true },
        { phone: cleanIdentifier, deletedAt: null, isActive: true },
        { phone: normalizedPhone, deletedAt: null, isActive: true }
      ]
    },
    include: {
      shop: true
    }
  });

  if (!user || !user.passwordHash) {
    throw ApiError.unauthorized("Invalid credentials");
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw ApiError.unauthorized("Invalid credentials");
  }

  // Generate JWT access token
  const tokenPayload = {
    authId: user.authId,
    phone: user.phone,
    userId: user.id,
    shopId: user.shopId || null,
  };

  const accessToken = jwt.sign(tokenPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role
    },
    shop: user.shop ? {
      id: user.shop.id,
      name: user.shop.name,
      phone: user.shop.phone,
      currency: user.shop.currency,
      upiId: user.shop.upiId
    } : null
  };
};

module.exports = {
  sendOtp,
  verifyOtp,
  getProfile,
  registerRequest,
  registerVerify,
  login
};

