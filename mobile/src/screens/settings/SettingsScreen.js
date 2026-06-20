// src/screens/settings/SettingsScreen.js
// Shopkeeper profile settings, subscription, deactivation, and session de-auth.

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
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthStore from "../../store/authStore";
import useShopStore from "../../store/shopStore";
import Colors from "../../constants/colors";
import Button from "../../components/common/Button";
import { Feather } from "@expo/vector-icons";

const SettingsScreen = ({ navigation }) => {
  const { user, logout } = useAuthStore();
  const { shop, fetchShop, updateShop, deleteShop, isLoading, error, clearError } = useShopStore();

  const [activePlan, setActivePlan] = useState("FREE");
  
  // Edit Business Settings Modal State
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editUpiId, setEditUpiId] = useState("");
  
  const handleOpenEdit = () => {
    if (user?.role !== "owner") {
      Alert.alert("Access Denied", "Only the shop owner can edit business settings.");
      return;
    }
    setEditName(shop?.name || "");
    setEditAddress(shop?.address || "");
    setEditUpiId(shop?.upiId || "");
    setEditModalVisible(true);
  };

  const handleSaveSettings = async () => {
    if (!editName.trim()) {
      Alert.alert("Error", "Shop name cannot be empty.");
      return;
    }
    if (editUpiId.trim() && !/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z0-9.\-_]{2,256}$/.test(editUpiId.trim())) {
      Alert.alert("Invalid UPI ID", "Please enter a valid UPI ID / VPA (e.g., shopname@okhdfcbank).");
      return;
    }
    const success = await updateShop({
      name: editName.trim(),
      address: editAddress.trim() || null,
      upiId: editUpiId.trim() || null,
    });
    if (success) {
      Alert.alert("Success 🎉", "Business settings updated successfully.");
      setEditModalVisible(false);
      await fetchShop();
    } else {
      Alert.alert("Error", "Failed to update business settings.");
    }
  };

  useEffect(() => {
    fetchShop();
    return () => {
      clearError();
    };
  }, []);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out of Udhari?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  const handleDeactivate = () => {
    Alert.alert(
      "⚠ Deactivate Shop Account?",
      "WARNING: This will permanently lock access and soft-delete your shop profile and staff. All ledger balances must be settled first. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Deactivate",
          style: "destructive",
          onPress: async () => {
            // Delete shop
            const success = await deleteShop();
            if (success) {
              logout();
            } else {
              Alert.alert("Error", "Deactivation failed. Ensure all balances are settled first.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgDark} />

      {/* Header Bar */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {error && (
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>{error}</Text>
          </View>
        )}

        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>
              {user?.name?.substring(0, 2).toUpperCase() || "SH"}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name || "Shop Owner"}</Text>
          <Text style={styles.userRole}>System {user?.role || "owner"}</Text>
        </View>

        {/* Business Details Section */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🏪 Business Settings</Text>
            {user?.role === "owner" && (
              <TouchableOpacity onPress={handleOpenEdit} style={styles.editBtn}>
                <Feather name="edit-2" size={16} color={Colors.primaryLight} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Shop Name</Text>
            <Text style={styles.fieldValue}>{shop?.name || "kirana store"}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Business Phone</Text>
            <Text style={styles.fieldValue}>{shop?.phone || user?.phone}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Currency</Text>
            <Text style={styles.fieldValue}>{shop?.currency || "INR"}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Shop Address</Text>
            <Text style={styles.fieldValue} numberOfLines={2}>
              {shop?.address || "No address specified"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Business UPI ID</Text>
            <Text style={styles.fieldValue}>{shop?.upiId || "Not configured"}</Text>
          </View>
        </View>

        {/* Subscription Plan Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>💎 Subscription</Text>
          <View style={styles.planContainer}>
            <View style={styles.planMeta}>
              <Text style={styles.planName}>
                {(shop?.subscriptions?.[0]?.plan || "FREE") + " Plan"}
              </Text>
              <Text style={styles.planLimitText}>
                Limit: {shop?.subscriptions?.[0]?.plan === "PRO" ? "Unlimited" : `Up to ${shop?.subscriptions?.[0]?.maxCustomers || 10}`} active customers
              </Text>
            </View>
            <View style={styles.planBadge}>
              <Text style={styles.planBadgeText}>Active</Text>
            </View>
          </View>
          <Button
            title="Manage Subscription"
            onPress={() => navigation.navigate("Subscription")}
            variant="outline"
            style={styles.upgradeBtn}
          />
        </View>

        {/* General Actions */}
        <View style={styles.actionBlock}>
          <TouchableOpacity style={styles.actionRowBtn} onPress={() => navigation.navigate("ManageStaff")}>
            <View style={styles.actionBtnLeft}>
              <Text style={styles.actionBtnEmoji}>👥</Text>
              <Text style={styles.actionBtnLabel}>Manage Staff</Text>
            </View>
            <Text style={styles.actionBtnChevron}>→</Text>
          </TouchableOpacity>

          {user?.role === "owner" && (
            <TouchableOpacity style={styles.actionRowBtn} onPress={() => navigation.navigate("AuditLog")}>
              <View style={styles.actionBtnLeft}>
                <Text style={styles.actionBtnEmoji}>📋</Text>
                <Text style={styles.actionBtnLabel}>Audit Trails</Text>
              </View>
              <Text style={styles.actionBtnChevron}>→</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.actionRowBtn} onPress={() => navigation.navigate("ReminderHistory")}>
            <View style={styles.actionBtnLeft}>
              <Text style={styles.actionBtnEmoji}>📱</Text>
              <Text style={styles.actionBtnLabel}>Reminder Logs</Text>
            </View>
            <Text style={styles.actionBtnChevron}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionRowBtn} onPress={handleLogout}>
            <View style={styles.actionBtnLeft}>
              <Text style={styles.actionBtnEmoji}>🚪</Text>
              <Text style={styles.actionBtnLabel}>Sign Out</Text>
            </View>
            <Text style={styles.actionBtnChevron}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionRowBtn, styles.deactivateBtn]}
            onPress={handleDeactivate}
          >
            <View style={styles.actionBtnLeft}>
              <Text style={styles.actionBtnEmoji}>⚠</Text>
              <Text style={[styles.actionBtnLabel, { color: Colors.error }]}>
                Deactivate Shop Account
              </Text>
            </View>
            <Text style={[styles.actionBtnChevron, { color: Colors.error }]}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.versionWrapper}>
          <Text style={styles.versionText}>Udhari SaaS v1.0.0</Text>
        </View>
      </ScrollView>

      {/* Edit Business Settings Modal */}
      <Modal visible={editModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Business Settings</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.closeModalBtn}>
                <Feather name="x" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Shop Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Shop Name"
              placeholderTextColor={Colors.textPlaceholder}
              value={editName}
              onChangeText={setEditName}
            />

            <Text style={styles.inputLabel}>Shop Address</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Shop Address"
              placeholderTextColor={Colors.textPlaceholder}
              value={editAddress}
              onChangeText={setEditAddress}
              multiline={true}
              numberOfLines={2}
            />

            <Text style={styles.inputLabel}>Merchant UPI ID (for QR payments)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="E.g. shopkeeper@okaxis"
              placeholderTextColor={Colors.textPlaceholder}
              autoCapitalize="none"
              autoCorrect={false}
              value={editUpiId}
              onChangeText={setEditUpiId}
            />

            <Button
              title="Save Changes"
              onPress={handleSaveSettings}
              isLoading={isLoading}
              variant="success"
              style={styles.modalConfirmBtn}
            />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.bgCard,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.white,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  alertContainer: {
    backgroundColor: Colors.errorBg,
    borderWidth: 1,
    borderColor: "rgba(255, 107, 107, 0.2)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  alertText: {
    color: Colors.error,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  userCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 20,
  },
  avatarLarge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: Colors.primaryGlow,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(108, 92, 231, 0.2)",
    marginBottom: 12,
  },
  avatarLargeText: {
    color: Colors.primaryLight,
    fontSize: 20,
    fontWeight: "800",
  },
  userName: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.white,
    marginBottom: 4,
  },
  userRole: {
    fontSize: 12,
    color: Colors.textSecondary,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.white,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  editBtn: {
    padding: 4,
  },
  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
  },
  fieldLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  fieldValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: "600",
    maxWidth: "60%",
    textAlign: "right",
  },
  planContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  planMeta: {
    flex: 1,
  },
  planName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.white,
    marginBottom: 4,
  },
  planLimitText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  planBadge: {
    backgroundColor: Colors.successBg,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  planBadgeText: {
    color: Colors.success,
    fontSize: 12,
    fontWeight: "700",
  },
  upgradeBtn: {
    paddingVertical: 12,
  },
  actionBlock: {
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 24,
    overflow: "hidden",
  },
  actionRowBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
  },
  deactivateBtn: {
    borderBottomWidth: 0,
  },
  actionBtnLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionBtnEmoji: {
    fontSize: 18,
  },
  actionBtnLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  actionBtnChevron: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: "700",
  },
  versionWrapper: {
    alignItems: "center",
  },
  versionText: {
    fontSize: 12,
    color: Colors.textMuted,
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
  modalConfirmBtn: {
    marginTop: 10,
    paddingVertical: 14,
  },
});

export default SettingsScreen;
// 
