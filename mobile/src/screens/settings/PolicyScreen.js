// src/screens/settings/PolicyScreen.js
// Screen to display mandatory legal policies (T&C, Privacy, Refund, Shipping, Contact) for payment gateways.

import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/colors";

const PolicyScreen = ({ route, navigation }) => {
  const { type } = route.params || { type: "TERMS" };

  const getContent = () => {
    switch (type) {
      case "TERMS":
        return {
          title: "Terms & Conditions",
          lastUpdated: "July 6, 2026",
          sections: [
            {
              heading: "1. Acceptance of Terms",
              body: "By downloading, installing, or using the Udhari application, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the application."
            },
            {
              heading: "2. Description of Service",
              body: "Udhari is a digital ledger and bookkeeping SaaS tool that allows merchants to record credit (Udhaar) and payment history of their customers, send automated reminder notifications, and manage balances."
            },
            {
              heading: "3. User Registration & Security",
              body: "To use the service, you must register and secure your account using an OTP. You are entirely responsible for maintaining the confidentiality of your credentials and all activities logged under your shop profile."
            },
            {
              heading: "4. Permitted Use & Restrictions",
              body: "You agree to record only authentic business transactions. Any use of the application for illegal activities, fraud, or money laundering is strictly prohibited and will lead to immediate account termination."
            },
            {
              heading: "5. Limitation of Liability",
              body: "Udhari is provided 'as is' without warranties of any kind. We are not liable for any data loss, financial losses, transaction errors, or disputes arising between shopkeepers and customers."
            },
            {
              heading: "6. Changes to Terms",
              body: "We reserve the right to modify these terms at any time. Continued use of the application after changes constitutes your acceptance of the new terms."
            }
          ]
        };

      case "PRIVACY":
        return {
          title: "Privacy Policy",
          lastUpdated: "July 6, 2026",
          sections: [
            {
              heading: "1. Information We Collect",
              body: "We collect user registration details (name, email, phone number) and business settings. We also store ledger transaction data (amounts, items, customer details) entered by you to sync with your database."
            },
            {
              heading: "2. How We Use Data",
              body: "Your data is used solely to provide and improve the bookkeeping ledger services, sync transactions offline, send reminders to your customers, and secure your account with OTP logins."
            },
            {
              heading: "3. Data Security",
              body: "We implement industry-standard encryption and security protocols (hosted on Supabase secure cloud databases) to safeguard your data from unauthorized access, loss, or alteration."
            },
            {
              heading: "4. Push Notifications",
              body: "The app registers a push token with Expo and FCM servers to deliver real-time notifications about customer payment claims and system updates. You can toggle this permission in your device settings."
            },
            {
              heading: "5. Third-Party Sharing",
              body: "We do not sell, rent, or trade your personal or business ledger details with any third-party marketing companies."
            }
          ]
        };

      case "SHIPPING":
        return {
          title: "Shipping Policy",
          lastUpdated: "July 6, 2026",
          sections: [
            {
              heading: "1. Digital Delivery Only",
              body: "Udhari is a Software-as-a-Service (SaaS) cloud application. All services, subscription upgrades, and features are delivered 100% digitally inside the application immediately upon payment confirmation."
            },
            {
              heading: "2. No Physical Shipments",
              body: "Since this is software, there is no physical product to be shipped, handled, or delivered. Therefore, no physical shipping costs, delivery timelines, or tracking numbers apply."
            }
          ]
        };

      case "REFUND":
        return {
          title: "Cancellation & Refunds",
          lastUpdated: "July 6, 2026",
          sections: [
            {
              heading: "1. Subscription Cancellations",
              body: "You can cancel your subscription plan at any time. Upon cancellation, your access will remain active until the end of your current prepaid billing cycle, and no further renewals will be charged."
            },
            {
              heading: "2. Refund Eligibility",
              body: "Subscription fees are non-refundable. Since we offer instant activation of cloud services and limits, we do not issue refunds or pro-rated credits for partial subscription periods."
            },
            {
              heading: "3. Exceptions",
              body: "If you were charged twice for a single transaction due to a payment gateway error, please contact our support team with transaction IDs, and we will initiate a charge reversal immediately."
            }
          ]
        };

      case "CONTACT":
        return {
          title: "Contact Us",
          lastUpdated: "July 6, 2026",
          sections: [
            {
              heading: "Business Legal Entity Name",
              body: "Udhari SaaS (Udharitracker)"
            },
            {
              heading: "Email Address",
              body: "faizanmulani1810@gmail.com"
            },
            {
              heading: "Phone Helpline",
              body: "+91 95295 17475"
            },
            {
              heading: "Registered Office Address",
              body: "Paudgaon , Tal. Mulshi , Dist. Pune , Maharashtra , 412108"
            },
            {
              heading: "Support Working Hours",
              body: "Monday to Saturday (10:00 AM to 6:00 PM IST)"
            }
          ]
        };

      default:
        return {
          title: "Policy Screen",
          lastUpdated: "July 6, 2026",
          sections: []
        };
    }
  };

  const policy = getContent();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgDark} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Feather name="arrow-left" size={22} color={Colors.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{policy.title}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.lastUpdated}>Last Updated: {policy.lastUpdated}</Text>

        {policy.sections.map((sec, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.heading}>{sec.heading}</Text>
            <Text style={styles.body}>{sec.body}</Text>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 Udhari SaaS. All Rights Reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.bgCard,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.dark,
    flex: 1,
    textAlign: "center",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  lastUpdated: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 20,
    fontWeight: "600",
  },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  heading: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
});

export default PolicyScreen;
