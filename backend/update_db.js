// update_db.js
// Manual database schema migration helper using pg pool.
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  console.log("Connecting to database...");
  const client = await pool.connect();
  try {
    console.log("Running migration query...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS "payment_claims" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "shop_id" UUID NOT NULL REFERENCES "shops"("id") ON DELETE CASCADE,
        "customer_id" UUID NOT NULL REFERENCES "customers"("id") ON DELETE CASCADE,
        "amount" DECIMAL(12,2) NOT NULL,
        "txn_ref" VARCHAR(100) UNIQUE NOT NULL,
        "status" VARCHAR(50) NOT NULL DEFAULT 'PENDING_SHOP_CONFIRM',
        "customer_claimed_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "shop_confirmed_at" TIMESTAMPTZ,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS "payment_claims_shop_id_idx" ON "payment_claims"("shop_id");
      CREATE INDEX IF NOT EXISTS "payment_claims_customer_id_idx" ON "payment_claims"("customer_id");
      CREATE INDEX IF NOT EXISTS "payment_claims_status_idx" ON "payment_claims"("status");
    `);
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
