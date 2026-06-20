// src/navigation/AppNavigator.js
// Root navigator — switches between Auth, Onboarding, and Main flows based on auth state.
// Shows a splash/loading screen while hydrating from AsyncStorage.

import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import useAuthStore from "../store/authStore";
import AuthNavigator from "./AuthNavigator";
import ShopSetupScreen from "../screens/onboarding/ShopSetupScreen";
import MainNavigator from "./MainNavigator";
import Colors from "../constants/colors";

// ── Splash Screen (shown while hydrating) ──

const SplashScreen = () => (
  <View style={splashStyles.container}>
    <View style={splashStyles.logoCircle}>
      <Text style={splashStyles.logoText}>₹</Text>
    </View>
    <Text style={splashStyles.appName}>Udhari</Text>
    <ActivityIndicator
      color={Colors.primary}
      size="small"
      style={splashStyles.loader}
    />
  </View>
);

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
    justifyContent: "center",
    alignItems: "center",
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "700",
    color: Colors.white,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.textPrimary,
    letterSpacing: 1,
    marginBottom: 32,
  },
  loader: {
    marginTop: 8,
  },
});

// ── Root Navigator ──

const AppNavigator = () => {
  const { isAuthenticated, shopId, isHydrated, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  // Show splash while checking AsyncStorage
  if (!isHydrated) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AuthNavigator />
      ) : !shopId ? (
        <ShopSetupScreen />
      ) : (
        <MainNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;


