import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Platform,
} from "react-native";
import Colors from "../../constants/colors";

let alertRef = null;

export const setAlertRef = (ref) => {
  alertRef = ref;
};

// Global Custom Alert trigger
export const customAlert = (title, message, buttons, options) => {
  if (alertRef) {
    alertRef.show(title, message, buttons, options);
  } else {
    console.warn("CustomAlert reference not set. Alert details:", title, message);
  }
};

export const CustomAlert = () => {
  const [visible, setVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    buttons: [],
    options: {},
  });

  const show = (title, message, buttons, options = {}) => {
    setAlertConfig({
      title,
      message,
      buttons: buttons || [{ text: "OK" }],
      options,
    });
    setVisible(true);
    if (Platform.OS !== "ios") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  };

  const hide = () => {
    setVisible(false);
    if (Platform.OS !== "ios") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  };

  useEffect(() => {
    setAlertRef({ show });
    return () => {
      setAlertRef(null);
    };
  }, []);

  const handleButtonPress = (btnOnPress) => {
    hide();
    if (btnOnPress) {
      // Delay action slightly to allow the modal close animation to finish smoothly
      setTimeout(() => {
        btnOnPress();
      }, 150);
    }
  };

  const handleBackdropPress = () => {
    if (alertConfig.options?.cancelable) {
      hide();
      const cancelBtn = alertConfig.buttons.find((btn) => btn.style === "cancel");
      if (cancelBtn?.onPress) {
        cancelBtn.onPress();
      }
    }
  };

  if (!visible) return null;

  const { title, message, buttons } = alertConfig;

  // Determine button placement
  const isHorizontal = buttons.length === 2;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleBackdropPress}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.alertBox}>
              {title ? <Text style={styles.title}>{title}</Text> : null}
              {message ? <Text style={styles.message}>{message}</Text> : null}

              <View style={[styles.buttonContainer, isHorizontal ? styles.horizontalRow : styles.verticalStack]}>
                {buttons.map((btn, index) => {
                  const isCancel = btn.style === "cancel";
                  const isDestructive = btn.style === "destructive";

                  let btnStyle = styles.defaultBtn;
                  let txtStyle = styles.defaultBtnText;

                  if (isCancel) {
                    btnStyle = styles.cancelBtn;
                    txtStyle = styles.cancelBtnText;
                  } else if (isDestructive) {
                    btnStyle = styles.destructiveBtn;
                    txtStyle = styles.destructiveBtnText;
                  }

                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        btnStyle,
                        isHorizontal && { flex: 1 },
                      ]}
                      onPress={() => handleButtonPress(btn.onPress)}
                      activeOpacity={0.8}
                    >
                      <Text style={txtStyle}>{btn.text}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  alertBox: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: Colors.bgCard,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 24,
  },
  buttonContainer: {
    width: "100%",
    gap: 10,
  },
  horizontalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  verticalStack: {
    flexDirection: "column",
  },
  defaultBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  defaultBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
  cancelBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtnText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: "700",
  },
  destructiveBtn: {
    backgroundColor: Colors.error,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  destructiveBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
});
