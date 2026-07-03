// src/screens/auth/LoginScreen.js
// Login screen for credentials-based authentication.
// Premium dark UI with animated entrance, subtle glow, and smooth transitions.

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
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isIdentifierFocused, setIsIdentifierFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const { login, isLoading, error, clearError } = useAuthStore();

  // ── Animations ──
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

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
    if (error && (identifier.length > 0 || password.length > 0)) {
      clearError();
    }
  }, [identifier, password]);

  const handleLogin = async () => {
    if (!identifier.trim()) {
      useAuthStore.setState({ error: "Please enter your mobile number or email" });
      return;
    }
    if (!password) {
      useAuthStore.setState({ error: "Please enter your password" });
      return;
    }

    await login(identifier.trim(), password);
  };

  const isFormValid = identifier.trim().length > 0 && password.length >= 6;

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgDark} />

      {/* Background glow orb */}
      <Animated.View style={[styles.glowOrb, { opacity: glowOpacity }]} />
      <Animated.View style={[styles.glowOrbSecondary, { opacity: glowOpacity }]} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
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
            <Text style={styles.formTitle}>Welcome Back</Text>
            <Text style={styles.formSubtitle}>
              Log in to access your dashboard
            </Text>

            {/* Identifier (Email/Phone) Input */}
            <View
              style={[
                styles.inputWrapper,
                isIdentifierFocused && styles.inputFocused,
              ]}
            >
              <TextInput
                style={styles.textInput}
                placeholder="Mobile number or Email"
                placeholderTextColor={Colors.textPlaceholder}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={identifier}
                onChangeText={setIdentifier}
                onFocus={() => setIsIdentifierFocused(true)}
                onBlur={() => setIsIdentifierFocused(false)}
              />
            </View>

            {/* Password Input */}
            <View
              style={[
                styles.inputWrapper,
                isPasswordFocused && styles.inputFocused,
              ]}
            >
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor={Colors.textPlaceholder}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
              <TouchableOpacity
                style={styles.eyeToggle}
                onPress={() => setShowPassword((prev) => !prev)}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={18}
                  color={isPasswordFocused ? Colors.primaryLight : Colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            {/* Error Message */}
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.button,
                (!isFormValid || isLoading) && styles.buttonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoading || !isFormValid}
              activeOpacity={0.85}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.white} size="small" />
              ) : (
                <Text style={styles.buttonText}>Log In</Text>
              )}
            </TouchableOpacity>

            {/* Sign Up Link */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={styles.signupContainer}
              activeOpacity={0.7}
            >
              <Text style={styles.signupText}>
                Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
              </Text>
            </TouchableOpacity>

            {/* Join Shop Link for Staff */}
            <TouchableOpacity
              onPress={() => navigation.navigate("StaffJoin")}
              style={styles.joinContainer}
              activeOpacity={0.7}
            >
              <Text style={styles.joinText}>
                Are you a staff member? <Text style={styles.joinLink}>Join a Shop</Text>
              </Text>
            </TouchableOpacity>
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
  brandContainer: {
    alignItems: "center",
    marginBottom: 36,
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgInput,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 16,
  },
  inputFocused: {
    borderColor: Colors.primaryLight,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  eyeToggle: {
    padding: 4,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
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
    marginVertical: 12,
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
  signupContainer: {
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 8,
  },
  signupText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  signupLink: {
    color: Colors.primaryLight,
    fontWeight: "700",
  },
  joinContainer: {
    alignItems: "center",
    marginTop: 8,
    paddingVertical: 8,
  },
  joinText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  joinLink: {
    color: Colors.primaryLight,
    fontWeight: "700",
  },
});

export default LoginScreen;
