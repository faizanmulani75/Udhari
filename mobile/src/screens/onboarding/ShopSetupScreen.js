// src/screens/onboarding/ShopSetupScreen.js
// Shopkeeper profile and shop setup onboarding screen.
// Modern dark UI with input focus animations, form validation, and submit transitions.

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Animated,
  Keyboard,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import useShopStore from "../../store/shopStore";
import useAuthStore from "../../store/authStore";
import Colors from "../../constants/colors";

const ShopSetupScreen = () => {
  const { createShop, isLoading, error: shopError, clearError } = useShopStore();
  const { user, logout } = useAuthStore();

  // ── Form State ─────────────────────────────────────────
  const [ownerName, setOwnerName] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopPhone, setShopPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("INR");

  // ── Validation & UI State ──────────────────────────────
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  // ── Animations ──────────────────────────────────────────
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Pre-fill owner details if auth store has them (e.g. phone)
  useEffect(() => {
    // If the auth store has access to the user phone used in OTP, prefill
    // In our design, the JWT payload contains the phone number, which is hydrated.
    const getInitialPhone = async () => {
      const persistedAuth = useAuthStore.getState();
      if (persistedAuth?.user?.phone) {
        setShopPhone(persistedAuth.user.phone);
      }
    };
    getInitialPhone();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: (t) => t * (2 - t), // easeOutQuad
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      clearError();
    };
  }, []);

  const validate = () => {
    const tempErrors = {};
    if (!ownerName.trim()) {
      tempErrors.ownerName = "Owner name is required";
    } else if (ownerName.trim().length < 3) {
      tempErrors.ownerName = "Name must be at least 3 characters";
    }

    if (!shopName.trim()) {
      tempErrors.shopName = "Shop name is required";
    } else if (shopName.trim().length < 3) {
      tempErrors.shopName = "Shop name must be at least 3 characters";
    }

    if (!shopPhone.trim()) {
      tempErrors.shopPhone = "Shop contact number is required";
    } else {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(shopPhone.replace(/\s/g, ""))) {
        tempErrors.shopPhone = "Enter a valid phone number (e.g., +919876543210)";
      }
    }

    if (email.trim() && !/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Enter a valid email address";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (!validate()) return;

    const success = await createShop({
      shopName: shopName.trim(),
      shopPhone: shopPhone.trim(),
      ownerName: ownerName.trim(),
      email: email.trim() || undefined,
      address: address.trim() || undefined,
      currency,
    });

    if (success) {
      console.log("Shop setup onboarding completed!");
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgDark} />
      
      {/* Background radial-glow simulation */}
      <View style={styles.glowOrb} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            style={[
              styles.content,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Feather name="shopping-bag" size={28} color={Colors.primaryLight} />
              </View>
              <Text style={styles.title}>Setup Your Shop</Text>
              <Text style={styles.subtitle}>
                Complete your details to start digitizing ledger books & tracking balances.
              </Text>
            </View>

            {/* Error alerts */}
            {(shopError || Object.keys(errors).length > 0) && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  {shopError || "Please correct the highlighted fields."}
                </Text>
              </View>
            )}

            {/* Form Fields */}
            <View style={styles.form}>
              
              {/* Owner Name */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Your Name (Owner)</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === "ownerName" && styles.inputFocused,
                    errors.ownerName && styles.inputError,
                  ]}
                  placeholder="Enter your full name"
                  placeholderTextColor={Colors.textPlaceholder}
                  value={ownerName}
                  onChangeText={(text) => {
                    setOwnerName(text);
                    if (errors.ownerName) setErrors((prev) => ({ ...prev, ownerName: null }));
                  }}
                  onFocus={() => setFocusedField("ownerName")}
                  onBlur={() => setFocusedField(null)}
                  autoCorrect={false}
                />
                {errors.ownerName && (
                  <Text style={styles.fieldErrorText}>{errors.ownerName}</Text>
                )}
              </View>

              {/* Shop Name */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Shop Name</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === "shopName" && styles.inputFocused,
                    errors.shopName && styles.inputError,
                  ]}
                  placeholder="e.g. Sharma Kirana Store"
                  placeholderTextColor={Colors.textPlaceholder}
                  value={shopName}
                  onChangeText={(text) => {
                    setShopName(text);
                    if (errors.shopName) setErrors((prev) => ({ ...prev, shopName: null }));
                  }}
                  onFocus={() => setFocusedField("shopName")}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.shopName && (
                  <Text style={styles.fieldErrorText}>{errors.shopName}</Text>
                )}
              </View>

              {/* Shop Phone */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Shop Contact Phone</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === "shopPhone" && styles.inputFocused,
                    errors.shopPhone && styles.inputError,
                  ]}
                  placeholder="e.g. +91 98765 43210"
                  placeholderTextColor={Colors.textPlaceholder}
                  value={shopPhone}
                  onChangeText={(text) => {
                    setShopPhone(text);
                    if (errors.shopPhone) setErrors((prev) => ({ ...prev, shopPhone: null }));
                  }}
                  onFocus={() => setFocusedField("shopPhone")}
                  onBlur={() => setFocusedField(null)}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                />
                {errors.shopPhone && (
                  <Text style={styles.fieldErrorText}>{errors.shopPhone}</Text>
                )}
              </View>

              {/* Shop Email */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email Address (Optional)</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === "email" && styles.inputFocused,
                    errors.email && styles.inputError,
                  ]}
                  placeholder="e.g. shopowner@example.com"
                  placeholderTextColor={Colors.textPlaceholder}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                  }}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {errors.email && (
                  <Text style={styles.fieldErrorText}>{errors.email}</Text>
                )}
              </View>

              {/* Shop Address */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Shop Address (Optional)</Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.textArea,
                    focusedField === "address" && styles.inputFocused,
                  ]}
                  placeholder="Enter shop address"
                  placeholderTextColor={Colors.textPlaceholder}
                  value={address}
                  onChangeText={setAddress}
                  onFocus={() => setFocusedField("address")}
                  onBlur={() => setFocusedField(null)}
                  multiline={true}
                  numberOfLines={3}
                />
              </View>

              {/* Currency Selector */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Business Currency</Text>
                <View style={styles.currencyRow}>
                  <TouchableOpacity
                    style={[
                      styles.currencyBtn,
                      currency === "INR" && styles.currencyBtnActive,
                    ]}
                    onPress={() => setCurrency("INR")}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.currencyText,
                        currency === "INR" && styles.currencyTextActive,
                      ]}
                    >
                      INR (₹)
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.currencyBtn,
                      currency === "USD" && styles.currencyBtnActive,
                    ]}
                    onPress={() => setCurrency("USD")}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.currencyText,
                        currency === "USD" && styles.currencyTextActive,
                      ]}
                    >
                      USD ($)
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Action Buttons */}
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleSubmit}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color={Colors.white} size="small" />
                ) : (
                  <Text style={styles.submitBtnText}>Create Shop & Start</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={logout}
                disabled={isLoading}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelBtnText}>Use Different Account</Text>
              </TouchableOpacity>

            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  glowOrb: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: Colors.primaryGlow,
    top: 50,
    right: -50,
    opacity: 0.6,
    zIndex: -1,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: Colors.bgCard,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  iconText: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  errorContainer: {
    backgroundColor: Colors.errorBg,
    borderWidth: 1,
    borderColor: "rgba(255, 107, 107, 0.2)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.textSecondary,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: Colors.bgInput,
    borderRadius: 14,
    color: Colors.textPrimary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputFocused: {
    borderColor: Colors.borderFocus,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  inputError: {
    borderColor: Colors.error,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  fieldErrorText: {
    color: Colors.error,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
    marginLeft: 4,
  },
  currencyRow: {
    flexDirection: "row",
    gap: 12,
  },
  currencyBtn: {
    flex: 1,
    backgroundColor: Colors.bgInput,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  currencyBtnActive: {
    backgroundColor: Colors.primaryGlow,
    borderColor: Colors.primary,
  },
  currencyText: {
    color: Colors.textSecondary,
    fontSize: 15,
    fontWeight: "700",
  },
  currencyTextActive: {
    color: Colors.primaryLight,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  submitBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  cancelBtn: {
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 12,
  },
  cancelBtnText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ShopSetupScreen;
