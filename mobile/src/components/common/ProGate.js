// src/components/common/ProGate.js
// Reusable component that gates content behind a Pro subscription.
// For "blur" mode: shows real content but blurred with an upgrade CTA overlay.
// For "hide" mode: replaces content with a locked card.
// For "badge" mode: shows a small PRO badge on top of the children (for buttons/icons).

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import useSubscriptionStore from "../../store/subscriptionStore";

/**
 * ProGate wraps any content and guards it behind a PRO subscription.
 *
 * Props:
 *   feature      {string}   - Feature key (e.g. "ai_parsing", "analytics")
 *   mode         {string}   - "blur" | "badge" | "hide" (default: "hide")
 *   navigation   {object}   - React Navigation object (to open SubscriptionScreen)
 *   children     {ReactNode}
 *   label        {string}   - Optional short label for the locked card
 */
const ProGate = ({ feature, mode = "hide", navigation, children, label }) => {
  const { canUse, plan } = useSubscriptionStore();

  // If the user has access, just render children normally
  if (canUse(feature)) {
    return <>{children}</>;
  }

  const openUpgrade = () => {
    if (navigation) {
      navigation.navigate("Subscription");
    }
  };

  // ── Badge mode: renders children with a small PRO lock badge ──────────────
  if (mode === "badge") {
    return (
      <View style={styles.badgeWrapper}>
        {children}
        <TouchableOpacity style={styles.badgeTag} onPress={openUpgrade} activeOpacity={0.85}>
          <Feather name="lock" size={9} color={Colors.accentText} />
          <Text style={styles.badgeTagText}>PRO</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Blur mode: renders blurred children + overlay ─────────────────────────
  if (mode === "blur") {
    return (
      <View style={styles.blurWrapper}>
        {/* Actual content, visually blurred via opacity */}
        <View style={styles.blurredContent} pointerEvents="none">
          {children}
        </View>

        {/* Full overlay with upgrade CTA */}
        <View style={styles.blurOverlay}>
          <View style={styles.blurCTACard}>
            <View style={styles.proIconCircle}>
              <Feather name="star" size={20} color={Colors.accentText} />
            </View>
            <Text style={styles.blurTitle}>Pro Feature</Text>
            <Text style={styles.blurSubtitle}>
              {label || "Upgrade to Udhari Pro to unlock this feature."}
            </Text>
            <TouchableOpacity style={styles.upgradeBtn} onPress={openUpgrade} activeOpacity={0.85}>
              <Feather name="zap" size={13} color={Colors.white} style={{ marginRight: 6 }} />
              <Text style={styles.upgradeBtnText}>Upgrade to Pro · ₹299/mo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // ── Hide mode (default): replaces content with locked card ────────────────
  return (
    <View style={styles.lockedCard}>
      <View style={styles.proIconCircle}>
        <Feather name="lock" size={18} color={Colors.accentText} />
      </View>
      <Text style={styles.lockedTitle}>Pro Feature</Text>
      <Text style={styles.lockedSubtitle}>
        {label || "This feature is available on Udhari Pro."}
      </Text>
      <TouchableOpacity style={styles.upgradeBtn} onPress={openUpgrade} activeOpacity={0.85}>
        <Feather name="zap" size={13} color={Colors.white} style={{ marginRight: 6 }} />
        <Text style={styles.upgradeBtnText}>Upgrade to Pro · ₹299/mo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // ── Badge Mode ──
  badgeWrapper: {
    position: "relative",
  },
  badgeTag: {
    position: "absolute",
    top: -4,
    right: -4,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: Colors.accentLight,
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeTagText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 8,
    color: Colors.accentText,
    letterSpacing: 0.5,
  },

  // ── Blur Mode ──
  blurWrapper: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  blurredContent: {
    opacity: 0.08,
    flex: 1,
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(241, 239, 232, 0.72)",
    padding: 24,
  },
  blurCTACard: {
    backgroundColor: Colors.bgCard,
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    width: "100%",
    maxWidth: 340,
    borderWidth: 1,
    borderColor: Colors.accent,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  blurTitle: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 18,
    color: Colors.textPrimary,
    marginTop: 12,
    marginBottom: 6,
  },
  blurSubtitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 18,
  },

  // ── Hide Mode (locked card) ──
  lockedCard: {
    margin: 16,
    backgroundColor: Colors.bgCard,
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  lockedTitle: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 17,
    color: Colors.textPrimary,
    marginTop: 12,
    marginBottom: 6,
  },
  lockedSubtitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 18,
  },

  // ── Shared: Pro icon circle + upgrade button ──
  proIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.accentLight,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  upgradeBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.accent,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 12,
  },
  upgradeBtnText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: Colors.accentText,
  },
});

export default ProGate;
