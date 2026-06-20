// prisma.config.js — Prisma 7 CLI configuration
// This file is used by the Prisma CLI for migrations, introspection, and seeding.
// The DATABASE_URL is read from environment variables.

require("dotenv/config");
const { defineConfig } = require("prisma/config");

module.exports = defineConfig({
  earlyAccess: true,
  schema: "./prisma/schema.prisma",

  datasource: {
    url: process.env.DATABASE_URL,
  },

  migrate: {
    async resolve({ datasourceUrl }) {
      return {
        url: datasourceUrl || process.env.DATABASE_URL,
      };
    },
  },
});
