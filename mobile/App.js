import React from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { CustomAlert, customAlert } from "./src/components/common/CustomAlert";

// Globally override React Native's default native popups with our custom themed modals
Alert.alert = customAlert;

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AppNavigator />
      <CustomAlert />
    </SafeAreaProvider>
  );
}



