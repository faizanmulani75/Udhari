// src/navigation/MainNavigator.js
// Main application navigator (post-auth / post-onboarding).
// Sets up a premium bottom tab bar and nested stack navigators for customer actions.

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../constants/colors";

// Screen imports
import DashboardScreen from "../screens/dashboard/DashboardScreen";
import NotificationScreen from "../screens/dashboard/NotificationScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import SubscriptionScreen from "../screens/settings/SubscriptionScreen";
import ManageStaffScreen from "../screens/settings/ManageStaffScreen";
import AuditLogScreen from "../screens/settings/AuditLogScreen";
import ReminderHistoryScreen from "../screens/settings/ReminderHistoryScreen";
import PendingClaimsScreen from "../screens/settings/PendingClaimsScreen";
import AnalyticsScreen from "../screens/dashboard/AnalyticsScreen";
import CustomerListScreen from "../screens/customers/CustomerListScreen";
import CustomerDetailScreen from "../screens/customers/CustomerDetailScreen";
import AddCustomerScreen from "../screens/customers/AddCustomerScreen";
import AddTransactionScreen from "../screens/transaction/AddTransactionScreen";
import TransactionHistoryScreen from "../screens/transaction/TransactionHistoryScreen";
import GlobalTransactionsScreen from "../screens/transaction/GlobalTransactionsScreen";

import { Feather } from "@expo/vector-icons";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();
const CustomerStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

// ── Settings Stack Navigator ──
const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.bgDark },
        animation: "slide_from_right",
      }}
    >
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <SettingsStack.Screen name="Subscription" component={SubscriptionScreen} />
      <SettingsStack.Screen name="ManageStaff" component={ManageStaffScreen} />
      <SettingsStack.Screen name="AuditLog" component={AuditLogScreen} />
      {/* <SettingsStack.Screen name="ReminderHistory" component={ReminderHistoryScreen} /> */}
    </SettingsStack.Navigator>
  );
};

// ── Customer Stack Navigator ──
// Wraps all customer lists, details, and transactional mutations inside the "Customers" tab context.
const CustomerStackNavigator = () => {
  return (
    <CustomerStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.bgDark },
        animation: "slide_from_right",
      }}
    >
      <CustomerStack.Screen name="CustomerListScreen" component={CustomerListScreen} />
      <CustomerStack.Screen name="CustomerDetailScreen" component={CustomerDetailScreen} />
      <CustomerStack.Screen name="AddCustomerScreen" component={AddCustomerScreen} />
      <CustomerStack.Screen name="AddTransactionScreen" component={AddTransactionScreen} />
      <CustomerStack.Screen
        name="TransactionHistoryScreen"
        component={TransactionHistoryScreen}
      />
    </CustomerStack.Navigator>
  );
};

// ── Tab Bar Icon Helper ──
const TabIcon = ({ name, focused }) => {
  return (
    <View style={styles.iconContainer}>
      <Feather
        name={name}
        size={22}
        color={focused ? Colors.primary : Colors.textMuted}
        style={focused && styles.iconActive}
      />
    </View>
  );
};

// ── Tab Navigator (internal) ──
const TabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          ...styles.tabBar,
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
        },
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ focused }) => {
          let iconName = "bar-chart-2";
          if (route.name === "Dashboard") iconName = "bar-chart-2";
          else if (route.name === "Analytics") iconName = "pie-chart";
          else if (route.name === "Customers") iconName = "users";
          else if (route.name === "Settings") iconName = "settings";

          return <TabIcon name={iconName} focused={focused} />;
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ tabBarLabel: "Khata Summary" }}
      />
      <Tab.Screen 
        name="Analytics" 
        component={AnalyticsScreen} 
        options={{ tabBarLabel: "Hisaab Graph" }}
      />
      <Tab.Screen 
        name="Customers" 
        component={CustomerStackNavigator} 
        options={{ tabBarLabel: "Khata Book" }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsStackNavigator} 
        options={{ tabBarLabel: "Settings" }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.bgCard,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    marginTop: 2,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconActive: {
    transform: [{ scale: 1.1 }],
  },
});

// ── Root Navigator — wraps Tab + full-screen modals ──
const MainNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.bgDark },
        animation: "slide_from_right",
      }}
    >
      <RootStack.Screen name="Tabs" component={TabNavigator} />
      <RootStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ animation: "slide_from_right" }}
      />
      <RootStack.Screen
        name="GlobalTransactionsScreen"
        component={GlobalTransactionsScreen}
        options={{ animation: "slide_from_right" }}
      />
      <RootStack.Screen
        name="PendingClaims"
        component={PendingClaimsScreen}
        options={{ animation: "slide_from_right" }}
      />
    </RootStack.Navigator>
  );
};

export default MainNavigator;
