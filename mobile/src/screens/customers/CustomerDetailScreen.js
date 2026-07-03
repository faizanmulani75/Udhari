// src/screens/customers/CustomerDetailScreen.js
// Customer detailed view displaying profile information, financial metrics, and transaction history.
// Features contact options, payment reminders, and QR Code generation for the customer portal.

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Linking,
  ActivityIndicator,
  Share,
  StatusBar,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import useCustomerStore from "../../store/customerStore";
import useAuthStore from "../../store/authStore";
import Colors from "../../constants/colors";
import { formatCurrency, formatDate, formatRelativeDate } from "../../utils/format";
import { Feather } from "@expo/vector-icons";
import Button from "../../components/common/Button";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../../constants/config";
import { getTags, assignTagsToCustomer, createTag } from "../../services/tagService";
import { LinearGradient } from "expo-linear-gradient";

const CustomerDetailScreen = ({ route, navigation }) => {
  const { customerId } = route.params;

  const {
    selectedCustomer,
    isLoading,
    fetchCustomerById,
    deleteCustomer,
    isActionLoading,
    error,
  } = useCustomerStore();

  const { shop, user } = useAuthStore();
  const currencyCode = shop?.currency || "INR";

  // ── UI States ──────────────────────────────────────────
  const [showQrModal, setShowQrModal] = useState(false);
  const [showPaymentQrModal, setShowPaymentQrModal] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [isTxnLoading, setIsTxnLoading] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  // Tags UI States
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [allShopTags, setAllShopTags] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [isSavingTags, setIsSavingTags] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#6366F1");

  const tagColorOptions = ["#6366F1", "#EF4444", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6", "#06B6D4"];

  const openTagsModal = async () => {
    try {
      const response = await getTags();
      setAllShopTags(response.data || []);
      
      // Pre-fill selected tag IDs from customer tags
      const currentIds = selectedCustomer.tags?.map((ct) => ct.tag.id) || [];
      setSelectedTagIds(currentIds);
      setShowTagsModal(true);
    } catch (err) {
      console.warn("Failed to fetch shop tags:", err);
      Alert.alert("Error", "Could not load tags.");
    }
  };

  const handleToggleTag = (tagId) => {
    if (selectedTagIds.includes(tagId)) {
      setSelectedTagIds(selectedTagIds.filter((id) => id !== tagId));
    } else {
      setSelectedTagIds([...selectedTagIds, tagId]);
    }
  };

  const handleSaveTags = async () => {
    setIsSavingTags(true);
    try {
      await assignTagsToCustomer(customerId, selectedTagIds);
      // Reload customer details to update tags list
      await fetchCustomerById(customerId);
      setShowTagsModal(false);
    } catch (err) {
      console.warn("Failed to assign tags:", err);
      Alert.alert("Error", "Failed to save tags.");
    } finally {
      setIsSavingTags(false);
    }
  };

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return;
    try {
      const response = await createTag({ name: newTagName.trim(), color: newTagColor });
      const createdTag = response.data;
      setAllShopTags([...allShopTags, createdTag]);
      setSelectedTagIds([...selectedTagIds, createdTag.id]);
      setNewTagName("");
    } catch (err) {
      console.warn("Failed to create tag:", err);
      Alert.alert("Error", err.response?.data?.message || err.message || "Failed to create tag.");
    }
  };

  // Load details and transaction logs when focused
  useFocusEffect(
    useCallback(() => {
      fetchCustomerById(customerId);
      fetchRecentTransactions();
    }, [customerId])
  );

  const fetchRecentTransactions = async () => {
    setIsTxnLoading(true);
    try {
      // Fetch transactions scoped to the customer (limit 5 for quick overview)
      const response = await api.get(`/customers/${customerId}/transactions`, {
        params: { limit: 5 },
      });
      setRecentTransactions(response.data.data?.transactions || []);
    } catch (err) {
      console.warn("Failed to fetch customer transactions:", err.message);
    } finally {
      setIsTxnLoading(false);
    }
  };

  const handleDelete = async () => {
    const success = await deleteCustomer(customerId);
    if (success) {
      navigation.goBack();
    }
  };

  const triggerCall = () => {
    if (selectedCustomer?.phone) {
      Linking.openURL(`tel:${selectedCustomer.phone}`);
    }
  };

  const triggerWhatsApp = () => {
    setLanguageModalVisible(true);
  };

  const handleExportPDF = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const url = `${Config.API_URL}/customers/${customerId}/transactions/export-pdf?token=${token}`;
      await Linking.openURL(url);
    } catch (err) {
      console.warn("Failed to export PDF:", err);
      Alert.alert("Error", "Could not open statement download link.");
    }
  };

  const handleExportCSV = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const url = `${Config.API_URL}/customers/${customerId}/transactions/export-csv?token=${token}`;
      await Linking.openURL(url);
    } catch (err) {
      console.warn("Failed to export CSV:", err);
      Alert.alert("Error", "Could not open statement download link.");
    }
  };

  const sendWhatsAppReminder = (lang) => {
    setLanguageModalVisible(false);
    if (!selectedCustomer?.phone) return;

    const balanceVal = parseFloat(selectedCustomer.balance || 0);
    const formattedBal = formatCurrency(Math.abs(balanceVal), currencyCode);
    const shopName = shop?.name || "our shop";
    const name = selectedCustomer.name;
    const portalUrl = `${Config.PORTAL_URL}/customer/${selectedCustomer.qrToken || selectedCustomer.id}`;

    let message = "";
    if (balanceVal > 0) {
      if (lang === "ENGLISH") {
        message = `Hello ${name}, this is a friendly reminder that you have an outstanding balance of ${formattedBal} at ${shopName}. You can check your statement history here: ${portalUrl}. Please settle it at your earliest convenience. Thank you!`;
      } else if (lang === "HINGLISH") {
        message = `Namaste ${name}, aapka ${shopName} par ${formattedBal} outstanding balance (Udhari) hai. Aap apna statement yahan dekh sakte hain: ${portalUrl}. Kripya isse jald hi settle karein. Dhanyawad!`;
      } else if (lang === "HINDI") {
        message = `नमस्ते ${name}, ${shopName} पर आपका ${formattedBal} का भुगतान बकाया है। आप अपनी खाता विवरण (statement) यहाँ देख सकते हैं: ${portalUrl}। कृपया इसे जल्द ही जमा करें। धन्यवाद!`;
      }
    } else {
      if (lang === "ENGLISH") {
        message = `Hello ${name}, thank you for your business at ${shopName}! You can view your statement ledger here: ${portalUrl}`;
      } else if (lang === "HINGLISH") {
        message = `Namaste ${name}, ${shopName} par business karne ke liye dhanyawad! Aap apna khata ledger yahan dekh sakte hain: ${portalUrl}`;
      } else if (lang === "HINDI") {
        message = `नमस्ते ${name}, ${shopName} पर व्यापार करने के लिए धन्यवाद! आप अपना खाता बही यहाँ देख सकते हैं: ${portalUrl}`;
      }
    }

    Linking.openURL(`whatsapp://send?phone=${selectedCustomer.phone}&text=${encodeURIComponent(message)}`);
  };

  // Shares a link to the customer portal
  const handleSharePortalLink = async () => {
    const portalUrl = `${Config.PORTAL_URL}/customer/${selectedCustomer?.qrToken || selectedCustomer?.id}`;
    try {
      await Share.share({
        message: `Hi ${selectedCustomer?.name}, you can view your real-time ledger balance and transaction history here: ${portalUrl}`,
      });
    } catch (err) {
      console.warn("Error sharing portal link:", err.message);
    }
  };

  if (isLoading || !selectedCustomer) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const balance = parseFloat(selectedCustomer.balance || 0);
  const creditLimit = parseFloat(selectedCustomer.creditLimit || 0);
  const isNegative = balance < 0;
  const balanceColor = isNegative ? Colors.success : Colors.error;
  const balanceLabel = isNegative ? "Advance (Jama)" : "Udhari (Due Balance)";

  // QR Code URL for the public customer portal
  const portalLink = `${Config.PORTAL_URL}/customer/${selectedCustomer.qrToken || selectedCustomer.id}`;
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(portalLink)}`;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgDark} />

      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Grahak Khata Profile</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddCustomerScreen", { customerId })}
          style={styles.editButton}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {error && (
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>{error}</Text>
          </View>
        )}

        {/* Profile Card */}
        <LinearGradient
          colors={
            isNegative
              ? ["rgba(5, 213, 154, 0.08)", "rgba(18, 18, 23, 0.5)"] // Emerald glow gradient
              : balance > 0
              ? ["rgba(255, 74, 90, 0.08)", "rgba(18, 18, 23, 0.5)"] // Coral glow gradient
              : ["#121217", "#121217"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.profileCard}
        >
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>
              {selectedCustomer.name.substring(0, 2).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.nameText}>{selectedCustomer.name}</Text>
          
          <View style={[styles.badge, isNegative ? styles.badgeSuccess : styles.badgeError]}>
            <Text style={[styles.badgeText, { color: balanceColor }]}>
              {isNegative ? "Advance (Jama)" : "Udhari (Due)"}
            </Text>
          </View>

          {/* Balance Block */}
          <View style={styles.balanceBlock}>
            <Text style={styles.balanceSub}>{balanceLabel}</Text>
            <Text style={[styles.balanceValue, { color: balanceColor }]}>
              {formatCurrency(Math.abs(balance), currencyCode)}
            </Text>
          </View>

          {/* Contact Row */}
          <View style={styles.contactRow}>
            <TouchableOpacity onPress={triggerCall} style={styles.contactBtn}>
              <Feather name="phone" size={16} color={Colors.primaryLight} style={styles.contactIcon} />
              <Text style={styles.contactBtnText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={triggerWhatsApp} style={styles.contactBtn}>
              <Feather name="message-circle" size={16} color={Colors.success} style={styles.contactIcon} />
              <Text style={styles.contactBtnText}>WhatsApp</Text>
            </TouchableOpacity>
            {shop?.upiId && balance > 0 ? (
              <TouchableOpacity onPress={() => setShowPaymentQrModal(true)} style={styles.contactBtn}>
                <Feather name="dollar-sign" size={16} color={Colors.accentLight} style={styles.contactIcon} />
                <Text style={styles.contactBtnText}>UPI Pay</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setShowQrModal(true)} style={styles.contactBtn}>
                <Feather name="maximize" size={16} color={Colors.accent} style={styles.contactIcon} />
                <Text style={styles.contactBtnText}>Show QR</Text>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>

        {/* Financial Actions */}
        <View style={styles.actionBlock}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.giveCreditBtn]}
            onPress={() => navigation.navigate("AddTransactionScreen", { customerId, type: "CREDIT" })}
          >
            <Feather name="plus-circle" size={18} color={Colors.white} />
            <Text style={styles.actionBtnText}>Diya (You Gave Udhari)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.recordPaymentBtn]}
            onPress={() => navigation.navigate("AddTransactionScreen", { customerId, type: "PAYMENT" })}
          >
            <Feather name="check-circle" size={18} color={Colors.white} />
            <Text style={styles.actionBtnText}>Mila (You Got Payment)</Text>
          </TouchableOpacity>
        </View>

        {/* Statement Export Block */}
        <View style={styles.exportBlock}>
          <TouchableOpacity style={[styles.exportBtn, styles.pdfBtn]} onPress={handleExportPDF}>
            <Feather name="file-text" size={16} color={Colors.white} style={styles.exportIcon} />
            <Text style={styles.exportBtnText}>Download PDF Statement</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.exportBtn, styles.csvBtn]} onPress={handleExportCSV}>
            <Feather name="grid" size={16} color={Colors.white} style={styles.exportIcon} />
            <Text style={styles.exportBtnText}>Download CSV Statement</Text>
          </TouchableOpacity>
        </View>

        {/* Info Fields */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Grahak Details</Text>
          
          {selectedCustomer.notes && (
            <View style={styles.notesHighlightCard}>
              <View style={styles.notesHeader}>
                <Feather name="bookmark" size={14} color={Colors.accentLight} style={{ marginRight: 6 }} />
                <Text style={styles.notesLabel}>Grahak Note</Text>
              </View>
              <Text style={styles.notesText}>{selectedCustomer.notes}</Text>
            </View>
          )}

          <View style={styles.infoField}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{selectedCustomer.phone}</Text>
          </View>

          <View style={styles.infoField}>
            <Text style={styles.infoLabel}>Tags</Text>
            <View style={styles.infoTagsRow}>
              <View style={styles.infoTagsList}>
                {selectedCustomer.tags && selectedCustomer.tags.length > 0 ? (
                  selectedCustomer.tags.map((ct) => (
                    <View
                      key={ct.tag.id}
                      style={[styles.tagBadge, { backgroundColor: ct.tag.color + "22", borderColor: ct.tag.color }]}
                    >
                      <Text style={[styles.tagBadgeText, { color: ct.tag.color }]}>
                        {ct.tag.name}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noTagsText}>No tags assigned</Text>
                )}
              </View>
              <TouchableOpacity
                onPress={openTagsModal}
                style={styles.manageTagsBtn}
              >
                <Feather name="edit-2" size={12} color={Colors.primaryLight} style={{ marginRight: 4 }} />
                <Text style={styles.manageTagsBtnText}>Manage</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoField}>
            <Text style={styles.infoLabel}>Registered On</Text>
            <Text style={styles.infoValue}>{formatDate(selectedCustomer.createdAt)}</Text>
          </View>
        </View>

        {/* Recent Transactions List */}
        <View style={styles.txnBlock}>
          <View style={styles.txnHeader}>
            <Text style={styles.sectionTitle}>Recent Udhari / Jama Entries</Text>
            {recentTransactions.length > 0 && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("TransactionHistoryScreen", { customerId })
                }
              >
                <Text style={styles.viewAllText}>View History →</Text>
              </TouchableOpacity>
            )}
          </View>

          {isTxnLoading ? (
            <ActivityIndicator color={Colors.primary} size="small" style={styles.txnLoader} />
          ) : recentTransactions.length === 0 ? (
            <Text style={styles.emptyTxnText}>No transactions recorded for this customer yet.</Text>
          ) : (
            recentTransactions.map((txn) => {
              const isCredit = txn.type === "CREDIT";
              const typeColor = isCredit ? Colors.error : Colors.success;
              const typeSymbol = isCredit ? "+" : "-";

              return (
                <View key={txn.id} style={styles.txnRow}>
                  <View style={styles.txnInfo}>
                    <Text style={styles.txnType}>
                      {txn.type} {txn.paymentMethod ? `(${txn.paymentMethod})` : ""}
                    </Text>
                    <Text style={styles.txnDate}>{formatRelativeDate(txn.transactionDate)}</Text>
                    {txn.description && (
                      <Text style={styles.txnDesc} numberOfLines={1}>
                        {txn.description}
                      </Text>
                    )}
                  </View>
                  <View style={styles.txnBalance}>
                    <Text style={[styles.txnAmountText, { color: typeColor }]}>
                      {typeSymbol} {formatCurrency(parseFloat(txn.amount), currencyCode)}
                    </Text>
                    <Text style={styles.txnBalanceAfter}>
                      Bal: {formatCurrency(parseFloat(txn.balanceAfter), currencyCode)}
                    </Text>
                  </View>
                </View>
              );
            })
          )}
        </View>

        {/* Delete Customer Option (only if balance is 0 and user is owner) */}
        {balance === 0 && user?.role === "owner" && (
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={handleDelete}
            disabled={isActionLoading}
          >
            {isActionLoading ? (
              <ActivityIndicator color={Colors.error} size="small" />
            ) : (
              <Text style={styles.deleteBtnText}>Delete Grahak Account</Text>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* QR Code Modal for Customer Portal Sharing */}
      <Modal visible={showQrModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Grahak Statement QR</Text>
              <TouchableOpacity onPress={() => setShowQrModal(false)} style={styles.closeModalBtn}>
                <Feather name="x" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Let the customer scan this QR to view their real-time statement & balance on their own phone.
            </Text>

            <View style={styles.qrContainer}>
              <Image source={{ uri: qrCodeImageUrl }} style={styles.qrImage} />
            </View>

            <Text style={styles.qrUrlText} numberOfLines={1}>
              {portalLink}
            </Text>

            <View style={styles.modalActions}>
              <Button
                title="Share Statement Link"
                onPress={handleSharePortalLink}
                style={styles.shareBtn}
              />
              <TouchableOpacity
                onPress={() => setShowQrModal(false)}
                style={styles.cancelModalBtn}
              >
                <Text style={styles.cancelModalText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* UPI Payment QR Code Modal */}
      <Modal visible={showPaymentQrModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>UPI Payment QR</Text>
              <TouchableOpacity onPress={() => setShowPaymentQrModal(false)} style={styles.closeModalBtn}>
                <Feather name="x" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Scan this QR with Google Pay, PhonePe, Paytm, BHIM, or any UPI app to collect {formatCurrency(Math.abs(balance), currencyCode)}.
            </Text>

            <View style={styles.qrContainer}>
              {shop?.upiId ? (
                <Image
                  source={{
                    uri: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                      `upi://pay?pa=${shop.upiId}&pn=${encodeURIComponent(
                        shop.name || "Udhari Merchant"
                      )}&am=${Math.abs(balance)}&cu=INR&tn=${encodeURIComponent(
                        `Udhari Payment to ${shop.name || "Merchant"}`
                      )}`
                    )}`,
                  }}
                  style={styles.qrImage}
                />
              ) : (
                <ActivityIndicator size="large" color={Colors.primary} />
              )}
            </View>

            <Text style={styles.qrUrlText} numberOfLines={1}>
              Merchant: {shop?.name} • UPI: {shop?.upiId}
            </Text>

            <View style={styles.modalActions}>
              <Button
                title="Close"
                onPress={() => setShowPaymentQrModal(false)}
                style={styles.shareBtn}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* WhatsApp Language Selection Modal */}
      <Modal visible={languageModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Bhasha Chuniye</Text>
              <TouchableOpacity onPress={() => setLanguageModalVisible(false)} style={styles.closeModalBtn}>
                <Feather name="x" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Select the language for the WhatsApp yaaddasht (reminder) message.
            </Text>

            <View style={styles.langOptions}>
              <TouchableOpacity
                style={styles.langOptionBtn}
                onPress={() => sendWhatsAppReminder("ENGLISH")}
                activeOpacity={0.7}
              >
                <View style={[styles.langIcon, { backgroundColor: "rgba(16, 185, 129, 0.12)" }]}>
                  <Text style={styles.langEmoji}>🇬🇧</Text>
                </View>
                <View style={styles.langTextContainer}>
                  <Text style={styles.langOptionTitle}>English</Text>
                  <Text style={styles.langOptionDesc}>Send reminder in English</Text>
                </View>
                <Feather name="chevron-right" size={18} color={Colors.textMuted} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.langOptionBtn}
                onPress={() => sendWhatsAppReminder("HINGLISH")}
                activeOpacity={0.7}
              >
                <View style={[styles.langIcon, { backgroundColor: "rgba(245, 158, 11, 0.12)" }]}>
                  <Text style={styles.langEmoji}>🗣️</Text>
                </View>
                <View style={styles.langTextContainer}>
                  <Text style={styles.langOptionTitle}>Hinglish</Text>
                  <Text style={styles.langOptionDesc}>Hindi + English mein bhejein</Text>
                </View>
                <Feather name="chevron-right" size={18} color={Colors.textMuted} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.langOptionBtn}
                onPress={() => sendWhatsAppReminder("HINDI")}
                activeOpacity={0.7}
              >
                <View style={[styles.langIcon, { backgroundColor: "rgba(239, 68, 68, 0.12)" }]}>
                  <Text style={styles.langEmoji}>🇮🇳</Text>
                </View>
                <View style={styles.langTextContainer}>
                  <Text style={styles.langOptionTitle}>हिन्दी</Text>
                  <Text style={styles.langOptionDesc}>शुद्ध हिन्दी में भेजें</Text>
                </View>
                <Feather name="chevron-right" size={18} color={Colors.textMuted} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setLanguageModalVisible(false)}
              style={styles.cancelModalBtn}
            >
              <Text style={styles.cancelModalText}>Radd Karein</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Manage Tags Modal */}
      <Modal visible={showTagsModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: "80%" }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Manage Grahak Tags</Text>
              <TouchableOpacity onPress={() => setShowTagsModal(false)} style={styles.closeModalBtn}>
                <Feather name="x" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Select tags to categorize this customer.
            </Text>

            {/* List of existing tags */}
            <ScrollView style={{ maxHeight: 180, marginBottom: 16 }} contentContainerStyle={{ paddingBottom: 10 }}>
              {allShopTags.length === 0 ? (
                <Text style={{ color: Colors.textMuted, fontSize: 13, textAlign: "center", fontStyle: "italic", marginVertical: 12 }}>
                  No tags created yet. Create one below!
                </Text>
              ) : (
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                  {allShopTags.map((tag) => {
                    const isSelected = selectedTagIds.includes(tag.id);
                    return (
                      <TouchableOpacity
                        key={tag.id}
                        onPress={() => handleToggleTag(tag.id)}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 12,
                          borderWidth: 1,
                          borderColor: tag.color,
                          backgroundColor: isSelected ? tag.color + "22" : "transparent",
                        }}
                      >
                        <View
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: tag.color,
                            marginRight: 6,
                          }}
                        />
                        <Text style={{ fontSize: 13, fontWeight: "600", color: isSelected ? tag.color : Colors.textPrimary }}>
                          {tag.name}
                        </Text>
                        {isSelected && (
                          <Feather name="check" size={12} color={tag.color} style={{ marginLeft: 6 }} />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </ScrollView>

            {/* Create new tag section */}
            <View style={{ borderTopWidth: 1, borderColor: Colors.borderLight, paddingTop: 16, marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: "700", color: Colors.white, marginBottom: 12 }}>
                Create New Tag
              </Text>
              <View style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}>
                <TextInput
                  style={{
                    flex: 1,
                    backgroundColor: Colors.bgInput,
                    borderRadius: 12,
                    color: Colors.white,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    fontSize: 14,
                    borderWidth: 1,
                    borderColor: Colors.border,
                  }}
                  placeholder="Tag name (e.g. Wholesaler)"
                  placeholderTextColor={Colors.textPlaceholder}
                  value={newTagName}
                  onChangeText={setNewTagName}
                />
                <TouchableOpacity
                  onPress={handleCreateTag}
                  disabled={!newTagName.trim()}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: Colors.primary,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: newTagName.trim() ? 1 : 0.5,
                  }}
                >
                  <Feather name="plus" size={18} color={Colors.white} />
                </TouchableOpacity>
              </View>

              {/* Color selection row */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 4 }}>
                {tagColorOptions.map((c) => (
                  <TouchableOpacity
                    key={c}
                    onPress={() => setNewTagColor(c)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: c,
                      borderWidth: newTagColor === c ? 2 : 0,
                      borderColor: Colors.white,
                    }}
                  />
                ))}
              </View>
            </View>

            <View style={styles.modalActions}>
              <Button
                title={isSavingTags ? "Saving..." : "Save Changes"}
                onPress={handleSaveTags}
                disabled={isSavingTags}
                style={styles.shareBtn}
              />
              <TouchableOpacity
                onPress={() => setShowTagsModal(false)}
                style={styles.cancelModalBtn}
                disabled={isSavingTags}
              >
                <Text style={styles.cancelModalText}>Cancel</Text>
              </TouchableOpacity>
            </View>
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
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.bgDark,
    justifyContent: "center",
    alignItems: "center",
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
  backText: {
    color: Colors.textSecondary,
    fontSize: 20,
    fontWeight: "700",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.white,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Colors.bgElevated,
  },
  editButtonText: {
    color: Colors.primaryLight,
    fontWeight: "700",
    fontSize: 14,
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
  profileCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 16,
  },
  avatarLarge: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.primaryGlow,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(108, 92, 231, 0.2)",
    marginBottom: 14,
  },
  avatarLargeText: {
    color: Colors.primaryLight,
    fontSize: 24,
    fontWeight: "800",
  },
  nameText: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.white,
    marginBottom: 8,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  badgeSuccess: {
    backgroundColor: Colors.successBg,
  },
  badgeError: {
    backgroundColor: Colors.errorBg,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  balanceBlock: {
    alignItems: "center",
    marginBottom: 24,
  },
  balanceSub: {
    color: Colors.textSecondary,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: "800",
  },
  contactRow: {
    flexDirection: "row",
    gap: 12,
    borderTopWidth: 1,
    borderColor: Colors.borderLight,
    paddingTop: 20,
    width: "100%",
  },
  contactBtn: {
    flex: 1,
    backgroundColor: Colors.bgInput,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  contactIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  contactBtnText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: "700",
  },
  actionBlock: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  giveCreditBtn: {
    backgroundColor: Colors.error,
    shadowColor: Colors.error,
  },
  recordPaymentBtn: {
    backgroundColor: Colors.success,
    shadowColor: Colors.success,
  },
  actionBtnIcon: {
    fontSize: 16,
  },
  actionBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
  infoCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.white,
    marginBottom: 16,
  },
  infoField: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: "600",
    maxWidth: "60%",
    textAlign: "right",
  },
  notesHighlightCard: {
    backgroundColor: "rgba(255, 142, 37, 0.07)",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 142, 37, 0.18)",
    marginBottom: 16,
  },
  notesHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  notesLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.accentLight,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  notesText: {
    fontSize: 13.5,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  txnBlock: {
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 24,
  },
  txnHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  viewAllText: {
    color: Colors.primaryLight,
    fontSize: 13,
    fontWeight: "700",
  },
  txnLoader: {
    paddingVertical: 16,
  },
  emptyTxnText: {
    color: Colors.textMuted,
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 16,
  },
  txnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
  },
  txnInfo: {
    flex: 1,
    paddingRight: 12,
  },
  txnType: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  txnDate: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  txnDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  txnBalance: {
    alignItems: "flex-end",
  },
  txnAmountText: {
    fontSize: 15,
    fontWeight: "800",
  },
  txnBalanceAfter: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  deleteBtn: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "rgba(255, 107, 107, 0.2)",
    backgroundColor: Colors.errorBg,
    marginTop: 8,
  },
  deleteBtnText: {
    color: Colors.error,
    fontSize: 14,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.bgCard,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 28,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.white,
  },
  closeModalBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.bgElevated,
    justifyContent: "center",
    alignItems: "center",
  },
  closeModalText: {
    color: Colors.textSecondary,
    fontWeight: "700",
  },
  modalSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 24,
  },
  qrContainer: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 24,
    alignSelf: "center",
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  qrUrlText: {
    color: Colors.textMuted,
    fontSize: 12,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  modalActions: {
    gap: 12,
  },
  shareBtn: {
    width: "100%",
  },
  cancelModalBtn: {
    paddingVertical: 14,
    alignItems: "center",
  },
  cancelModalText: {
    color: Colors.textSecondary,
    fontWeight: "700",
    fontSize: 15,
  },
  langOptions: {
    gap: 10,
    marginBottom: 20,
  },
  langOptionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: Colors.bgElevated,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  langIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  langEmoji: {
    fontSize: 22,
  },
  langTextContainer: {
    flex: 1,
  },
  langOptionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.white,
    marginBottom: 2,
  },
  langOptionDesc: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  exportBlock: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
    marginBottom: 8,
  },
  exportBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  pdfBtn: {
    backgroundColor: Colors.bgCard,
    borderColor: Colors.border,
  },
  csvBtn: {
    backgroundColor: Colors.bgCard,
    borderColor: Colors.border,
  },
  exportIcon: {
    marginRight: 8,
  },
  exportBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: "700",
  },
  infoTagsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    marginLeft: 16,
  },
  infoTagsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: 6,
    flex: 1,
    marginRight: 10,
  },
  manageTagsBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: Colors.bgInput,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  manageTagsBtnText: {
    color: Colors.primaryLight,
    fontSize: 12,
    fontWeight: "700",
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  tagBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  noTagsText: {
    color: Colors.textMuted,
    fontSize: 13,
    fontStyle: "italic",
    textAlign: "right",
  },
});

export default CustomerDetailScreen;
