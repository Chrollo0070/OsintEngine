import { LRUCache } from "lru-cache";

/**
 * Generic cache instance
 */
const cache = new LRUCache<string, unknown>({
  max: 200, // increased capacity
  ttl: 1000 * 60 * 5, // 5 minutes
  allowStale: false,
  updateAgeOnGet: true, // refresh TTL on access
});

/**
 * Get value from cache
 */
export function getCached<T>(key: string): T | undefined {
  const value = cache.get(key);
  return value as T | undefined;
}

/**
 * Set value in cache with optional TTL override
 */
export function setCache<T>(
  key: string,
  value: T,
  ttl?: number
): void {
  cache.set(key, value, { ttl });
}

/**
 * Delete a specific cache key
 */
export function deleteCache(key: string): void {
  cache.delete(key);
}

/**
 * Clear entire cache
 */
export function clearCache(): void {
  cache.clear();
}

/**
 * Generate safe cache key
 */
export function getCacheKey(
  prefix: string,
  query: string,
  options?: Record<string, unknown>
): string {
  const normalizedQuery = query.toLowerCase().trim();

  const optionsPart = options
    ? ":" +
      Object.entries(options)
        .sort()
        .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
        .join("&")
    : "";

  return `${prefix}:${normalizedQuery}${optionsPart}`;
}

/**
 * Wrap async function with caching
 */
export async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl?: number
): Promise<T> {
  const cached = getCached<T>(key);
  if (cached !== undefined) return cached;

  const result = await fetcher();
  setCache(key, result, ttl);

  return result;
}
