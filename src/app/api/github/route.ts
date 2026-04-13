import { NextRequest, NextResponse } from 'next/server';
import { searchGitHub } from '@/lib/github';
import { getCached, setCache, getCacheKey } from '@/lib/cache';
import { rateLimit } from '@/lib/ratelimit';
import { sanitizeInput } from '@/lib/utils';
import type { GitHubResults } from '@/lib/github';

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
  const cacheKey = getCacheKey('github', sanitized);
  const cached = getCached<GitHubResults>(cacheKey);

  if (cached) {
    return NextResponse.json({ ...cached, cached: true });
  }

  const results = await searchGitHub(sanitized);
  setCache(cacheKey, results);

  return NextResponse.json({ ...results, cached: false });
}
