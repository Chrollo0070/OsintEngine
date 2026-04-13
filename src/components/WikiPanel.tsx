'use client';

import React, { useState, useEffect } from 'react';
import type { WikiResult } from '@/lib/wiki';
import { SkeletonLoader } from './SkeletonLoader';
import { ExternalLink, BookOpen, Tag } from 'lucide-react';

interface WikiPanelProps {
  query: string;
}

export function WikiPanel({ query }: WikiPanelProps) {
  const [result, setResult] = useState<WikiResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchWiki() {
      if (!query) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/wiki?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('Wiki fetch failed');
        const data = await res.json();
        setResult(data.result);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchWiki();
  }, [query]);

  if (loading) {
    return (
      <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-950 animate-in fade-in">
        <SkeletonLoader type="card" />
        <SkeletonLoader type="text" lines={4} className="mt-4" />
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="border border-zinc-800 border-dashed rounded-xl p-8 bg-zinc-950/50 flex flex-col items-center justify-center text-center animate-in fade-in">
        <BookOpen className="h-10 w-10 text-zinc-600 mb-3" />
        <h3 className="text-zinc-300 font-medium mb-1">No Wikipedia Data Found</h3>
        <p className="text-zinc-500 text-sm max-w-md">
          Could not find a Wikipedia page exactly matching "{query}". Try searching for specific names or well-known entities.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 hover:border-zinc-700 transition-colors shadow-sm animate-in slide-in-from-bottom-2">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2 tracking-tight">
              {result.title}
            </h2>
            {result.description && (
              <p className="text-emerald-400 font-mono text-sm mt-1">{result.description}</p>
            )}
          </div>
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:text-emerald-400 px-3 py-1.5 rounded-full transition-all flex-shrink-0"
          >
            Read Source <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {result.thumbnail && (
            <div className="flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.thumbnail}
                alt={result.title}
                className="w-32 h-auto rounded-lg border border-zinc-800 bg-zinc-900 shadow-sm"
                loading="lazy"
              />
            </div>
          )}
          <div className="flex-1 space-y-4">
            <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
              {result.extract}
            </p>
            
            {result.categories && result.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/50">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 w-full mb-1">
                  <Tag className="h-3 w-3" /> Categories
                </div>
                {result.categories.slice(0, 10).map((cat) => (
                  <span key={cat} className="text-xs px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-zinc-400">
                    {cat.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
