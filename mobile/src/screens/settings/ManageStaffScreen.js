// src/screens/settings/ManageStaffScreen.js
// Screen to list and manage staff members with invite modal and limit verification.

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
  Clipboard,
  Linking,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import Button from "../../components/common/Button";
import { getStaff, inviteStaff, deleteStaff, updateStaff, regenerateInviteCode } from "../../services/staffService";
import useShopStore from "../../store/shopStore";
import useAuthStore from "../../store/authStore";

const ManageStaffScreen = ({ navigation }) => {
  const { shop } = useShopStore();
  const { user } = useAuthStore();

  const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newStaffDetails, setNewStaffDetails] = useState(null);

  // Invite Form Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+91");

  // Get active subscription user constraints
  const subscription = shop?.subscriptions?.[0];
  const maxUsers = subscription ? subscription.maxUsers : 1;
  const activePlanName = subscription ? subscription.plan : "FREE";

  const fetchStaffMembers = async () => {
    setIsLoading(true);
    try {
      const res = await getStaff();
      if (res && res.success && res.data) {
        setStaffList(res.data);
      }
    } catch (err) {
      console.warn("Failed to fetch staff members:", err);
      Alert.alert("Error", "Could not load staff list. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffMembers();
  }, []);

  const handleOpenInvite = () => {
    if (staffList.length >= maxUsers) {
      Alert.alert(
        "Staff Limit Reached",
        `Your current ${activePlanName} Plan only supports up to ${maxUsers} total users (including owner). Please upgrade your plan to invite more staff.`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Upgrade Plan",
            onPress: () => navigation.navigate("Subscription"),
          },
        ]
      );
      return;
    }
    setModalVisible(true);
  };

  const handleInviteSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert("Required Fields", "Please enter both name and phone number.");
      return;
    }

    const cleanPhone = phone.trim();
    if (!/^\+[1-9]\d{1,14}$/.test(cleanPhone)) {
      Alert.alert(
        "Invalid Phone",
        "Phone number must include country code (e.g. +919876543210)."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await inviteStaff({
        name: name.trim(),
        phone: cleanPhone,
        role: "staff",
      });

      if (res && res.success && res.data) {
        setModalVisible(false);
        setName("");
        setPhone("+91");
        setNewStaffDetails(res.data);
        fetchStaffMembers();
      } else {
        Alert.alert("Invitation Failed", res.message || "Failed to add staff.");
      }
    } catch (err) {
      console.warn("Invite staff failed:", err);
      Alert.alert(
        "Error",
        err.response?.data?.message || err.message || "Could not complete invitation. Please check inputs."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getExpirationText = (expiresAt) => {
    if (!expiresAt) return "";
    const expiry = new Date(expiresAt);
    const now = new Date();
    const diffMs = expiry - now;
    if (diffMs <= 0) return "Expired";
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `Expires in ${diffHours}h ${diffMins}m`;
  };

  const handleShareWhatsApp = (member) => {
    if (!member) return;
    const msg = `Namaste! You have been invited to join ${shop?.name || "our shop"} on Udhari. Please download the app, tap "Join a Shop" on the login screen, and enter this Invite Code:\n\n👉 *${member.inviteCode}*\n\nThis code is valid for 48 hours. Please set your password to log in.`;
    const url = `whatsapp://send?text=${encodeURIComponent(msg)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("WhatsApp Not Installed", "Could not open WhatsApp. Copied code to clipboard instead.");
      Clipboard.setString(member.inviteCode);
    });
  };

  const handleRegenerateInviteCode = async (memberId) => {
    try {
      const res = await regenerateInviteCode(memberId);
      if (res && res.success && res.data) {
        Alert.alert("Invite Code Regenerated 🎉", `New Code: ${res.data.inviteCode}`);
        fetchStaffMembers();
      }
    } catch (err) {
      console.warn("Regenerate code error:", err);
      Alert.alert("Error", err.response?.data?.message || "Failed to regenerate invite code.");
    }
  };

  const handleDeleteStaff = (member) => {
    if (member.role === "owner") return;

    Alert.alert(
      "Remove Staff",
      `Are you sure you want to remove ${member.name} from your shop? They will lose access to log in immediately.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await deleteStaff(member.id);
              if (res && res.success) {
                Alert.alert("Removed", `${member.name} has been removed.`);
                fetchStaffMembers();
              }
            } catch (err) {
              console.warn("Delete staff failed:", err);
              Alert.alert("Error", "Could not remove staff. Please try again.");
            }
          },
        },
      ]
    );
  };

  const handleToggleRestriction = async (member) => {
    if (member.role === "owner") return;

    const newRole = member.role === "restricted" ? "staff" : "restricted";
    const actionText = newRole === "restricted" ? "restrict" : "remove restrictions for";

    Alert.alert(
      "Confirm Restriction Change",
      `Are you sure you want to ${actionText} ${member.name}? Restricted staff members cannot reverse ledger entries or delete customers.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: async () => {
            try {
              const res = await updateStaff(member.id, { role: newRole });
              if (res && res.success) {
                Alert.alert("Success", `${member.name}'s role updated to ${newRole.toUpperCase()}.`);
                fetchStaffMembers();
              }
            } catch (err) {
              console.warn("Failed to update staff role:", err);
              Alert.alert("Error", "Could not update staff restrictions. Please try again.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgDark} />

      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Staff</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Subscription Limit Card */}
      <View style={styles.limitCard}>
        <View style={styles.limitHeader}>
          <Text style={styles.limitLabel}>Active Staff Users</Text>
          <Text style={styles.limitValue}>
            {staffList.length} / {maxUsers}
          </Text>
        </View>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${Math.min(100, (staffList.length / maxUsers) * 100)}%` },
            ]}
          />
        </View>
        <Text style={styles.limitFooterText}>
          Plan Tier: <Text style={{ color: Colors.primaryLight, fontWeight: "700" }}>{activePlanName}</Text>
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loaderText}>Loading staff accounts...</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {staffList.map((member) => (
              <View key={member.id} style={styles.staffCardWrapper}>
                <View style={styles.staffCard}>
                  <View style={styles.staffMeta}>
                    <View style={styles.avatarMini}>
                      <Text style={styles.avatarMiniText}>
                        {member.name.substring(0, 2).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.staffDetails}>
                      <View style={styles.nameRow}>
                        <Text style={styles.staffName}>{member.name}</Text>
                        <View
                          style={[
                            styles.roleBadge,
                            member.role === "owner"
                              ? styles.ownerBadge
                              : member.role !== "owner" && !member.inviteCodeUsed
                              ? styles.pendingBadge
                              : member.role === "restricted"
                              ? styles.restrictedBadge
                              : styles.staffBadge,
                          ]}
                        >
                          <Text style={[
                            styles.roleBadgeText,
                            member.role === "owner"
                              ? styles.ownerBadgeText
                              : member.role !== "owner" && !member.inviteCodeUsed
                              ? styles.pendingBadgeText
                              : member.role === "restricted"
                              ? styles.restrictedBadgeText
                              : styles.staffBadgeText
                          ]}>
                            {member.role === "owner" ? "OWNER" : !member.inviteCodeUsed ? "PENDING" : member.role.toUpperCase()}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.staffPhone}>{member.phone}</Text>
                    </View>
                  </View>

                  {user?.role === "owner" && member.role !== "owner" && (
                    <View style={styles.actionRow}>
                      {member.inviteCodeUsed && (
                        <TouchableOpacity
                          onPress={() => handleToggleRestriction(member)}
                          style={[
                            styles.restrictBtn,
                            member.role === "restricted" ? styles.restrictedActiveBtn : null,
                          ]}
                          activeOpacity={0.8}
                        >
                          <Feather
                            name={member.role === "restricted" ? "shield-off" : "shield"}
                            size={14}
                            color={member.role === "restricted" ? Colors.warning : Colors.textSecondary}
                          />
                          <Text style={[
                            styles.restrictBtnText,
                            { color: member.role === "restricted" ? Colors.warning : Colors.textSecondary }
                          ]}>
                            {member.role === "restricted" ? "Unrestrict" : "Restrict"}
                          </Text>
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity
                        onPress={() => handleDeleteStaff(member)}
                        style={styles.deleteBtn}
                        activeOpacity={0.8}
                      >
                        <Feather name="trash-2" size={18} color={Colors.error} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {member.role !== "owner" && !member.inviteCodeUsed && (
                  <View style={styles.inviteCodeContainer}>
                    <View style={styles.codeRow}>
                      <Text style={styles.inviteCodeLabel}>Invite Code: </Text>
                      <Text style={styles.inviteCodeVal}>{member.inviteCode || "N/A"}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          Clipboard.setString(member.inviteCode);
                          Alert.alert("Copied 📋", "Invite code copied to clipboard.");
                        }}
                        style={styles.copyBtnSmall}
                      >
                        <Feather name="copy" size={13} color={Colors.primaryLight} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleShareWhatsApp(member)}
                        style={styles.copyBtnSmall}
                      >
                        <Feather name="share-2" size={13} color={Colors.success} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.expiryRow}>
                      <Text style={[
                        styles.expiryText,
                        getExpirationText(member.inviteCodeExpiresAt) === "Expired" && { color: Colors.error }
                      ]}>
                        ⏳ {getExpirationText(member.inviteCodeExpiresAt)}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleRegenerateInviteCode(member.id)}
                        style={styles.regenerateBtn}
                      >
                        <Feather name="refresh-cw" size={12} color={Colors.primaryLight} />
                        <Text style={styles.regenerateBtnText}>Regenerate</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>

          {/* Add Staff Floating / Bottom Button */}
          {user?.role === "owner" && (
            <View style={styles.footerBtnWrapper}>
              <Button
                title="Add Staff Member"
                onPress={handleOpenInvite}
                variant="primary"
                style={styles.addStaffBtn}
              />
            </View>
          )}
        </View>
      )}

      {/* Invite Staff Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Staff Member</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalBtn}>
                <Feather name="x" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Staff Full Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="E.g., Ramesh Kumar"
              placeholderTextColor={Colors.textPlaceholder}
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.inputLabel}>Phone Number (with Country Code)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="+919876543210"
              placeholderTextColor={Colors.textPlaceholder}
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={phone}
              onChangeText={setPhone}
            />

            <Button
              title="Submit & Invite"
              onPress={handleInviteSubmit}
              isLoading={isSubmitting}
              variant="success"
              style={styles.modalConfirmBtn}
            />
          </View>
        </View>
      </Modal>

      {/* Invite Code Success Modal */}
      <Modal visible={!!newStaffDetails} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.successHeader}>
              <View style={styles.successIconCircle}>
                <Feather name="check" size={28} color={Colors.success} />
              </View>
              <Text style={styles.successTitle}>Staff Invited Successfully!</Text>
              <Text style={styles.successSub}>Share this invite code with {newStaffDetails?.name} to activate their account</Text>
            </View>

            <View style={styles.inviteCodeShowcase}>
              <Text style={styles.showcaseCode}>{newStaffDetails?.inviteCode}</Text>
              <Text style={styles.showcaseExpiry}>
                ⏳ Valid for 48 Hours ({newStaffDetails?.inviteCodeExpiresAt ? new Date(newStaffDetails.inviteCodeExpiresAt).toLocaleString() : ""})
              </Text>
            </View>

            <View style={styles.successActionWrapper}>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(newStaffDetails?.inviteCode);
                  Alert.alert("Copied 📋", "Invite code copied to clipboard.");
                }}
                style={[styles.actionBtn, styles.copyActionBtn]}
              >
                <Feather name="copy" size={16} color={Colors.white} style={{ marginRight: 6 }} />
                <Text style={styles.actionBtnText}>Copy Code</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleShareWhatsApp(newStaffDetails)}
                style={[styles.actionBtn, styles.shareActionBtn]}
              >
                <Feather name="share-2" size={16} color={Colors.white} style={{ marginRight: 6 }} />
                <Text style={styles.actionBtnText}>WhatsApp Share</Text>
              </TouchableOpacity>
            </View>

            <Button
              title="Done"
              onPress={() => setNewStaffDetails(null)}
              variant="primary"
              style={styles.doneBtn}
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
  limitCard: {
    backgroundColor: Colors.bgCard,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  limitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  limitLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: "700",
  },
  limitValue: {
    fontSize: 13,
    color: Colors.white,
    fontWeight: "800",
  },
  progressBarBg: {
    height: 6,
    backgroundColor: Colors.bgInput,
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  limitFooterText: {
    fontSize: 11,
    color: Colors.textMuted,
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
    paddingBottom: 100,
  },
  staffCardWrapper: {
    backgroundColor: Colors.bgCard,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 12,
    padding: 16,
  },
  staffCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  staffMeta: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarMini: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryGlow,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.15)",
    marginRight: 12,
  },
  avatarMiniText: {
    color: Colors.primaryLight,
    fontWeight: "800",
    fontSize: 14,
  },
  staffDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  staffName: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.white,
  },
  roleBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  ownerBadge: {
    backgroundColor: "rgba(217, 119, 6, 0.12)",
  },
  staffBadge: {
    backgroundColor: Colors.successBg,
  },
  pendingBadge: {
    backgroundColor: "rgba(255, 160, 0, 0.15)",
  },
  restrictedBadge: {
    backgroundColor: Colors.warningBg,
  },
  roleBadgeText: {
    fontSize: 9,
    fontWeight: "800",
  },
  ownerBadgeText: {
    color: Colors.accentLight,
  },
  staffBadgeText: {
    color: Colors.primaryLight,
  },
  pendingBadgeText: {
    color: Colors.warning,
  },
  restrictedBadgeText: {
    color: Colors.warning,
  },
  staffPhone: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  deleteBtn: {
    padding: 8,
    backgroundColor: "rgba(239, 68, 68, 0.08)",
    borderRadius: 10,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  restrictBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: Colors.bgElevated,
    borderRadius: 8,
    gap: 4,
  },
  restrictedActiveBtn: {
    backgroundColor: "rgba(245, 158, 11, 0.12)",
    borderColor: Colors.warning,
    borderWidth: 1,
  },
  restrictBtnText: {
    fontSize: 11,
    fontWeight: "700",
  },
  footerBtnWrapper: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  addStaffBtn: {
    paddingVertical: 14,
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
  inviteCodeContainer: {
    marginTop: 12,
    backgroundColor: Colors.bgInput,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  codeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  inviteCodeLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: "700",
  },
  inviteCodeVal: {
    fontSize: 14,
    color: Colors.primaryLight,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  copyBtnSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  expiryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
  },
  expiryText: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  regenerateBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgElevated,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  regenerateBtnText: {
    fontSize: 11,
    color: Colors.primaryLight,
    fontWeight: "700",
    marginLeft: 4,
  },
  successHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  successIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.successBg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.white,
    marginBottom: 4,
  },
  successSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: 10,
    lineHeight: 18,
  },
  inviteCodeShowcase: {
    backgroundColor: Colors.bgInput,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  showcaseCode: {
    fontSize: 24,
    color: Colors.primaryLight,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  showcaseExpiry: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  successActionWrapper: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  copyActionBtn: {
    backgroundColor: Colors.bgElevated,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  shareActionBtn: {
    backgroundColor: Colors.success,
  },
  actionBtnText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 14,
  },
  doneBtn: {
    marginTop: 10,
  },
});

export default ManageStaffScreen;
