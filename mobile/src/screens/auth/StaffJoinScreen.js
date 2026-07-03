// src/screens/auth/StaffJoinScreen.js
// Verification and activation flow for staff members joining a shop via owner invite code.

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
import { Feather } from "@expo/vector-icons";
import { verifyStaffInvite, activateStaffAccount, persistAuth } from "../../services/authService";
import useAuthStore from "../../store/authStore";

const { width, height } = Dimensions.get("window");

const StaffJoinScreen = ({ navigation }) => {
  const [step, setStep] = useState(1); // 1 = Verify Code, 2 = Set Password
  const [inviteCode, setInviteCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Verification result data
  const [inviteData, setInviteData] = useState(null); // { staffName, shopName, phone }

  const [isCodeFocused, setIsCodeFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

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
    ]).start();

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
  }, [step]);

  // Clean error when inputs change
  useEffect(() => {
    setErrorMessage("");
  }, [inviteCode, password, confirmPassword]);

  // Format code to UDH-XXXX-XXXX
  const handleCodeChange = (text) => {
    let cleaned = text.toUpperCase().replace(/[^A-Z0-9]/g, "");
    
    // Automatically apply prefix/hyphen formatting
    if (cleaned.startsWith("UDH")) {
      if (cleaned.length > 3) {
        cleaned = "UDH" + "-" + cleaned.substring(3);
      }
      if (cleaned.length > 8) {
        cleaned = cleaned.substring(0, 8) + "-" + cleaned.substring(8);
      }
    } else {
      // If user typed without UDH prefix, prefix it automatically when text gets long enough or let them type
      if (cleaned.length > 0) {
        cleaned = "UDH" + "-" + cleaned;
      }
    }
    
    // Limit to max formatted size (13 chars: UDH-XXXX-XXXX)
    setInviteCode(cleaned.substring(0, 13));
  };

  const handleVerifyCode = async () => {
    if (!inviteCode.trim() || inviteCode.length < 13) {
      setErrorMessage("Please enter a valid 8-character invite code (e.g. UDH-K3M9-J8R2)");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await verifyStaffInvite(inviteCode.trim());
      if (response && response.success && response.data) {
        setInviteData(response.data);
        setStep(2);
      } else {
        setErrorMessage("Invalid response from server. Try again.");
      }
    } catch (err) {
      console.warn("Verify code error:", err);
      setErrorMessage(err.response?.data?.message || err.message || "Failed to verify invite code. Check details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivateAccount = async () => {
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await activateStaffAccount(inviteCode.trim(), password);
      if (response && response.success && response.data) {
        const { accessToken, user, shop } = response.data;
        
        // Persist local authentication storage
        await persistAuth({ accessToken, user, shop });
        
        // Push state directly to Zustand authStore
        useAuthStore.setState({
          accessToken,
          user,
          shopId: shop?.id || null,
          isAuthenticated: true,
        });
      } else {
        setErrorMessage("Failed to activate account. Try again.");
      }
    } catch (err) {
      console.warn("Activation error:", err);
      setErrorMessage(err.response?.data?.message || err.message || "Failed to set password. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgDark} />
      <Animated.View style={[styles.glowOrb, { opacity: glowOpacity }]} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            
            {/* Header */}
            <TouchableOpacity style={styles.backButton} onPress={() => step === 2 ? setStep(1) : navigation.goBack()}>
              <Feather name="arrow-left" size={20} color={Colors.textSecondary} />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <View style={styles.headerContainer}>
              <Text style={styles.title}>Join a Shop</Text>
              <Text style={styles.subtitle}>
                {step === 1 
                  ? "Enter the 8-character invite code shared by your shop owner" 
                  : "Set a password to complete your staff profile registration"}
              </Text>
            </View>

            {/* Form Card */}
            <View style={styles.formContainer}>
              {step === 1 ? (
                // Step 1: Verify Code
                <>
                  <Text style={styles.fieldLabel}>Invite Code</Text>
                  <View style={[styles.inputWrapper, isCodeFocused && styles.inputFocused]}>
                    <Feather name="key" size={18} color={isCodeFocused ? Colors.primaryLight : Colors.textMuted} style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="UDH-XXXX-XXXX"
                      placeholderTextColor={Colors.textPlaceholder}
                      autoCapitalize="characters"
                      autoCorrect={false}
                      value={inviteCode}
                      onChangeText={handleCodeChange}
                      onFocus={() => setIsCodeFocused(true)}
                      onBlur={() => setIsCodeFocused(false)}
                    />
                  </View>

                  {errorMessage ? (
                    <View style={styles.errorContainer}>
                      <Feather name="alert-triangle" size={14} color={Colors.error} style={{ marginRight: 6 }} />
                      <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                  ) : null}

                  <TouchableOpacity
                    style={[styles.button, (!inviteCode.trim() || inviteCode.length < 13 || isLoading) && styles.buttonDisabled]}
                    onPress={handleVerifyCode}
                    disabled={isLoading || !inviteCode.trim() || inviteCode.length < 13}
                  >
                    {isLoading ? (
                      <ActivityIndicator color={Colors.white} size="small" />
                    ) : (
                      <Text style={styles.buttonText}>Verify Invite Code</Text>
                    )}
                  </TouchableOpacity>
                </>
              ) : (
                // Step 2: Set Password
                <>
                  <View style={styles.welcomeBanner}>
                    <Text style={styles.welcomeTitle}>Welcome, {inviteData?.staffName}! 👋</Text>
                    <Text style={styles.welcomeSub}>You are registering as staff for:</Text>
                    <Text style={styles.shopHighlight}>{inviteData?.shopName}</Text>
                    <Text style={styles.phoneSub}>Phone: {inviteData?.phone}</Text>
                  </View>

                  <Text style={styles.fieldLabel}>Create Password</Text>
                  <View style={[styles.inputWrapper, isPasswordFocused && styles.inputFocused]}>
                    <Feather name="lock" size={18} color={isPasswordFocused ? Colors.primaryLight : Colors.textMuted} style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter new password"
                      placeholderTextColor={Colors.textPlaceholder}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={password}
                      onChangeText={setPassword}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                      <Feather name={showPassword ? "eye" : "eye-off"} size={16} color={Colors.textMuted} />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.fieldLabel}>Confirm Password</Text>
                  <View style={[styles.inputWrapper, isConfirmPasswordFocused && styles.inputFocused]}>
                    <Feather name="lock" size={18} color={isConfirmPasswordFocused ? Colors.primaryLight : Colors.textMuted} style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Re-enter password"
                      placeholderTextColor={Colors.textPlaceholder}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      onFocus={() => setIsConfirmPasswordFocused(true)}
                      onBlur={() => setIsConfirmPasswordFocused(false)}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeBtn}>
                      <Feather name={showConfirmPassword ? "eye" : "eye-off"} size={16} color={Colors.textMuted} />
                    </TouchableOpacity>
                  </View>

                  {errorMessage ? (
                    <View style={styles.errorContainer}>
                      <Feather name="alert-triangle" size={14} color={Colors.error} style={{ marginRight: 6 }} />
                      <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                  ) : null}

                  <TouchableOpacity
                    style={[styles.button, (password.length < 6 || password !== confirmPassword || isLoading) && styles.buttonDisabled]}
                    onPress={handleActivateAccount}
                    disabled={isLoading || password.length < 6 || password !== confirmPassword}
                  >
                    {isLoading ? (
                      <ActivityIndicator color={Colors.white} size="small" />
                    ) : (
                      <Text style={styles.buttonText}>Activate & Login</Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
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
    left: -width * 0.2,
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
    paddingVertical: 30,
  },
  content: {
    paddingHorizontal: 24,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    alignSelf: "flex-start",
  },
  backText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  formContainer: {
    backgroundColor: Colors.bgCard,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.textSecondary,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgInput,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    height: 52,
    marginBottom: 18,
  },
  inputFocused: {
    borderColor: Colors.primaryLight,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: "600",
  },
  eyeBtn: {
    padding: 6,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.errorBg,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  errorText: {
    flex: 1,
    fontSize: 12,
    color: Colors.error,
    fontWeight: "600",
    lineHeight: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: Colors.bgElevated,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.white,
  },
  welcomeBanner: {
    backgroundColor: Colors.bgInput,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.white,
    marginBottom: 6,
  },
  welcomeSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  shopHighlight: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.primary,
    marginBottom: 4,
  },
  phoneSub: {
    fontSize: 11,
    color: Colors.textMuted,
  },
});

export default StaffJoinScreen;
