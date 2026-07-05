// src/screens/transaction/TransactionHistoryScreen.js
// Scoped transaction history list for a single customer.
// Features: type filters, pull-to-refresh, infinite scroll, and transaction reversal actions.

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Alert,
  StatusBar,
  Modal,
  TextInput,
  ScrollView,
  LayoutAnimation,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTransactionStore from "../../store/transactionStore";
import useCustomerStore from "../../store/customerStore";
import useAuthStore from "../../store/authStore";
import Colors from "../../constants/colors";
import { formatCurrency, formatDate } from "../../utils/format";
import EmptyState from "../../components/common/EmptyState";
import { Feather } from "@expo/vector-icons";
import { getTransactionNotes, addTransactionNote, deleteNote } from "../../services/noteService";

// Memoized Transaction Card Component for list performance
const TransactionCard = React.memo(({ item, currencyCode, onLongPress, onReverse, isActionLoading }) => {
  const isCredit = item.type === "CREDIT";
  const typeColor = isCredit ? Colors.error : Colors.success;
  const typeSymbol = isCredit ? "+" : "-";

  return (
    <TouchableOpacity
      style={styles.txnCard}
      activeOpacity={0.95}
      onLongPress={onLongPress}
    >
      <View style={styles.txnMain}>
        <View style={styles.txnLeft}>
          <Text style={styles.txnType}>
            {item.type === "CREDIT" ? "Diya (Udhari)" : item.type === "PAYMENT" ? "Mila (Jama)" : item.type} {item.paymentMethod ? `(${item.paymentMethod})` : ""}
          </Text>
          <Text style={styles.txnDate}>{formatDate(item.transactionDate, true)}</Text>
          {item.description && <Text style={styles.txnDesc}>{item.description}</Text>}
          {item.referenceNumber && (
            <Text style={styles.txnRef}>Ref: {item.referenceNumber}</Text>
          )}

          {/* Note Indicators */}
          {item.notes && item.notes.length > 0 && (
            <View style={styles.notesRow}>
              {item.notes.some((n) => n.isDispute) ? (
                <View style={[styles.noteIndicator, styles.noteIndicatorDispute]}>
                  <Feather name="alert-triangle" size={10} color={Colors.error} style={{ marginRight: 4 }} />
                  <Text style={[styles.noteIndicatorText, { color: Colors.error }]}>Disputed</Text>
                </View>
              ) : (
                <View style={[styles.noteIndicator, styles.noteIndicatorInfo]}>
                  <Feather name="message-square" size={10} color={Colors.primaryLight} style={{ marginRight: 4 }} />
                  <Text style={[styles.noteIndicatorText, { color: Colors.primaryLight }]}>
                    {item.notes.length} {item.notes.length === 1 ? "Note" : "Notes"}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
        <View style={styles.txnRight}>
          <Text style={[styles.txnAmount, { color: typeColor }]}>
            {typeSymbol} {formatCurrency(parseFloat(item.amount), currencyCode)}
          </Text>
          <Text style={styles.txnBalanceAfter}>
            Bal: {formatCurrency(parseFloat(item.balanceAfter), currencyCode)}
          </Text>
        </View>
      </View>

      {/* Undo/Reverse Button */}
      <TouchableOpacity
        style={styles.reverseBtn}
        onPress={onReverse}
        disabled={isActionLoading}
        activeOpacity={0.7}
      >
        <View style={styles.reverseRow}>
          <Feather name="rotate-ccw" size={12} color={Colors.error} style={styles.reverseIcon} />
          <Text style={styles.reverseBtnText}>Reverse Entry (Bhool-Sudhaar)</Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
});

const TransactionHistoryScreen = ({ route, navigation }) => {
  const { customerId } = route.params;

  const {
    customers,
  } = useCustomerStore();

  const {
    transactions,
    meta,
    isLoading,
    isActionLoading,
    fetchCustomerTransactions,
    deleteTransaction,
    clearTransactions,
  } = useTransactionStore();

  const { shop, user } = useAuthStore();
  const currencyCode = shop?.currency || "INR";

  const customer = customers.find((c) => c.id === customerId);

  // ── Local States ──
  const [filterType, setFilterType] = useState("ALL"); // ALL, CREDIT, PAYMENT, DEBIT
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Notes UI states
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [activeTxn, setActiveTxn] = useState(null);
  const [notesList, setNotesList] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [isNotesLoading, setIsNotesLoading] = useState(false);

  const loadData = useCallback(async (page = 1, append = false) => {
    const params = {
      page,
      limit: 15,
      ...(filterType !== "ALL" && { type: filterType }),
    };
    await fetchCustomerTransactions(customerId, params, append);
  }, [customerId, filterType, fetchCustomerTransactions]);

  const handleOpenNoteThread = useCallback(async (txn) => {
    setActiveTxn(txn);
    setNotesList(txn.notes || []);
    setShowNotesModal(true);
    
    // Fetch fresh notes from API
    setIsNotesLoading(true);
    try {
      const response = await getTransactionNotes(txn.id);
      setNotesList(response.data || []);
    } catch (err) {
      console.warn("Failed to load transaction notes:", err);
    } finally {
      setIsNotesLoading(false);
    }
  }, []);

  const handleAddNote = useCallback(async () => {
    if (!newNoteContent.trim() || !activeTxn) return;
    setIsSavingNote(true);
    try {
      const response = await addTransactionNote(activeTxn.id, {
        content: newNoteContent.trim(),
        isDispute: false,
      });
      const newNote = response.data;
      setNotesList((prev) => [...prev, newNote]);
      setNewNoteContent("");
      loadData(meta.page, false);
    } catch (err) {
      console.warn("Failed to add note:", err);
      Alert.alert("Error", "Failed to add note.");
    } finally {
      setIsSavingNote(false);
    }
  }, [newNoteContent, activeTxn, meta.page, loadData]);

  const handleDeleteNote = useCallback((noteId) => {
    Alert.alert("Delete Note?", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteNote(noteId);
            setNotesList((prev) => prev.filter((n) => n.id !== noteId));
            loadData(meta.page, false);
          } catch (err) {
            console.warn("Failed to delete note:", err);
            Alert.alert("Error", "Failed to delete note.");
          }
        },
      },
    ]);
  }, [meta.page, loadData]);

  // Load transactions when component mounts or filter type changes
  useEffect(() => {
    loadData();
    return () => {
      clearTransactions();
    };
  }, [filterType, loadData, clearTransactions]);

  // Smooth layout animation on transaction changes/loading toggle
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [transactions, isLoading]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadData(1, false);
    setIsRefreshing(false);
  }, [loadData]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && meta.page < meta.totalPages) {
      loadData(meta.page + 1, true);
    }
  }, [isLoading, meta, loadData]);

  const handleReverseTxn = useCallback((txn) => {
    if (user?.role === "restricted") {
      Alert.alert("Access Denied", "Restricted staff accounts are not allowed to reverse/delete transactions.");
      return;
    }

    Alert.alert(
      "Reverse Entry (Bhool-Sudhaar)?",
      `Are you sure you want to reverse this ${txn.type === "CREDIT" ? "Udhari (Diya)" : "Payment (Mila)"} of ${formatCurrency(parseFloat(txn.amount), currencyCode)}? \n\nThis will adjust ${customer?.name}'s Khata balance and correct the ledger entry.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Reverse",
          style: "destructive",
          onPress: async () => {
            const success = await deleteTransaction(txn.id);
            if (success) {
              Alert.alert("Success", "Entry reversed successfully (Bhool-Sudhaar Done).");
              loadData(1, false);
            } else {
              Alert.alert("Error", "Failed to reverse transaction.");
            }
          },
        },
      ]
    );
  }, [user?.role, currencyCode, customer?.name, deleteTransaction, loadData]);

  const renderTransactionCard = useCallback(({ item }) => (
    <TransactionCard
      item={item}
      currencyCode={currencyCode}
      onLongPress={() => handleOpenNoteThread(item)}
      onReverse={() => handleReverseTxn(item)}
      isActionLoading={isActionLoading}
    />
  ), [currencyCode, handleOpenNoteThread, handleReverseTxn, isActionLoading]);

  const renderFooter = useCallback(() => {
    if (!isLoading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Colors.primary} />
      </View>
    );
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgDark} />

      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Grahak Khata Bahi</Text>
          <Text style={styles.headerSubtitle}>{customer?.name || "Customer"}</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        {["ALL", "CREDIT", "PAYMENT", "DEBIT"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterTab, filterType === tab && styles.filterTabActive]}
            onPress={() => setFilterType(tab)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterTabText,
                filterType === tab && styles.filterTabTextActive,
              ]}
            >
              {tab === "ALL" ? "Sab (All)" : tab === "CREDIT" ? "Diya" : tab === "PAYMENT" ? "Mila" : "Debit"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transactions List */}
      <FlatList
        data={transactions}
        renderItem={renderTransactionCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={Platform.OS === 'android'}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              emoji="📑"
              title="No Entries Found"
              subtitle="No transactions matching this filter have been recorded."
            />
          ) : null
        }
      />


      {/* Transaction Notes Modal */}
      <Modal visible={showNotesModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: "80%" }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Note Thread & Disputes</Text>
              <TouchableOpacity onPress={() => setShowNotesModal(false)} style={styles.closeModalBtn}>
                <Feather name="x" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Discussion thread for this ledger entry.
            </Text>

            {isNotesLoading ? (
              <ActivityIndicator color={Colors.primary} size="small" style={{ marginVertical: 20 }} />
            ) : (
              <ScrollView style={{ maxHeight: 220, marginBottom: 16 }} contentContainerStyle={{ paddingBottom: 10 }}>
                {notesList.length === 0 ? (
                  <Text style={{ color: Colors.textMuted, fontSize: 13, textAlign: "center", fontStyle: "italic", marginVertical: 12 }}>
                    No notes recorded yet. Add one below!
                  </Text>
                ) : (
                  notesList.map((note) => (
                    <View
                      key={note.id}
                      style={{
                        backgroundColor: Colors.bgInput,
                        borderRadius: 14,
                        padding: 12,
                        marginBottom: 10,
                        borderWidth: 1,
                        borderColor: note.isDispute ? "rgba(239, 68, 68, 0.2)" : Colors.borderLight,
                      }}
                    >
                      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                          <Text style={{ fontSize: 11, fontWeight: "700", color: note.isDispute ? Colors.error : Colors.primaryLight }}>
                            {note.isDispute ? "GRAHAK (Dispute)" : "SHOP OWNER / STAFF"}
                          </Text>
                          <Text style={{ fontSize: 10, color: Colors.textMuted }}>
                            {formatDate(note.createdAt, true)}
                          </Text>
                        </View>
                        {!note.isDispute && (
                          <TouchableOpacity onPress={() => handleDeleteNote(note.id)}>
                            <Feather name="trash-2" size={12} color={Colors.error} />
                          </TouchableOpacity>
                        )}
                      </View>
                      <Text style={{ fontSize: 13, color: Colors.white, lineHeight: 18 }}>
                        {note.content}
                      </Text>
                    </View>
                  ))
                )}
              </ScrollView>
            )}

            {/* Add note section */}
            <View style={{ borderTopWidth: 1, borderColor: Colors.borderLight, paddingTop: 16, marginBottom: 20 }}>
              <View style={{ flexDirection: "row", gap: 10 }}>
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
                  placeholder="Type note/clarification..."
                  placeholderTextColor={Colors.textPlaceholder}
                  value={newNoteContent}
                  onChangeText={setNewNoteContent}
                  multiline
                />
                <TouchableOpacity
                  onPress={handleAddNote}
                  disabled={isSavingNote || !newNoteContent.trim()}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: Colors.primary,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: newNoteContent.trim() ? 1 : 0.5,
                  }}
                >
                  <Feather name="send" size={16} color={Colors.white} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setShowNotesModal(false)}
                style={styles.cancelModalBtn}
              >
                <Text style={styles.cancelModalText}>Close</Text>
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
    fontSize: 20,
  },
  headerInfo: {
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 18,
    color: Colors.white,
  },
  headerSubtitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: Colors.primary,
    marginTop: 2,
  },
  placeholder: {
    width: 40,
  },
  filterTabs: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 8,
  },
  filterTab: {
    flex: 1,
    backgroundColor: Colors.bgCard,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  filterTabActive: {
    backgroundColor: "transparent",
    borderColor: Colors.primary, // Teal active border
  },
  filterTabText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: Colors.textSecondary,
  },
  filterTabTextActive: {
    color: Colors.primary, // Teal active text
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  txnCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  txnMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  txnLeft: {
    flex: 1,
    paddingRight: 16,
  },
  txnType: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    color: Colors.white,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  txnDate: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  txnDesc: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 6,
  },
  txnRef: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: Colors.textMuted,
    fontStyle: "italic",
  },
  txnRight: {
    alignItems: "flex-end",
  },
  txnAmount: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 16,
  },
  txnBalanceAfter: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
  },
  reverseBtn: {
    borderTopWidth: 0.5,
    borderColor: Colors.border,
    paddingTop: 10,
    marginTop: 12,
    alignItems: "center",
  },
  reverseBtnText: {
    fontFamily: "Manrope_500Medium",
    color: Colors.error,
    fontSize: 12,
  },
  reverseRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  reverseIcon: {
    marginRight: 6,
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: "center",
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
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 19,
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
  modalSubtitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 24,
  },
  modalActions: {
    gap: 12,
  },
  cancelModalBtn: {
    paddingVertical: 14,
    alignItems: "center",
  },
  cancelModalText: {
    fontFamily: "Manrope_500Medium",
    color: Colors.textSecondary,
    fontSize: 15,
  },
  notesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  noteIndicator: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  noteIndicatorDispute: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },
  noteIndicatorInfo: {
    backgroundColor: Colors.primaryGlow,
  },
  noteIndicatorText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
  },
});

export default TransactionHistoryScreen;
