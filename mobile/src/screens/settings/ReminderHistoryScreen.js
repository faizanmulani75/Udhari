// src/screens/settings/ReminderHistoryScreen.js
// Screen displaying history of sent/failed payment reminders.

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { getReminderHistory } from "../../services/reminderService";
import Colors from "../../constants/colors";
import { formatCurrency, formatDate } from "../../utils/format";
import useAuthStore from "../../store/authStore";
import EmptyState from "../../components/common/EmptyState";

const ReminderHistoryScreen = ({ navigation }) => {
  const { shop } = useAuthStore();
  const currencyCode = shop?.currency || "INR";

  const [reminders, setReminders] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 15, totalPages: 1, totalCount: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadData(1, false);
  }, []);

  const loadData = async (page = 1, append = false) => {
    if (page === 1) setIsLoading(true);
    try {
      const response = await getReminderHistory({ page, limit: 15 });
      const newReminders = response.data || [];
      const newMeta = response.meta || { page, limit: 15, totalPages: 1, totalCount: newReminders.length };

      setReminders((prev) => (append ? [...prev, ...newReminders] : newReminders));
      setMeta(newMeta);
    } catch (err) {
      console.warn("Failed to fetch reminder history:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadData(1, false);
    setIsRefreshing(false);
  }, []);

  const handleLoadMore = () => {
    if (!isLoading && meta.page < meta.totalPages) {
      loadData(meta.page + 1, true);
    }
  };

  const renderReminderCard = ({ item }) => {
    const isSent = item.status === "SENT";
    const statusColor = isSent ? Colors.success : Colors.error;
    const amount = parseFloat(item.amountDue || 0);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.leftInfo}>
            <Text style={styles.customerName}>{item.customer?.name || "Unknown Customer"}</Text>
            <Text style={styles.phoneText}>📱 {item.customer?.phone || "N/A"}</Text>
          </View>
          <View style={styles.rightInfo}>
            <Text style={styles.amountText}>{formatCurrency(amount, currencyCode)}</Text>
            <Text style={styles.amountLabel}>Outstanding Due</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.channelBadge}>
            <Feather name="mail" size={11} color={Colors.textSecondary} style={{ marginRight: 4 }} />
            <Text style={styles.channelText}>{item.channel}</Text>
          </View>

          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {item.status}
            </Text>
          </View>
        </View>

        <Text style={styles.dateText}>{formatDate(item.createdAt, true)}</Text>
      </View>
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
        <Text style={styles.headerTitle}>Reminder Logs</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Reminders List */}
      <FlatList
        data={reminders}
        renderItem={renderReminderCard}
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
              emoji="📱"
              title="No Reminders Logged"
              subtitle="Trigger reminders to debtors to see automated messaging logs."
            />
          ) : null
        }
      />
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
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  leftInfo: {
    flex: 1,
    paddingRight: 10,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.white,
    marginBottom: 4,
  },
  phoneText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  rightInfo: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.error,
  },
  amountLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
    textTransform: "uppercase",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: Colors.borderLight,
    paddingTop: 10,
    marginBottom: 6,
  },
  channelBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgElevated,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  channelText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "850",
    textTransform: "uppercase",
  },
  dateText: {
    fontSize: 10,
    color: Colors.textMuted,
    textAlign: "right",
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: "center",
  },
});

export default ReminderHistoryScreen;
