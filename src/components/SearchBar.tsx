'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  initialValue?: string;
  autoFocus?: boolean;
  centered?: boolean;
}

export function SearchBar({ initialValue = '', autoFocus = false, centered = false }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialValue);

  // Sync state with URL if initialValue isn't provided directly
  useEffect(() => {
    if (!initialValue) {
      const q = searchParams.get('q');
      if (q) setQuery(q);
    }
  }, [searchParams, initialValue]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const currentQuery = searchParams.get('q') || initialValue;

  return (
    <form 
      onSubmit={handleSearch} 
      className={`relative flex w-full items-center ${centered ? 'max-w-2xl mx-auto' : 'max-w-3xl'} group`}
    >
      <div className={`
        relative flex w-full items-center rounded-2xl border transition-all duration-300
        ${centered 
          ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 hover:shadow-lg focus-within:border-emerald-500/50 focus-within:bg-zinc-900 focus-within:shadow-[0_0_15px_rgba(16,185,129,0.1)] px-5 py-4' 
          : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 focus-within:border-emerald-500/50 focus-within:bg-zinc-950 focus-within:shadow-[0_0_15px_rgba(16,185,129,0.1)] px-4 py-3'
        }
      `}>
        <Search className={`text-zinc-400 transition-colors ${centered ? 'h-6 w-6' : 'h-5 w-5'} group-focus-within:text-emerald-500`} />
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter target name, email, username, or domain..."
          autoFocus={autoFocus}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          className={`
            w-full bg-transparent outline-none placeholder:text-zinc-600 font-mono text-zinc-100 ml-3
            ${centered ? 'text-lg' : 'text-base'}
            selection:bg-emerald-500/30
          `}
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              if (centered) {
                const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                if (input) input.focus();
              }
            }}
            className="p-1 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors ml-2"
          >
            <X className={centered ? 'h-5 w-5' : 'h-4 w-4'} />
          </button>
        )}
      </div>
    </form>
  );
}
