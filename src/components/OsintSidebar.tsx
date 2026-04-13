'use client';

import Link from 'next/link';
import { ExternalLink, MapPinned, Radar, Search, Shield, Video } from 'lucide-react';
import { buildDomainSearchUrl, osintToolSections } from '@/lib/osint-tools';

interface OsintSidebarProps {
  query?: string;
  compact?: boolean;
}

const sectionIcons = {
  cctv: Video,
  maps: MapPinned,
  tracking: Radar,
} as const;

export function OsintSidebar({ query = '', compact = false }: OsintSidebarProps) {
  const trimmedQuery = query.trim();

  return (
    <aside className="w-full rounded-[28px] border border-zinc-800/80 bg-zinc-950/80 p-5 shadow-2xl shadow-emerald-950/10 backdrop-blur">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.24em] text-emerald-300">
            <Shield className="h-3.5 w-3.5" />
            OSINT Toolkit
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-100">
            CCTV, maps, and field intel
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
            Quick-launch tools for location checks, live feeds, terrain validation, and movement analysis.
          </p>
        </div>

        {!compact && (
          <Link
            href={trimmedQuery ? `/search?q=${encodeURIComponent(trimmedQuery)}` : '/search'}
            className="hidden shrink-0 rounded-full border border-zinc-800 bg-black px-3 py-1.5 text-xs font-mono text-zinc-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-300 md:inline-flex"
          >
            Search workspace
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {osintToolSections.map((section) => {
          const Icon = sectionIcons[section.id as keyof typeof sectionIcons] ?? Search;

          return (
            <section
              key={section.id}
              className="rounded-2xl border border-zinc-800/70 bg-black/40 p-4"
            >
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950">
                  <Icon className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100">{section.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {section.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="rounded-2xl border border-zinc-800/70 bg-zinc-950/70 p-3 transition-colors hover:border-zinc-700"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-zinc-100">{tool.name}</span>
                        {tool.badge && (
                          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-emerald-300">
                            {tool.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed text-zinc-500">{tool.description}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href={tool.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-black px-3 py-1.5 text-xs font-mono text-zinc-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
                      >
                        Open tool
                        <ExternalLink className="h-3 w-3" />
                      </a>

                      {trimmedQuery && tool.domain && (
                        <a
                          href={buildDomainSearchUrl(tool.domain, trimmedQuery)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 px-3 py-1.5 text-xs font-mono text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200"
                        >
                          Search "{trimmedQuery}"
                          <Search className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </aside>
  );
}
