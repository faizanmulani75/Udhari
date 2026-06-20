// src/utils/cache.js
// Simple in-memory LRU cache with TTL support.
// Designed to be swapped with Redis later for horizontal scaling.

class LRUCache {
  /**
   * @param {object} options
   * @param {number} options.maxSize - Maximum number of entries (default 500)
   * @param {number} options.ttlMs - Default TTL in milliseconds (default 5 minutes)
   */
  constructor({ maxSize = 500, ttlMs = 5 * 60 * 1000 } = {}) {
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
    this.cache = new Map();
    this.hits = 0;
    this.misses = 0;
  }

  /**
   * Get a value from cache.
   * @param {string} key
   * @returns {*} The cached value or undefined
   */
  get(key) {
    const entry = this.cache.get(key);
    if (!entry) {
      this.misses++;
      return undefined;
    }

    // Check TTL expiry
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      this.misses++;
      return undefined;
    }

    // Move to end (most recently used) by re-inserting
    this.cache.delete(key);
    this.cache.set(key, entry);
    this.hits++;
    return entry.value;
  }

  /**
   * Set a value in cache.
   * @param {string} key
   * @param {*} value
   * @param {number} [ttlMs] - Override default TTL for this entry
   */
  set(key, value, ttlMs) {
    // If key already exists, delete it first (to update position)
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // Evict oldest entry if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      value,
      expiresAt: Date.now() + (ttlMs || this.ttlMs),
    });
  }

  /**
   * Delete a specific key from cache.
   * @param {string} key
   */
  delete(key) {
    this.cache.delete(key);
  }

  /**
   * Delete all keys matching a prefix pattern.
   * @param {string} prefix
   */
  invalidatePrefix(prefix) {
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear the entire cache.
   */
  clear() {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  /**
   * Get cache statistics.
   */
  stats() {
    const total = this.hits + this.misses;
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hits: this.hits,
      misses: this.misses,
      hitRate: total > 0 ? ((this.hits / total) * 100).toFixed(1) + "%" : "N/A",
    };
  }
}

// ── Singleton Instances ──────────────────────────────────────
// Each domain gets its own cache with appropriate TTL and size.

/** Shop context cache — 5 minute TTL, small set */
const shopCache = new LRUCache({ maxSize: 200, ttlMs: 5 * 60 * 1000 });

/** Dashboard summary cache — 1 minute TTL */
const dashboardCache = new LRUCache({ maxSize: 100, ttlMs: 60 * 1000 });

/** General purpose cache — 2 minute TTL */
const generalCache = new LRUCache({ maxSize: 500, ttlMs: 2 * 60 * 1000 });

module.exports = {
  LRUCache,
  shopCache,
  dashboardCache,
  generalCache,
};
