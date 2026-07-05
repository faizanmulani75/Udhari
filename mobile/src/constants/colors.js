// src/constants/colors.js
// Bahi-Khata warm charcoal and earthen grey color palette.
// Strict rules: Credit (Diya/Deni) = Coral, Payment (Mila/Jama) = Teal.

const Colors = {
  // ── Global Core ──
  bgDark: "#F1EFE8",          // Warm off-white page background
  bgCard: "#FFFFFF",          // White card background
  bgInput: "#FFFFFF",         // White background for input fields
  bgElevated: "#E8E6DD",      // Warm grey elevated surface
  
  // ── Status Themes (Strictly Coral and Teal) ──
  primary: "#1D9E75",         // Teal (Mila / Jama / Payment)
  primaryLight: "#D2F4E9",    // Light Teal tint for card background
  primaryGlow: "rgba(29, 158, 117, 0.08)",
  success: "#1D9E75",         // Mapped to Teal
  successBg: "#D2F4E9",       // Light Teal background tint
 
  error: "#D85A30",           // Coral (Diya / Deni / Credit)
  errorBg: "#FCE8E1",         // Light Coral background tint
  errorGlow: "rgba(216, 90, 48, 0.08)",
 
  // ── Amber Tiers (Only for subscriptions / plan badges) ──
  accent: "#FAC775",          // Amber Gold
  accentLight: "#FDF2E2",
  accentText: "#7A4B05",      // Amber-900 equivalent for dark text on light amber badge
  
  // ── Neutral Gray / Staff ──
  neutralGray: "#E8E6DD",
  neutralLight: "#5F5E5A",
 
  // ── Text (Soft warm charcoal and stone grays) ──
  textPrimary: "#000000",     // Pure black primary text
  textSecondary: "#2C2C2A",   // Soft warm charcoal secondary text
  textMuted: "#5F5E5A",       // Stone secondary text
  textPlaceholder: "#8E8C84", // Muted text for placeholder
 
  // ── Borders ──
  border: "#D3D1C7",          // Warm light gray border (0.5px rule)
  borderFocus: "#1D9E75",
  borderLight: "rgba(44, 44, 42, 0.08)",
 
  // ── Misc ──
  white: "#FFFFFF",
  black: "#000000",
  overlay: "rgba(44, 44, 42, 0.40)", // Flat light overlay scrim
  shadow: "transparent",       // No shadow rule
};

export default Colors;
