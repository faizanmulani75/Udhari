// src/components/common/Input.js
// Premium custom TextInput component with labels, icons, error handling, and focus glow animations.

import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const Input = ({
  label,
  error,
  style,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
        ]}
        placeholderTextColor={Colors.textPlaceholder}
        onFocus={(e) => {
          setIsFocused(true);
          if (onFocus) onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  input: {
    fontFamily: "Manrope_400Regular",
    backgroundColor: Colors.bgInput,
    borderRadius: 14,
    color: Colors.textPrimary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputFocused: {
    borderColor: Colors.borderFocus,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    fontFamily: "Manrope_500Medium",
    color: Colors.error,
    fontSize: 11,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default Input;
