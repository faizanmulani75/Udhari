import React, { useEffect } from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NetInfo from "@react-native-community/netinfo";
import AppNavigator from "./src/navigation/AppNavigator";
import { CustomAlert, customAlert } from "./src/components/common/CustomAlert";
import { syncQueuedTransactions } from "./src/utils/syncManager";
import "./src/services/api"; // Initialize API interceptors (offline support)

// Globally override React Native's default native popups with our custom themed modals
Alert.alert = customAlert;

export default function App() {
  useEffect(() => {
    // Listen for network state changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable !== false) {
        // We might have just come back online; attempt to sync offline transactions
        syncQueuedTransactions().catch(console.error);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AppNavigator />
      <CustomAlert />
    </SafeAreaProvider>
  );
}
