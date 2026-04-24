'use client';

import React from 'react';
import { OSINT_TOOLKIT } from '@/lib/osint-tools';
import { ExternalLink, ShieldAlert } from 'lucide-react';

interface OsintSidebarProps {
  query?: string;
  className?: string;
}

export function OsintSidebar({ query, className = '' }: OsintSidebarProps) {
  return (
    <aside className={`w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col h-full ${className}`}>
      <div className="p-5 border-b border-zinc-800 bg-zinc-950/80 sticky top-0 z-10 backdrop-blur-sm">
        <h2 className="text-emerald-400 font-mono font-semibold tracking-tight flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" /> 
          OSINT TOOLKIT
        </h2>
        <p className="text-zinc-500 text-xs mt-2 leading-relaxed">
          Quick-access intelligence resources. Select a tool to open it in a new perimeter.
        </p>
        {query ? (
          <p className="mt-2 text-[11px] font-mono text-zinc-400">
            Active target: <span className="text-emerald-300">{query}</span>
          </p>
        ) : null}
      </div>

      <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-6">
        {OSINT_TOOLKIT.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.id} className="space-y-3">
              <h3 className="text-zinc-300 text-sm font-semibold flex items-center gap-2 border-b border-zinc-800/50 pb-2">
                <Icon className="h-4 w-4 text-emerald-500/70" />
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.tools.map((tool) => (
                  <li key={tool.name}>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-2 -mx-2 rounded-lg hover:bg-zinc-900 transition-colors"
                    >
                      <div className="flex items-center justify-between text-zinc-300 text-sm font-medium group-hover:text-emerald-400 transition-colors">
                        <span>{tool.name}</span>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-zinc-500 text-xs mt-1 line-clamp-2">
                        {tool.desc}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
