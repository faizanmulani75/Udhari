const { withAndroidManifest } = require("@expo/config-plugins");

const withUpiQueries = (config) => {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults.manifest;

    // Ensure the <queries> tag exists
    if (!androidManifest.queries) {
      androidManifest.queries = [];
    }

    // Check if the UPI intent query is already added
    const hasUpiQuery = androidManifest.queries.some(
      (q) =>
        q.intent &&
        q.intent.some(
          (i) =>
            i.action &&
            i.action.some((a) => a.$["android:name"] === "android.intent.action.VIEW") &&
            i.data &&
            i.data.some((d) => d.$["android:scheme"] === "upi")
        )
    );

    if (!hasUpiQuery) {
      androidManifest.queries.push({
        intent: [
          {
            action: [{ $: { "android:name": "android.intent.action.VIEW" } }],
            data: [{ $: { "android:scheme": "upi" } }],
          },
        ],
      });
    }

    return config;
  });
};

module.exports = withUpiQueries;
