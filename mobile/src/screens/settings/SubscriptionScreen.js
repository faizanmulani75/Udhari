// src/screens/settings/SubscriptionScreen.js
// Subscription management screen with plan cards, lists of features, and simulated upgrades.

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
  StatusBar,
  NativeModules,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import Button from "../../components/common/Button";
import { 
  getSubscription, 
  upgradeSubscription, 
  createSubscriptionOrder, 
  verifySubscriptionPayment 
} from "../../services/subscriptionService";
import useShopStore from "../../store/shopStore";
import useAuthStore from "../../store/authStore";
import RazorpayCheckout from "react-native-razorpay";

const SubscriptionScreen = ({ navigation }) => {
  const { fetchShop } = useShopStore();

  const [currentPlan, setCurrentPlan] = useState("FREE");
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("BASIC"); // default pre-selection
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [isProcessingUpgrade, setIsProcessingUpgrade] = useState(false);

  // Mock Payment Fields
  const [paymentMethod, setPaymentMethod] = useState("CARD"); // 'CARD' or 'UPI'
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  const fetchSubscriptionInfo = async () => {
    setIsLoading(true);
    try {
      const res = await getSubscription();
      if (res && res.success && res.data) {
        setCurrentPlan(res.data.plan || "FREE");
        setSubscriptionDetails(res.data);
      }
    } catch (err) {
      console.warn("Failed to load subscription info:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionInfo();
  }, []);

  const handleSelectPlan = async (plan) => {
    if (plan === currentPlan) {
      Alert.alert("Already Active Plan", `You are currently subscribed to the ${plan} Plan.`);
      return;
    }

    if (plan === "FREE") {
      Alert.alert(
        "Confirm Downgrade",
        "Are you sure you want to downgrade to the Free Plan? Your customer limit will be reduced to 10, and staff accounts to 1.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Downgrade",
            style: "destructive",
            onPress: async () => {
              setIsLoading(true);
              try {
                const res = await upgradeSubscription("FREE");
                if (res && res.success) {
                  Alert.alert(
                    "Downgraded Successfully",
                    "Your subscription has been changed to the Free Plan.",
                    [
                      {
                        text: "OK",
                        onPress: async () => {
                          await fetchShop();
                          await fetchSubscriptionInfo();
                        },
                      },
                    ]
                  );
                } else {
                  Alert.alert("Downgrade Failed", res.message || "Could not downgrade plan.");
                }
              } catch (err) {
                console.warn("Downgrade error:", err);
                Alert.alert("Error", "Failed to connect to billing server.");
              } finally {
                setIsLoading(false);
              }
            },
          },
        ]
      );
      return;
    }

    setIsLoading(true);
    try {
      // 1. Create order on backend
      const orderRes = await createSubscriptionOrder(plan);
      if (orderRes && orderRes.success) {
        if (orderRes.isMock) {
          // If in mock mode, open the local simulated checkout modal!
          setSelectedPlan(plan);
          setCheckoutVisible(true);
        } else {
          // If Razorpay is enabled, check if the native module is available
          const isRazorpaySupported = !!NativeModules.RNRazorpayCheckout;

          if (!isRazorpaySupported) {
            console.warn("Razorpay native module is not available. Falling back to mock checkout.");
            Alert.alert(
              "Development Environment",
              "Razorpay native module is not available in this build (e.g., running in Expo Go). Redirecting to simulated checkout.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    setSelectedPlan(plan);
                    setCheckoutVisible(true);
                  },
                },
              ]
            );
            setIsLoading(false);
            return;
          }

          // If Razorpay is enabled and native module is available, launch native Razorpay payment sheet!
          const { user } = useAuthStore.getState();

          const options = {
            description: `Upgrade to ${plan} Plan`,
            image: "https://udhari-tracking.vercel.app/logo.png",
            currency: "INR",
            key: orderRes.keyId,
            amount: orderRes.amount,
            name: "Udhari",
            order_id: orderRes.orderId,
            prefill: {
              email: user?.email || "",
              contact: user?.phone || "",
              name: user?.name || ""
            },
            theme: { color: Colors.primary }
          };

          RazorpayCheckout.open(options)
            .then(async (data) => {
              // 2. Verify payment on backend
              setIsLoading(true);
              try {
                const verifyRes = await verifySubscriptionPayment({
                  razorpay_order_id: data.razorpay_order_id || orderRes.orderId,
                  razorpay_payment_id: data.razorpay_payment_id,
                  razorpay_signature: data.razorpay_signature,
                  plan: plan
                });

                if (verifyRes && verifyRes.success) {
                  Alert.alert(
                    "Payment Successful! 🎉",
                    `Congratulations! Your shop has been upgraded to the ${plan} Plan.`,
                    [
                      {
                        text: "Done",
                        onPress: async () => {
                          await fetchShop();
                          await fetchSubscriptionInfo();
                        }
                      }
                    ]
                  );
                } else {
                  Alert.alert("Verification Failed", verifyRes.message || "Failed to verify payment signature.");
                }
              } catch (verifyErr) {
                console.warn("Payment verification error:", verifyErr);
                Alert.alert("Verification Error", "Could not verify payment signature on server.");
              } finally {
                setIsLoading(false);
              }
            })
            .catch((paymentErr) => {
              console.warn("Razorpay payment sheet dismissed/failed:", paymentErr);
              Alert.alert("Payment Cancelled", "The payment process was cancelled or failed.");
            });
        }
      } else {
        Alert.alert("Order Error", orderRes.message || "Could not initialize payment order.");
      }
    } catch (err) {
      console.warn("Error starting upgrade flow:", err);
      Alert.alert("Connection Error", "Failed to connect to billing server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const executeUpgrade = async () => {
    if (selectedPlan !== "FREE") {
      if (paymentMethod === "CARD" && (!cardNumber || !expiry || !cvv)) {
        Alert.alert("Payment Info Required", "Please enter card details to simulate checkout.");
        return;
      }
      if (paymentMethod === "UPI" && !upiId.trim()) {
        Alert.alert("Payment Info Required", "Please enter your UPI ID to simulate checkout.");
        return;
      }
    }

    setIsProcessingUpgrade(true);
    try {
      // 1. Create simulated order on backend
      const orderRes = await createSubscriptionOrder(selectedPlan);
      if (!orderRes || !orderRes.success) {
        throw new Error(orderRes?.message || "Failed to create mock order");
      }

      // 2. Call verify payment with mock signature
      const res = await verifySubscriptionPayment({
        razorpay_order_id: orderRes.orderId,
        razorpay_payment_id: `mock_pay_${Math.random().toString(36).substring(2, 10)}`,
        razorpay_signature: "mock_signature",
        plan: selectedPlan,
      });

      if (res && res.success) {
        Alert.alert(
          "Payment Successful! 🎉",
          `Congratulations! Your shop has been upgraded to the ${selectedPlan} Plan.`,
          [
            {
              text: "Done",
              onPress: async () => {
                setCheckoutVisible(false);
                setCardNumber("");
                setExpiry("");
                setCvv("");
                setUpiId("");
                // Refresh local store and refresh screen
                await fetchShop();
                await fetchSubscriptionInfo();
              },
            },
          ]
        );
      } else {
        Alert.alert("Upgrade Failed", res.message || "An error occurred during billing.");
      }
    } catch (err) {
      console.warn("Upgrade transaction failed:", err);
      Alert.alert("Billing Error", "Could not connect to payment gateway. Please try again.");
    } finally {
      setIsProcessingUpgrade(false);
    }
  };

  const handleExpiryChange = (text) => {
    // Automatically insert '/' after MM digits (max MM/YY format)
    const clean = text.replace(/[^0-9]/g, "");
    if (clean.length > 2) {
      setExpiry(`${clean.slice(0, 2)}/${clean.slice(2, 4)}`);
    } else {
      setExpiry(clean);
    }
  };

  const plansList = [
    {
      id: "FREE",
      name: "Free Plan",
      price: "₹0",
      cycle: "/mo",
      color: Colors.textSecondary,
      badgeColor: Colors.bgInput,
      features: [
        "Up to 10 customers limit",
        "Single shopkeeper owner account",
        "Inline math formula calculator",
        "SMS/WhatsApp payment notifications",
      ],
      limitText: "Max 10 customers",
    },
    {
      id: "BASIC",
      name: "Basic Plan",
      price: "₹299",
      cycle: "/mo",
      color: Colors.primary,
      badgeColor: "rgba(108, 92, 231, 0.15)",
      features: [
        "Up to 100 customers limit",
        "Up to 2 staff user accounts",
        "Continuous speech voice entries",
        "Multi-language reminder templates",
        "Prioritized customer statements download",
      ],
      limitText: "Max 100 customers",
    },
    {
      id: "PRO",
      name: "Pro Plan",
      price: "₹999",
      cycle: "/mo",
      color: Colors.success,
      badgeColor: "rgba(0, 184, 148, 0.15)",
      features: [
        "Unlimited customers entry",
        "Up to 5 staff user accounts",
        "Full AI Transaction parsing engine",
        "Automatic outstanding balance alerts",
        "Dedicated VIP customer support",
      ],
      limitText: "Unlimited customers",
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgDark} />

      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription & Billing</Text>
        <View style={styles.placeholder} />
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loaderText}>Loading billing status...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Active Subscription Summary */}
          <View style={styles.activePlanCard}>
            <View style={styles.activePlanHeader}>
              <View>
                <Text style={styles.subLabel}>Current Active Plan</Text>
                <Text style={[styles.activePlanName, { color: currentPlan === "PRO" ? Colors.success : currentPlan === "BASIC" ? Colors.primaryLight : Colors.textPrimary }]}>
                  {currentPlan} PLAN
                </Text>
              </View>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>ACTIVE</Text>
              </View>
            </View>

            <View style={styles.planStatsDivider} />

            <View style={styles.planStatsRow}>
              <View style={styles.statCol}>
                <Text style={styles.statLabel}>Customer limit</Text>
                <Text style={styles.statValue}>
                  {currentPlan === "PRO" ? "Unlimited" : currentPlan === "BASIC" ? "100" : "10"}
                </Text>
              </View>
              <View style={styles.statCol}>
                <Text style={styles.statLabel}>Staff accounts</Text>
                <Text style={styles.statValue}>
                  {currentPlan === "PRO" ? "5 Users" : currentPlan === "BASIC" ? "2 Users" : "1 User"}
                </Text>
              </View>
              {subscriptionDetails?.expiresAt && (
                <View style={styles.statCol}>
                  <Text style={styles.statLabel}>Renews On</Text>
                  <Text style={styles.statValue}>
                    {new Date(subscriptionDetails.expiresAt).toLocaleDateString()}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <Text style={styles.sectionHeading}>Choose Plan Tier</Text>

          {/* Plan Cards List */}
          {plansList.map((plan) => {
            const isActive = plan.id === currentPlan;
            return (
              <View key={plan.id} style={[styles.planCard, isActive && styles.planCardActive]}>
                <View style={styles.planCardHeader}>
                  <View>
                    <Text style={styles.planTitleName}>{plan.name}</Text>
                    <Text style={styles.planLimitSubtitle}>{plan.limitText}</Text>
                  </View>
                  <View style={styles.planPriceRow}>
                    <Text style={styles.planPriceText}>{plan.price}</Text>
                    <Text style={styles.planCycleText}>{plan.cycle}</Text>
                  </View>
                </View>

                {isActive && (
                  <View style={styles.currentIndicator}>
                    <Feather name="check-circle" size={12} color={Colors.white} />
                    <Text style={styles.currentIndicatorText}>Currently Active</Text>
                  </View>
                )}

                <View style={styles.featuresDivider} />

                {plan.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureItem}>
                    <Feather name="check" size={14} color={plan.color} style={styles.featureIcon} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}

                <Button
                  title={isActive ? "Current Plan" : "Choose " + plan.name}
                  onPress={() => handleSelectPlan(plan.id)}
                  disabled={isActive}
                  variant={plan.id === "PRO" ? "success" : plan.id === "BASIC" ? "primary" : "outline"}
                  style={styles.choosePlanBtn}
                />
              </View>
            );
          })}
        </ScrollView>
      )}

      {/* Mock Payment Checkout Modal */}
      <Modal visible={checkoutVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Mock Checkout</Text>
              <TouchableOpacity onPress={() => setCheckoutVisible(false)} style={styles.closeModalBtn}>
                <Feather name="x" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.checkoutSummary}>
              <Text style={styles.checkoutLabel}>Upgrading to:</Text>
              <Text style={styles.checkoutValue}>{selectedPlan} PLAN</Text>
              <Text style={styles.checkoutAmount}>
                Total Due: {selectedPlan === "PRO" ? "₹999.00" : "₹299.00"}/month
              </Text>
            </View>

            {/* Payment Method Tabs */}
            <View style={styles.methodSelector}>
              <TouchableOpacity
                style={[styles.methodTab, paymentMethod === "CARD" && styles.methodTabActive]}
                onPress={() => setPaymentMethod("CARD")}
              >
                <Feather name="credit-card" size={16} color={paymentMethod === "CARD" ? Colors.white : Colors.textSecondary} />
                <Text style={[styles.methodTabText, paymentMethod === "CARD" && styles.methodTabTextActive]}>Card</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.methodTab, paymentMethod === "UPI" && styles.methodTabActive]}
                onPress={() => setPaymentMethod("UPI")}
              >
                <Feather name="smartphone" size={16} color={paymentMethod === "UPI" ? Colors.white : Colors.textSecondary} />
                <Text style={[styles.methodTabText, paymentMethod === "UPI" && styles.methodTabTextActive]}>UPI</Text>
              </TouchableOpacity>
            </View>

            {paymentMethod === "CARD" ? (
              <View>
                <Text style={styles.inputLabel}>Card Number</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="4111 2222 3333 4444"
                  placeholderTextColor={Colors.textPlaceholder}
                  keyboardType="number-pad"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  maxLength={19}
                />

                <View style={styles.inputRow}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={styles.inputLabel}>Expiry</Text>
                     <TextInput
                      style={styles.textInput}
                      placeholder="MM/YY"
                      placeholderTextColor={Colors.textPlaceholder}
                      keyboardType="number-pad"
                      value={expiry}
                      onChangeText={handleExpiryChange}
                      maxLength={5}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.inputLabel}>CVV</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="123"
                      placeholderTextColor={Colors.textPlaceholder}
                      keyboardType="number-pad"
                      value={cvv}
                      onChangeText={setCvv}
                      maxLength={3}
                      secureTextEntry={true}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.inputLabel}>UPI ID</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="shopkeeper@upi"
                  placeholderTextColor={Colors.textPlaceholder}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={upiId}
                  onChangeText={setUpiId}
                />
              </View>
            )}

            <Button
              title="Pay"
              onPress={executeUpgrade}
              isLoading={isProcessingUpgrade}
              variant="success"
              style={styles.checkoutConfirmBtn}
            />
            {/* <Text style={styles.checkoutSafetyText}>
              🔒 Secure SSL sandboxed mockup environment. No real funds will be charged.
            </Text> */}
          </View>
        </View>
      </Modal>
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
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.bgElevated,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.white,
  },
  placeholder: {
    width: 40,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 12,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  activePlanCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    borderColor: Colors.borderFocus,
    marginBottom: 24,
  },
  activePlanHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textMuted,
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 0.8,
  },
  activePlanName: {
    fontSize: 20,
    fontWeight: "800",
  },
  activeBadge: {
    backgroundColor: Colors.successBg,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  activeBadgeText: {
    color: Colors.success,
    fontSize: 11,
    fontWeight: "800",
  },
  planStatsDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 16,
  },
  planStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCol: {
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: "600",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: "800",
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.white,
    marginBottom: 16,
  },
  planCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 16,
  },
  planCardActive: {
    borderColor: Colors.borderFocus,
  },
  planCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  planTitleName: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.white,
    marginBottom: 4,
  },
  planLimitSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  planPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  planPriceText: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.white,
  },
  planCycleText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  currentIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 12,
    gap: 4,
  },
  currentIndicatorText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "700",
  },
  featuresDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  featureIcon: {
    marginTop: 2,
    marginRight: 8,
  },
  featureText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    flex: 1,
  },
  choosePlanBtn: {
    marginTop: 14,
    paddingVertical: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: Colors.bgCard,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1.5,
    borderColor: Colors.borderLight,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.white,
  },
  closeModalBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.bgElevated,
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutSummary: {
    backgroundColor: Colors.bgInput,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  checkoutLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  checkoutValue: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.white,
    marginBottom: 8,
  },
  checkoutAmount: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primaryLight,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textSecondary,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  textInput: {
    backgroundColor: Colors.bgInput,
    borderRadius: 14,
    color: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  checkoutConfirmBtn: {
    marginTop: 10,
    paddingVertical: 14,
  },
  checkoutSafetyText: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: 12,
  },
  methodSelector: {
    flexDirection: "row",
    backgroundColor: Colors.bgInput,
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  methodTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  methodTabActive: {
    backgroundColor: Colors.primary,
  },
  methodTabText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textSecondary,
  },
  methodTabTextActive: {
    color: Colors.white,
  },
});

export default SubscriptionScreen;
