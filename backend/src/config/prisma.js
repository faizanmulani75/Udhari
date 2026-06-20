// src/config/prisma.js
// Prisma client singleton using Prisma 7 driver adapter pattern.
// Uses @prisma/adapter-pg with the native 'pg' pool.

const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

module.exports = prisma;
