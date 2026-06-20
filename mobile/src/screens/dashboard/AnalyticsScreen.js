// src/screens/dashboard/AnalyticsScreen.js
// Visual analytics dashboard displaying transaction trends, cash flow breakdowns, and charts.

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { formatCurrency } from "../../utils/format";
import { getAnalyticsData } from "../../services/dashboardService";
import useAuthStore from "../../store/authStore";

const AnalyticsScreen = ({ navigation }) => {
  const { shop } = useAuthStore();
  const currencyCode = shop?.currency || "INR";

  const [days, setDays] = useState(7);
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async (selectedDays) => {
    setIsLoading(true);
    try {
      const res = await getAnalyticsData(selectedDays);
      if (res && res.success && res.data) {
        setAnalytics(res.data);
      }
    } catch (err) {
      console.warn("Failed to load analytics:", err);
      Alert.alert("Error", "Could not load analytics trends. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(days);
  }, [days]);

  const handlePeriodChange = (val) => {
    setDays(val);
  };

  // Custom SVG Bar Chart Renderer
  const renderSvgBarChart = () => {
    if (!analytics || !analytics.dailyTrends || analytics.dailyTrends.length === 0) {
      return null;
    }

    const trends = analytics.dailyTrends;
    const maxVal = Math.max(
      ...trends.map((t) => Math.max(parseFloat(t.credit || 0), parseFloat(t.payment || 0), 100))
    );

    const chartHeight = 160;
    const paddingBottom = 20;

    return (
      <View style={styles.chartWrapper}>
        <View style={styles.chartYAxis}>
          <Text style={styles.yAxisLabel}>{formatCurrency(maxVal, currencyCode)}</Text>
          <Text style={styles.yAxisLabel}>{formatCurrency(maxVal / 2, currencyCode)}</Text>
          <Text style={styles.yAxisLabel}>{formatCurrency(0, currencyCode)}</Text>
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.chartBarsRow}>
            {trends.map((day, idx) => {
              const creditHeight = ((parseFloat(day.credit || 0)) / maxVal) * (chartHeight - paddingBottom);
              const paymentHeight = ((parseFloat(day.payment || 0)) / maxVal) * (chartHeight - paddingBottom);

              // Get day name or formatted date
              const dateObj = new Date(day.date);
              const label = dateObj.toLocaleDateString(undefined, { weekday: "narrow" }) || "";

              return (
                <View key={idx} style={styles.chartColumn}>
                  <View style={styles.barsContainer}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: Math.max(3, creditHeight),
                          backgroundColor: Colors.error,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.bar,
                        {
                          height: Math.max(3, paymentHeight),
                          backgroundColor: Colors.success,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.chartLabel} numberOfLines={1}>
                    {label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const creditTotal = analytics?.totalCredit || 0;
  const paymentTotal = analytics?.totalPayments || 0;
  const flowDifference = creditTotal - paymentTotal;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgDark} />

      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hisaab Analytics</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Time window toggle */}
      <View style={styles.periodSelector}>
        <TouchableOpacity
          style={[styles.periodTab, days === 7 && styles.periodTabActive]}
          onPress={() => handlePeriodChange(7)}
          activeOpacity={0.8}
        >
          <Text style={[styles.periodTabText, days === 7 && styles.periodTabTextActive]}>
            Last 7 Days
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.periodTab, days === 30 && styles.periodTabActive]}
          onPress={() => handlePeriodChange(30)}
          activeOpacity={0.8}
        >
          <Text style={[styles.periodTabText, days === 30 && styles.periodTabTextActive]}>
            Last 30 Days
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loaderText}>Aggregating ledger data...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Credit vs Payments Summary cards */}
          <View style={styles.summaryGrid}>
            <View style={[styles.summaryCard, styles.creditCard]}>
              <View style={styles.cardHeader}>
                <Feather name="arrow-up-right" size={14} color={Colors.error} />
                <Text style={styles.cardLabel}>Diya (Udhari Given)</Text>
              </View>
              <Text style={[styles.cardValue, { color: Colors.error }]}>
                {formatCurrency(creditTotal, currencyCode)}
              </Text>
            </View>

            <View style={[styles.summaryCard, styles.paymentCard]}>
              <View style={styles.cardHeader}>
                <Feather name="arrow-down-left" size={14} color={Colors.success} />
                <Text style={styles.cardLabel}>Mila (Collections)</Text>
              </View>
              <Text style={[styles.cardValue, { color: Colors.success }]}>
                {formatCurrency(paymentTotal, currencyCode)}
              </Text>
            </View>
          </View>

          {/* Cash Flow Health Status */}
          <View style={styles.healthCard}>
            <View style={styles.healthHeader}>
              <Text style={styles.healthTitle}>Cash Flow Balance</Text>
              <View
                style={[
                  styles.healthIndicator,
                  { backgroundColor: flowDifference >= 0 ? Colors.errorBg : Colors.successBg },
                ]}
              >
                <Text style={{ color: flowDifference >= 0 ? Colors.error : Colors.success, fontSize: 10, fontWeight: "800" }}>
                  {flowDifference >= 0 ? "EXPANSION" : "RESERVE"}
                </Text>
              </View>
            </View>
            <Text style={[styles.healthValue, { color: flowDifference >= 0 ? Colors.error : Colors.success }]}>
              {flowDifference >= 0 ? "+" : ""}
              {formatCurrency(flowDifference, currencyCode)}
            </Text>
            <Text style={styles.healthSubText}>
              {flowDifference >= 0
                ? "You gave more credit than you collected this period. Follow up on pending payments."
                : "Excellent collections! Your outstanding credit has decreased relative to advance repayments."}
            </Text>
          </View>

          {/* Chart Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Daily Ledger Trends</Text>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendIndicator, { backgroundColor: Colors.error }]} />
                <Text style={styles.legendText}>Diya (Credit)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendIndicator, { backgroundColor: Colors.success }]} />
                <Text style={styles.legendText}>Mila (Payment)</Text>
              </View>
            </View>
            {renderSvgBarChart()}
          </View>
        </ScrollView>
      )}
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
  placeholder: {
    width: 40,
  },
  periodSelector: {
    flexDirection: "row",
    backgroundColor: Colors.bgCard,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  periodTabActive: {
    backgroundColor: Colors.primary,
  },
  periodTabText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: "700",
  },
  periodTabTextActive: {
    color: Colors.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 12,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  summaryGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 18,
    padding: 16,
  },
  creditCard: {
    // optional border glow
  },
  paymentCard: {
    // optional border glow
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  cardLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "800",
  },
  healthCard: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  healthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  healthTitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: "700",
  },
  healthIndicator: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  healthValue: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },
  healthSubText: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 16,
  },
  sectionCard: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: "800",
    marginBottom: 12,
  },
  legendRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendIndicator: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  chartWrapper: {
    flexDirection: "row",
    height: 160,
    alignItems: "stretch",
  },
  chartYAxis: {
    justifyContent: "space-between",
    width: 60,
    paddingBottom: 20,
    paddingRight: 8,
    alignItems: "flex-end",
  },
  yAxisLabel: {
    fontSize: 9,
    color: Colors.textMuted,
    fontWeight: "700",
  },
  chartContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.border,
    paddingBottom: 2,
  },
  chartBarsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: "100%",
  },
  chartColumn: {
    alignItems: "center",
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
  },
  barsContainer: {
    flexDirection: "row",
    gap: 2,
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "center",
    paddingBottom: 4,
  },
  bar: {
    width: 6,
    borderRadius: 2,
  },
  chartLabel: {
    fontSize: 9,
    color: Colors.textMuted,
    fontWeight: "700",
    marginTop: 4,
    height: 14,
  },
});

export default AnalyticsScreen;
