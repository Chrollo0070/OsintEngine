export interface WikiResult {
  title: string;
  extract: string;
  thumbnail: string | null;
  url: string;
  categories: string[];
  description: string;
}

export async function searchWikipedia(query: string): Promise<WikiResult | null> {
  try {
    // First search for the page
    const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const res = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'PHANTOM-OSINT/1.0 (https://github.com/phantom-osint)',
      },
    });

    if (res.status === 404) {
      // Try searching
      const searchRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=1`
      );
      const searchData = await searchRes.json();
      const firstResult = searchData?.query?.search?.[0];

      if (!firstResult) return null;

      // Fetch the summary of the first search result
      const summaryRes = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(firstResult.title)}`
      );
      if (!summaryRes.ok) return null;
      const data = await summaryRes.json();
      return parseWikiResponse(data);
    }

    if (!res.ok) return null;

    const data = await res.json();
    return parseWikiResponse(data);
  } catch {
    return null;
  }
}

function parseWikiResponse(data: Record<string, unknown>): WikiResult {
  const thumbnail = data.thumbnail as Record<string, string> | undefined;
  return {
    title: data.title as string,
    extract: (data.extract as string) || '',
    thumbnail: thumbnail?.source || null,
    url: (data.content_urls as Record<string, Record<string, string>>)?.desktop?.page || '',
    categories: [],
    description: (data.description as string) || '',
  };
}
