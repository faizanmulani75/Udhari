// Load environment variables (Prisma requires DATABASE_URL)
require("dotenv").config();

const prisma = require("./src/config/prisma");

async function check() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        pushToken: true,
      }
    });
    console.log("👥 Active users and their push tokens in DB:");
    console.log(JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error reading database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

check();
