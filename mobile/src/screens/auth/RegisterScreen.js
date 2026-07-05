// src/screens/auth/RegisterScreen.js
// Registration screen for inputting name, phone, email, and password.
// Premium dark UI with animated entrance, subtle glow, and form validation.

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
  ScrollView,
} from "react-native";
import Colors from "../../constants/colors";
import useAuthStore from "../../store/authStore";

const { width, height } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const { register, isLoading, error, clearError } = useAuthStore();

  // ── Animations ──
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
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

  // Clear error when user changes inputs
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [name, phone, email, password]);

  const handleRegister = async () => {
    if (!name.trim()) {
      useAuthStore.setState({ error: "Please enter your name" });
      return;
    }
    const cleanPhone = phone.replace(/\s/g, "");
    if (cleanPhone.length < 10) {
      useAuthStore.setState({ error: "Please enter a valid 10-digit phone number" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      useAuthStore.setState({ error: "Please enter a valid email address" });
      return;
    }
    if (password.length < 6) {
      useAuthStore.setState({ error: "Password must be at least 6 characters" });
      return;
    }

    const fullPhone = `${countryCode}${cleanPhone}`;
    const success = await register(name.trim(), fullPhone, email.trim().toLowerCase(), password);

    if (success) {
      navigation.navigate("OtpScreen", { email: email.trim().toLowerCase(), isRegister: true });
    }
  };

  const isFormValid =
    name.trim().length > 0 &&
    phone.replace(/\s/g, "").length >= 10 &&
    email.trim().length > 0 &&
    password.length >= 6;

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgDark} />

      {/* Background glow orb */}
      <Animated.View style={[styles.glowOrb, { opacity: glowOpacity }]} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            {/* Header */}
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Sign up to start managing credit and ledgers</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              {/* Full Name */}
              <View style={[styles.inputWrapper, isNameFocused && styles.inputFocused]}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Full Name"
                  placeholderTextColor={Colors.textPlaceholder}
                  autoCapitalize="words"
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setIsNameFocused(true)}
                  onBlur={() => setIsNameFocused(false)}
                />
              </View>

              {/* Phone Input with Country Code */}
              <View style={[styles.phoneInputWrapper, isPhoneFocused && styles.inputFocused]}>
                <TouchableOpacity style={styles.countryCodeBox}>
                  <Text style={styles.flag}>🇮🇳</Text>
                  <Text style={styles.countryCodeText}>{countryCode}</Text>
                  <Text style={styles.divider}>│</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Phone Number"
                  placeholderTextColor={Colors.textPlaceholder}
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phone}
                  onChangeText={setPhone}
                  onFocus={() => setIsPhoneFocused(true)}
                  onBlur={() => setIsPhoneFocused(false)}
                />
              </View>

              {/* Email Address */}
              <View style={[styles.inputWrapper, isEmailFocused && styles.inputFocused]}>
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

              {/* Password */}
              <View style={[styles.inputWrapper, isPasswordFocused && styles.inputFocused]}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Password (Min 6 chars)"
                  placeholderTextColor={Colors.textPlaceholder}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                />
              </View>

              {/* Error Message */}
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorIcon}>⚠️</Text>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {/* Register Button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  (!isFormValid || isLoading) && styles.buttonDisabled,
                ]}
                onPress={handleRegister}
                disabled={isLoading || !isFormValid}
                activeOpacity={0.85}
              >
                {isLoading ? (
                  <ActivityIndicator color={Colors.white} size="small" />
                ) : (
                  <Text style={styles.buttonText}>Register & Send OTP</Text>
                )}
              </TouchableOpacity>

              {/* Back to Login Link */}
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={styles.loginLinkContainer}
                activeOpacity={0.7}
              >
                <Text style={styles.loginLinkText}>
                  Already have an account? <Text style={styles.loginLink}>Log In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
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
    top: -height * 0.1,
    right: -width * 0.2,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: Colors.primary,
    opacity: 0.08,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },
  content: {
    paddingHorizontal: 28,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  formContainer: {
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
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
  phoneInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgInput,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.border,
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
    fontSize: 16,
    fontWeight: "500",
    color: Colors.textPrimary,
    paddingHorizontal: 8,
    letterSpacing: 0.5,
  },
  inputFocused: {
    borderColor: Colors.primaryLight,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
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
    marginVertical: 12,
  },
  buttonDisabled: {
    backgroundColor: Colors.bgElevated,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.white,
    letterSpacing: 0.5,
  },
  loginLinkContainer: {
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 8,
  },
  loginLinkText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  loginLink: {
    color: Colors.primaryLight,
    fontWeight: "700",
  },
});

export default RegisterScreen;
