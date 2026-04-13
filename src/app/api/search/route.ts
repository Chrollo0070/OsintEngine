import { NextRequest, NextResponse } from 'next/server';
import { googleSearch } from '@/lib/google';
import { getCached, setCache, getCacheKey } from '@/lib/cache';
import { rateLimit } from '@/lib/ratelimit';
import { sanitizeInput } from '@/lib/utils';
import type { SearchResult } from '@/lib/google';

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = rateLimit(ip);
  if (!success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const query = request.nextUrl.searchParams.get('q');
  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
  }

  const sanitized = sanitizeInput(query);
  const cacheKey = getCacheKey('search', sanitized);
  const cached = getCached<SearchResult[]>(cacheKey);

  if (cached) {
    return NextResponse.json({ results: cached, cached: true });
  }

  const results = await googleSearch(sanitized);
  setCache(cacheKey, results);

  return NextResponse.json({
    results,
    cached: false,
    source: process.env.GOOGLE_API_KEY ? 'google' : 'duckduckgo',
  });
}
