import { SearchBar } from '@/components/SearchBar';
import { ShieldAlert, Terminal } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-[90vh] flex-col items-center justify-center p-6 md:p-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] opacity-30 pointer-events-none" />
      
      <div className="z-10 w-full max-w-5xl flex flex-col items-center text-center space-y-10">
        
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/10 relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
              <Terminal className="h-8 w-8 text-emerald-400 relative z-10" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-zinc-100 via-zinc-300 to-zinc-600 drop-shadow-sm">
            PHANTOM
          </h1>
          <p className="text-zinc-400 font-mono text-sm md:text-base tracking-widest uppercase mt-4">
            Advanced Open Source Intelligence Suite
          </p>
        </div>

        <div className="w-full max-w-2xl px-4 animate-in slide-in-from-bottom-6 duration-700 delay-150">
          <SearchBar centered autoFocus />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-16 animate-in slide-in-from-bottom-8 duration-700 delay-300 text-left">
          <div className="border border-zinc-800/80 bg-zinc-950/40 p-6 rounded-2xl flex flex-col gap-3 hover:border-emerald-500/30 transition-colors group">
            <div className="h-10 w-10 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-emerald-500/30 transition-colors">
              <span className="text-lg">🤖</span>
            </div>
            <h3 className="font-medium text-zinc-200">Zero Configuration</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Works immediately without API keys. Built-in Dork Engine leverages advanced search operators entirely client-side.
            </p>
          </div>
          <div className="border border-zinc-800/80 bg-zinc-950/40 p-6 rounded-2xl flex flex-col gap-3 hover:border-emerald-500/30 transition-colors group">
            <div className="h-10 w-10 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-emerald-500/30 transition-colors">
              <span className="text-lg">⚡</span>
            </div>
            <h3 className="font-medium text-zinc-200">Blazing Fast</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Parallel non-blocking API requests, aggressive in-memory LRU caching, and next-gen App Router performance.
            </p>
          </div>
          <div className="border border-zinc-800/80 bg-zinc-950/40 p-6 rounded-2xl flex flex-col gap-3 hover:border-emerald-500/30 transition-colors group">
            <div className="h-10 w-10 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-emerald-500/30 transition-colors">
              <ShieldAlert className="h-5 w-5 text-emerald-400/80" />
            </div>
            <h3 className="font-medium text-zinc-200">Production Ready</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Strict rate limiting, API key proxying, SSR protections, and graceful API degradation fully implemented.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
