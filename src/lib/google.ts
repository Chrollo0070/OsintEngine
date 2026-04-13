export interface SearchResult {
  title: string;
  snippet: string;
  link: string;
  favicon: string;
}

export async function googleSearch(query: string): Promise<SearchResult[]> {
  const apiKey = process.env.GOOGLE_API_KEY;
  const cx = process.env.GOOGLE_CSE_ID;

  if (!apiKey || !cx) {
    return duckDuckGoFallback(query);
  }

  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}&num=10`;
    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      if (res.status === 429) {
        // Quota exceeded, fallback
        return duckDuckGoFallback(query);
      }
      throw new Error(`Google API error: ${res.status}`);
    }

    const data = await res.json();
    return (data.items || []).map((item: Record<string, unknown>) => ({
      title: item.title as string,
      snippet: item.snippet as string,
      link: item.link as string,
      favicon: `https://www.google.com/s2/favicons?domain=${new URL(item.link as string).hostname}&sz=32`,
    }));
  } catch {
    return duckDuckGoFallback(query);
  }
}

async function duckDuckGoFallback(query: string): Promise<SearchResult[]> {
  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
    const res = await fetch(url);
    const data = await res.json();

    const results: SearchResult[] = [];

    if (data.Abstract) {
      results.push({
        title: data.Heading || query,
        snippet: data.Abstract,
        link: data.AbstractURL || `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
        favicon: `https://www.google.com/s2/favicons?domain=${data.AbstractSource?.toLowerCase() || 'duckduckgo.com'}&sz=32`,
      });
    }

    if (data.RelatedTopics) {
      for (const topic of data.RelatedTopics.slice(0, 9)) {
        if (topic.Text && topic.FirstURL) {
          results.push({
            title: topic.Text.split(' - ')[0] || topic.Text.substring(0, 80),
            snippet: topic.Text,
            link: topic.FirstURL,
            favicon: `https://www.google.com/s2/favicons?domain=${new URL(topic.FirstURL).hostname}&sz=32`,
          });
        }
      }
    }

    return results;
  } catch {
    return [];
  }
}

export interface ImageResult {
  id: string;
  width: number;
  height: number;
  alt: string;
  src: string;
  thumbnail: string;
  source: string;
  sourceUrl: string;
}

export async function googleImageSearch(query: string): Promise<ImageResult[]> {
  const apiKey = process.env.GOOGLE_API_KEY;
  const cx = process.env.GOOGLE_CSE_ID;

  if (!apiKey || !cx) {
    return []; // No fallback for images without keys right now
  }

  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}&searchType=image&num=10`;
    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      throw new Error(`Google API error: ${res.status}`);
    }

    const data = await res.json();
    return (data.items || []).map((item: any, index: number) => ({
      id: `img-${index}-${Date.now()}`,
      width: item.image?.width || 800,
      height: item.image?.height || 600,
      alt: item.title,
      src: item.link,
      thumbnail: item.image?.thumbnailLink || item.link,
      source: item.displayLink,
      sourceUrl: item.image?.contextLink || item.link,
    }));
  } catch {
    return [];
  }
}
