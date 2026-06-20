// src/services/reminderScheduler.js
// Background scheduler to periodically evaluate debtor customer balances and schedule outstanding payment reminders.

const prisma = require("../config/prisma");

/**
 * Perform checks for all active debtor customer accounts and trigger automated reminders.
 */
const runAutomatedRemindersCheck = async () => {
  console.log("⏰ [Scheduler] Running automated outstanding balance reminders evaluation...");
  try {
    // 1. Fetch active customers with positive outstanding balance
    const debtors = await prisma.customer.findMany({
      where: {
        deletedAt: null,
        isActive: true,
        balance: { gt: 0 },
      },
      include: {
        shop: true,
      },
    });

    console.log(`⏰ [Scheduler] Found ${debtors.length} customers with outstanding balances.`);

    const now = new Date();
    let sentCount = 0;

    for (const customer of debtors) {
      // 2. Fetch the last sent reminder for this customer
      const lastReminder = await prisma.reminder.findFirst({
        where: {
          customerId: customer.id,
          status: "SENT",
          deletedAt: null,
        },
        orderBy: {
          sentAt: "desc",
        },
      });

      // 3. Determine if a new reminder is due based on the interval
      let isDue = false;
      if (!lastReminder) {
        // Never sent before
        isDue = true;
      } else {
        const timeDiff = now.getTime() - new Date(lastReminder.sentAt).getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);

        if (customer.reminderInterval === "daily" && daysDiff >= 1) {
          isDue = true;
        } else if (customer.reminderInterval === "weekly" && daysDiff >= 7) {
          isDue = true;
        } else if (customer.reminderInterval === "monthly" && daysDiff >= 30) {
          isDue = true;
        }
      }

      if (isDue) {
        // 4. Generate the template message
        const amountStr = parseFloat(customer.balance).toFixed(2);
        const portalUrl = `${process.env.PORTAL_BASE_URL || "https://udhari-tracking.vercel.app"}/customer/${customer.qrToken}`; // portal link
        const message = `Hello ${customer.name}, this is an automated friendly reminder from ${customer.shop.name}. Your outstanding balance is INR ${amountStr}. Please clear your balance soon. View statement ledger here: ${portalUrl}`;

        // 5. Create and log the simulated sent reminder
        await prisma.reminder.create({
          data: {
            shopId: customer.shopId,
            customerId: customer.id,
            channel: "SMS",
            status: "SENT",
            message,
            amountDue: customer.balance,
            sentAt: now,
          },
        });

        console.log(`⏰ [Scheduler] Simulated SMS reminder sent to ${customer.name} (${customer.phone}) for INR ${amountStr}.`);
        sentCount++;
      }
    }

    console.log(`⏰ [Scheduler] Evaluation finished. Sent ${sentCount} reminders.`);
  } catch (err) {
    console.error("❌ [Scheduler] Error during automated reminders run:", err);
  }
};

/**
 * Initialize the cron scheduler runner.
 */
const initReminderScheduler = () => {
  // Run check 10 seconds after server boot to avoid startup congestion
  setTimeout(() => {
    runAutomatedRemindersCheck();
  }, 10000);

  // Run checks periodically (every 12 hours)
  const TWELVE_HOURS = 12 * 60 * 60 * 1000;
  setInterval(runAutomatedRemindersCheck, TWELVE_HOURS);
};

module.exports = {
  initReminderScheduler,
  runAutomatedRemindersCheck,
};
