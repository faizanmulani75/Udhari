// src/screens/dashboard/AnalyticsScreen.js
// Hisaab Analytics — premium redesign with summary cards, collection rate,
// top customers, highest pending, and daily trend chart.

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
  Dimensions,
  LayoutAnimation,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { formatCurrency } from "../../utils/format";
import { getAnalyticsData } from "../../services/dashboardService";
import useAuthStore from "../../store/authStore";

const { width } = Dimensions.get("window");
const CHART_HEIGHT = 130;

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
      Alert.alert("Error", "Could not load analytics. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(days);
  }, [days]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [analytics, isLoading]);  // ── Derived values ──────────────────────────────────────
  const totalSales    = parseFloat(analytics?.totalCredit   || 0);
  const collected     = parseFloat(analytics?.totalPayments || 0);
  const outstanding   = Math.max(0, totalSales - collected);
  const customersAdded = analytics?.customersAdded || 0;
  const topDebtors    = analytics?.topDebtors || [];
  const dailyTrends   = analytics?.dailyTrends || [];

  const collectionRate = totalSales > 0 ? Math.round((collected / totalSales) * 100) : 0;
  const pendingRate    = 100 - collectionRate;

  // ── Monthly Aggregation Helper ───────────────────────────
  const isMonthly = days === 365;
  const chartData = React.useMemo(() => {
    if (!isMonthly || !dailyTrends.length) return dailyTrends;

    const monthlyMap = new Map();
    // Pre-populate last 12 months with 0s to guarantee exactly 12 columns
    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setDate(1); // avoid end of month overflow bugs
      d.setMonth(d.getMonth() - i);
      const yearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      monthlyMap.set(yearMonth, {
        date: `${yearMonth}-01`,
        credit: 0,
        payment: 0,
        label: d.toLocaleDateString("en-IN", { month: "short" }),
      });
    }

    // Accumulate daily values into corresponding months
    dailyTrends.forEach((day) => {
      const dateObj = new Date(day.date);
      const yearMonth = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}`;
      if (monthlyMap.has(yearMonth)) {
        const entry = monthlyMap.get(yearMonth);
        entry.credit += parseFloat(day.credit || 0);
        entry.payment += parseFloat(day.payment || 0);
      }
    });

    return Array.from(monthlyMap.values());
  }, [dailyTrends, isMonthly]);

  // ── Bar Chart ────────────────────────────────────────────
  const renderBarChart = () => {
    if (!chartData.length) return null;

    const maxVal = Math.max(
      ...chartData.map((t) => Math.max(parseFloat(t.credit || 0), parseFloat(t.payment || 0), 1))
    );

    return (
      <View style={styles.chartOuter}>
        <View style={styles.chartBarsRow}>
          {chartData.map((day, idx) => {
            const creditH = Math.max(4, (parseFloat(day.credit || 0) / maxVal) * CHART_HEIGHT);
            const paymentH = Math.max(4, (parseFloat(day.payment || 0) / maxVal) * CHART_HEIGHT);
            const dateObj = new Date(day.date);
            
            const label = isMonthly
              ? day.label
              : dateObj.toLocaleDateString("en-IN", { day: "numeric", month: "short" });

            return (
              <View key={idx} style={styles.chartCol}>
                <View style={styles.barsGroup}>
                  <View style={[styles.bar, { height: creditH, backgroundColor: Colors.error }]} />
                  <View style={[styles.bar, { height: paymentH, backgroundColor: Colors.primary }]} />
                </View>
                <Text style={styles.barLabel}>
                  {label}
                </Text>
              </View>
            );
          })}
        </View>
        {/* Baseline */}
        <View style={styles.chartBaseline} />
      </View>
    );
  };

  // ── Collection Rate Meter ────────────────────────────────
  const renderCollectionRate = () => (
    <View style={styles.rateRow}>
      {/* Collected */}
      <View style={styles.rateBlock}>
        <View style={[styles.rateCircle, styles.collectedCircle]}>
          <Text style={styles.ratePercent}>{collectionRate}%</Text>
        </View>
        <Text style={styles.rateLabel}>Collected</Text>
      </View>

      {/* Divider */}
      <View style={styles.rateDivider} />

      {/* Pending */}
      <View style={styles.rateBlock}>
        <View style={[styles.rateCircle, styles.pendingCircle]}>
          <Text style={[styles.ratePercent, { color: Colors.error }]}>{pendingRate}%</Text>
        </View>
        <Text style={styles.rateLabel}>Pending</Text>
      </View>

      {/* Bar */}
      <View style={styles.rateBarWrapper}>
        <Text style={styles.rateBarLabel}>Collection Progress</Text>
        <View style={styles.rateBarBg}>
          <View style={[styles.rateBarFill, { width: `${collectionRate}%` }]} />
        </View>
        <View style={styles.rateBarFooter}>
          <Text style={styles.rateBarSubL}>{formatCurrency(collected, currencyCode)} collected</Text>
          <Text style={styles.rateBarSubR}>{formatCurrency(outstanding, currencyCode)} left</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgDark} />

      {/* ── Header ── */}
      <View style={styles.headerBar}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={Colors.textPrimary} />
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>Hisaab Analytics</Text>
        {/* <View style={styles.placeholder} /> */}
      </View>

      {/* ── Period Selector ── */}
      <View style={styles.periodSelector}>
        {[
          { label: "Last 7 Days", val: 7 },
          { label: "Monthly", val: 365 },
        ].map(({ label, val }) => (
          <TouchableOpacity
            key={val}
            style={[styles.periodTab, days === val && styles.periodTabActive]}
            onPress={() => setDays(val)}
            activeOpacity={0.8}
          >
            <Text style={[styles.periodTabText, days === val && styles.periodTabTextActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loaderText}>Aggregating ledger data...</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ══════════════════════════════════════════
              SECTION 1 — Ledger Trends Chart (First Priority)
          ══════════════════════════════════════════ */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>
                {isMonthly ? "Monthly Ledger Trends" : "Daily Ledger Trends"}
              </Text>
              <View style={styles.legendRow}>
                <View style={styles.legendDot}>
                  <View style={[styles.dot, { backgroundColor: Colors.error }]} />
                  <Text style={styles.legendText}>Sales</Text>
                </View>
                <View style={styles.legendDot}>
                  <View style={[styles.dot, { backgroundColor: Colors.primary }]} />
                  <Text style={styles.legendText}>Collected</Text>
                </View>
              </View>
            </View>
            {renderBarChart()}
            {chartData.length === 0 && (
              <Text style={styles.emptyNote}>No transactions in this period.</Text>
            )}
          </View>

          {/* ══════════════════════════════════════════
              SECTION 2 — Collection Rate Meter (Second Priority)
          ══════════════════════════════════════════ */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Collection Rate & Progress</Text>
            {renderCollectionRate()}
          </View>

          {/* ══════════════════════════════════════════
              SECTION 3 — Summary Metric Grid (Third Priority)
          ══════════════════════════════════════════ */}
          <Text style={styles.sectionHeading}>
            {days === 7 ? "Weekly" : "Yearly"} Summary
          </Text>
          <View style={styles.summaryGrid}>
            {/* Total Sales */}
            <View style={[styles.summaryCard, styles.summaryCardWide]}>
              <View style={[styles.summaryIconWrap, { backgroundColor: Colors.errorBg }]}>
                <Feather name="trending-up" size={14} color={Colors.error} />
              </View>
              <Text style={styles.summaryCardLabel}>Total Sales</Text>
              <Text style={[styles.summaryCardValue, { color: Colors.error }]}>
                {formatCurrency(totalSales, currencyCode)}
              </Text>
            </View>

            {/* Collections */}
            <View style={[styles.summaryCard, styles.summaryCardWide]}>
              <View style={[styles.summaryIconWrap, { backgroundColor: Colors.primaryGlow }]}>
                <Feather name="arrow-down-circle" size={14} color={Colors.primary} />
              </View>
              <Text style={styles.summaryCardLabel}>Collections</Text>
              <Text style={[styles.summaryCardValue, { color: Colors.primary }]}>
                {formatCurrency(collected, currencyCode)}
              </Text>
            </View>

            {/* Outstanding */}
            <View style={[styles.summaryCard, styles.summaryCardWide]}>
              <View style={[styles.summaryIconWrap, { backgroundColor: Colors.errorBg }]}>
                <Feather name="clock" size={14} color={Colors.error} />
              </View>
              <Text style={styles.summaryCardLabel}>Outstanding</Text>
              <Text style={[styles.summaryCardValue, { color: Colors.error }]}>
                {formatCurrency(outstanding, currencyCode)}
              </Text>
            </View>

            {/* Customers Added */}
            <View style={[styles.summaryCard, styles.summaryCardWide]}>
              <View style={[styles.summaryIconWrap, { backgroundColor: "rgba(95, 94, 90, 0.08)" }]}>
                <Feather name="user-plus" size={14} color={Colors.neutralLight} />
              </View>
              <Text style={styles.summaryCardLabel}>Customers Added</Text>
              <Text style={[styles.summaryCardValue, { color: Colors.neutralLight }]}>
                {customersAdded}
              </Text>
            </View>
          </View>

          {/* ══════════════════════════════════════════
              SECTION 4 — Top Customers (highest pending)
          ══════════════════════════════════════════ */}
          {topDebtors.length > 0 && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Highest Pending Accounts</Text>
              {topDebtors.map((customer, idx) => {
                const bal = parseFloat(customer.balance || 0);
                const share = totalSales > 0 ? Math.min(100, (bal / totalSales) * 100) : 0;
                return (
                  <View key={customer.id} style={styles.debtorRow}>
                    <View style={styles.debtorRank}>
                      <Text style={styles.debtorRankText}>#{idx + 1}</Text>
                    </View>
                    <View style={styles.debtorInfo}>
                      <View style={styles.debtorTop}>
                        <Text style={styles.debtorName} numberOfLines={1}>{customer.name}</Text>
                        <Text style={[styles.debtorBalance, { color: Colors.error }]}>
                          {formatCurrency(bal, currencyCode)}
                        </Text>
                      </View>
                      <View style={styles.debtorBarBg}>
                        <View style={[styles.debtorBarFill, { width: `${share}%` }]} />
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          <View style={{ height: 20 }} />
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

  // ── Header ──
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: "500",
    color: Colors.textPrimary,
  },
  placeholder: { width: 40 },

  // ── Period ──
  periodSelector: {
    flexDirection: "row",
    backgroundColor: Colors.bgInput,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 14,
    padding: 4,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  periodTabActive: {
    backgroundColor: Colors.primary, // Teal fill
  },
  periodTabText: {
    fontFamily: "Manrope_500Medium",
    color: Colors.textSecondary,
    fontSize: 13,
  },
  periodTabTextActive: {
    color: Colors.white,
    fontFamily: "Manrope_500Medium",
  },

  // ── Loader ──
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    fontFamily: "Manrope_400Regular",
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 12,
  },

  // ── Scroll ──
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  // ── Section heading ──
  sectionHeading: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 13,
    fontWeight: "500",
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 14,
  },

  // ── Summary Grid ──
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: Colors.bgCard,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 18,
    padding: 16,
  },
  summaryCardWide: {
    width: (width - 40 - 12) / 2,
  },
  summaryIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.primaryGlow,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryCardLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  summaryCardValue: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 20,
    fontWeight: "500",
  },

  // ── Section Card ──
  sectionCard: {
    backgroundColor: Colors.bgCard,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 15,
    color: Colors.white,
    marginBottom: 14,
  },
  legendRow: {
    flexDirection: "row",
    gap: 12,
  },
  legendDot: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: Colors.textSecondary,
  },
  emptyNote: {
    fontFamily: "Manrope_400Regular",
    color: Colors.textMuted,
    textAlign: "center",
    fontSize: 13,
    paddingVertical: 12,
  },

  // ── Bar Chart ──
  chartOuter: {
    marginTop: 4,
  },
  chartBarsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: CHART_HEIGHT,
    gap: 4,
  },
  chartCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  barsGroup: {
    flexDirection: "row",
    gap: 2,
    alignItems: "flex-end",
  },
  bar: {
    width: 6,
    borderRadius: 3,
  },
  barLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 9,
    color: Colors.textMuted,
    marginTop: 5,
    width: 60,
    textAlign: "center",
  },
  barLabelPlaceholder: {
    height: 12,
    marginTop: 5,
  },
  chartBaseline: {
    height: 1,
    backgroundColor: Colors.border,
    marginTop: 2,
  },

  // ── Top Debtors ──
  debtorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 10,
  },
  debtorRank: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.bgElevated,
    justifyContent: "center",
    alignItems: "center",
  },
  debtorRankText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 10,
    color: Colors.textMuted,
  },
  debtorInfo: {
    flex: 1,
  },
  debtorTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  debtorName: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: Colors.white,
    flex: 1,
    marginRight: 8,
  },
  debtorBalance: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 13,
    fontWeight: "500",
  },
  debtorBarBg: {
    height: 4,
    backgroundColor: Colors.bgElevated,
    borderRadius: 2,
    overflow: "hidden",
  },
  debtorBarFill: {
    height: "100%",
    backgroundColor: Colors.error,
    borderRadius: 2,
  },

  // ── Collection Rate ──
  rateRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    alignItems: "flex-start",
  },
  rateBlock: {
    alignItems: "center",
    gap: 8,
  },
  rateCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  collectedCircle: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryGlow,
  },
  pendingCircle: {
    borderColor: Colors.error,
    backgroundColor: "rgba(255,74,90,0.08)",
  },
  ratePercent: {
    fontSize: 18,
    fontWeight: "900",
    color: Colors.primary,
  },
  rateLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textSecondary,
  },
  rateDivider: {
    width: 1,
    height: 72,
    backgroundColor: Colors.borderLight,
    alignSelf: "center",
  },
  rateBarWrapper: {
    flex: 1,
    minWidth: 120,
    paddingTop: 4,
  },
  rateBarLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  rateBarBg: {
    height: 10,
    backgroundColor: Colors.bgElevated,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 8,
  },
  rateBarFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  rateBarFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rateBarSubL: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: "700",
  },
  rateBarSubR: {
    fontSize: 10,
    color: Colors.error,
    fontWeight: "700",
  },
});

export default AnalyticsScreen;
