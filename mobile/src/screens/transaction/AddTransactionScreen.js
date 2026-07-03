// src/screens/transaction/AddTransactionScreen.js
// Screen to record new transactions (CREDIT, PAYMENT, or DEBIT).
// Dynamically adjusts form fields and color themes based on type.
// Includes rapid-entry preset buttons, credit-limit checks, and validation.

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  StatusBar,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTransactionStore from "../../store/transactionStore";
import useCustomerStore from "../../store/customerStore";
import useShopStore from "../../store/shopStore";
import Colors from "../../constants/colors";
import { formatCurrency } from "../../utils/format";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { Feather } from "@expo/vector-icons";
import { parseTransactionWithAI } from "../../services/transactionService";
import { checkOnlineStatus, queueOfflineTransaction } from "../../utils/syncManager";
let ExpoSpeechRecognitionModule = null;
let useSpeechRecognitionEvent = () => {};

try {
  const speechModule = require("expo-speech-recognition");
  ExpoSpeechRecognitionModule = speechModule.ExpoSpeechRecognitionModule;
  useSpeechRecognitionEvent = speechModule.useSpeechRecognitionEvent;
} catch (e) {
  console.warn("expo-speech-recognition native module not available. Running on Expo Go fallback.");
}

const localFallbackParseMobile = (text) => {
  let amount = 0;
  const priceRegex = /(?:rs\.?\s*|₹\s*|rupees\s*)?(\d+(?:\.\d{1,2})?)(?:\s*(?:rs\.?|rupees|r|₹))?/gi;
  const unitRegex = /^\s*(?:kg|g|l|ml|packet|packets|pc|pcs|piece|pieces|litre|litres|liter|liters|box|boxes|pkt|pkts|dozen|doz|bag|bags|meter|meters|m|ft|inch|inches)\b/i;
  
  let match;
  let matches = [];
  let sanitizedText = text;
  
  while ((match = priceRegex.exec(text)) !== null) {
    const val = parseFloat(match[1]);
    if (!isNaN(val) && val > 0) {
      const matchIndex = match.index;
      const numMatch = match[1];
      const numPos = match[0].indexOf(numMatch);
      const afterNumIndex = matchIndex + numPos + numMatch.length;
      const suffix = text.substring(afterNumIndex);
      
      if (unitRegex.test(suffix)) {
        continue;
      }
      matches.push({ text: match[0], val });
    }
  }
  
  matches.sort((a, b) => b.text.length - a.text.length);
  
  for (const item of matches) {
    sanitizedText = sanitizedText.replace(item.text, "");
    amount += item.val;
  }
  
  let description = sanitizedText
    .replace(/\s+/g, " ")
    .replace(/,\s*,/g, ",")
    .replace(/^(?:and|for|•|\s|,)+|(?:and|for|•|\s|,)+$/gi, "")
    .trim();
  
  if (!description) {
    description = text;
  }
  
  return { amount, description };
};

const evaluateMathExpression = (str) => {
  if (!str) return null;
  const sanitized = str.replace(/[^0-9+\-*/.\s]/g, "");
  if (!sanitized.trim()) return null;
  // Ensure we don't evaluate double operators or trailing operators (which would fail)
  if (/[+\-*/]{2,}/.test(sanitized) || /[+\-*/]$/.test(sanitized.trim())) {
    return null;
  }
  try {
    const fn = new Function(`return (${sanitized})`);
    const val = fn();
    if (typeof val === "number" && isFinite(val) && !isNaN(val) && val >= 0) {
      return val;
    }
  } catch (e) {
    // ignore
  }
  return null;
};

const AddTransactionScreen = ({ route, navigation }) => {
  const { customerId, type } = route.params; // type: 'CREDIT' or 'PAYMENT' or 'DEBIT'

  const {
    customers,
  } = useCustomerStore();

  const {
    addCredit,
    addPayment,
    addDebit,
    isActionLoading,
    error: storeError,
    clearError,
  } = useTransactionStore();

  const { shop } = useShopStore();
  const currencyCode = shop?.currency || "INR";

  const customer = customers.find((c) => c.id === customerId);

  // ── Form State ─────────────────────────────────────────
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH"); // defaults to cash for PAYMENT

  const [errors, setErrors] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiParse = async () => {
    const plan = shop?.subscriptions?.[0]?.plan || "FREE";
    if (plan !== "PRO") {
      Alert.alert(
        "Pro Feature Required",
        "AI Transaction Parsing is a Pro-only feature. Please upgrade your plan to unlock AI features.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Upgrade Plan",
            onPress: () => navigation.navigate("Settings", { screen: "Subscription" }),
          },
        ]
      );
      return;
    }

    const textToParse = description.trim();
    if (!textToParse) {
      Alert.alert("AI Entry Helper", "Please voice enter or type some details first (e.g. '5kg chawal 400'), then tap AI to extract fields.");
      return;
    }

    setIsAiLoading(true);
    try {
      const res = await parseTransactionWithAI(textToParse);
      if (res && res.success && res.data) {
        const { amount: extractedAmount, description: cleanedDescription } = res.data;
        if (extractedAmount > 0) {
          setAmount(extractedAmount.toString());
        }
        if (cleanedDescription) {
          setDescription(cleanedDescription);
        }
        // clear any validation errors
        setErrors((prev) => ({ ...prev, amount: null, description: null }));
      } else {
        Alert.alert("AI Helper", "Unable to extract items or amounts from the text.");
      }
    } catch (e) {
      console.warn("AI parse backend request failed, falling back to local client parsing:", e);
      // Run offline local parsing directly on the device!
      const offlineResult = localFallbackParseMobile(textToParse);
      if (offlineResult.amount > 0) {
        setAmount(offlineResult.amount.toString());
      }
      if (offlineResult.description) {
        setDescription(offlineResult.description);
      }
      setErrors((prev) => ({ ...prev, amount: null, description: null }));
    } finally {
      setIsAiLoading(false);
    }
  };

  // Speech Recognition hook listeners
  useSpeechRecognitionEvent("start", () => setIsListening(true));
  useSpeechRecognitionEvent("end", () => setIsListening(false));
  useSpeechRecognitionEvent("result", (event) => {
    if (event.results && event.results[0]) {
      setDescription(event.results[0].transcript);
    }
  });
  useSpeechRecognitionEvent("error", (event) => {
    if (event.error !== "no-speech") {
      console.log("Speech recognition error:", event.error);
    }
    setIsListening(false);
  });

  const toggleListening = async () => {
    const plan = shop?.subscriptions?.[0]?.plan || "FREE";
    if (plan === "FREE") {
      Alert.alert(
        "Premium Feature Required",
        "Voice entries are only supported in our BASIC and PRO plans. Please upgrade your plan to unlock voice entry.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Upgrade Plan",
            onPress: () => navigation.navigate("Settings", { screen: "Subscription" }),
          },
        ]
      );
      return;
    }

    if (!ExpoSpeechRecognitionModule) {
      Alert.alert(
        "Voice Input Status",
        "Voice input is only supported in native development builds. Please check permissions or type manually."
      );
      return;
    }

    if (isListening) {
      try {
        await ExpoSpeechRecognitionModule.stop();
      } catch (err) {
        console.warn(err);
        setIsListening(false);
      }
    } else {
      try {
        const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        if (!result.granted) {
          Alert.alert("Permission Required", "Microphone and speech recognition permission is required for voice entry.");
          return;
        }
        setIsListening(true);
        await ExpoSpeechRecognitionModule.start({
          lang: "en-IN", // Set to English (India-friendly locale) to help shopkeepers
          interimResults: true,
          maxAlternatives: 1, // Only return the single best transcription match
          continuous: true, // Allow continuous listening without cutting off during pauses
        });
      } catch (err) {
        console.warn("Speech recognition not supported or not running in development build:", err);
        Alert.alert(
          "Voice Input Status",
          "Voice input is only supported in native development builds. Please check permissions."
        );
        setIsListening(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      clearError();
    };
  }, []);

  if (!customer) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Customer not found.</Text>
      </View>
    );
  }

  // ── Presets for rapid entry ──
  const presets = [100, 200, 500, 1000, 2000];

  const handlePresetPress = (val) => {
    const trimmed = amount.trim();
    if (!trimmed || trimmed === "0") {
      setAmount(val.toString());
    } else {
      const lastChar = trimmed[trimmed.length - 1];
      if (["+", "-", "*", "/"].includes(lastChar)) {
        setAmount(trimmed + val);
      } else {
        setAmount(trimmed + "+" + val);
      }
    }
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: null }));
  };

  const validate = () => {
    const tempErrors = {};
    const trimmed = amount.trim();
    if (!trimmed) {
      tempErrors.amount = "Rashi (Amount) is required";
    } else {
      const numericAmount = evaluateMathExpression(trimmed) ?? parseFloat(trimmed);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        tempErrors.amount = "Rashi must be a positive number";
      } else if (numericAmount > 9999999) {
        tempErrors.amount = "Rashi cannot exceed ₹99,99,999";
      }

      // Check credit limit for CREDIT transactions
      if (type === "CREDIT") {
        const balance = parseFloat(customer.balance || 0);
        const limit = parseFloat(customer.creditLimit || 0);
        if (limit > 0 && balance + numericAmount > limit) {
          tempErrors.amount = `This exceeds the Udhari Limit of ${formatCurrency(limit, currencyCode)}. Current Khata balance: ${formatCurrency(balance, currencyCode)}`;
        }
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = async () => {
    Keyboard.dismiss();
    if (!validate()) return;

    const evaluatedAmount = evaluateMathExpression(amount.trim()) ?? parseFloat(amount.trim());

    const txnData = {
      amount: evaluatedAmount,
      description: description.trim() || undefined,
      referenceNumber: referenceNumber.trim() || undefined,
      ...(type === "PAYMENT" && { paymentMethod }),
    };

    // Offline intercept check
    const isOnline = await checkOnlineStatus();
    if (!isOnline) {
      const typeLower = type.toLowerCase(); // 'credit', 'payment', 'debit'
      await queueOfflineTransaction(customerId, typeLower, txnData, customer.name);

      // Trigger warning haptic for offline queuing
      try {
        const Haptics = require("expo-haptics");
        if (Haptics && typeof Haptics.notificationAsync === "function") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }
      } catch (e) {}

      Alert.alert(
        "Saved Offline ⏳",
        "Your transaction has been recorded locally. It will automatically sync to the ledger when your network connection is restored.",
        [
          {
            text: "Ok",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
      return;
    }

    let result;
    if (type === "CREDIT") {
      result = await addCredit(customerId, txnData);
    } else if (type === "PAYMENT") {
      result = await addPayment(customerId, txnData);
    } else {
      result = await addDebit(customerId, txnData);
    }

    if (result) {
      // Trigger success haptic feedback
      try {
        const Haptics = require("expo-haptics");
        if (Haptics && typeof Haptics.notificationAsync === "function") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      } catch (e) {}
      
      navigation.goBack();
    }
  };

  // Determine colors based on transaction type
  const isCredit = type === "CREDIT";
  const isPayment = type === "PAYMENT";
  const themeColor = isCredit ? Colors.error : isPayment ? Colors.success : Colors.primary;
  const pageTitle = isCredit
    ? "Diya (You Gave Udhari)"
    : isPayment
    ? "Mila (You Got Payment)"
    : "Adjustment Entry";

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgDark} />

      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="x" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{pageTitle}</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {storeError && (
            <View style={styles.alertContainer}>
              <Text style={styles.alertText}>{storeError}</Text>
            </View>
          )}

          {/* Customer mini card */}
          <View style={styles.customerSummaryCard}>
            <View style={styles.customerMeta}>
              <Text style={styles.customerLabel}>Grahak Name</Text>
              <Text style={styles.customerName}>{customer.name}</Text>
            </View>
            <View style={styles.customerBalanceMeta}>
              <Text style={styles.customerLabel}>Khata Balance</Text>
              <Text
                style={[
                  styles.customerBalance,
                  { color: parseFloat(customer.balance) < 0 ? Colors.success : Colors.error },
                ]}
              >
                {formatCurrency(Math.abs(parseFloat(customer.balance)), currencyCode)}
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            {/* Amount Field (Big typography) */}
            <View style={styles.amountFieldWrapper}>
              <Text style={styles.amountSymbol}>{isCredit ? "+" : "-"}</Text>
              <TextInput
                style={[
                  styles.amountInput,
                  { color: themeColor },
                  errors.amount && styles.amountInputError,
                ]}
                placeholder="₹0.00"
                placeholderTextColor={Colors.textPlaceholder}
                value={amount}
                onChangeText={(text) => {
                  setAmount(text);
                  if (errors.amount) setErrors((prev) => ({ ...prev, amount: null }));
                }}
                keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"}
                autoFocus={true}
                maxLength={30}
              />
            </View>
            {errors.amount ? (
              <Text style={styles.fieldErrorText}>{errors.amount}</Text>
            ) : (
              amount.trim() && evaluateMathExpression(amount) !== null && evaluateMathExpression(amount) !== parseFloat(amount) ? (
                <Text style={styles.calcPreview}>
                  Hisaab Preview: {formatCurrency(evaluateMathExpression(amount), currencyCode)}
                </Text>
              ) : null
            )}

            {/* Presets Row */}
            <View style={styles.presetsRow}>
              {presets.map((val) => (
                <TouchableOpacity
                  key={val}
                  onPress={() => handleSave ? handlePresetPress(val) : null}
                  style={styles.presetBtn}
                  activeOpacity={0.7}
                >
                  <Text style={styles.presetText}>+{val}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Payment Method Selector (Only for PAYMENT) */}
            {isPayment && (
              <View style={styles.selectorWrapper}>
                <Text style={styles.label}>Mila Kaise (Payment Method)</Text>
                <View style={styles.methodList}>
                  {["CASH", "UPI", "BANK_TRANSFER", "CHEQUE", "OTHER"].map((method) => (
                    <TouchableOpacity
                      key={method}
                      style={[
                        styles.methodBtn,
                        paymentMethod === method && styles.methodBtnActive,
                      ]}
                      onPress={() => setPaymentMethod(method)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.methodText,
                          paymentMethod === method && styles.methodTextActive,
                        ]}
                      >
                        {method.replace("_", " ")}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

             {/* Description */}
             <View style={styles.descriptionContainer}>
               <Text style={[styles.inputLabel, { marginBottom: 8 }]}>
                 {isCredit ? "Khata details (Items / Description) *" : "Notes"}
               </Text>
               <View style={styles.headerButtonsRow}>
                 <TouchableOpacity
                   onPress={toggleListening}
                   style={[
                     styles.micButton,
                     isListening && styles.micButtonActive,
                     { flex: 1, justifyContent: "center" }
                   ]}
                   activeOpacity={0.7}
                 >
                   <Feather
                     name={isListening ? "mic-off" : "mic"}
                     size={14}
                     color={isListening ? Colors.white : Colors.primary}
                   />
                   <Text
                     style={[
                       styles.micButtonText,
                       { color: isListening ? Colors.white : Colors.primary },
                     ]}
                   >
                     {isListening ? "Stop" : "Voice Entry"}
                   </Text>
                 </TouchableOpacity>

                 <TouchableOpacity
                   onPress={handleAiParse}
                   style={[styles.aiButton, { flex: 1, justifyContent: "center" }]}
                   activeOpacity={0.7}
                   disabled={isAiLoading}
                 >
                   {isAiLoading ? (
                     <ActivityIndicator size="small" color={Colors.white} />
                   ) : (
                     <>
                       <Feather name="zap" size={14} color={Colors.white} />
                       <Text style={styles.aiButtonText}>AI Parse</Text>
                     </>
                   )}
                 </TouchableOpacity>
               </View>
              <Input
                placeholder={isCredit ? "e.g. 5kg rice, tea packets" : "e.g. Paid cash at counter"}
                value={description}
                onChangeText={setDescription}
                error={errors.description}
                multiline={true}
                numberOfLines={2}
              />
            </View>

            {/* Reference Number (cheque, transaction id, bill id) */}
            <Input
              label={isPayment ? "UPI ID / Transaction Number (Optional)" : "Bill / Invoice Number (Optional)"}
              placeholder="e.g. UPI-92837482"
              value={referenceNumber}
              onChangeText={setReferenceNumber}
            />

            {/* Save Button */}
            <Button
              title={isCredit ? "Diya (Confirm Udhari)" : isPayment ? "Mila (Confirm Payment)" : "Save Adjustment"}
              onPress={handleSave}
              isLoading={isActionLoading}
              variant={isCredit ? "error" : isPayment ? "success" : "primary"}
              style={[styles.saveBtn, { backgroundColor: themeColor }]}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  backText: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontWeight: "700",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.white,
  },
  placeholder: {
    width: 40,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: Colors.bgDark,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: Colors.error,
    fontSize: 16,
    fontWeight: "700",
  },
  alertContainer: {
    backgroundColor: Colors.errorBg,
    borderWidth: 1,
    borderColor: "rgba(255, 107, 107, 0.2)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  alertText: {
    color: Colors.error,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  customerSummaryCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 16,
  },
  customerMeta: {
    flex: 1,
  },
  customerBalanceMeta: {
    alignItems: "flex-end",
  },
  customerLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textMuted,
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 0.8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.white,
  },
  customerBalance: {
    fontSize: 16,
    fontWeight: "800",
  },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  amountFieldWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderBottomWidth: 1.5,
    borderColor: Colors.border,
    marginBottom: 14,
  },
  amountSymbol: {
    fontSize: 36,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginRight: 8,
  },
  amountInput: {
    fontSize: 44,
    fontWeight: "800",
    textAlign: "center",
    minWidth: 150,
  },
  amountInputError: {
    borderBottomColor: Colors.error,
  },
  fieldErrorText: {
    color: Colors.error,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginTop: -8,
    marginBottom: 16,
  },
  calcPreview: {
    color: Colors.primaryLight,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    marginTop: -8,
    marginBottom: 16,
  },
  presetsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 24,
  },
  presetBtn: {
    flex: 1,
    backgroundColor: Colors.bgElevated,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  presetText: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  selectorWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textSecondary,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  methodList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  methodBtn: {
    backgroundColor: Colors.bgInput,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  methodBtnActive: {
    backgroundColor: Colors.successBg,
    borderColor: Colors.success,
  },
  methodText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: "700",
  },
  methodTextActive: {
    color: Colors.success,
  },
  saveBtn: {
    marginTop: 8,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  micButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgElevated,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  micButtonActive: {
    backgroundColor: Colors.error,
    borderColor: Colors.error,
  },
  micButtonText: {
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 4,
  },
  headerButtonsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  aiButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  aiButtonText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 4,
  },
});

export default AddTransactionScreen;
