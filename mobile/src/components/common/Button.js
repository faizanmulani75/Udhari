// src/components/common/Button.js
// Reusable premium button component with touchable feedback, loading spinners, and presets.

import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const Button = ({
  title,
  onPress,
  variant = "primary", // 'primary', 'secondary', 'error', 'outline'
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  ...props
}) => {
  const isButtonDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      style={[
        styles.baseButton,
        styles[variant],
        isButtonDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isButtonDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === "outline" ? Colors.primary : Colors.white} size="small" />
      ) : (
        <Text style={[styles.text, styles[`text_${variant}`], textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  primary: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  secondary: {
    backgroundColor: Colors.bgElevated,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  error: {
    backgroundColor: Colors.error,
    shadowColor: Colors.error,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  success: {
    backgroundColor: Colors.success,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 15,
    fontWeight: "700",
  },
  text_primary: {
    color: Colors.white,
  },
  text_secondary: {
    color: Colors.textPrimary,
  },
  text_error: {
    color: Colors.white,
  },
  text_outline: {
    color: Colors.primaryLight,
  },
  text_success: {
    color: Colors.white,
  },
});

export default Button;
