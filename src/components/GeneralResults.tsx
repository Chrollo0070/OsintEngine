'use client';

import React, { useState, useEffect } from 'react';
import { SearchResult } from '@/lib/google';
import { SkeletonLoader } from './SkeletonLoader';
import { ExternalLink, Search as SearchIcon, AlertTriangle } from 'lucide-react';

interface GeneralResultsProps {
  query: string;
}

export function GeneralResults({ query }: GeneralResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [source, setSource] = useState<string>('google');

  useEffect(() => {
    async function fetchSearch() {
      if (!query) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('Search fetch failed');
        const data = await res.json();
        setResults(data.results || []);
        if (data.source) setSource(data.source);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchSearch();
  }, [query]);

  if (loading) {
    return (
      <div className="max-w-4xl space-y-6 animate-in fade-in">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-center gap-3">
              <SkeletonLoader type="avatar" className="h-6 w-6" />
              <SkeletonLoader type="text" className="w-1/3 h-3" />
            </div>
            <SkeletonLoader type="text" className="w-3/4 h-5" />
            <SkeletonLoader type="text" lines={2} />
          </div>
        ))}
      </div>
    );
  }

  if (error || results.length === 0) {
    return (
      <div className="max-w-4xl space-y-4 animate-in fade-in">
        {source === 'duckduckgo' && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500/90 rounded-lg p-3 text-sm flex items-start gap-2 font-mono">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>
              <strong>Using DuckDuckGo Instant Answer fallback.</strong> Since you haven't provided a Google Custom Search API Key yet, we default to DuckDuckGo's free Instant Answer API—which only returns hits for famous entities (like celebrities, big brands, definitions). To get full web results here like a normal search engine, please configure a free Google CSE key!
            </span>
          </div>
        )}
        <div className="border border-zinc-800 border-dashed rounded-xl p-8 bg-zinc-950/50 flex flex-col items-center justify-center text-center">
          <SearchIcon className="h-10 w-10 text-zinc-600 mb-3" />
          <h3 className="text-zinc-300 font-medium mb-1">No Web Results Found</h3>
          <p className="text-zinc-500 text-sm">
            Could not find any standard indexed search results for "{query}". 
            <br />
            Check out the <strong>Dorks</strong> tab to generate advanced search strings instead.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 animate-in slide-in-from-bottom-2">
      {source === 'duckduckgo' && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500/90 rounded-lg p-3 text-sm flex items-center gap-2 font-mono">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>Using DuckDuckGo fallback due to missing Google CSE key or quota limit.</span>
        </div>
      )}

      {results.map((result, i) => (
        <a 
          key={`${result.link}-${i}`}
          href={result.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="flex items-center gap-3 mb-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="h-6 w-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden flex-shrink-0">
              {result.favicon ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={result.favicon} alt="" className="w-4 h-4 object-contain" />
              ) : (
                <SearchIcon className="h-3 w-3 text-zinc-500" />
              )}
            </div>
            <span className="text-xs text-zinc-400 font-mono truncate">{new URL(result.link).hostname}</span>
          </div>
          
          <h3 className="text-lg md:text-xl font-medium text-emerald-400 group-hover:underline flex items-center gap-2">
            {result.title}
          </h3>
          
          <p className="mt-1 text-sm text-zinc-300 leading-relaxed max-w-3xl line-clamp-3">
            {result.snippet}
          </p>
        </a>
      ))}
    </div>
  );
}
