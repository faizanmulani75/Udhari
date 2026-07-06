import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import Config from "../constants/config";
import * as transactionService from "../services/transactionService";

const OFFLINE_KEY = "offline_transactions_queue";

/**
 * Verify end-to-end server reachability using a quick ping.
 */
export const checkOnlineStatus = async () => {
  try {
    // 1. Check local network connection status first (instant)
    const netState = await NetInfo.fetch();
    if (!netState.isConnected || netState.isInternetReachable === false) {
      console.log("🌐 checkOnlineStatus: NetInfo reports device is offline.");
      return false;
    }

    // 2. Ping health endpoint. Give up to 45 seconds for sleeping free-tier Render servers to spin up.
    const healthUrl = `${Config.API_URL}/health`;
    await axios.get(healthUrl, { timeout: 45000 });
    return true;
  } catch (error) {
    console.warn("🌐 checkOnlineStatus failed. URL:", `${Config.API_URL}/health`, "Error:", error.message || error);
    
    // If the device is connected to the internet but the health check timed out, the backend
    // is likely cold-starting. We assume online so sync calls can hit it and wake it up.
    const isTimeout = error.code === 'ECONNABORTED' || (error.message && error.message.toLowerCase().includes('timeout'));
    if (isTimeout) {
      console.log("🌐 checkOnlineStatus: Health ping timed out. Assuming online to let cold-starting server wake up.");
      return true;
    }
    return false;
  }
};

/**
 * Get all queued transactions from local storage.
 */
export const getOfflineTransactions = async () => {
  try {
    const data = await AsyncStorage.getItem(OFFLINE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.warn("Failed to read offline queue:", error);
    return [];
  }
};

/**
 * Write transactions back to storage.
 */
export const saveOfflineTransactions = async (queue) => {
  try {
    await AsyncStorage.setItem(OFFLINE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.warn("Failed to save offline queue:", error);
  }
};

/**
 * Queue a transaction locally when connection is lost.
 */
export const queueOfflineTransaction = async (customerId, type, data, customerName = "") => {
  const queue = await getOfflineTransactions();
  
  const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const newTx = {
    tempId,
    customerId,
    customerName,
    type, // 'credit' | 'payment' | 'debit'
    data,
    timestamp: new Date().toISOString(),
  };

  queue.push(newTx);
  await saveOfflineTransactions(queue);
  return newTx;
};

export const queueOfflineAction = async (config) => {
  const queue = await getOfflineTransactions();
  
  const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const newTx = {
    tempId,
    type: "generic_action",
    method: config.method,
    url: config.url,
    data: config.data ? (typeof config.data === 'string' ? JSON.parse(config.data) : config.data) : null,
    timestamp: new Date().toISOString(),
  };

  queue.push(newTx);
  await saveOfflineTransactions(queue);
  return newTx;
};

/**
 * Synchronize all queued transactions to the backend server.
 */
export const syncQueuedTransactions = async (onProgressUpdate) => {
  const isOnline = await checkOnlineStatus();
  if (!isOnline) {
    return { success: false, message: "Device is still offline" };
  }

  let queue = await getOfflineTransactions();
  
  // DEBUG: Print the raw queue so we can see what is stuck
  console.log("🗂️ Raw offline queue:", JSON.stringify(queue, null, 2));

  // Clean corrupt or non-syncable entries from the queue:
  // 1. Non-generic transactions with invalid/undefined customerId
  // 2. Generic actions whose URL contains "undefined"
  // 3. Auth-related requests (forgot-password, login, OTP) — never replay these
  const AUTH_URL_PATTERNS = ["/auth/", "/forgot-password", "/send-otp", "/verify-otp", "/login"];
  const cleanQueue = queue.filter(tx => {
    if (tx.type !== "generic_action" && (!tx.customerId || tx.customerId === "undefined")) {
      return false;
    }
    if (tx.type === "generic_action" && tx.url) {
      if (tx.url.includes("undefined")) return false;
      if (AUTH_URL_PATTERNS.some(pattern => tx.url.includes(pattern))) return false;
    }
    return true;
  });

  if (cleanQueue.length !== queue.length) {
    console.log(`🧹 Filtered out ${queue.length - cleanQueue.length} corrupt offline transactions.`);
    await saveOfflineTransactions(cleanQueue);
    queue = cleanQueue;
  }

  if (queue.length === 0) {
    return { success: true, message: "Queue is empty" };
  }

  console.log(`Starting sync for ${queue.length} offline transactions...`);
  const remainingQueue = [];
  let successCount = 0;
  let failCount = 0;

  for (const tx of queue) {
    try {
      if (tx.type === "generic_action") {
        // Use standard axios to avoid circular dependency, but add tokens
        const token = await AsyncStorage.getItem("accessToken");
        const shopId = await AsyncStorage.getItem("shopId");
        
        const response = await axios({
          baseURL: Config.API_URL,
          method: tx.method,
          url: tx.url,
          data: tx.data,
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(shopId && { "x-shop-id": shopId }),
          }
        });

        // If this was a customer creation and succeeded, extract the real database UUID
        if (tx.method?.toLowerCase() === "post" && (tx.url === "/customers" || tx.url === "customers") && response.data?.success) {
          const newCustomerId = response.data.data?.id;
          if (newCustomerId && tx.tempId) {
            console.log(`🔗 Mapping offline customer tempId ${tx.tempId} to new database ID ${newCustomerId}`);
            
            // 1. Update the rest of the current executing queue array so they sync correctly in this same run
            for (const remainingTx of queue) {
              if (remainingTx.customerId === tx.tempId) {
                remainingTx.customerId = newCustomerId;
              }
              if (remainingTx.url && remainingTx.url.includes(tx.tempId)) {
                remainingTx.url = remainingTx.url.replace(tx.tempId, newCustomerId);
              }
              if (remainingTx.data) {
                if (typeof remainingTx.data === "object") {
                  if (remainingTx.data.customerId === tx.tempId) {
                    remainingTx.data.customerId = newCustomerId;
                  }
                }
              }
            }
          }
        }
      } else if (tx.type === "credit") {
        await transactionService.addCredit(tx.customerId, tx.data);
      } else if (tx.type === "payment") {
        await transactionService.addPayment(tx.customerId, tx.data);
      } else if (tx.type === "debit") {
        await transactionService.addDebit(tx.customerId, tx.data);
      }
      successCount++;
      if (onProgressUpdate) {
        onProgressUpdate(successCount, queue.length);
      }
    } catch (error) {
      console.warn(`Failed to sync transaction ${tx.tempId}:`, error);
      remainingQueue.push(tx);
      failCount++;
    }
  }

  await saveOfflineTransactions(remainingQueue);
  return {
    success: true,
    synced: successCount,
    failed: failCount,
  };
};

/**
 * Clear the offline queue.
 */
export const clearSyncQueue = async () => {
  try {
    await AsyncStorage.removeItem(OFFLINE_KEY);
  } catch (error) {
    console.warn("Failed to clear offline queue:", error);
  }
};
