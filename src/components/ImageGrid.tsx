'use client';

import React, { useState, useEffect } from 'react';
import type { ImageResult } from '@/lib/google';
import { SkeletonLoader } from './SkeletonLoader';
import { Image as ImageIcon, ExternalLink, Globe } from 'lucide-react';

interface ImageGridProps {
  query: string;
}

export function ImageGrid({ query }: ImageGridProps) {
  const [images, setImages] = useState<ImageResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      if (!query) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/images?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('Images fetch failed');
        const data = await res.json();
        
        setImages(data.images || []);
        if (!data.hasApiKey) {
          setHasApiKey(false);
        }
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [query]);

  if (loading) {
    return (
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 animate-in fade-in">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonLoader
            key={i}
            type="image"
            className="w-full inline-block"
            style={{ height: `${Math.random() * 200 + 150}px` }}
          />
        ))}
      </div>
    );
  }

  if (!hasApiKey) {
    return (
      <div className="border border-zinc-800 rounded-xl p-8 bg-zinc-950/50 flex flex-col items-center justify-center text-center animate-in fade-in">
        <ImageIcon className="h-10 w-10 text-yellow-600 mb-3" />
        <h3 className="text-zinc-300 font-medium mb-1">Google API Key Missing</h3>
        <p className="text-zinc-500 text-sm max-w-md mb-6">
          To view embedded image results, please ensure your Google Custom Search API keys are defined in the environment variables.
        </p>
        <a 
          href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 hover:border-emerald-500 hover:text-emerald-400 text-zinc-300 px-4 py-2 rounded-lg font-mono text-sm transition-colors"
        >
          View Images on Google <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    );
  }

  if (error || images.length === 0) {
    // Graceful degradation to Google image search link
    return (
      <div className="border border-zinc-800 border-dashed rounded-xl p-8 bg-zinc-950/50 flex flex-col items-center justify-center text-center animate-in fade-in">
        <ImageIcon className="h-10 w-10 text-zinc-600 mb-3" />
        <h3 className="text-zinc-300 font-medium mb-1">No Image Results Found</h3>
        <p className="text-zinc-500 text-sm max-w-md mb-6">
          Could not find any Google Image Search hits for this query.
        </p>
        <a 
          href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:text-emerald-400 text-zinc-300 px-4 py-2 rounded-lg font-mono text-sm transition-colors"
        >
          Try Google Images <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 animate-in slide-in-from-bottom-2">
      {images.map((image) => (
        <a
          key={image.id}
          href={image.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative rounded-lg overflow-hidden border border-zinc-800 hover:border-emerald-500/50 transition-all inline-block w-full break-inside-avoid"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity bg-zinc-900"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <div className="flex items-center gap-2 text-zinc-200 text-xs font-mono">
              <Globe className="h-3 w-3 text-emerald-400 shrink-0" />
              <span className="truncate">{image.source}</span>
            </div>
            {image.alt && image.alt !== query && (
              <p className="text-zinc-400 text-xs mt-1 line-clamp-2">{image.alt}</p>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
