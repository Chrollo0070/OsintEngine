'use client';

import { ExternalLink, Search, Video } from 'lucide-react';
import { buildDomainSearchUrl, osintToolSections } from '@/lib/osint-tools';

interface GeoToolkitPanelProps {
  query: string;
}

export function GeoToolkitPanel({ query }: GeoToolkitPanelProps) {
  const trimmedQuery = query.trim();

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
      <div className="rounded-[28px] border border-zinc-800 bg-zinc-950/80 p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.24em] text-emerald-300">
              <Video className="h-3.5 w-3.5" />
              Geo Toolkit
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
              CCTV and map-focused OSINT for "{query}"
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
              Use these launch points to verify locations, inspect live scenes, compare street-level imagery, and correlate transport or weather activity.
            </p>
          </div>

          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(`${trimmedQuery} map OR webcam OR CCTV OR street view`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black px-4 py-2 text-sm font-mono text-zinc-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
          >
            Run geo recon
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {osintToolSections.map((section) => (
          <section
            key={section.id}
            className="rounded-[24px] border border-zinc-800 bg-zinc-950/80 p-5"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-zinc-100">{section.title}</h3>
              <p className="mt-1 text-sm text-zinc-500">{section.description}</p>
            </div>

            <div className="space-y-3">
              {section.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="rounded-2xl border border-zinc-800/80 bg-black/40 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-medium text-zinc-100">{tool.name}</h4>
                    {tool.badge && (
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-emerald-300">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{tool.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-xs font-mono text-zinc-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
                    >
                      Open tool
                      <ExternalLink className="h-3 w-3" />
                    </a>

                    {tool.domain && (
                      <a
                        href={buildDomainSearchUrl(tool.domain, trimmedQuery)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 px-3 py-1.5 text-xs font-mono text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200"
                      >
                        Search target
                        <Search className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
