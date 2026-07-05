// src/constants/typography.js
// Custom typography definitions mapped to loaded Google Fonts (Plus Jakarta Sans & Manrope).
// Strict weight constraint: only 400 and 500 weights are allowed.

const Typography = {
  // Big numbers (28-36px/500)
  displayLg: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 32,
    fontWeight: "500",
    lineHeight: 40,
  },
  
  // Titles (18-19px/500)
  headlineLg: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 19,
    fontWeight: "500",
    lineHeight: 25,
  },
  headlineMd: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 24,
  },

  // Body text (14-15px/400)
  bodyLg: {
    fontFamily: "Manrope_400Regular",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 22,
  },
  bodyMd: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },

  // Bold Labels (14px/500)
  labelBold: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
  },

  // Small Labels (12px/500)
  labelSm: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
};

export default Typography;
