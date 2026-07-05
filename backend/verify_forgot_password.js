// verify_forgot_password.js
// Verification script to test the forgot password flow end-to-end.

require("dotenv").config();
const prisma = require("./src/config/prisma");
const authService = require("./src/services/authService");

async function run() {
  console.log("⚡ Starting Forgot Password Flow Verification...");

  // 1. Find a test user with email in DB
  const user = await prisma.user.findFirst({
    where: { email: { not: null }, deletedAt: null, isActive: true },
  });

  if (!user) {
    console.log("❌ No user found with an email address in the DB.");
    return;
  }

  console.log(`👤 Found test user: ${user.name} (${user.email})`);
  const originalHash = user.passwordHash;

  // 2. Request OTP
  console.log("📤 Requesting password reset OTP...");
  const requestRes = await authService.forgotPasswordRequest(user.email);
  console.log(`✅ Request success: ${requestRes.message}`);

  // 3. Retrieve OTP from exported cache map
  const cachedData = authService.forgotPasswordCache.get(user.email.toLowerCase());
  if (!cachedData) {
    console.log("❌ OTP was not found in forgotPasswordCache map.");
    return;
  }
  const otp = cachedData.otp;
  console.log(`✅ Found OTP in memory cache: ${otp}`);

  // 4. Verify/Reset Password
  const newPassword = "testResetPassword123!";
  console.log("⚙️ Resetting password using OTP...");
  const resetRes = await authService.forgotPasswordReset(user.email, otp, newPassword);
  console.log(`✅ Reset success: ${resetRes.message}`);

  // 5. Verify database hash updated
  const updatedUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (updatedUser.passwordHash !== originalHash) {
    console.log("✅ User passwordHash was successfully updated in DB!");
  } else {
    console.log("❌ passwordHash remains unchanged!");
    return;
  }

  // 6. Test Login with new password
  console.log("🔑 Testing login with new password...");
  const loginRes = await authService.login(user.email, newPassword);
  if (loginRes.accessToken) {
    console.log("✅ Successfully logged in using new password!");
  } else {
    console.log("❌ Failed to log in with new password.");
  }

  // 7. Restore original password hash
  console.log("⚙️ Restoring original password hash...");
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: originalHash },
  });
  console.log("✅ Original password hash restored.");

  console.log("✨ Forgot Password Verification completed successfully!");
}

run().catch(console.error);
