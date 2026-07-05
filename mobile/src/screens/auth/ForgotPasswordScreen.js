// src/screens/auth/ForgotPasswordScreen.js
// Screen to request password reset OTP via email and set a new password.

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/colors";
import useAuthStore from "../../store/authStore";
import { Feather } from "@expo/vector-icons";
import { customAlert } from "../../components/common/CustomAlert";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isOtpFocused, setIsOtpFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const {
    forgotPasswordRequest,
    forgotPasswordReset,
    otpSent,
    otpEmail,
    isLoading,
    error,
    clearError,
    resetOtpFlow,
  } = useAuthStore();

  useEffect(() => {
    // Reset Zustand OTP state when entering the screen
    resetOtpFlow();
  }, []);

  // Clear errors on input change
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [email, otp, newPassword]);

  const handleRequestOtp = async () => {
    if (!email.trim() || !email.includes("@")) {
      useAuthStore.setState({ error: "Please enter a valid email address." });
      return;
    }

    const success = await forgotPasswordRequest(email.trim());
    if (success) {
      customAlert("OTP Sent", `A verification code has been sent to ${email.trim()}.`);
    }
  };

  const handleResetPassword = async () => {
    if (otp.length < 6) {
      useAuthStore.setState({ error: "Please enter the 6-digit OTP code." });
      return;
    }
    if (newPassword.length < 6) {
      useAuthStore.setState({ error: "Password must be at least 6 characters long." });
      return;
    }

    const success = await forgotPasswordReset(otp.trim(), newPassword);
    if (success) {
      customAlert(
        "Password Reset Successful",
        "Your password has been updated. Please log in with your new credentials.",
        [
          {
            text: "Log In",
            onPress: () => navigation.navigate("Login"),
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgDark} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        {/* Header Back Button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              if (otpSent) {
                resetOtpFlow();
              } else {
                navigation.goBack();
              }
            }}
            style={styles.backBtn}
          >
            <Feather name="chevron-left" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.brandContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>₹</Text>
            </View>
            <Text style={styles.appName}>Reset Password</Text>
            <Text style={styles.tagline}>
              {otpSent
                ? `Enter the code sent to ${otpEmail}`
                : "Recover access using your registered email"}
            </Text>
          </View>

          <View style={styles.formContainer}>
            {/* Step 1: Input Email */}
            {!otpSent ? (
              <View>
                <View
                  style={[
                    styles.inputWrapper,
                    isEmailFocused && styles.inputFocused,
                  ]}
                >
                  <TextInput
                    style={styles.textInput}
                    placeholder="Email Address"
                    placeholderTextColor={Colors.textPlaceholder}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.button, (!email.trim() || isLoading) && styles.buttonDisabled]}
                  onPress={handleRequestOtp}
                  disabled={isLoading || !email.trim()}
                >
                  {isLoading ? (
                    <ActivityIndicator color={Colors.white} size="small" />
                  ) : (
                    <Text style={[styles.buttonText, (!email.trim() || isLoading) && styles.buttonTextDisabled]}>Send Reset OTP</Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              // Step 2: Verification (OTP + New Password)
              <View>
                <View
                  style={[
                    styles.inputWrapper,
                    isOtpFocused && styles.inputFocused,
                  ]}
                >
                  <TextInput
                    style={styles.textInput}
                    placeholder="6-digit Verification Code"
                    placeholderTextColor={Colors.textPlaceholder}
                    keyboardType="number-pad"
                    maxLength={6}
                    value={otp}
                    onChangeText={setOtp}
                    onFocus={() => setIsOtpFocused(true)}
                    onBlur={() => setIsOtpFocused(false)}
                  />
                </View>

                <View
                  style={[
                    styles.inputWrapper,
                    isPasswordFocused && styles.inputFocused,
                  ]}
                >
                  <TextInput
                    style={styles.textInput}
                    placeholder="New Password (min 6 chars)"
                    placeholderTextColor={Colors.textPlaceholder}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                  />
                  <TouchableOpacity
                    style={styles.eyeToggle}
                    onPress={() => setShowPassword((prev) => !prev)}
                  >
                    <Feather
                      name={showPassword ? "eye" : "eye-off"}
                      size={18}
                      color={Colors.textMuted}
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[
                    styles.button,
                    (otp.length < 6 || newPassword.length < 6 || isLoading) && styles.buttonDisabled,
                  ]}
                  onPress={handleResetPassword}
                  disabled={isLoading || otp.length < 6 || newPassword.length < 6}
                >
                  {isLoading ? (
                    <ActivityIndicator color={Colors.white} size="small" />
                  ) : (
                    <Text style={[styles.buttonText, (otp.length < 6 || newPassword.length < 6 || isLoading) && styles.buttonTextDisabled]}>Reset Password</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}

            {/* Error Container */}
            {error && (
              <View style={styles.errorContainer}>
                <Feather name="alert-triangle" size={14} color={Colors.error} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.bgElevated,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    paddingBottom: 40,
  },
  brandContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.white,
  },
  appName: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 22,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  tagline: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    padding: 20,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgInput,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 54,
  },
  inputFocused: {
    borderColor: Colors.primary,
  },
  textInput: {
    flex: 1,
    fontFamily: "Manrope_400Regular",
    color: Colors.textPrimary,
    fontSize: 15,
    height: "100%",
  },
  eyeToggle: {
    padding: 8,
  },
  button: {
    height: 54,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: Colors.bgElevated,
  },
  buttonText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 16,
    color: Colors.white,
  },
  buttonTextDisabled: {
    color: Colors.textMuted,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(216, 90, 48, 0.08)",
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  errorText: {
    flex: 1,
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.error,
  },
});
