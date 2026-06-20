// src/screens/auth/OtpScreen.js
// OTP verification screen — second step of the OTP login flow.
// Features: 6-cell OTP input, auto-advance, countdown timer, resend, paste support.

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  Keyboard,
} from "react-native";
import Colors from "../../constants/colors";
import Config from "../../constants/config";
import useAuthStore from "../../store/authStore";

const { width } = Dimensions.get("window");
const OTP_LENGTH = Config.OTP_LENGTH;
const RESEND_COOLDOWN = Config.OTP_RESEND_COOLDOWN;

const OtpScreen = ({ navigation, route }) => {
  const phone = route?.params?.phone || "";
  const { verifyOtp, sendOtp, isLoading, error, clearError, resetOtpFlow } =
    useAuthStore();

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const [canResend, setCanResend] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const inputRefs = useRef([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const successScale = useRef(new Animated.Value(1)).current;

  // ── Entrance animation ──
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Auto-focus first cell after animation
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    });
  }, []);

  // ── Countdown timer ──
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // ── Clear error when typing ──
  useEffect(() => {
    if (error) clearError();
  }, [otp]);

  // ── Shake animation on error ──
  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start();
    }
  }, [error]);

  // ── Handle single digit input ──
  const handleChange = useCallback(
    (text, index) => {
      // Handle paste (when user pastes full OTP)
      if (text.length > 1) {
        const digits = text.replace(/\D/g, "").slice(0, OTP_LENGTH).split("");
        const newOtp = Array(OTP_LENGTH).fill("");
        digits.forEach((d, i) => (newOtp[i] = d));
        setOtp(newOtp);

        // Focus last filled cell or submit
        const lastIndex = Math.min(digits.length, OTP_LENGTH) - 1;
        if (digits.length >= OTP_LENGTH) {
          Keyboard.dismiss();
          handleSubmit(newOtp);
        } else {
          inputRefs.current[lastIndex + 1]?.focus();
          setFocusedIndex(lastIndex + 1);
        }
        return;
      }

      const digit = text.replace(/\D/g, "");
      const newOtp = [...otp];
      newOtp[index] = digit;
      setOtp(newOtp);

      // Auto-advance to next cell
      if (digit && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
        setFocusedIndex(index + 1);
      }

      // Auto-submit when all cells are filled
      if (digit && index === OTP_LENGTH - 1) {
        const fullOtp = newOtp.join("");
        if (fullOtp.length === OTP_LENGTH) {
          Keyboard.dismiss();
          handleSubmit(newOtp);
        }
      }
    },
    [otp]
  );

  // ── Handle backspace ──
  const handleKeyPress = useCallback(
    (e, index) => {
      if (e.nativeEvent.key === "Backspace") {
        if (!otp[index] && index > 0) {
          // Move focus back and clear previous cell
          const newOtp = [...otp];
          newOtp[index - 1] = "";
          setOtp(newOtp);
          inputRefs.current[index - 1]?.focus();
          setFocusedIndex(index - 1);
        } else {
          // Clear current cell
          const newOtp = [...otp];
          newOtp[index] = "";
          setOtp(newOtp);
        }
      }
    },
    [otp]
  );

  // ── Submit OTP ──
  const handleSubmit = async (otpArray) => {
    const otpString = (otpArray || otp).join("");

    if (otpString.length !== OTP_LENGTH) {
      useAuthStore.setState({ error: "Please enter the complete OTP" });
      return;
    }

    const success = await verifyOtp(otpString);

    if (success) {
      // Celebrate with a scale pulse
      Animated.sequence([
        Animated.timing(successScale, {
          toValue: 1.05,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(successScale, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  // ── Resend OTP ──
  const handleResend = async () => {
    if (!canResend || isLoading) return;

    setOtp(Array(OTP_LENGTH).fill(""));
    setCanResend(false);
    setCountdown(RESEND_COOLDOWN);
    setFocusedIndex(0);

    await sendOtp(phone);
    inputRefs.current[0]?.focus();
  };

  // ── Go back ──
  const handleGoBack = () => {
    resetOtpFlow();
    navigation.goBack();
  };

  // Mask phone for display: +91 98****3210
  const maskedPhone = phone.length > 6
    ? `${phone.slice(0, 5)}${"•".repeat(phone.length - 7)}${phone.slice(-2)}`
    : phone;

  const formatCountdown = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, "0")}` : `0:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgDark} />

      {/* Background glow */}
      <View style={styles.glowOrb} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleGoBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.otpIconCircle}>
              <Text style={styles.otpIcon}>🔐</Text>
            </View>
            <Text style={styles.title}>Verify your number</Text>
            <Text style={styles.subtitle}>
              We sent a {OTP_LENGTH}-digit code to{"\n"}
              <Text style={styles.phoneHighlight}>{maskedPhone}</Text>
            </Text>
          </View>

          {/* OTP Cells */}
          <Animated.View
            style={[
              styles.otpContainer,
              {
                transform: [
                  { translateX: shakeAnim },
                  { scale: successScale },
                ],
              },
            ]}
          >
            {Array(OTP_LENGTH)
              .fill(0)
              .map((_, index) => {
                const isFocused = focusedIndex === index;
                const isFilled = otp[index] !== "";

                return (
                  <View
                    key={index}
                    style={[
                      styles.otpCell,
                      isFocused && styles.otpCellFocused,
                      isFilled && styles.otpCellFilled,
                      error && styles.otpCellError,
                    ]}
                  >
                    <TextInput
                      ref={(ref) => (inputRefs.current[index] = ref)}
                      style={styles.otpInput}
                      keyboardType="number-pad"
                      maxLength={index === 0 ? OTP_LENGTH : 1}
                      value={otp[index]}
                      onChangeText={(text) => handleChange(text, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      onFocus={() => setFocusedIndex(index)}
                      selectTextOnFocus
                    />
                    {/* Cursor blink for empty focused cell */}
                    {isFocused && !isFilled && (
                      <Animated.View style={styles.cursor} />
                    )}
                  </View>
                );
              })}
          </Animated.View>

          {/* Error */}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Verify Button */}
          <TouchableOpacity
            style={[
              styles.button,
              otp.join("").length < OTP_LENGTH && styles.buttonDisabled,
            ]}
            onPress={() => handleSubmit()}
            disabled={isLoading || otp.join("").length < OTP_LENGTH}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.white} size="small" />
            ) : (
              <Text style={styles.buttonText}>Verify & Continue</Text>
            )}
          </TouchableOpacity>

          {/* Resend */}
          <View style={styles.resendContainer}>
            {canResend ? (
              <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                <Text style={styles.resendActive}>Resend OTP</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.resendWait}>
                Resend code in{" "}
                <Text style={styles.timerText}>{formatCountdown(countdown)}</Text>
              </Text>
            )}
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
};

const CELL_SIZE = (width - 56 - (OTP_LENGTH - 1) * 10) / OTP_LENGTH;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  glowOrb: {
    position: "absolute",
    top: -100,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.primary,
    opacity: 0.06,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },

  // ── Back ──
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingRight: 12,
  },
  backArrow: {
    fontSize: 22,
    color: Colors.textSecondary,
    marginRight: 6,
  },
  backText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: "500",
  },

  // ── Header ──
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  otpIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primaryGlow,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  otpIcon: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  phoneHighlight: {
    color: Colors.primaryLight,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  // ── OTP Cells ──
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 24,
  },
  otpCell: {
    width: Math.min(CELL_SIZE, 52),
    height: 60,
    borderRadius: 14,
    backgroundColor: Colors.bgInput,
    borderWidth: 1.5,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  otpCellFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.bgCard,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  otpCellFilled: {
    borderColor: Colors.primaryLight,
    backgroundColor: Colors.bgCard,
  },
  otpCellError: {
    borderColor: Colors.error,
  },
  otpInput: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "center",
    width: "100%",
    height: "100%",
  },
  cursor: {
    position: "absolute",
    width: 2,
    height: 24,
    backgroundColor: Colors.primary,
    borderRadius: 1,
  },

  // ── Error ──
  errorContainer: {
    backgroundColor: Colors.errorBg,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  errorText: {
    fontSize: 13,
    color: Colors.error,
    textAlign: "center",
    lineHeight: 18,
  },

  // ── Button ──
  button: {
    backgroundColor: Colors.primary,
    height: 54,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 24,
  },
  buttonDisabled: {
    backgroundColor: Colors.bgElevated,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.white,
    letterSpacing: 0.5,
  },

  // ── Resend ──
  resendContainer: {
    alignItems: "center",
  },
  resendWait: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  timerText: {
    color: Colors.primaryLight,
    fontWeight: "600",
  },
  resendActive: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: "700",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default OtpScreen;
