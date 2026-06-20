// src/screens/settings/AuditLogScreen.js
// Screen to list audit log events of the shop. Only accessible by owners.

import React, { useState, useEffect } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { getAuditLogs } from "../../services/auditService";

const AuditLogScreen = ({ navigation }) => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLogs = async (showLoader = true) => {
    if (showLoader) setIsLoading(true);
    try {
      const res = await getAuditLogs();
      if (res && res.success && res.data) {
        setLogs(res.data);
        applyFilter(res.data, searchQuery);
      }
    } catch (err) {
      console.warn("Failed to fetch audit logs:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchLogs(false);
  };

  const applyFilter = (allLogs, query) => {
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
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    applyFilter(logs, text);
  };

  const getLogIcon = (action) => {
    switch (action) {
      case "CREATE_TRANSACTION":
        return { name: "plus-circle", color: Colors.primaryLight };
      case "REVERSE_TRANSACTION":
        return { name: "rotate-ccw", color: Colors.error };
      case "CREATE_CUSTOMER":
        return { name: "user-plus", color: Colors.primary };
      case "UPDATE_CUSTOMER":
        return { name: "edit-2", color: Colors.accentLight };
      case "DELETE_CUSTOMER":
        return { name: "user-minus", color: Colors.error };
      case "INVITE_STAFF":
        return { name: "mail", color: Colors.primaryLight };
      case "UPDATE_STAFF":
        return { name: "shield", color: Colors.accent };
      case "REMOVE_STAFF":
        return { name: "user-x", color: Colors.error };
      default:
        return { name: "file-text", color: Colors.textSecondary };
    }
  };

  const renderLogItem = ({ item }) => {
    const iconData = getLogIcon(item.action);
    const dateStr = new Date(item.createdAt).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

    return (
      <View style={styles.logCard}>
        <View style={styles.iconContainer}>
          <Feather name={iconData.name} size={18} color={iconData.color} />
        </View>
        <View style={styles.logDetails}>
          <View style={styles.logHeader}>
            <Text style={styles.operatorText}>
              {item.userName}{" "}
              <Text style={styles.roleText}>({item.userRole.toUpperCase()})</Text>
            </Text>
            <Text style={styles.timeText}>{dateStr}</Text>
          </View>
          <Text style={styles.detailsText}>{item.details}</Text>
          <Text style={styles.actionTag}>{item.action}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Audit Trails</Text>
          <Text style={styles.headerSubtitle}>Immutable log of staff and ledger activities</Text>
        </View>
      </View>

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
    fontSize: 20,
    fontWeight: "700",
    color: Colors.white,
  },
  headerSubtitle: {
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
    borderWidth: 1,
    borderColor: Colors.border,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: Colors.white,
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
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
    marginTop: 16,
  },
  emptyText: {
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
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
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
    fontSize: 14,
    fontWeight: "600",
    color: Colors.white,
  },
  roleText: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.primaryLight,
  },
  timeText: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  detailsText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 6,
  },
  actionTag: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textMuted,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
});

export default AuditLogScreen;
