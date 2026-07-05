// src/screens/transaction/GlobalTransactionsScreen.js
// Screen displaying shop-wide transaction lists filtered by type (CREDIT or PAYMENT).
// Clickable from the dashboard summary cards to see all Diya/Mila entries.

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTransactionStore from "../../store/transactionStore";
import useShopStore from "../../store/shopStore";
import Colors from "../../constants/colors";
import { formatCurrency, formatDate } from "../../utils/format";
import EmptyState from "../../components/common/EmptyState";
import { Feather } from "@expo/vector-icons";

// Memoized global card item for clean render performance
const GlobalTxnCard = React.memo(({ item, currencyCode, navigation }) => {
  const isCredit = item.type === "CREDIT";
  const typeColor = isCredit ? Colors.error : Colors.success;
  const typeSymbol = isCredit ? "+" : "-";

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { borderLeftWidth: 4, borderLeftColor: typeColor }
      ]}
      activeOpacity={0.9}
      onPress={() => {
        // Navigate directly to customer detail page when clicked
        if (item.customer?.id) {
          navigation.navigate("Customers", {
            screen: "CustomerDetail",
            params: { customerId: item.customer.id }
          });
        }
      }}
    >
      <View style={styles.cardMain}>
        <View style={styles.cardLeft}>
          <Text style={styles.customerName}>{item.customer?.name || "Unknown Customer"}</Text>
          <Text style={styles.txnType}>
            {item.type === "CREDIT" ? "Diya (Udhari)" : item.type === "PAYMENT" ? "Mila (Jama)" : item.type}
            {item.paymentMethod ? ` • ${item.paymentMethod}` : ""}
          </Text>
          {item.description && <Text style={styles.txnDesc}>{item.description}</Text>}
          <Text style={styles.txnDate}>{formatDate(item.transactionDate, true)}</Text>
        </View>
        <View style={styles.cardRight}>
          <Text style={[styles.txnAmount, { color: typeColor }]}>
            {typeSymbol} {formatCurrency(parseFloat(item.amount), currencyCode)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const GlobalTransactionsScreen = ({ route, navigation }) => {
  const { type } = route.params; // 'CREDIT' or 'PAYMENT'
  const isCredit = type === "CREDIT";

  const {
    transactions,
    meta,
    isLoading,
    fetchShopTransactions,
    clearTransactions,
  } = useTransactionStore();

  const { shop } = useShopStore();
  const currencyCode = shop?.currency || "INR";

  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = useCallback(async (page = 1, append = false) => {
    await fetchShopTransactions({ page, limit: 15, type }, append);
  }, [type, fetchShopTransactions]);

  useEffect(() => {
    loadData(1, false);
    return () => {
      clearTransactions();
    };
  }, [type, loadData, clearTransactions]);

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

  const renderItem = useCallback(({ item }) => (
    <GlobalTxnCard item={item} currencyCode={currencyCode} navigation={navigation} />
  ), [currencyCode, navigation]);

  const renderFooter = useCallback(() => {
    if (!isLoading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Colors.primary} />
      </View>
    );
  }, [isLoading]);

  const screenTitle = isCredit ? "Diya (All Udhari)" : "Mila (All Payments)";

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgDark} />

      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{screenTitle}</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Transactions List */}
      <FlatList
        data={transactions}
        renderItem={renderItem}
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
              emoji={isCredit ? "📈" : "📉"}
              title="No Entries Recorded"
              subtitle={`Your shop currently has no registered ${isCredit ? "Udhari (Diya)" : "Payment (Mila)"} records.`}
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
  headerTitle: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 18,
    color: Colors.textPrimary,
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
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  cardMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardLeft: {
    flex: 1,
    paddingRight: 16,
  },
  customerName: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  txnType: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: Colors.textSecondary,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  txnDesc: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 6,
  },
  txnDate: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: Colors.textMuted,
  },
  cardRight: {
    alignItems: "flex-end",
  },
  txnAmount: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 16,
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: "center",
  },
});

export default GlobalTransactionsScreen;
