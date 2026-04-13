import { NextRequest, NextResponse } from 'next/server';
import { searchWikipedia } from '@/lib/wiki';
import { getCached, setCache, getCacheKey } from '@/lib/cache';
import { rateLimit } from '@/lib/ratelimit';
import { sanitizeInput } from '@/lib/utils';
import type { WikiResult } from '@/lib/wiki';

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
  const cacheKey = getCacheKey('wiki', sanitized);
  const cached = getCached<WikiResult>(cacheKey);

  if (cached) {
    return NextResponse.json({ result: cached, cached: true });
  }

  const result = await searchWikipedia(sanitized);
  if (result) {
    setCache(cacheKey, result);
  }

  return NextResponse.json({ result, cached: false });
}
