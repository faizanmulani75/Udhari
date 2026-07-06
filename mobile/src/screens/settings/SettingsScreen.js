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
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgDark} />

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

        {/* 1. Sleek Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>
              {user?.name?.substring(0, 2).toUpperCase() || "SH"}
            </Text>
          </View>
          <View style={styles.profileMeta}>
            <Text style={styles.profileName}>{user?.name || "Shop Owner"}</Text>
            <Text style={styles.profileRole}>
              {user?.role === "owner" ? "Shop Owner" : user?.role === "staff" ? "Shop Staff" : `Shop ${user?.role || "Owner"}`}
            </Text>
          </View>
        </View>

        {/* 2. Business Settings Section */}
        <View style={styles.sectionPanel}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderTitle}>Business Profile</Text>
            {user?.role === "owner" && (
              <TouchableOpacity onPress={handleOpenEdit} style={styles.editBtn}>
                <Feather name="edit-3" size={16} color={Colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.panelRows}>
            <View style={styles.panelRow}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(16, 185, 129, 0.08)" }]}>
                  <Feather name="home" size={16} color={Colors.primary} />
                </View>
                <Text style={styles.rowLabel}>Shop Name</Text>
              </View>
              <Text style={styles.rowValue} numberOfLines={1}>{shop?.name || "Kirana Store"}</Text>
            </View>

            <View style={styles.panelRow}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(16, 185, 129, 0.08)" }]}>
                  <Feather name="phone" size={16} color={Colors.primary} />
                </View>
                <Text style={styles.rowLabel}>Phone</Text>
              </View>
              <Text style={styles.rowValue}>{shop?.phone || user?.phone}</Text>
            </View>

            <View style={styles.panelRow}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(16, 185, 129, 0.08)" }]}>
                  <Feather name="dollar-sign" size={16} color={Colors.primary} />
                </View>
                <Text style={styles.rowLabel}>Currency</Text>
              </View>
              <Text style={styles.rowValue}>{shop?.currency || "INR"}</Text>
            </View>

            <View style={styles.panelRow}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(16, 185, 129, 0.08)" }]}>
                  <Feather name="map-pin" size={16} color={Colors.primary} />
                </View>
                <Text style={styles.rowLabel}>Address</Text>
              </View>
              <Text style={styles.rowValue} numberOfLines={1}>
                {shop?.address || "Not specified"}
              </Text>
            </View>

            <View style={[styles.panelRow, { borderBottomWidth: 0 }]}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(16, 185, 129, 0.08)" }]}>
                  <Feather name="credit-card" size={16} color={Colors.primary} />
                </View>
                <Text style={styles.rowLabel}>Business UPI ID</Text>
              </View>
              <Text style={styles.rowValue} numberOfLines={1}>{shop?.upiId || "Not configured"}</Text>
            </View>
          </View>
        </View>

        {/* 3. Account Actions Section */}
        <View style={styles.sectionPanel}>
          <Text style={styles.sectionHeaderTitle}>Account & Staff</Text>
          <View style={styles.panelRows}>
            <TouchableOpacity style={styles.panelRowBtn} onPress={() => navigation.navigate("PendingClaims")}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(245, 158, 11, 0.08)" }]}>
                  <Feather name="shield" size={16} color={Colors.accent} />
                </View>
                <Text style={styles.rowLabel}>Pending Confirmations</Text>
              </View>
              <Feather name="chevron-right" size={16} color={Colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.panelRowBtn} onPress={() => navigation.navigate("ManageStaff")}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(245, 158, 11, 0.08)" }]}>
                  <Feather name="users" size={16} color={Colors.accent} />
                </View>
                <Text style={styles.rowLabel}>Manage Staff</Text>
              </View>
              <Feather name="chevron-right" size={16} color={Colors.textMuted} />
            </TouchableOpacity>

            {user?.role === "owner" && (
              <TouchableOpacity style={styles.panelRowBtn} onPress={() => navigation.navigate("AuditLog")}>
                <View style={styles.rowLeft}>
                  <View style={[styles.iconBox, { backgroundColor: "rgba(245, 158, 11, 0.08)" }]}>
                    <Feather name="activity" size={16} color={Colors.accent} />
                  </View>
                  <Text style={styles.rowLabel}>Audit Trails</Text>
                </View>
                <Feather name="chevron-right" size={16} color={Colors.textMuted} />
              </TouchableOpacity>
            )}

            {/* <TouchableOpacity style={[styles.panelRowBtn, { borderBottomWidth: 0 }]} onPress={() => navigation.navigate("ReminderHistory")}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(245, 158, 11, 0.08)" }]}>
                  <Feather name="bell" size={16} color={Colors.accent} />
                </View>
                <Text style={styles.rowLabel}>Reminder Logs</Text>
              </View>
              <Feather name="chevron-right" size={16} color={Colors.textMuted} />
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={[styles.panelRowBtn, { borderBottomWidth: 0 }]} onPress={() => navigation.navigate("AuditLog")}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(245, 158, 11, 0.08)" }]}>
                  <Feather name="bell" size={16} color={Colors.accent} />
                </View>
                <Text style={styles.rowLabel}>Audit Logs</Text>
              </View>
              <Feather name="chevron-right" size={16} color={Colors.textMuted} />
            </TouchableOpacity> */}
          </View>
        </View>

        {/* 4. Subscription Section */}
        <View style={styles.sectionPanel}>
          <Text style={styles.sectionHeaderTitle}>Plan & Billing</Text>
          <View style={styles.panelRows}>
            <TouchableOpacity style={[styles.panelRowBtn, { borderBottomWidth: 0 }]} onPress={() => navigation.navigate("Subscription")}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(16, 185, 129, 0.08)" }]}>
                  <Feather name="award" size={16} color={Colors.primary} />
                </View>
                <View style={styles.planTextMeta}>
                  <Text style={styles.rowLabel}>Subscription Plan</Text>
                  <Text style={styles.rowSubLabel}>
                    {(shop?.subscriptions?.[0]?.plan || "FREE") + " Plan"}
                  </Text>
                </View>
              </View>
              <View style={styles.planRightRow}>
                <View style={styles.planBadge}>
                  <Text style={styles.planBadgeText}>Active</Text>
                </View>
                <Feather name="chevron-right" size={16} color={Colors.textMuted} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Legal & Policies Section */}
        <View style={styles.sectionPanel}>
          <Text style={styles.sectionHeaderTitle}>Legal & Support</Text>
          <View style={styles.panelRows}>
            <TouchableOpacity style={styles.panelRowBtn} onPress={() => navigation.navigate("PolicyScreen", { type: "TERMS" })}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(16, 185, 129, 0.08)" }]}>
                  <Feather name="file-text" size={16} color={Colors.primary} />
                </View>
                <Text style={styles.rowLabel}>Terms & Conditions</Text>
              </View>
              <Feather name="chevron-right" size={16} color={Colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.panelRowBtn} onPress={() => navigation.navigate("PolicyScreen", { type: "PRIVACY" })}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(16, 185, 129, 0.08)" }]}>
                  <Feather name="shield" size={16} color={Colors.primary} />
                </View>
                <Text style={styles.rowLabel}>Privacy Policy</Text>
              </View>
              <Feather name="chevron-right" size={16} color={Colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.panelRowBtn} onPress={() => navigation.navigate("PolicyScreen", { type: "SHIPPING" })}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(16, 185, 129, 0.08)" }]}>
                  <Feather name="truck" size={16} color={Colors.primary} />
                </View>
                <Text style={styles.rowLabel}>Shipping Policy</Text>
              </View>
              <Feather name="chevron-right" size={16} color={Colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.panelRowBtn} onPress={() => navigation.navigate("PolicyScreen", { type: "REFUND" })}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(16, 185, 129, 0.08)" }]}>
                  <Feather name="rotate-ccw" size={16} color={Colors.primary} />
                </View>
                <Text style={styles.rowLabel}>Cancellation & Refunds</Text>
              </View>
              <Feather name="chevron-right" size={16} color={Colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.panelRowBtn, { borderBottomWidth: 0 }]} onPress={() => navigation.navigate("PolicyScreen", { type: "CONTACT" })}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(16, 185, 129, 0.08)" }]}>
                  <Feather name="mail" size={16} color={Colors.primary} />
                </View>
                <Text style={styles.rowLabel}>Contact Us</Text>
              </View>
              <Feather name="chevron-right" size={16} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. Security & Access Section */}
        <View style={styles.sectionPanel}>
          <Text style={styles.sectionHeaderTitle}>Security & Access</Text>
          <View style={styles.panelRows}>
            <TouchableOpacity style={styles.panelRowBtn} onPress={handleLogout}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(135, 134, 128, 0.08)" }]}>
                  <Feather name="log-out" size={16} color={Colors.textSecondary} />
                </View>
                <Text style={styles.rowLabel}>Sign Out</Text>
              </View>
              <Feather name="chevron-right" size={16} color={Colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.panelRowBtn, { borderBottomWidth: 0 }]} onPress={handleDeactivate}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: Colors.errorBg }]}>
                  <Feather name="trash-2" size={16} color={Colors.error} />
                </View>
                <Text style={[styles.rowLabel, { color: Colors.error }]}>Deactivate Shop Account</Text>
              </View>
              <Feather name="chevron-right" size={16} color={Colors.error} />
            </TouchableOpacity>
          </View>
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
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 18,
    color: Colors.textPrimary,
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
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  avatarLarge: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#F5C4B3", // Coral tint bg
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: Colors.border,
    marginRight: 16,
  },
  avatarLargeText: {
    color: "#712B13", // Coral-900 initials
    fontSize: 18,
    fontFamily: "PlusJakartaSans_500Medium",
  },
  userMeta: {
    flex: 1,
  },
  userName: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 16,
    color: Colors.white,
    marginBottom: 2,
  },
  userRole: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    padding: 16,
    borderWidth: 0.5,
    borderColor: Colors.border,
    marginBottom: 24,
  },
  profileMeta: {
    flex: 1,
  },
  profileName: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  profileRole: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionPanel: {
    marginBottom: 24,
  },
  sectionHeaderTitle: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12,
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  editBtn: {
    padding: 4,
  },
  panelRows: {
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  panelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: Colors.border,
  },
  panelRowBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: Colors.border,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rowLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    color: Colors.textPrimary,
  },
  rowValue: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    color: Colors.textSecondary,
    maxWidth: "50%",
  },
  planTextMeta: {
    flexDirection: "column",
  },
  rowSubLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: Colors.primary,
    marginTop: 2,
  },
  planRightRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  planBadge: {
    backgroundColor: "#FAC775", // Amber tint bg
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  planBadgeText: {
    color: "#7A4B05", // Amber-900 text
    fontSize: 11,
    fontFamily: "Manrope_500Medium",
  },
  upgradeBtn: {
    margin: 16,
    marginTop: 8,
  },
  versionWrapper: {
    alignItems: "center",
  },
  versionText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: Colors.textMuted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)", // Flat scrim (no harsh glow)
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: Colors.bgCard,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 0.5,
    borderColor: Colors.border,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 18,
    color: Colors.textPrimary,
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
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  textInput: {
    fontFamily: "Manrope_400Regular",
    backgroundColor: Colors.bgInput,
    borderRadius: 14,
    color: Colors.textPrimary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 0.5,
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
