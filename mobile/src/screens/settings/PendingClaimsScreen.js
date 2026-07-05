// src/screens/settings/PendingClaimsScreen.js
// Screen to list, review, and confirm/reject pending customer payment claims.

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import api from "../../services/api";
import { customAlert } from "../../components/common/CustomAlert";

export default function PendingClaimsScreen({ navigation }) {
  const [claims, setClaims] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchClaims = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/payment-claims?status=PENDING_SHOP_CONFIRM");
      setClaims(response.data.data || []);
    } catch (error) {
      console.warn("Failed to fetch claims:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const response = await api.get("/payment-claims?status=PENDING_SHOP_CONFIRM");
      setClaims(response.data.data || []);
    } catch (error) {
      console.warn("Failed to refresh claims:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleVerify = (claimId, confirmed, customerName, amount) => {
    const actionText = confirmed ? "Confirm" : "Reject";
    const msg = confirmed
      ? `Have you verified the receipt of INR ${amount.toFixed(2)} from ${customerName} in your bank/UPI app?`
      : `Are you sure you want to reject this payment claim of INR ${amount.toFixed(2)} from ${customerName}?`;

    customAlert(
      `${actionText} Payment Claim`,
      msg,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: actionText,
          style: confirmed ? "primary" : "destructive",
          onPress: async () => {
            try {
              await api.post(`/payment-claims/${claimId}/confirm`, { confirmed });
              // Remove verified claim from list
              setClaims((prev) => prev.filter((item) => item.id !== claimId));
              customAlert("Success", `Payment claim ${confirmed ? "confirmed" : "rejected"} successfully.`);
            } catch (error) {
              console.warn("Verification failed:", error);
              customAlert("Error", error.message || "Failed to update claim.");
            }
          },
        },
      ]
    );
  };

  const formatClaimTime = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.customerName}>{item.customer?.name || "Customer"}</Text>
          <Text style={styles.phoneText}>{item.customer?.phone || ""}</Text>
        </View>
        <Text style={styles.amountText}>₹{parseFloat(item.amount).toFixed(2)}</Text>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.timeWrap}>
          <Feather name="clock" size={12} color={Colors.textMuted} />
          <Text style={styles.timeText}>Claims paid {formatClaimTime(item.customerClaimedAt)}</Text>
        </View>
        <Text style={styles.refText}>Ref: {item.txnRef}</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.rejectBtn]}
          onPress={() => handleVerify(item.id, false, item.customer?.name, parseFloat(item.amount))}
        >
          <Feather name="x" size={14} color={Colors.error} style={styles.btnIcon} />
          <Text style={styles.rejectBtnText}>Nahi Mila</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.acceptBtn]}
          onPress={() => handleVerify(item.id, true, item.customer?.name, parseFloat(item.amount))}
        >
          <Feather name="check" size={14} color={Colors.white} style={styles.btnIcon} />
          <Text style={styles.acceptBtnText}>Haan Mila</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgDark} />

      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pending Confirmations</Text>
        <View style={styles.placeholder} />
      </View>

      {isLoading && claims.length === 0 ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Fetching claims...</Text>
        </View>
      ) : (
        <FlatList
          data={claims}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Feather name="shield" size={48} color={Colors.textMuted} />
              <Text style={styles.emptyText}>All payments caught up!</Text>
              <Text style={styles.emptySubText}>
                When customers claim they paid via UPI, verification claims will appear here.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

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
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  customerName: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 16,
    color: Colors.textPrimary,
  },
  phoneText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  amountText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 18,
    color: Colors.primary,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.border,
    marginBottom: 14,
  },
  timeWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  refText: {
    fontFamily: "Courier",
    fontSize: 11,
    color: Colors.textMuted,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  rejectBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.error,
  },
  rejectBtnText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    color: Colors.error,
  },
  acceptBtn: {
    backgroundColor: Colors.primary,
  },
  acceptBtnText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    color: Colors.white,
  },
  btnIcon: {
    marginRight: 6,
  },
  loadingBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 12,
  },
  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 16,
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 18,
  },
});
