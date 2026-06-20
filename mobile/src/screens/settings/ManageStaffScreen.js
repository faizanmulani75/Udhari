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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import Button from "../../components/common/Button";
import { getStaff, inviteStaff, deleteStaff, updateStaff } from "../../services/staffService";
import useShopStore from "../../store/shopStore";
import useAuthStore from "../../store/authStore";

const ManageStaffScreen = ({ navigation }) => {
  const { shop } = useShopStore();
  const { user } = useAuthStore();

  const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

      if (res && res.success) {
        Alert.alert("Success 🎉", "Staff member successfully added.");
        setModalVisible(false);
        setName("");
        setPhone("+91");
        fetchStaffMembers();
      } else {
        Alert.alert("Invitation Failed", res.message || "Failed to add staff.");
      }
    } catch (err) {
      console.warn("Invite staff failed:", err);
      Alert.alert(
        "Error",
        err.message || "Could not complete invitation. Please check inputs."
      );
    } finally {
      setIsSubmitting(false);
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
              <View key={member.id} style={styles.staffCard}>
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
                            : member.role === "restricted"
                            ? styles.restrictedBadge
                            : styles.staffBadge,
                        ]}
                      >
                        <Text style={[
                          styles.roleBadgeText,
                          member.role === "owner"
                            ? styles.ownerBadgeText
                            : member.role === "restricted"
                            ? styles.restrictedBadgeText
                            : styles.staffBadgeText
                        ]}>
                          {member.role.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.staffPhone}>{member.phone}</Text>
                  </View>
                </View>

                {user?.role === "owner" && member.role !== "owner" && (
                  <View style={styles.actionRow}>
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
  staffCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 12,
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
});

export default ManageStaffScreen;
