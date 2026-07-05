import React, { useEffect } from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NetInfo from "@react-native-community/netinfo";
import AppNavigator from "./src/navigation/AppNavigator";
import { CustomAlert, customAlert } from "./src/components/common/CustomAlert";
import { syncQueuedTransactions } from "./src/utils/syncManager";
import "./src/services/api"; // Initialize API interceptors (offline support)
import { useFonts } from "expo-font";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
} from "@expo-google-fonts/plus-jakarta-sans";
import {
  Manrope_400Regular,
  Manrope_500Medium,
} from "@expo-google-fonts/manrope";
import * as SplashScreen from "expo-splash-screen";

// Globally override React Native's default native popups with our custom themed modals
Alert.alert = customAlert;

// Prevent auto-hiding of splash screen until fonts are loaded
SplashScreen.preventAutoHideAsync().catch(() => {});

import useAuthStore from "./src/store/authStore";
import { registerForPushNotificationsAsync } from "./src/services/pushNotificationService";

export default function App() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    Manrope_400Regular,
    Manrope_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

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

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      registerForPushNotificationsAsync().catch(console.error);
    }
  }, [isAuthenticated]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AppNavigator />
      <CustomAlert />
    </SafeAreaProvider>
  );
}
