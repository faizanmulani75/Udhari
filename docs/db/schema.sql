-- ============================================================
-- Udhari SaaS — PostgreSQL Schema
-- Multi-tenant credit/debt management platform
-- ============================================================

-- ========================
-- ENUMS
-- ========================

CREATE TYPE transaction_type AS ENUM ('CREDIT', 'DEBIT', 'PAYMENT');
CREATE TYPE payment_method AS ENUM ('CASH', 'UPI', 'BANK_TRANSFER', 'CHEQUE', 'OTHER');
CREATE TYPE subscription_plan AS ENUM ('FREE', 'BASIC', 'PRO', 'ENTERPRISE');
CREATE TYPE subscription_status AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELLED', 'PAST_DUE');
CREATE TYPE reminder_status AS ENUM ('PENDING', 'SENT', 'FAILED', 'CANCELLED');
CREATE TYPE reminder_channel AS ENUM ('SMS', 'WHATSAPP', 'EMAIL');


-- ========================
-- 1. SHOPS
-- ========================
-- Root tenant table. Every other table references shop_id.

CREATE TABLE shops (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(255) NOT NULL,
    phone           VARCHAR(20) NOT NULL UNIQUE,
    email           VARCHAR(255),
    address         TEXT,
    city            VARCHAR(100),
    state           VARCHAR(100),
    pincode         VARCHAR(10),
    logo_url        TEXT,
    currency        VARCHAR(10) NOT NULL DEFAULT 'INR',
    is_active       BOOLEAN NOT NULL DEFAULT true,
    deleted_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shops_phone ON shops(phone);
CREATE INDEX idx_shops_is_active ON shops(is_active) WHERE deleted_at IS NULL;


-- ========================
-- 2. USERS
-- ========================
-- Shopkeepers / staff who operate a shop.
-- owner_auth_id links to Supabase Auth (the phone OTP user).

CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id         UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    auth_id         UUID NOT NULL UNIQUE,       -- Supabase Auth UID
    name            VARCHAR(255) NOT NULL,
    phone           VARCHAR(20) NOT NULL,
    email           VARCHAR(255),
    role            VARCHAR(50) NOT NULL DEFAULT 'owner',  -- owner | staff
    is_active       BOOLEAN NOT NULL DEFAULT true,
    deleted_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_shop_id ON users(shop_id);
CREATE INDEX idx_users_auth_id ON users(auth_id);
CREATE UNIQUE INDEX idx_users_shop_phone ON users(shop_id, phone) WHERE deleted_at IS NULL;


-- ========================
-- 3. CUSTOMERS
-- ========================
-- Customers who owe money to (or are owed by) a shop.
-- Each customer belongs to exactly one shop (multi-tenant).

CREATE TABLE customers (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id         UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    name            VARCHAR(255) NOT NULL,
    phone           VARCHAR(20) NOT NULL,
    email           VARCHAR(255),
    address         TEXT,
    notes           TEXT,
    balance         DECIMAL(12, 2) NOT NULL DEFAULT 0.00,       -- positive = customer owes shop
    credit_limit    DECIMAL(12, 2) NOT NULL DEFAULT 0.00,       -- 0 = unlimited
    qr_token        VARCHAR(255) UNIQUE,                        -- URL-safe token for portal access
    qr_token_expires_at  TIMESTAMPTZ,                           -- null = never expires
    is_active       BOOLEAN NOT NULL DEFAULT true,
    deleted_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_customers_shop_id ON customers(shop_id);
CREATE INDEX idx_customers_qr_token ON customers(qr_token) WHERE qr_token IS NOT NULL;
CREATE INDEX idx_customers_balance ON customers(shop_id, balance) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX idx_customers_shop_phone ON customers(shop_id, phone) WHERE deleted_at IS NULL;


-- ========================
-- 4. TRANSACTIONS
-- ========================
-- Every credit, debit, or payment event.
-- CREDIT  = shop gives goods on credit → customer owes more
-- DEBIT   = shop returns/adjusts → customer owes less
-- PAYMENT = customer pays back → customer owes less

CREATE TABLE transactions (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id             UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    customer_id         UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    type                transaction_type NOT NULL,
    amount              DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
    balance_after       DECIMAL(12, 2) NOT NULL,        -- snapshot of customer balance after this txn
    description         TEXT,
    reference_number    VARCHAR(100),
    payment_method      payment_method,                 -- only for PAYMENT type
    transaction_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by          UUID REFERENCES users(id) ON DELETE SET NULL,
    deleted_at          TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- NOTE: transactions intentionally have NO updated_at — they are immutable ledger entries.
-- "Editing" a transaction means soft-deleting it and creating a new one.

CREATE INDEX idx_txn_shop_id ON transactions(shop_id);
CREATE INDEX idx_txn_customer_id ON transactions(customer_id);
CREATE INDEX idx_txn_shop_customer ON transactions(shop_id, customer_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_txn_date ON transactions(shop_id, transaction_date DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_txn_type ON transactions(shop_id, type) WHERE deleted_at IS NULL;


-- ========================
-- 5. SUBSCRIPTIONS
-- ========================
-- SaaS billing. Each shop has one active subscription at a time.

CREATE TABLE subscriptions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id         UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    plan            subscription_plan NOT NULL DEFAULT 'FREE',
    status          subscription_status NOT NULL DEFAULT 'ACTIVE',
    max_customers   INT NOT NULL DEFAULT 50,            -- limit per plan
    max_users       INT NOT NULL DEFAULT 1,             -- staff seats
    amount          DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    currency        VARCHAR(10) NOT NULL DEFAULT 'INR',
    billing_cycle   VARCHAR(20) NOT NULL DEFAULT 'monthly',  -- monthly | yearly
    starts_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at      TIMESTAMPTZ,
    cancelled_at    TIMESTAMPTZ,
    deleted_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sub_shop_id ON subscriptions(shop_id);
CREATE INDEX idx_sub_status ON subscriptions(shop_id, status) WHERE deleted_at IS NULL;
CREATE INDEX idx_sub_expires ON subscriptions(expires_at) WHERE status = 'ACTIVE';


-- ========================
-- 6. REMINDERS
-- ========================
-- Payment reminders sent to customers.

CREATE TABLE reminders (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id         UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    customer_id     UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    channel         reminder_channel NOT NULL DEFAULT 'SMS',
    status          reminder_status NOT NULL DEFAULT 'PENDING',
    message         TEXT NOT NULL,
    amount_due      DECIMAL(12, 2) NOT NULL,            -- snapshot at time of reminder
    scheduled_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    sent_at         TIMESTAMPTZ,
    failed_reason   TEXT,
    created_by      UUID REFERENCES users(id) ON DELETE SET NULL,
    deleted_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_rem_shop_id ON reminders(shop_id);
CREATE INDEX idx_rem_customer_id ON reminders(customer_id);
CREATE INDEX idx_rem_status ON reminders(shop_id, status) WHERE deleted_at IS NULL;
CREATE INDEX idx_rem_scheduled ON reminders(scheduled_at) WHERE status = 'PENDING';


-- ========================
-- TRIGGER: auto-update updated_at
-- ========================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_shops         BEFORE UPDATE ON shops         FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_users         BEFORE UPDATE ON users         FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_customers     BEFORE UPDATE ON customers     FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_subscriptions BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_reminders     BEFORE UPDATE ON reminders     FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- NOTE: transactions table has no updated_at trigger — immutable by design.
