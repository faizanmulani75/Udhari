// src/services/pushNotificationService.js
// Manager service to request permissions, sync push tokens with backend, and handle notification events.

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import Constants from "expo-constants";
import api from "./api";

// Configure foreground notifications behavior (show alert, play sound, show badge)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Register the device for push notifications, retrieve the Expo Push Token, and send it to the backend database.
 */
export const registerForPushNotificationsAsync = async () => {
  let token;

  if (!Device.isDevice) {
    console.log("Must use physical device for Push Notifications.");
    return null;
  }

  try {
    // Check existing permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Ask for permission if not granted yet
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notifications!");
      return null;
    }

    // Get the Expo Push Token
    
    const projectId = Constants.expoConfig?.extra?.eas?.projectId || Constants.easConfig?.projectId;
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId,
    });
    token = tokenData.data;
    console.log("📱 Retrieved Expo Push Token:", token);

    // Sync token with our backend
    await api.post("/auth/push-token", { pushToken: token });
    console.log("🚀 Sync'd push token successfully with database.");

  } catch (error) {
    console.warn("Failed to register/sync push token:", error);
  }

  // Setup channel for Android notifications
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#1D9E75",
    });
  }

  return token;
};

/**
 * Unregister device token (e.g. on user logout)
 */
export const unregisterPushNotificationsAsync = async () => {
  try {
    await api.post("/auth/push-token", { pushToken: null });
    console.log("Cleared push token in backend database.");
  } catch (error) {
    console.warn("Failed to unregister push token:", error);
  }
};
