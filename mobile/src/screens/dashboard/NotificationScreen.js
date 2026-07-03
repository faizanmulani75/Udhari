// src/screens/dashboard/NotificationScreen.js
// Premium dark-themed in-app notification center.

import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import Colors from "../../constants/colors";
import useNotificationStore from "../../store/notificationStore";
import CustomAlert from "../../components/common/CustomAlert";

// ── Type Config ────────────────────────────────────────────
const TYPE_CONFIG = {
  TRANSACTION: { icon: "credit-card", color: Colors.primary,   bg: Colors.primaryGlow },
  DISPUTE:     { icon: "alert-circle", color: Colors.error,    bg: Colors.errorBg },
  STAFF:       { icon: "users",        color: Colors.accent,   bg: "rgba(255,142,37,0.12)" },
  SYSTEM:      { icon: "bell",         color: Colors.textSecondary, bg: "rgba(164,164,180,0.10)" },
};

const getTypeConfig = (type) => TYPE_CONFIG[type] || TYPE_CONFIG.SYSTEM;

// ── Helpers ────────────────────────────────────────────────
const formatTime = (dateStr) => {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
};

const groupByDate = (notifications) => {
  const groups = {};
  notifications.forEach((n) => {
    const date = new Date(n.createdAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let key;
    if (date.toDateString() === today.toDateString()) key = "Today";
    else if (date.toDateString() === yesterday.toDateString()) key = "Yesterday";
    else key = date.toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long" });

    if (!groups[key]) groups[key] = [];
    groups[key].push(n);
  });
  return groups;
};

// ── Notification Card ──────────────────────────────────────
const NotificationCard = React.memo(({ item, onMarkRead, onDelete }) => {
  const config = getTypeConfig(item.type);
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    Animated.timing(slideAnim, {
      toValue: -400,
      duration: 280,
      useNativeDriver: true,
    }).start(() => onDelete(item.id));
  };

  return (
    <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.card, !item.isRead && styles.cardUnread]}
        onPress={() => !item.isRead && onMarkRead(item.id)}
      >
        {/* Unread indicator */}
        {!item.isRead && <View style={styles.unreadDot} />}

        {/* Icon */}
        <View style={[styles.iconWrap, { backgroundColor: config.bg }]}>
          <Feather name={config.icon} size={18} color={config.color} />
        </View>

        {/* Content */}
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, !item.isRead && styles.cardTitleUnread]} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.cardTime}>{formatTime(item.createdAt)}</Text>
          </View>
          <Text style={styles.cardMessage} numberOfLines={2}>
            {item.message}
          </Text>
          {!item.isRead && (
            <TouchableOpacity onPress={() => onMarkRead(item.id)} style={styles.markReadBtn}>
              <Text style={styles.markReadText}>Mark as read</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Delete Button */}
        <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Feather name="x" size={14} color={Colors.textMuted} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ── Main Screen ────────────────────────────────────────────
const NotificationScreen = ({ navigation }) => {
  const {
    notifications,
    unreadCount,
    isLoading,
    isRefreshing,
    page,
    totalPages,
    fetchNotifications,
    refreshNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearReadNotifications,
  } = useNotificationStore();

  const [alertConfig, setAlertConfig] = useState(null);

  useFocusEffect(
    useCallback(() => {
      fetchNotifications(1);
      fetchUnreadCount();
    }, [])
  );

  const handleLoadMore = () => {
    if (!isLoading && page < totalPages) {
      fetchNotifications(page + 1);
    }
  };

  const handleMarkAllRead = () => {
    setAlertConfig({
      visible: true,
      title: "Mark All as Read",
      message: "Mark all notifications as read?",
      type: "info",
      actions: [
        { text: "Cancel", style: "cancel", onPress: () => setAlertConfig(null) },
        {
          text: "Mark All",
          style: "primary",
          onPress: () => {
            setAlertConfig(null);
            markAllAsRead();
          },
        },
      ],
    });
  };

  const handleClearRead = () => {
    setAlertConfig({
      visible: true,
      title: "Clear Read Notifications",
      message: "Remove all read notifications from your list?",
      type: "warning",
      actions: [
        { text: "Cancel", style: "cancel", onPress: () => setAlertConfig(null) },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            setAlertConfig(null);
            clearReadNotifications();
          },
        },
      ],
    });
  };

  const grouped = groupByDate(notifications);
  const groupKeys = Object.keys(grouped);

  // Build a flat list data from grouped sections
  const flatData = [];
  groupKeys.forEach((key) => {
    flatData.push({ type: "header", key });
    grouped[key].forEach((n) => flatData.push({ type: "item", ...n }));
  });

  const renderItem = useCallback(
    ({ item }) => {
      if (item.type === "header") {
        return <Text style={styles.sectionHeader}>{item.key}</Text>;
      }
      return (
        <NotificationCard
          item={item}
          onMarkRead={markAsRead}
          onDelete={deleteNotification}
        />
      );
    },
    [markAsRead, deleteNotification]
  );

  const keyExtractor = useCallback((item, index) =>
    item.type === "header" ? `header-${item.key}` : item.id,
    []
  );

  const ListEmpty = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconWrap}>
        <Feather name="bell-off" size={40} color={Colors.textMuted} />
      </View>
      <Text style={styles.emptyTitle}>You're all caught up!</Text>
      <Text style={styles.emptySubtitle}>New alerts from transactions, staff, and disputes will appear here.</Text>
    </View>
  );

  const ListFooter = () =>
    isLoading && page > 1 ? (
      <ActivityIndicator color={Colors.primary} style={{ marginVertical: 20 }} />
    ) : null;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgDark} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Feather name="arrow-left" size={22} color={Colors.white} />
        </TouchableOpacity>

        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>

        {/* Action Menu */}
        <View style={styles.headerActions}>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={handleMarkAllRead} style={styles.actionBtn}>
              <Feather name="check-square" size={18} color={Colors.primary} />
            </TouchableOpacity>
          )}
          {notifications.some((n) => n.isRead) && (
            <TouchableOpacity onPress={handleClearRead} style={styles.actionBtn}>
              <Feather name="trash-2" size={18} color={Colors.error} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Action Hint */}
      {notifications.length > 0 && (
        <View style={styles.hintRow}>
          <Feather name="info" size={12} color={Colors.textMuted} />
          <Text style={styles.hintText}>Tap a notification to mark it as read. Swipe × to delete.</Text>
        </View>
      )}

      {/* Initial loading */}
      {isLoading && page === 1 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading notifications...</Text>
        </View>
      ) : (
        <FlatList
          data={flatData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListEmptyComponent={ListEmpty}
          ListFooterComponent={ListFooter}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshNotifications}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
            />
          }
        />
      )}

      {/* Custom Alert */}
      {alertConfig && (
        <CustomAlert
          visible={alertConfig.visible}
          title={alertConfig.title}
          message={alertConfig.message}
          type={alertConfig.type}
          actions={alertConfig.actions}
          onClose={() => setAlertConfig(null)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },

  // ── Header ──────────────────────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.bgCard,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerTitle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.textPrimary,
    letterSpacing: 0.3,
  },
  headerBadge: {
    marginLeft: 8,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  headerBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.bgDark,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.bgCard,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  // ── Hint ────────────────────────────────────────────────
  hintRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.bgCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  hintText: {
    fontSize: 11,
    color: Colors.textMuted,
    flex: 1,
  },

  // ── List ────────────────────────────────────────────────
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    flexGrow: 1,
  },

  // ── Section Header ──────────────────────────────────────
  sectionHeader: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginTop: 16,
    marginBottom: 8,
    paddingLeft: 4,
  },

  // ── Card ────────────────────────────────────────────────
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    position: "relative",
  },
  cardUnread: {
    borderColor: "rgba(5,213,154,0.25)",
    backgroundColor: "#121F1A",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  unreadDot: {
    position: "absolute",
    top: 16,
    left: 8,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.primary,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    flexShrink: 0,
  },
  cardContent: {
    flex: 1,
    paddingRight: 24,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
    flex: 1,
    marginRight: 8,
  },
  cardTitleUnread: {
    color: Colors.textPrimary,
    fontWeight: "700",
  },
  cardTime: {
    fontSize: 11,
    color: Colors.textMuted,
    flexShrink: 0,
  },
  cardMessage: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  markReadBtn: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: Colors.primaryGlow,
  },
  markReadText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.primary,
  },
  deleteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.bgElevated,
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Loading ──────────────────────────────────────────────
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.textMuted,
  },

  // ── Empty ───────────────────────────────────────────────
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  emptyIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.bgCard,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default NotificationScreen;
