// src/screens/settings/AuditLogScreen.js
// Screen to list audit log events of the shop. Only accessible by owners.

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  LayoutAnimation,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { getAuditLogs } from "../../services/auditService";
import ProGate from "../../components/common/ProGate";

const getActionLabel = (action, details) => {
  switch (action) {
    case "CREATE_TRANSACTION":
      return details && details.toLowerCase().includes("payment") ? "Payment Received" : "Credit Added";
    case "REVERSE_TRANSACTION":
      return "Transaction Reversed";
    case "CREATE_CUSTOMER":
      return "Grahak Registered";
    case "UPDATE_CUSTOMER":
      return "Profile Updated";
    case "DELETE_CUSTOMER":
      return "Grahak Deleted";
    case "INVITE_STAFF":
      return "Staff Invited";
    case "UPDATE_STAFF":
      return "Staff Role Updated";
    case "REMOVE_STAFF":
      return "Staff Removed";
    default:
      return action.replace(/_/g, " ");
  }
};

const getLogIcon = (action, details) => {
  const isCoral = action.includes("REVERSE") || action.includes("DELETE") || action.includes("REMOVE") || (details && details.toLowerCase().includes("payment"));
  const color = isCoral ? Colors.error : Colors.primary;
  
  switch (action) {
    case "CREATE_TRANSACTION":
      return { name: details && details.toLowerCase().includes("payment") ? "arrow-down-left" : "arrow-up-right", color };
    case "REVERSE_TRANSACTION":
      return { name: "rotate-ccw", color };
    case "CREATE_CUSTOMER":
      return { name: "user-plus", color };
    case "UPDATE_CUSTOMER":
      return { name: "edit-2", color };
    case "DELETE_CUSTOMER":
      return { name: "user-minus", color };
    case "INVITE_STAFF":
      return { name: "mail", color };
    case "UPDATE_STAFF":
      return { name: "shield", color };
    case "REMOVE_STAFF":
      return { name: "user-x", color };
    default:
      return { name: "file-text", color };
  }
};

// Memoized Audit Log Card to prevent stuttering
const AuditLogCard = React.memo(({ item }) => {
  const iconData = getLogIcon(item.action, item.details);
  const dateStr = new Date(item.createdAt).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <View style={styles.logCard}>
      <View style={[styles.iconContainer, { backgroundColor: iconData.color + "12" }]}>
        <Feather name={iconData.name} size={16} color={iconData.color} />
      </View>
      <View style={styles.logDetails}>
        <View style={styles.logHeader}>
          <Text style={styles.operatorText}>
            {item.userName}{" "}
            <Text style={styles.roleText}>({item.userRole.toLowerCase()})</Text>
          </Text>
          <Text style={styles.timeText}>{dateStr}</Text>
        </View>
        <Text style={styles.detailsText}>{item.details}</Text>
        <Text style={[styles.actionTag, { color: iconData.color, backgroundColor: iconData.color + "12" }]}>
          {getActionLabel(item.action, item.details)}
        </Text>
      </View>
    </View>
  );
});

const AuditLogScreen = ({ navigation }) => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLogs = useCallback(async (showLoader = true) => {
    if (showLoader) setIsLoading(true);
    try {
      const res = await getAuditLogs();
      if (res && res.success && res.data) {
        setLogs(res.data);
      }
    } catch (err) {
      console.warn("Failed to fetch audit logs:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchLogs(false);
  }, [fetchLogs]);

  // Stable filter callback
  const applyFilter = useCallback((allLogs, query) => {
    if (!query.trim()) {
      setFilteredLogs(allLogs);
      return;
    }
    const cleanQuery = query.toLowerCase();
    const filtered = allLogs.filter((log) => {
      return (
        log.details.toLowerCase().includes(cleanQuery) ||
        log.action.toLowerCase().includes(cleanQuery) ||
        (log.userName && log.userName.toLowerCase().includes(cleanQuery)) ||
        (log.userRole && log.userRole.toLowerCase().includes(cleanQuery))
      );
    });
    setFilteredLogs(filtered);
  }, []);

  // Sync filter results to logs / search query updates
  useEffect(() => {
    applyFilter(logs, searchQuery);
  }, [logs, searchQuery, applyFilter]);

  // LayoutAnimation triggers when list content or load status shifts
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [filteredLogs, isLoading]);

  const handleSearch = useCallback((text) => {
    setSearchQuery(text);
  }, []);

  const renderLogItem = useCallback(({ item }) => (
    <AuditLogCard item={item} />
  ), []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Activity Log</Text>
          <Text style={styles.headerSubtitle}>Immutable log of staff and ledger activities</Text>
        </View>
      </View>

      <ProGate
        feature="audit_log"
        mode="hide"
        navigation={navigation}
        label="Keep track of actions taken by you and your staff members."
      >
        {/* Search Filter */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color={Colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search logs by activity or staff name..."
            placeholderTextColor={Colors.textPlaceholder}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Feather name="x" size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Content */}
        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : filteredLogs.length === 0 ? (
          <View style={styles.centerContainer}>
            <Feather name="database" size={48} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No Activities Found</Text>
            <Text style={styles.emptyText}>
              {searchQuery ? "No matches found for your search query." : "Staff or ledger events will show up here."}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredLogs}
            renderItem={renderLogItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            initialNumToRender={12}
            maxToRenderPerBatch={12}
            windowSize={5}
            removeClippedSubviews={Platform.OS === 'android'}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                tintColor={Colors.primary}
                colors={[Colors.primary]}
              />
            }
          />
        )}
      </ProGate>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  titleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 19,
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgInput,
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.border,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    fontFamily: "Manrope_400Regular",
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 14,
    height: "100%",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 16,
    color: Colors.textPrimary,
    marginTop: 16,
  },
  emptyText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  logCard: {
    flexDirection: "row",
    backgroundColor: Colors.bgCard,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  logDetails: {
    flex: 1,
  },
  logHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  operatorText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    color: Colors.textPrimary,
  },
  roleText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 10,
    color: Colors.primary,
  },
  timeText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: Colors.textSecondary, // 12px muted secondary
  },
  detailsText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 6,
  },
  actionTag: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
});

export default AuditLogScreen;
