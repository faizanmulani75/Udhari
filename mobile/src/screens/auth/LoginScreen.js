// src/screens/auth/LoginScreen.js
// Phone number input screen — first step of the OTP login flow.
// Premium dark UI with animated gradient, subtle glow, and smooth transitions.

import React, { useState, useRef, useEffect } from "react";
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
} from "react-native";
import Colors from "../../constants/colors";
import useAuthStore from "../../store/authStore";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const { sendOtp, isLoading, error, clearError } = useAuthStore();

  // ── Animations ──
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const inputFocusAnim = useRef(new Animated.Value(0)).current;

  const inputRef = useRef(null);

  useEffect(() => {
    // Entrance animation sequence
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous glow pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Clear error when user starts typing
  useEffect(() => {
    if (error && phone.length > 0) {
      clearError();
    }
  }, [phone]);

  const handleInputFocus = () => {
    Animated.timing(inputFocusAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleInputBlur = () => {
    Animated.timing(inputFocusAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleSendOtp = async () => {
    const cleanPhone = phone.replace(/\s/g, "");

    if (cleanPhone.length < 10) {
      useAuthStore.setState({
        error: "Please enter a valid 10-digit phone number",
      });
      return;
    }

    const fullPhone = `${countryCode}${cleanPhone}`;
    const success = await sendOtp(fullPhone);

    if (success) {
      navigation.navigate("OtpScreen", { phone: fullPhone });
    }
  };

  const isPhoneValid = phone.replace(/\s/g, "").length >= 10;

  const inputBorderColor = inputFocusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.border, Colors.primaryLight],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgDark} />

      {/* Background glow orb */}
      <Animated.View
        style={[
          styles.glowOrb,
          { opacity: glowOpacity },
        ]}
      />
      <Animated.View style={[styles.glowOrbSecondary, { opacity: glowOpacity }]} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          {/* ── Logo / Brand ── */}
          <Animated.View
            style={[
              styles.brandContainer,
              { transform: [{ scale: logoScale }] },
            ]}
          >
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>₹</Text>
            </View>
            <Text style={styles.appName}>Udhari</Text>
            <Text style={styles.tagline}>Smart credit management for your shop</Text>
          </Animated.View>

          {/* ── Form ── */}
          <Animated.View
            style={[
              styles.formContainer,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.formTitle}>Login to your account</Text>
            <Text style={styles.formSubtitle}>
              Enter your phone number to receive a verification code
            </Text>

            {/* Phone Input */}
            <Animated.View
              style={[
                styles.inputWrapper,
                { borderColor: inputBorderColor },
              ]}
            >
              {/* Country Code */}
              <TouchableOpacity style={styles.countryCodeBox}>
                <Text style={styles.flag}>🇮🇳</Text>
                <Text style={styles.countryCodeText}>{countryCode}</Text>
                <Text style={styles.divider}>│</Text>
              </TouchableOpacity>

              {/* Phone Number */}
              <TextInput
                ref={inputRef}
                style={styles.phoneInput}
                placeholder="Enter phone number"
                placeholderTextColor={Colors.textPlaceholder}
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                autoFocus={false}
              />
            </Animated.View>

            {/* Error Message */}
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* Send OTP Button */}
            <TouchableOpacity
              style={[
                styles.button,
                !isPhoneValid && styles.buttonDisabled,
              ]}
              onPress={handleSendOtp}
              disabled={isLoading || !isPhoneValid}
              activeOpacity={0.85}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.white} size="small" />
              ) : (
                <Text style={styles.buttonText}>Send OTP</Text>
              )}
            </TouchableOpacity>

            {/* Terms */}
            <Text style={styles.termsText}>
              By continuing, you agree to our{" "}
              <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </Animated.View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  glowOrb: {
    position: "absolute",
    top: -height * 0.15,
    left: -width * 0.3,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: Colors.primary,
    opacity: 0.08,
  },
  glowOrbSecondary: {
    position: "absolute",
    bottom: -height * 0.1,
    right: -width * 0.2,
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: Colors.accent,
    opacity: 0.05,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },

  // ── Brand ──
  brandContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "700",
    color: Colors.white,
  },
  appName: {
    fontSize: 32,
    fontWeight: "800",
    color: Colors.textPrimary,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 6,
    letterSpacing: 0.3,
  },

  // ── Form ──
  formContainer: {
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  formSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 20,
  },

  // ── Input ──
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgInput,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 4,
    height: 56,
    marginBottom: 16,
  },
  countryCodeBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: "100%",
  },
  flag: {
    fontSize: 20,
    marginRight: 6,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginRight: 8,
  },
  divider: {
    color: Colors.border,
    fontSize: 20,
    fontWeight: "200",
  },
  phoneInput: {
    flex: 1,
    fontSize: 17,
    fontWeight: "500",
    color: Colors.textPrimary,
    paddingHorizontal: 8,
    letterSpacing: 1,
  },

  // ── Error ──
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.errorBg,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  errorIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: Colors.error,
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
    marginBottom: 20,
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

  // ── Terms ──
  termsText: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    color: Colors.primaryLight,
    fontWeight: "500",
  },
});

export default LoginScreen;
