import { Suspense } from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';
import { ResultsTabs } from '@/components/ResultsTabs';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { Terminal } from 'lucide-react';

export const metadata = {
  title: 'Search | PHANTOM OSINT',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const query = typeof resolvedParams?.q === 'string' ? resolvedParams.q : '';

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-black/60">
        <div className="flex h-16 items-center px-4 md:px-8 gap-4 md:gap-8 max-w-[1600px] mx-auto">
          <Link 
            href="/" 
            className="flex items-center gap-2 font-bold tracking-tighter text-lg shrink-0 group"
          >
            <div className="w-8 h-8 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
              <Terminal className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="hidden sm:inline-block">PHANTOM</span>
          </Link>

          <div className="flex-1 max-w-3xl">
            <Suspense fallback={<div className="h-10 bg-zinc-900 rounded-xl animate-pulse" />}>
              <SearchBar initialValue={query} />
            </Suspense>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-[1600px] mx-auto w-full">
        {!query ? (
          <div className="flex items-center justify-center h-[50vh] text-zinc-500 font-mono">
            Enter a query above to start reconnaissance.
          </div>
        ) : (
          <Suspense fallback={
            <div className="space-y-6">
              <div className="flex gap-2 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonLoader key={i} type="text" className="w-24 h-10 rounded-full inline-block" />
                ))}
              </div>
              <SkeletonLoader type="card" className="h-[500px]" />
            </div>
          }>
            <ResultsTabs query={query} />
          </Suspense>
        )}
      </main>
    </div>
  );
}
