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
  StatusBar,
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
      // Guard: ensure native Razorpay module is available
      if (!RazorpayCheckout || typeof RazorpayCheckout.open !== "function") {
        setIsLoading(false);
        Alert.alert(
          "Payment Unavailable",
          "Razorpay native module is not available. Please use a native (non-Expo Go) build of the app."
        );
        return;
      }

      // 1. Create order on backend
      const orderRes = await createSubscriptionOrder(plan);
      if (orderRes && orderRes.success) {
        // Launch native Razorpay payment sheet!
        const { user } = useAuthStore.getState();

        const cleanPhone = (user?.phone || "").replace(/[^\d+]/g, "");

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
            contact: cleanPhone,
            name: user?.name || ""
          },
          config: {
            display: {
              blocks: {
                upi: {
                  name: "UPI / Google Pay / PhonePe",
                  instruments: [
                    {
                      method: "upi"
                    }
                  ]
                }
              },
              sequence: ["block.upi", "block.other"],
              preferences: {
                show_default_blocks: true
              }
            }
          },
          theme: { color: Colors.primary }
        };

        // Keep spinner visible while Razorpay sheet is open;
        // reset loading only inside .then() and .catch()
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
            setIsLoading(false);
            Alert.alert("Payment Cancelled", "The payment process was cancelled or failed.");
          });
      } else {
        Alert.alert("Order Error", orderRes.message || "Could not initialize payment order.");
        setIsLoading(false);
      }
    } catch (err) {
      console.warn("Error starting upgrade flow:", err);
      Alert.alert("Connection Error", "Failed to connect to billing server. Please try again.");
      setIsLoading(false);
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
      id: "PRO",
      name: "Pro Plan",
      price: "₹299",
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
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgDark} />

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
                <Text style={[styles.activePlanName, { color: currentPlan === "PRO" ? Colors.success : Colors.textPrimary }]}>
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
                  {currentPlan === "PRO" ? "Unlimited" : "10"}
                </Text>
              </View>
              <View style={styles.statCol}>
                <Text style={styles.statLabel}>Staff accounts</Text>
                <Text style={styles.statValue}>
                  {currentPlan === "PRO" ? "5 Users" : "1 User"}
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

      {/* Checkout flows are handled natively via Razorpay payment sheets */}
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
  headerTitle: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 18,
    color: Colors.textPrimary,
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
    fontFamily: "Manrope_400Regular",
    color: Colors.textSecondary,
    fontSize: 14,
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
    borderWidth: 0.5,
    borderColor: Colors.border,
    marginBottom: 24,
  },
  activePlanHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: Colors.textMuted,
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 0.8,
  },
  activePlanName: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 20,
  },
  activeBadge: {
    backgroundColor: "#FAC775", // Amber tint
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  activeBadgeText: {
    color: "#7A4B05", // Amber 900
    fontSize: 11,
    fontFamily: "Manrope_500Medium",
  },
  planStatsDivider: {
    height: 0.5,
    backgroundColor: Colors.border,
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
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    color: Colors.textPrimary,
  },
  sectionHeading: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  planCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    padding: 20,
    borderWidth: 0.5,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  planCardActive: {
    borderColor: Colors.primary, // Teal border active
  },
  planCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  planTitleName: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  planLimitSubtitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
  },
  planPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  planPriceText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 24,
    color: Colors.textPrimary,
  },
  planCycleText: {
    fontFamily: "Manrope_400Regular",
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
    fontFamily: "Manrope_500Medium",
    color: Colors.white,
    fontSize: 10,
  },
  featuresDivider: {
    height: 0.5,
    backgroundColor: Colors.border,
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
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    flex: 1,
  },
  choosePlanBtn: {
    marginTop: 14,
    paddingVertical: 12,
  },
});

export default SubscriptionScreen;
