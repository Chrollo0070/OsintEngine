'use client';

import { useMemo } from 'react';
import { ExternalLink, Search, UserRoundSearch } from 'lucide-react';
import { buildUsernamePivotFindings, normalizeUsername } from '@/lib/username-pivot';

interface UsernamePivotPanelProps {
  query: string;
}

export function UsernamePivotPanel({ query }: UsernamePivotPanelProps) {
  const normalized = useMemo(() => normalizeUsername(query), [query]);
  const findings = useMemo(() => buildUsernamePivotFindings(query), [query]);

  if (!normalized) {
    return (
      <div className="border border-zinc-800 border-dashed rounded-xl p-8 bg-zinc-950/50 flex flex-col items-center justify-center text-center animate-in fade-in">
        <UserRoundSearch className="h-10 w-10 text-zinc-600 mb-3" />
        <h3 className="text-zinc-300 font-medium mb-1">No Username Provided</h3>
        <p className="text-zinc-500 text-sm max-w-md">
          Enter a username to generate pivot links across social and developer platforms.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in slide-in-from-bottom-2">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
        <h2 className="text-zinc-100 text-lg font-semibold">Username Pivot Engine</h2>
        <p className="text-zinc-400 text-sm mt-1">
          Target handle: <span className="font-mono text-emerald-300">{normalized}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {findings.map((finding) => (
          <article
            key={finding.platformId}
            className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-zinc-100 font-medium">{finding.platformName}</h3>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-emerald-300">
                {finding.confidence}
              </span>
            </div>

            <p className="text-xs text-zinc-500">{finding.evidence}</p>

            <div className="flex flex-wrap gap-2">
              <a
                href={finding.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-black px-3 py-1.5 text-xs font-mono text-zinc-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
              >
                Open profile
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={finding.searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 px-3 py-1.5 text-xs font-mono text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200"
              >
                Search platform
                <Search className="h-3 w-3" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
