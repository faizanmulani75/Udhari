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

  const handleOpenNoteThread = async (txn) => {
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
  };

  const handleAddNote = async () => {
    if (!newNoteContent.trim() || !activeTxn) return;
    setIsSavingNote(true);
    try {
      const response = await addTransactionNote(activeTxn.id, {
        content: newNoteContent.trim(),
        isDispute: false,
      });
      const newNote = response.data;
      setNotesList([...notesList, newNote]);
      setNewNoteContent("");
      // Update transaction list in local store or reload
      loadData(meta.page, false);
    } catch (err) {
      console.warn("Failed to add note:", err);
      Alert.alert("Error", "Failed to add note.");
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    Alert.alert("Delete Note?", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteNote(noteId);
            setNotesList(notesList.filter((n) => n.id !== noteId));
            loadData(meta.page, false);
          } catch (err) {
            console.warn("Failed to delete note:", err);
            Alert.alert("Error", "Failed to delete note.");
          }
        },
      },
    ]);
  };

  // Load transactions when component mounts or filter type changes
  useEffect(() => {
    loadData();
    return () => {
      clearTransactions();
    };
  }, [filterType]);

  const loadData = async (page = 1, append = false) => {
    const params = {
      page,
      limit: 15,
      ...(filterType !== "ALL" && { type: filterType }),
    };
    await fetchCustomerTransactions(customerId, params, append);
  };

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadData(1, false);
    setIsRefreshing(false);
  }, [filterType]);

  const handleLoadMore = () => {
    if (!isLoading && meta.page < meta.totalPages) {
      loadData(meta.page + 1, true);
    }
  };

  const handleReverseTxn = (txn) => {
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
              // Reload current list
              loadData(1, false);
            } else {
              Alert.alert("Error", "Failed to reverse transaction.");
            }
          },
        },
      ]
    );
  };

  const renderTransactionCard = ({ item }) => {
    const isCredit = item.type === "CREDIT";
    const typeColor = isCredit ? Colors.error : Colors.success;
    const typeSymbol = isCredit ? "+" : "-";

    return (
      <TouchableOpacity
        style={styles.txnCard}
        activeOpacity={0.95}
        onLongPress={() => handleOpenNoteThread(item)}
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
          onPress={() => handleReverseTxn(item)}
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
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Colors.primary} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgDark} />

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
  headerInfo: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.white,
  },
  headerSubtitle: {
    fontSize: 12,
    color: Colors.primaryLight,
    fontWeight: "600",
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
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  filterTabActive: {
    backgroundColor: Colors.primaryGlow,
    borderColor: Colors.primary,
  },
  filterTabText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: "700",
  },
  filterTabTextActive: {
    color: Colors.primaryLight,
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
    borderWidth: 1,
    borderColor: Colors.borderLight,
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
    fontSize: 14,
    fontWeight: "700",
    color: Colors.white,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  txnDate: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  txnDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 6,
  },
  txnRef: {
    fontSize: 11,
    color: Colors.textMuted,
    fontStyle: "italic",
  },
  txnRight: {
    alignItems: "flex-end",
  },
  txnAmount: {
    fontSize: 16,
    fontWeight: "800",
  },
  txnBalanceAfter: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
  },
  reverseBtn: {
    borderTopWidth: 1,
    borderColor: Colors.borderLight,
    paddingTop: 10,
    marginTop: 12,
    alignItems: "center",
  },
  reverseBtnText: {
    color: Colors.error,
    fontSize: 12,
    fontWeight: "700",
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
  modalSubtitle: {
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
    color: Colors.textSecondary,
    fontWeight: "700",
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
    borderWidth: 1,
  },
  noteIndicatorDispute: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  noteIndicatorInfo: {
    backgroundColor: Colors.primaryGlow,
    borderColor: "rgba(108, 92, 231, 0.3)",
  },
  noteIndicatorText: {
    fontSize: 10,
    fontWeight: "700",
  },
});

export default TransactionHistoryScreen;
