'use client';

import React, { useState, useMemo } from 'react';
import { getDorkCategories, generateDorkUrl } from '@/lib/dorks';
import { ChevronDown, ExternalLink, Search } from 'lucide-react';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';

interface DorkEngineProps {
  query: string;
}

export function DorkEngine({ query }: DorkEngineProps) {
  const categories = useMemo(() => getDorkCategories(query), [query]);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    // Open all by default
    const initial: Record<string, boolean> = {};
    categories.forEach(c => { initial[c.name] = true; });
    return initial;
  });

  const toggleCategory = (name: string) => {
    setOpenCategories(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleOpenAll = () => {
    const allOpen: Record<string, boolean> = {};
    categories.forEach(c => { allOpen[c.name] = true; });
    setOpenCategories(allOpen);
  };

  const handleCloseAll = () => {
    setOpenCategories({});
  };

  if (!query) {
    return <div className="text-zinc-500 font-mono">Enter a query to generate dorks.</div>;
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-zinc-100 flex items-center gap-2">
            <Search className="h-5 w-5 text-emerald-500" />
            Dork Engine
          </h2>
          <p className="text-sm text-zinc-400 mt-1 font-mono">
            Pre-configured search operators for "{query}"
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExpandAll}
            className="text-xs font-mono text-zinc-400 hover:text-emerald-400 px-3 py-1.5 rounded-md hover:bg-zinc-800 transition-colors"
          >
            Expand All
          </button>
          <button 
            onClick={handleCollapseAll}
            className="text-xs font-mono text-zinc-400 hover:text-emerald-400 px-3 py-1.5 rounded-md hover:bg-zinc-800 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <Collapsible
            key={category.name}
            open={!!openCategories[category.name]}
            onOpenChange={() => toggleCategory(category.name)}
            className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 transition-all duration-200 focus-within:ring-1 focus-within:ring-emerald-500/50 hover:border-zinc-700"
          >
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-900/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{category.icon}</span>
                  <h3 className="font-medium text-zinc-200 group-hover:text-zinc-100 transition-colors">
                    {category.name}
                  </h3>
                  <span className="text-xs font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full ml-2">
                    {category.dorks.length}
                  </span>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 text-zinc-500 transition-transform duration-300 group-hover:text-zinc-300 ${
                    openCategories[category.name] ? 'rotate-180' : ''
                  }`} 
                />
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="px-4 pb-4 pt-1 border-t border-zinc-800/50 bg-zinc-900/20 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
              <div className="flex flex-wrap gap-2 mt-3">
                {category.dorks.map((dork) => (
                  <a
                    key={dork.label}
                    href={generateDorkUrl(query, dork.query)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800/60 hover:bg-emerald-500/10 border border-zinc-700 hover:border-emerald-500/30 text-sm font-mono text-zinc-300 hover:text-emerald-400 transition-all duration-200"
                    title={dork.query}
                  >
                    <span>{dork.label}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  </a>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );

  function handleExpandAll() { handleOpenAll(); }
  function handleCollapseAll() { handleCloseAll(); }
}
