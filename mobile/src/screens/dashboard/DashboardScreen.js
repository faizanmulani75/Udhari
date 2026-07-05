// src/screens/dashboard/DashboardScreen.js
// Main shopkeeper dashboard showing business outstanding totals, top debtors, and recent activities.

import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
  Alert,
  Modal,
  TextInput,
  LayoutAnimation,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import useDashboardStore from "../../store/dashboardStore";
import useAuthStore from "../../store/authStore";
import useShopStore from "../../store/shopStore";
import Colors from "../../constants/colors";
import { formatCurrency, formatDate } from "../../utils/format";
import { getOfflineTransactions, syncQueuedTransactions } from "../../utils/syncManager";
import { sendBulkReminders } from "../../services/reminderService";
import { voiceEntry } from "../../services/transactionService";
import useTransactionStore from "../../store/transactionStore";
import useCustomerStore from "../../store/customerStore";
import useNotificationStore from "../../store/notificationStore";
import { LinearGradient } from "expo-linear-gradient";
import api from "../../services/api";

let ExpoSpeechRecognitionModule = null;
let useSpeechRecognitionEvent = () => {};

try {
  const speechModule = require("expo-speech-recognition");
  ExpoSpeechRecognitionModule = speechModule.ExpoSpeechRecognitionModule;
  useSpeechRecognitionEvent = speechModule.useSpeechRecognitionEvent;
} catch (e) {
  console.warn("expo-speech-recognition native module not available.");
}

const DashboardScreen = ({ navigation }) => {
  const { user } = useAuthStore();
  const { shop, fetchShop } = useShopStore();
  const currencyCode = shop?.currency || "INR";

  const {
    summary,
    topDebtors,
    recentActivity,
    isLoading,
    fetchDashboard,
    error,
  } = useDashboardStore();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  const [isVoiceModalVisible, setIsVoiceModalVisible] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isVoiceProcessing, setIsVoiceProcessing] = useState(false);
  const [voiceParsedData, setVoiceParsedData] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isCandidateModalVisible, setIsCandidateModalVisible] = useState(false);

  const { addCredit, addPayment } = useTransactionStore();
  const { createCustomer } = useCustomerStore();
  const { unreadCount, fetchUnreadCount } = useNotificationStore();
  const [pendingClaimsCount, setPendingClaimsCount] = useState(0);

  const fetchPendingClaimsCount = async () => {
    try {
      const response = await api.get("/payment-claims?status=PENDING_SHOP_CONFIRM");
      const claims = response.data.data || [];
      setPendingClaimsCount(claims.length);
    } catch (error) {
      console.warn("Failed to fetch pending claims count:", error);
    }
  };

  const [isNewCustomerModalVisible, setIsNewCustomerModalVisible] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState(null);
  const [newCustomerPhone, setNewCustomerPhone] = useState("");

  // Speech Recognition hook listeners
  useSpeechRecognitionEvent("start", () => setIsListening(true));
  useSpeechRecognitionEvent("end", () => setIsListening(false));
  useSpeechRecognitionEvent("result", (event) => {
    if (event.results && event.results[0]) {
      setVoiceTranscript(event.results[0].transcript);
    }
  });
  useSpeechRecognitionEvent("error", (event) => {
    if (event.error !== "no-speech") {
      console.log("Speech recognition error:", event.error);
    }
    setIsListening(false);
  });

  const startVoiceEntry = async () => {
    setVoiceTranscript("");
    setVoiceParsedData(null);
    setCandidates([]);
    setIsVoiceModalVisible(true);

    if (ExpoSpeechRecognitionModule) {
      try {
        const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        if (!result.granted) {
          Alert.alert("Permission Required", "Microphone and speech recognition permission is required for voice entry.");
          setIsVoiceModalVisible(false);
          return;
        }
        setIsListening(true);
        await ExpoSpeechRecognitionModule.start({
          lang: "en-IN",
          interimResults: true,
          maxAlternatives: 1,
          continuous: true,
        });
      } catch (err) {
        console.warn("Failed to start speech recognition:", err);
        setIsListening(false);
      }
    }
  };

  const toggleVoiceListening = async () => {
    if (!ExpoSpeechRecognitionModule) {
      Alert.alert("Simulator Mode", "Please type the text manually in the field below to test.");
      return;
    }

    if (isListening) {
      try {
        await ExpoSpeechRecognitionModule.stop();
      } catch (err) {
        console.warn(err);
        setIsListening(false);
      }
    } else {
      try {
        setIsListening(true);
        await ExpoSpeechRecognitionModule.start({
          lang: "en-IN",
          interimResults: true,
          maxAlternatives: 1,
          continuous: true,
        });
      } catch (err) {
        console.warn(err);
        setIsListening(false);
      }
    }
  };

  const cancelVoiceEntry = async () => {
    if (isListening && ExpoSpeechRecognitionModule) {
      try {
        await ExpoSpeechRecognitionModule.stop();
      } catch (err) {
        console.warn(err);
      }
    }
    setIsVoiceModalVisible(false);
  };

  const processVoiceEntry = async () => {
    if (isListening && ExpoSpeechRecognitionModule) {
      try {
        await ExpoSpeechRecognitionModule.stop();
      } catch (err) {
        console.warn(err);
      }
    }

    if (!voiceTranscript.trim()) {
      Alert.alert("Empty Input", "Please speak or type some text first.");
      return;
    }

    setIsVoiceProcessing(true);
    try {
      const res = await voiceEntry(voiceTranscript);

      if (res && res.success) {
        if (res.action === "SELECT_CUSTOMER") {
          setVoiceParsedData({
            amount: res.data.amount,
            description: res.data.description,
            type: res.data.type
          });
          setCandidates(res.data.candidates);
          setIsVoiceModalVisible(false);
          setIsCandidateModalVisible(true);
        } else if (res.action === "TRANSACTION_CREATED") {
          setIsVoiceModalVisible(false);
          Alert.alert(
            "Transaction Created 🎉",
            `Recorded ${res.data.transaction.type} entry of ${formatCurrency(parseFloat(res.data.transaction.amount), currencyCode)} for ${res.data.customer.name}.`
          );
          fetchDashboard();
        } else if (res.action === "CUSTOMER_NOT_FOUND") {
          setNewCustomerData({
            name: res.data.customerName,
            amount: res.data.amount,
            description: res.data.description,
            type: res.data.type
          });
          setNewCustomerPhone("");
          setIsVoiceModalVisible(false);
          setIsNewCustomerModalVisible(true);
        }
      }
    } catch (err) {
      console.warn("Voice entry parsing failed:", err);
      Alert.alert("Error", err.response?.data?.message || err.message || "Failed to process voice entry.");
    } finally {
      setIsVoiceProcessing(false);
    }
  };

  const selectCandidate = async (selectedCustomer) => {
    setIsCandidateModalVisible(false);
    setIsVoiceProcessing(true);
    try {
      const txnData = {
        amount: voiceParsedData.amount,
        description: voiceParsedData.description || undefined
      };

      let res;
      if (voiceParsedData.type === "PAYMENT") {
        res = await addPayment(selectedCustomer.id, txnData);
      } else {
        res = await addCredit(selectedCustomer.id, txnData);
      }

      if (!res) {
        Alert.alert("Error", useTransactionStore.getState().error || "Failed to save transaction.");
        return;
      }

      Alert.alert(
        "Transaction Created 🎉",
        `Successfully added ${voiceParsedData.type} entry of ₹${voiceParsedData.amount} for ${selectedCustomer.name}.`
      );
      fetchDashboard();
    } catch (err) {
      console.warn("Failed to create candidate transaction:", err);
      Alert.alert("Error", err.response?.data?.message || err.message || "Failed to save transaction.");
    } finally {
      setIsVoiceProcessing(false);
    }
  };

  const handleAddAndRecordNewCustomer = async () => {
    if (!newCustomerPhone.trim()) {
      Alert.alert("Phone Required", "Please enter the customer's phone number.");
      return;
    }
    const cleanPhone = newCustomerPhone.replace(/\s/g, "");
    if (!/^\+?[0-9]{7,15}$/.test(cleanPhone)) {
      Alert.alert("Invalid Phone", "Please enter a valid 7-15 digit mobile number.");
      return;
    }

    setIsNewCustomerModalVisible(false);
    setIsVoiceProcessing(true);
    try {
      // 1. Create the customer first
      const newCustomer = await createCustomer({
        name: newCustomerData.name,
        phone: cleanPhone
      });

      if (!newCustomer) {
        Alert.alert("Error", useCustomerStore.getState().error || "Failed to create customer.");
        return;
      }

      // 2. Add the transaction for the newly created customer
      const txnData = {
        amount: newCustomerData.amount,
        description: newCustomerData.description || undefined
      };

      let res;
      if (newCustomerData.type === "PAYMENT") {
        res = await addPayment(newCustomer.id, txnData);
      } else {
        res = await addCredit(newCustomer.id, txnData);
      }

      if (!res) {
        Alert.alert("Error", useTransactionStore.getState().error || "Failed to save transaction.");
        return;
      }

      Alert.alert(
        "Success 🎉",
        `Created customer "${newCustomer.name}" and recorded ${newCustomerData.type} entry of ₹${newCustomerData.amount}.`
      );
      fetchDashboard();
    } catch (err) {
      console.warn("Failed to add and record customer:", err);
      Alert.alert("Error", err.response?.data?.message || err.message || "Failed to complete operations.");
    } finally {
      setIsVoiceProcessing(false);
      setNewCustomerData(null);
      setNewCustomerPhone("");
    }
  };

  const checkPendingSync = async () => {
    const txs = await getOfflineTransactions();
    setPendingSyncCount(txs.length);

    if (txs.length > 0) {
      setIsSyncing(true);
      try {
        const res = await syncQueuedTransactions();
        if (res && res.success && res.synced > 0) {
          await fetchDashboard();
          const updated = await getOfflineTransactions();
          setPendingSyncCount(updated.length);
        }
      } catch (err) {
        console.warn("Auto sync failed:", err);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  // Smooth Layout Animations for loading, modal, and data sync changes
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [summary, topDebtors, recentActivity, isLoading, isVoiceModalVisible, isCandidateModalVisible, isNewCustomerModalVisible, pendingSyncCount]);

  // Fetch dashboard data on focus
  useFocusEffect(
    useCallback(() => {
      fetchDashboard();
      fetchShop();
      checkPendingSync();
      fetchUnreadCount();
      fetchPendingClaimsCount();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await checkPendingSync();
    await Promise.all([fetchDashboard(), fetchShop(), fetchPendingClaimsCount()]);
    setIsRefreshing(false);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 22) return "Good Evening";
    return "Good Night";
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgDark} />

      {/* Shop & Welcome Header */}
      <View style={styles.header}>
        <View style={{ flex: 1, marginRight: 12 }}>
          <Text style={styles.greetingText}>
            {getGreeting()}, {user?.name || "Shopkeeper"} 👋
          </Text>
          <Text style={styles.shopNameText} numberOfLines={1}>{shop?.name || "My Business"}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {pendingClaimsCount > 0 && (
            <TouchableOpacity 
              style={styles.notificationBtn}
              onPress={() => navigation.navigate("PendingClaims")}
            >
              <Feather name="shield" size={20} color={Colors.primary} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {pendingClaimsCount}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            style={styles.notificationBtn}
            onPress={() => navigation.navigate("NotificationScreen")}
          >
            <Feather name="bell" size={20} color={unreadCount > 0 ? Colors.primary : Colors.textPrimary} />
            {unreadCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {unreadCount > 99 ? "99+" : unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      >
        {error && (
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>{error}</Text>
          </View>
        )}

        {pendingSyncCount > 0 && (
          <TouchableOpacity
            style={styles.syncBanner}
            onPress={onRefresh}
            activeOpacity={0.8}
            disabled={isSyncing}
          >
            <View style={styles.syncBannerLeft}>
              {isSyncing ? (
                <ActivityIndicator size="small" color={Colors.white} style={{ marginRight: 8 }} />
              ) : (
                <Feather name="refresh-cw" size={14} color={Colors.white} style={styles.syncIcon} />
              )}
              <Text style={styles.syncBannerText}>
                {isSyncing
                  ? "Syncing transactions..."
                  : `${pendingSyncCount} transaction${pendingSyncCount > 1 ? "s" : ""} waiting to sync`}
              </Text>
            </View>
            {!isSyncing && (
              <View style={styles.syncBadge}>
                <Text style={styles.syncBadgeText}>Sync Now</Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        {isLoading && !summary ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          <>
            {/* 1. Net Khata Balance (Main Premium Card) */}
            <LinearGradient
              colors={
                (summary?.netReceivable || 0) > 0
                  ? ["#F59E0B", "#F43F5E"] // Amber Gold to Coral Rose
                  : (summary?.netReceivable || 0) < 0
                  ? ["#10B981", "#047857"] // Jade to Deep Emerald Green
                  : ["#2C2B27", "#1E1C1A"] // Warm Charcoal Carbon
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.netCard}
            >
              <Text style={styles.netLabel}>Net Khata Balance</Text>
              <Text style={styles.netValue}>
                {formatCurrency(Math.abs(summary?.netReceivable || 0), currencyCode)}
              </Text>
              <Text style={styles.netSubText}>
                {(summary?.netReceivable || 0) > 0
                  ? "Net Udhari you need to collect"
                  : (summary?.netReceivable || 0) < 0
                  ? "Net Advance money you need to adjust"
                  : "All accounts fully settled!"}
              </Text>
            </LinearGradient>

            {/* 2. Stats Summary Cards (Outstanding & Advances) */}
            <View style={styles.statsRow}>
              {/* Credit Outstanding */}
              <TouchableOpacity
                style={[styles.statCard, styles.creditCard]}
                onPress={() => navigation.navigate("GlobalTransactionsScreen", { type: "CREDIT" })}
                activeOpacity={0.8}
              >
                <View style={styles.statHeaderRow}>
                  <Text style={[styles.statLabel, { color: "#712B13" }]}>Diya (You'll Get)</Text>
                  <View style={[styles.miniBadge, { backgroundColor: "rgba(113, 43, 19, 0.1)" }]}>
                    <Feather name="arrow-up-right" size={10} color="#712B13" />
                  </View>
                </View>
                <Text style={[styles.statValue, { color: "#4A1B0C" }]}>
                  {formatCurrency(summary?.totalOutstanding || 0, currencyCode)}
                </Text>
                <Text style={[styles.statSubText, { color: "#712B13" }]}>Total Udhari</Text>
              </TouchableOpacity>

              {/* Advance Payments */}
              <TouchableOpacity
                style={[styles.statCard, styles.advanceCard]}
                onPress={() => navigation.navigate("GlobalTransactionsScreen", { type: "PAYMENT" })}
                activeOpacity={0.8}
              >
                <View style={styles.statHeaderRow}>
                  <Text style={[styles.statLabel, { color: "#085041" }]}>Mila (You'll Pay)</Text>
                  <View style={[styles.miniBadge, { backgroundColor: "rgba(8, 80, 65, 0.1)" }]}>
                    <Feather name="arrow-down-left" size={10} color="#085041" />
                  </View>
                </View>
                <Text style={[styles.statValue, { color: "#04342C" }]}>
                  {formatCurrency(summary?.totalAdvances || 0, currencyCode)}
                </Text>
                <Text style={[styles.statSubText, { color: "#085041" }]}>Total Advance (Jama)</Text>
              </TouchableOpacity>
            </View>

            {/* 3. Redesigned Horizontal Quick Actions Dock */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.quickActionsContainer}>
                {/* Voice Entry */}
                <TouchableOpacity
                  style={[styles.quickActionBtn, { backgroundColor: Colors.primary }]}
                  onPress={startVoiceEntry}
                  activeOpacity={0.8}
                >
                  <Feather name="mic" size={18} color={Colors.white} />
                  <Text style={styles.quickActionBtnText}>Voice Entry</Text>
                </TouchableOpacity>

                {/* Naya Grahak */}
                <TouchableOpacity
                  style={[styles.quickActionBtn, { backgroundColor: Colors.accent }]}
                  onPress={() => navigation.navigate("Customers", { screen: "AddCustomerScreen" })}
                  activeOpacity={0.8}
                >
                  <Feather name="user-plus" size={18} color="#7A4B05" />
                  <Text style={[styles.quickActionBtnText, { color: "#7A4B05" }]}>New Grahak</Text>
                </TouchableOpacity>

                {/* Analytics */}
                <TouchableOpacity
                  style={[styles.quickActionBtn, { backgroundColor: Colors.bgElevated }]}
                  onPress={() => navigation.navigate("Analytics")}
                  activeOpacity={0.8}
                >
                  <Feather name="pie-chart" size={18} color={Colors.textPrimary} />
                  <Text style={[styles.quickActionBtnText, { color: Colors.textPrimary }]}>Hisaab Graph</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 4. Top Debtors Section (Udhari Accounts) */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Udhari Accounts</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Customers")}>
                  <Text style={styles.sectionLink}>View All</Text>
                </TouchableOpacity>
              </View>

              {topDebtors.length === 0 ? (
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyText}>No customer currently owes money. 🎉</Text>
                </View>
              ) : (
                topDebtors.map((debtor) => (
                  <TouchableOpacity
                    key={debtor.id}
                    style={[styles.debtorRow, { borderLeftWidth: 4, borderLeftColor: Colors.error }]}
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate("Customers", {
                        screen: "CustomerDetailScreen",
                        params: { customerId: debtor.id },
                      })
                    }
                  >
                    <View style={styles.avatarMini}>
                      <Text style={styles.avatarMiniText}>
                        {debtor.name.substring(0, 2).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.debtorInfo}>
                      <Text style={styles.debtorName}>{debtor.name}</Text>
                      <Text style={styles.debtorPhone}>📱 {debtor.phone}</Text>
                    </View>
                    <Text style={[styles.debtorBalance, { color: Colors.error }]}>
                      {formatCurrency(parseFloat(debtor.balance), currencyCode)}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </View>

            {/* 5. Recent Shop-Wide Activity */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Khata Entries</Text>
              </View>

              {recentActivity.length === 0 ? (
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyText}>No transaction history logged yet.</Text>
                </View>
              ) : (
                recentActivity.map((txn) => {
                  const isCredit = txn.type === "CREDIT";
                  const txnColor = isCredit ? Colors.error : Colors.primary;
                  const txnSymbol = isCredit ? "+" : "-";
                  const activityIconName = isCredit ? "arrow-up-right" : "arrow-down-left";

                  return (
                    <View key={txn.id} style={[styles.activityRow, { borderLeftWidth: 4, borderLeftColor: isCredit ? Colors.error : Colors.primary }]}>
                      <View style={[styles.activityIconWrapper, { backgroundColor: isCredit ? Colors.errorBg : Colors.primaryGlow }]}>
                        <Feather name={activityIconName} size={15} color={txnColor} />
                      </View>
                      <View style={styles.activityLeft}>
                        <Text style={styles.activityCustomerName}>
                          {txn.customer.name}
                        </Text>
                        <Text style={styles.activityType}>
                          {txn.type === "CREDIT" ? "Diya (Udhari)" : txn.type === "PAYMENT" ? "Mila (Jama)" : txn.type} {txn.description ? `• ${txn.description}` : ""}
                        </Text>
                        <Text style={styles.activityDate}>
                          {formatDate(txn.transactionDate, true)}
                        </Text>
                      </View>
                      <Text style={[styles.activityAmount, { color: txnColor }]}>
                        {txnSymbol} {formatCurrency(parseFloat(txn.amount), currencyCode)}
                      </Text>
                    </View>
                  );
                })
              )}
            </View>
          </>
        )}
      </ScrollView>

      {/* Voice Entry Modal */}
      <Modal
        visible={isVoiceModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelVoiceEntry}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.voiceCard}>
            <Text style={styles.voiceTitle}>Speak your Entry</Text>
            <Text style={styles.voiceSubtitle}>
              E.g., "gave 500 rupees to Test customer for rice"
            </Text>
            
            <TouchableOpacity
              onPress={toggleVoiceListening}
              style={[
                styles.voiceMicBtn,
                isListening && styles.voiceMicBtnListening
              ]}
              activeOpacity={0.8}
            >
              <Feather name={isListening ? "mic" : "mic-off"} size={36} color={Colors.white} />
            </TouchableOpacity>

            <Text style={styles.voiceStatusText}>
              {isListening ? "Listening... Tap to Stop" : "Tap microphone to speak"}
            </Text>

            <ScrollView style={styles.transcriptScroll}>
              <Text style={styles.transcriptText}>
                {voiceTranscript || "Your spoken words will appear here..."}
              </Text>
            </ScrollView>

            {/* Test keyboard input if native module isn't active (Expo Go/Simulators) */}
            {!ExpoSpeechRecognitionModule && (
              <TextInput
                style={styles.simulatorInput}
                placeholder="Or type voice input simulation here..."
                placeholderTextColor={Colors.textPlaceholder}
                value={voiceTranscript}
                onChangeText={setVoiceTranscript}
              />
            )}

            <View style={styles.voiceModalActions}>
              <TouchableOpacity
                onPress={cancelVoiceEntry}
                style={[styles.voiceActionBtn, styles.voiceCancelBtn]}
              >
                <Text style={styles.voiceCancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={processVoiceEntry}
                disabled={!voiceTranscript || isVoiceProcessing}
                style={[
                  styles.voiceActionBtn,
                  styles.voiceSubmitBtn,
                  (!voiceTranscript || isVoiceProcessing) && { opacity: 0.5 }
                ]}
              >
                {isVoiceProcessing ? (
                  <ActivityIndicator size="small" color={Colors.white} />
                ) : (
                  <Text style={styles.voiceSubmitBtnText}>Process AI</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Candidates Selection Modal */}
      <Modal
        visible={isCandidateModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsCandidateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.candidatesCard}>
            <Text style={styles.candidatesTitle}>Multiple matches found</Text>
            <Text style={styles.candidatesSubtitle}>
              Select the correct customer for this transaction:
            </Text>

            <ScrollView style={styles.candidatesList} showsVerticalScrollIndicator={true}>
              {candidates.map((c) => (
                <TouchableOpacity
                  key={c.id}
                  onPress={() => selectCandidate(c)}
                  style={styles.candidateItem}
                  activeOpacity={0.7}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.candidateName}>{c.name}</Text>
                    <Text style={styles.candidatePhone}>{c.phone || "No phone"}</Text>
                  </View>
                  <Text style={styles.candidateBalance}>
                    Balance: {formatCurrency(Math.abs(parseFloat(c.balance || 0)), currencyCode)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setIsCandidateModalVisible(false)}
              style={styles.closeCandidatesBtn}
            >
              <Text style={styles.closeCandidatesBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add New Customer Modal */}
      <Modal
        visible={isNewCustomerModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsNewCustomerModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.candidatesCard}>
            <Text style={styles.candidatesTitle}>Grahak Not Found</Text>
            <Text style={styles.candidatesSubtitle}>
              Customer "{newCustomerData?.name}" was not found. Enter their mobile number to add them and record this transaction:
            </Text>

            <TextInput
              style={styles.simulatorInput}
              placeholder="Mobile Number (e.g. 9876543210)"
              placeholderTextColor={Colors.textPlaceholder}
              keyboardType="phone-pad"
              value={newCustomerPhone}
              onChangeText={setNewCustomerPhone}
            />

            <View style={styles.voiceModalActions}>
              <TouchableOpacity
                onPress={() => setIsNewCustomerModalVisible(false)}
                style={[styles.voiceActionBtn, styles.voiceCancelBtn]}
              >
                <Text style={styles.voiceCancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleAddAndRecordNewCustomer}
                style={[styles.voiceActionBtn, styles.voiceSubmitBtn]}
              >
                <Text style={styles.voiceSubmitBtnText}>Add & Record</Text>
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
  loaderContainer: {
    paddingVertical: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.bgCard,
  },
  greetingText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  shopNameText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 19,
    fontWeight: "500",
    color: Colors.textPrimary,
  },
  badgeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.bgElevated,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  badgeIcon: {
    fontSize: 20,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
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
    fontFamily: "Manrope_500Medium",
    color: Colors.error,
    fontSize: 14,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.bgCard,
    borderRadius: 18,
    padding: 16,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  creditCard: {
    backgroundColor: Colors.errorBg,
    borderColor: "transparent",
  },
  advanceCard: {
    backgroundColor: Colors.primaryLight,
    borderColor: "transparent",
  },
  statLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: Colors.textSecondary,
    textTransform: "uppercase",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  statValue: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 6,
  },
  statSubText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: Colors.textMuted,
  },
  netCard: {
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
    marginBottom: 24,
  },
  netLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.75)",
    textTransform: "uppercase",
    marginBottom: 6,
    letterSpacing: 0.8,
  },
  netValue: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 32,
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  netSubText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.85)",
    textAlign: "center",
  },
  statHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  miniBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 18,
    fontWeight: "500",
    color: Colors.textPrimary,
  },
  sectionLink: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: Colors.primary,
  },
  emptyCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    padding: 24,
    borderWidth: 0.5,
    borderColor: Colors.border,
    alignItems: "center",
  },
  emptyText: {
    fontFamily: "Manrope_400Regular",
    color: Colors.textMuted,
    fontSize: 14,
    textAlign: "center",
  },
  debtorRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    padding: 14,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  avatarMini: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.bgElevated,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  avatarMiniText: {
    fontFamily: "PlusJakartaSans_500Medium",
    color: Colors.textPrimary,
    fontSize: 13,
  },
  debtorInfo: {
    flex: 1,
  },
  debtorName: {
    fontFamily: "Manrope_500Medium",
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  debtorPhone: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: Colors.textMuted,
  },
  debtorBalance: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 15,
    fontWeight: "500",
  },
  activityIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    padding: 14,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  activityLeft: {
    flex: 1,
    paddingRight: 16,
  },
  activityCustomerName: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  activityType: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  activityDate: {
    fontFamily: "Manrope_400Regular",
    fontSize: 10,
    color: Colors.textMuted,
  },
  activityAmount: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 15,
    fontWeight: "500",
  },
  syncBanner: {
    backgroundColor: Colors.warning,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  syncBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  syncIcon: {
    marginRight: 8,
  },
  syncBannerText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: "700",
  },
  syncBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  syncBadgeText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: "800",
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 8,
  },
  quickActionBtn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 16,
    height: 72,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  quickActionBtnText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: "800",
    marginTop: 6,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(10, 10, 15, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  voiceCard: {
    backgroundColor: Colors.bgCard,
    width: "100%",
    maxWidth: 380,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    padding: 24,
    alignItems: "center",
  },
  voiceTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.white,
    marginBottom: 6,
  },
  voiceSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 24,
  },
  voiceMicBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  voiceMicBtnListening: {
    backgroundColor: Colors.error,
    shadowColor: Colors.error,
  },
  voiceStatusText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.textMuted,
    marginBottom: 20,
  },
  transcriptScroll: {
    width: "100%",
    maxHeight: 120,
    backgroundColor: Colors.bgElevated,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    padding: 12,
    marginBottom: 24,
  },
  transcriptText: {
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  voiceModalActions: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  voiceActionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  voiceCancelBtn: {
    backgroundColor: Colors.bgElevated,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  voiceCancelBtnText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: "700",
  },
  voiceSubmitBtn: {
    backgroundColor: Colors.success,
  },
  voiceSubmitBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
  candidatesCard: {
    backgroundColor: Colors.bgCard,
    width: "100%",
    maxWidth: 380,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    padding: 24,
  },
  candidatesTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.white,
    marginBottom: 6,
    textAlign: "center",
  },
  candidatesSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 20,
  },
  candidatesList: {
    maxHeight: 200,
    width: "100%",
    marginBottom: 20,
  },
  candidateItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.bgElevated,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    marginBottom: 8,
  },
  candidateName: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.white,
  },
  candidatePhone: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  candidateBalance: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.error,
  },
  closeCandidatesBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.bgElevated,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  closeCandidatesBtnText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: "700",
  },
  simulatorInput: {
    width: "100%",
    height: 44,
    backgroundColor: Colors.bgElevated,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    color: Colors.white,
    fontSize: 14,
    marginBottom: 16,
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.bgElevated,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: Colors.success,
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Colors.bgDark,
  },
  notificationBadgeText: {
    color: Colors.white,
    fontSize: 8,
    fontWeight: "900",
  },
});

export default DashboardScreen;
