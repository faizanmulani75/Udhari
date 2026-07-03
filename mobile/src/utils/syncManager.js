// src/utils/syncManager.js
// Manager to cache, retrieve, queue, and sync transactions logged during network loss.

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Config from "../constants/config";
import * as transactionService from "../services/transactionService";

const OFFLINE_KEY = "offline_transactions_queue";

/**
 * Verify end-to-end server reachability using a quick ping.
 */
export const checkOnlineStatus = async () => {
  try {
    const healthUrl = `${Config.API_URL}/health`;
    await axios.get(healthUrl, { timeout: 3000 });
    return true;
  } catch (error) {
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

  const queue = await getOfflineTransactions();
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
        
        await axios({
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
