import { NextRequest, NextResponse } from 'next/server';
import { googleImageSearch } from '@/lib/google';
import { getCached, setCache, getCacheKey } from '@/lib/cache';
import { rateLimit } from '@/lib/ratelimit';
import { sanitizeInput } from '@/lib/utils';
import type { ImageResult } from '@/lib/google';

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
  const cacheKey = getCacheKey('images', sanitized);
  const cached = getCached<ImageResult[]>(cacheKey);

  if (cached) {
    return NextResponse.json({ 
      images: cached, 
      cached: true,
      hasApiKey: !!process.env.GOOGLE_API_KEY
    });
  }

  const images = await googleImageSearch(sanitized);
  if (images.length > 0) {
    setCache(cacheKey, images);
  }

  return NextResponse.json({
    images,
    cached: false,
    hasApiKey: !!process.env.GOOGLE_API_KEY,
  });
}
