export interface PexelsImage {
  id: number;
  width: number;
  height: number;
  alt: string;
  src: string;
  thumbnail: string;
  photographer: string;
  photographerUrl: string;
  url: string;
}

export async function searchPexelsImages(query: string): Promise<PexelsImage[]> {
  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey) {
    return [];
  }

  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=20`;
    const res = await fetch(url, {
      headers: { Authorization: apiKey },
    });

    if (!res.ok) throw new Error(`Pexels API error: ${res.status}`);

    const data = await res.json();
    return (data.photos || []).map((photo: Record<string, unknown>) => ({
      id: photo.id,
      width: photo.width,
      height: photo.height,
      alt: photo.alt || query,
      src: (photo.src as Record<string, string>).large,
      thumbnail: (photo.src as Record<string, string>).medium,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      url: photo.url,
    }));
  } catch {
    return [];
  }
}
