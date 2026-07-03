// src/screens/customers/CustomerListScreen.js
// Screen to list all customers with pagination, real-time search, summaries, and action triggers.

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  ScrollView,
  Alert,
  LayoutAnimation,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomerStore from "../../store/customerStore";
import useShopStore from "../../store/shopStore";
import Colors from "../../constants/colors";
import { formatCurrency } from "../../utils/format";
import EmptyState from "../../components/common/EmptyState";
import { Feather } from "@expo/vector-icons";
import { getTags } from "../../services/tagService";

// Memoized Customer Card Component to prevent redundant re-renders
const CustomerCard = React.memo(({ item, currencyCode, onPress }) => {
  const balance = parseFloat(item.balance || 0);
  const creditLimit = parseFloat(item.creditLimit || 0);
  const hasLimit = creditLimit > 0;
  const limitPercentage = hasLimit ? (balance / creditLimit) * 100 : 0;

  // Determine colors based on balance health
  const isNegative = balance < 0; // Advance payment
  const balanceColor = isNegative ? Colors.success : Colors.error;
  const balanceLabel = isNegative ? "Advance (Jama)" : "Udhari (Due)";

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          borderLeftWidth: 4,
          borderLeftColor: balance === 0 ? Colors.border : balanceColor,
        },
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.cardHeader}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {item.name.substring(0, 2).toUpperCase()}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.customerName}>{item.name}</Text>
          <View style={styles.phoneWrapper}>
            <Feather name="phone" size={11} color={Colors.textMuted} style={styles.phoneIcon} />
            <Text style={styles.customerPhone}>{item.phone}</Text>
          </View>
          {item.tags && item.tags.length > 0 && (
            <View style={styles.cardTagsWrapper}>
              {item.tags.map((ct) => (
                <View
                  key={ct.tag.id}
                  style={[
                    styles.cardTagBadge,
                    {
                      backgroundColor: ct.tag.color + "15",
                      borderColor: ct.tag.color + "44",
                    },
                  ]}
                >
                  <Text style={[styles.cardTagBadgeText, { color: ct.tag.color }]}>
                    {ct.tag.name}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={styles.balanceContainer}>
          <Text style={[styles.balanceText, { color: balanceColor }]}>
            {formatCurrency(Math.abs(balance), currencyCode)}
          </Text>
          <Text style={styles.balanceLabel}>{balanceLabel}</Text>
        </View>
      </View>

      {/* Credit limit warning bar if applicable */}
      {hasLimit && balance > 0 && (
        <View style={styles.limitBarWrapper}>
          <View style={styles.limitBarHeader}>
            <Text style={styles.limitBarText}>
              Udhari Limit: {formatCurrency(creditLimit, currencyCode)}
            </Text>
            <Text
              style={[
                styles.limitPercentText,
                limitPercentage >= 85 && { color: Colors.error },
              ]}
            >
              {Math.round(limitPercentage)}% Used
            </Text>
          </View>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(limitPercentage, 100)}%`,
                  backgroundColor: limitPercentage >= 85 ? Colors.error : Colors.primary,
                },
              ]}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
});

const CustomerListScreen = ({ navigation }) => {
  const {
    customers,
    meta,
    isLoading,
    fetchCustomers,
    clearSelectedCustomer,
  } = useCustomerStore();

  const { shop, fetchShop } = useShopStore();
  const currencyCode = shop?.currency || "INR";

  // ── Local State ─────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState(null);

  // Load tags helper
  const loadTags = useCallback(async () => {
    try {
      const response = await getTags();
      setAllTags(response.data || []);
    } catch (err) {
      console.warn("Failed to load tags:", err);
    }
  }, []);

  // Load customers and tags on mount
  useEffect(() => {
    fetchCustomers({ page: 1, search: "", tagId: "" });
    loadTags();
    fetchShop();
  }, [fetchCustomers, loadTags, fetchShop]);

  // Smooth Native Animations during layout changes (filtering, loading complete, etc.)
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [customers, isLoading]);

  const handleSelectTag = useCallback((tagId) => {
    const nextTagId = selectedTagId === tagId ? null : tagId;
    setSelectedTagId(nextTagId);
    fetchCustomers({ page: 1, search: searchQuery, tagId: nextTagId || "" });
  }, [selectedTagId, searchQuery, fetchCustomers]);

  // Debounced search / Search trigger
  const handleSearch = useCallback((text) => {
    setSearchQuery(text);
    fetchCustomers({ page: 1, search: text, tagId: selectedTagId || "" });
  }, [selectedTagId, fetchCustomers]);

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([
      fetchCustomers({ page: 1, search: searchQuery, tagId: selectedTagId || "" }),
      loadTags(),
      fetchShop(),
    ]);
    setIsRefreshing(false);
  }, [searchQuery, selectedTagId, fetchCustomers, loadTags, fetchShop]);

  // Load more (pagination)
  const handleLoadMore = useCallback(() => {
    if (!isLoading && meta.page < meta.totalPages) {
      fetchCustomers(
        {
          page: meta.page + 1,
          search: searchQuery,
          tagId: selectedTagId || "",
        },
        true
      );
    }
  }, [isLoading, meta, searchQuery, selectedTagId, fetchCustomers]);

  const handleAddNewCustomer = useCallback(() => {
    const subscription = shop?.subscriptions?.[0];
    const maxCustomers = subscription ? subscription.maxCustomers : 10;
    const currentCount = meta?.totalCount || customers.length;
    const planName = subscription ? subscription.plan : "FREE";

    if (currentCount >= maxCustomers) {
      Alert.alert(
        "Customer Limit Reached",
        `Your current ${planName} Plan only supports up to ${maxCustomers} active customers. Please upgrade your plan to register more grahaks.`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Upgrade Plan",
            onPress: () => navigation.navigate("Settings", { screen: "Subscription" }),
          },
        ]
      );
      return;
    }
    navigation.navigate("AddCustomerScreen");
  }, [shop, meta, customers, navigation]);

  // Calculate total outstanding balance for header summary
  const totalOutstanding = customers.reduce(
    (sum, customer) => sum + parseFloat(customer.balance || 0),
    0
  );

  const handleCardPress = useCallback((customerId) => {
    clearSelectedCustomer();
    navigation.navigate("CustomerDetailScreen", { customerId });
  }, [clearSelectedCustomer, navigation]);

  const renderCustomerCard = useCallback(({ item }) => (
    <CustomerCard
      item={item}
      currencyCode={currencyCode}
      onPress={() => handleCardPress(item.id)}
    />
  ), [currencyCode, handleCardPress]);

  const renderFooter = useCallback(() => {
    if (!isLoading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Colors.primary} />
      </View>
    );
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgDark} />

      {/* Summary Header */}
      <View style={styles.summaryHeader}>
        <Text style={styles.summaryTitle}>Total Udhari (Lene Hain)</Text>
        <Text style={styles.summaryValue}>
          {formatCurrency(totalOutstanding, currencyCode)}
        </Text>
        <Text style={styles.summarySubtitle}>
          Across all active Khata books
        </Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Grahak (Name or Phone)..."
          placeholderTextColor={Colors.textPlaceholder}
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
        />
      </View>

      {/* Tag Filter Chips */}
      {allTags.length > 0 && (
        <View style={styles.tagChipsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagChipsScroll}>
            <TouchableOpacity
              onPress={() => handleSelectTag(null)}
              style={[
                styles.tagChip,
                selectedTagId === null && styles.tagChipActive,
              ]}
            >
              <Text style={[styles.tagChipText, selectedTagId === null && styles.tagChipTextActive]}>
                All
              </Text>
            </TouchableOpacity>
            {allTags.map((tag) => {
              const isSelected = selectedTagId === tag.id;
              return (
                <TouchableOpacity
                  key={tag.id}
                  onPress={() => handleSelectTag(tag.id)}
                  style={[
                    styles.tagChip,
                    isSelected && { backgroundColor: tag.color + "22", borderColor: tag.color },
                  ]}
                >
                  <View style={[styles.tagChipDot, { backgroundColor: tag.color }]} />
                  <Text style={[styles.tagChipText, isSelected && { color: tag.color, fontWeight: "700" }]}>
                    {tag.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* Customer List */}
      <FlatList
        data={customers}
        renderItem={renderCustomerCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
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
              emoji="👥"
              title="Empty Khata Book"
              subtitle="Register your first Grahak to start writing Khata entries."
              actionTitle="+ Add Grahak"
              onActionPress={handleAddNewCustomer}
            />
          ) : null
        }
      />


      {/* Floating Action Button (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={handleAddNewCustomer}
      >
        <Feather name="plus" size={24} color={Colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  summaryHeader: {
    backgroundColor: Colors.bgCard,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: "800",
    color: Colors.white,
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  searchInput: {
    backgroundColor: Colors.bgInput,
    borderRadius: 14,
    color: Colors.textPrimary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryGlow,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(108, 92, 231, 0.2)",
  },
  avatarText: {
    color: Colors.primaryLight,
    fontWeight: "700",
    fontSize: 15,
  },
  infoContainer: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  customerPhone: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  phoneWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneIcon: {
    marginRight: 4,
  },
  balanceContainer: {
    alignItems: "flex-end",
  },
  balanceText: {
    fontSize: 18,
    fontWeight: "800",
  },
  balanceLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
    textTransform: "uppercase",
  },
  limitBarWrapper: {
    marginTop: 14,
    borderTopWidth: 1,
    borderColor: Colors.borderLight,
    paddingTop: 10,
  },
  limitBarHeader: {
    flexDirection: "row",
    justifyContent: "between",
    alignItems: "center",
    marginBottom: 6,
  },
  limitBarText: {
    fontSize: 11,
    color: Colors.textMuted,
    flex: 1,
  },
  limitPercentText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  progressBackground: {
    height: 5,
    backgroundColor: Colors.bgInput,
    borderRadius: 2.5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2.5,
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  fabText: {
    color: Colors.white,
    fontSize: 32,
    lineHeight: 34,
    fontWeight: "300",
  },
  tagChipsContainer: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  tagChipsScroll: {
    gap: 8,
    paddingRight: 20,
  },
  tagChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.bgCard,
  },
  tagChipActive: {
    backgroundColor: Colors.primaryGlow,
    borderColor: Colors.primary,
  },
  tagChipText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  tagChipTextActive: {
    color: Colors.primaryLight,
    fontWeight: "700",
  },
  tagChipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  cardTagsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 6,
  },
  cardTagBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2.5,
    borderRadius: 6,
    borderWidth: 1,
  },
  cardTagBadgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
});

export default CustomerListScreen;
