// src/screens/customers/AddCustomerScreen.js
// Screen to add new customers or update existing profiles.
// Leverages custom Input and Button components with robust form validation and submission feedback.

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  StatusBar,
  TouchableOpacity,
  Alert,
  LayoutAnimation,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomerStore from "../../store/customerStore";
import useShopStore from "../../store/shopStore";
import useSubscriptionStore from "../../store/subscriptionStore";
import Colors from "../../constants/colors";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { Feather } from "@expo/vector-icons";

const AddCustomerScreen = ({ route, navigation }) => {
  const { customerId } = route.params || {};
  const isEditMode = !!customerId;

  const {
    customers,
    meta,
    createCustomer,
    updateCustomer,
    isActionLoading,
    error: storeError,
    clearError,
  } = useCustomerStore();

  const { shop } = useShopStore();

  // ── Form State ─────────────────────────────────────────
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [creditLimit, setCreditLimit] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [errors, storeError, isActionLoading]);

  // Populate data in edit mode
  useEffect(() => {
    if (isEditMode) {
      const customer = customers.find((c) => c.id === customerId);
      if (customer) {
        setName(customer.name);
        setPhone(customer.phone);
        setEmail(customer.email || "");
        setAddress(customer.address || "");
        setNotes(customer.notes || "");
        setCreditLimit(customer.creditLimit ? parseFloat(customer.creditLimit).toString() : "");
      }
    }
    return () => {
      clearError();
    };
  }, [customerId, isEditMode]);

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) {
      tempErrors.name = "Grahak name is required";
    } else if (name.trim().length < 2) {
      tempErrors.name = "Name must be at least 2 characters";
    }

    if (!phone.trim()) {
      tempErrors.phone = "Mobile number is required";
    } else {
      const cleanPhone = phone.replace(/\s/g, "");
      if (!/^\+?[0-9]{7,15}$/.test(cleanPhone)) {
        tempErrors.phone = "Phone must be 7-15 digits (e.g. +919876543210)";
      }
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      tempErrors.email = "Enter a valid email address";
    }

    if (creditLimit.trim()) {
      const parsedLimit = parseFloat(creditLimit);
      if (isNaN(parsedLimit) || parsedLimit < 0) {
        tempErrors.creditLimit = "Udhari limit must be a positive number";
      } else if (parsedLimit > 99999999) {
        tempErrors.creditLimit = "Limit cannot exceed ₹9,99,99,999";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = async () => {
    Keyboard.dismiss();
    if (!validate()) return;

    if (!isEditMode) {
      const { maxCustomers, plan } = useSubscriptionStore.getState();
      const currentCount = meta?.totalCount || customers.length;

      if (currentCount >= maxCustomers) {
        Alert.alert(
          "Customer Limit Reached",
          `Your current ${plan} Plan only supports up to ${maxCustomers} active customers. Please upgrade your plan to register more grahaks.`,
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Upgrade Plan",
              onPress: () => navigation.navigate("Settings", { screen: "Subscription" }),
            },
          ]
        );
        return;
      }
    }

    const customerData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || null,
      address: address.trim() || null,
      notes: notes.trim() || null,
      creditLimit: creditLimit.trim() ? parseFloat(creditLimit) : 0,
    };

    let result;
    if (isEditMode) {
      result = await updateCustomer(customerId, customerData);
    } else {
      result = await createCustomer(customerData);
    }

    if (result) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgDark} />

      {/* Header bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="x" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditMode ? "Edit Grahak Profile" : "Naya Grahak (New Grahak)"}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {storeError && (
            <View style={styles.alertContainer}>
              <Text style={styles.alertText}>{storeError}</Text>
            </View>
          )}

          <View style={styles.card}>
            {/* Name */}
            <Input
              label="Grahak Name"
              placeholder="e.g. Rajesh Kumar"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
              }}
              error={errors.name}
              autoCorrect={false}
            />

            {/* Phone */}
            <Input
              label="Phone Number"
              placeholder="e.g. +919876543210"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
              }}
              error={errors.phone}
              keyboardType="phone-pad"
              autoComplete="tel"
            />

            {/* Credit Limit */}
            <Input
              label="Udhari Limit (Optional)"
              placeholder="e.g. 10000 (0 or blank = unlimited Udhari)"
              value={creditLimit}
              onChangeText={(text) => {
                setCreditLimit(text);
                if (errors.creditLimit) setErrors((prev) => ({ ...prev, creditLimit: null }));
              }}
              error={errors.creditLimit}
              keyboardType="numeric"
            />

            {/* Email */}
            <Input
              label="Email Address (Optional)"
              placeholder="e.g. rajesh@example.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
              }}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* Address */}
            <Input
              label="Address (Optional)"
              placeholder="Flat, building, area..."
              value={address}
              onChangeText={setAddress}
              multiline={true}
              numberOfLines={2}
              style={styles.textAreaContainer}
            />

            {/* Notes */}
            <Input
              label="General Notes (Optional)"
              placeholder="e.g. pays outstanding weekly"
              value={notes}
              onChangeText={setNotes}
              multiline={true}
              numberOfLines={2}
              style={styles.textAreaContainer}
            />

            {/* Save Button */}
            <Button
              title={isEditMode ? "Save Changes" : "Register Grahak (Add Customer)"}
              onPress={handleSave}
              isLoading={isActionLoading}
              style={styles.saveBtn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderColor: Colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.bgElevated,
    justifyContent: "center",
    alignItems: "center",
  },
  backText: {
    fontFamily: "Manrope_500Medium",
    color: Colors.textSecondary,
    fontSize: 16,
  },
  headerTitle: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 18,
    color: Colors.black,
  },
  placeholder: {
    width: 40,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    padding: 24,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  textAreaContainer: {
    marginBottom: 20,
  },
  alertContainer: {
    backgroundColor: Colors.errorBg,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  alertText: {
    fontFamily: "Manrope_400Regular",
    color: Colors.error,
    fontSize: 14,
    textAlign: "center",
  },
  saveBtn: {
    marginTop: 8,
  },
});

export default AddCustomerScreen;
