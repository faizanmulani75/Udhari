// server.js
// Application entry point.
// Loads environment variables, then starts the Express server.

require("dotenv").config();

const app = require("./src/app");
const { initReminderScheduler } = require("./src/services/reminderScheduler");

const PORT = process.env.PORT || 5050;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Udhari SaaS API running on port ${PORT}`);
  console.log(`📍 Health check: http://0.0.0.0:${PORT}/api/v1/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);

  // Start automated background reminders scheduler
  initReminderScheduler();
});
