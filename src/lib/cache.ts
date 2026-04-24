import { LRUCache } from 'lru-cache';

type CacheValue = NonNullable<unknown>;

const cache = new LRUCache<string, CacheValue>({
  max: 100,
  ttl: 1000 * 60 * 5, // 5 minutes
});

export function getCached<T extends CacheValue>(key: string): T | undefined {
  return cache.get(key) as T | undefined;
}

export function setCache<T extends CacheValue>(key: string, value: T): void {
  cache.set(key, value);
}

export function getCacheKey(prefix: string, query: string): string {
  return `${prefix}:${query.toLowerCase().trim()}`;
}
