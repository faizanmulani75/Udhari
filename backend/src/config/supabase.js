// Polyfill global WebSocket for Node.js < 22 environments to satisfy Supabase's Realtime client
try {
  globalThis.WebSocket = require("ws");
} catch (e) {
  // ignore if ws is not installed
}

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes("[YOUR-PROJECT-REF]") && 
  supabaseAnonKey !== "your-anon-key";

let supabaseAdmin = null;
let supabaseAnon = null;
let initSuccess = false;

if (isConfigured) {
  try {
    supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);
    
    if (supabaseServiceKey && supabaseServiceKey !== "your-service-role-key") {
      supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });
    }
    console.log("⚡ Supabase Auth client initialized successfully");
    initSuccess = true;
  } catch (error) {
    console.error("❌ Error initializing Supabase client:", error.message);
  }
}

const isMockMode = !isConfigured || !initSuccess;

if (isMockMode) {
  console.warn(
    "⚠️ Supabase configuration failed or is missing. Backend will run in MOCK auth mode."
  );
}

module.exports = {
  supabaseAnon,
  supabaseAdmin,
  isMockMode,
};
