// src/components/common/EmptyState.js
// Custom empty state template with stylized card container, text instructions, and CTA action buttons.

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import Button from "./Button";

const EmptyState = ({
  emoji = "📂",
  title = "No Items Found",
  subtitle = "Add items to get started.",
  actionTitle,
  onActionPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.card}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {actionTitle && onActionPress && (
          <Button
            title={actionTitle}
            onPress={onActionPress}
            style={styles.button}
            variant="primary"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderLight,
    width: "100%",
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  button: {
    marginTop: 8,
    paddingVertical: 12,
  },
});

export default EmptyState;
