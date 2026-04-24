'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Globe, Image as ImageIcon, Database, BookOpen, Code, MapPinned, UserRoundSearch } from 'lucide-react';
import { DorkEngine } from './DorkEngine';
import { WikiPanel } from './WikiPanel';
import { GitHubPanel } from './GitHubPanel';
import { ImageGrid } from './ImageGrid';
import { GeneralResults } from './GeneralResults';
import { GeoToolkitPanel } from './GeoToolkitPanel';
import { UsernamePivotPanel } from './UsernamePivotPanel';

interface ResultsTabsProps {
  query: string;
}

export function ResultsTabs({ query }: ResultsTabsProps) {
  if (!query) return null;

  return (
    <Tabs defaultValue="dorks" className="w-full">
      <div className="sticky top-0 z-10 w-full mb-8 pt-4 pb-2 bg-gradient-to-b from-black via-black to-transparent">
        <div className="overflow-x-auto pb-2 scrollbar-none">
          <TabsList className="inline-flex h-11 items-center justify-start rounded-full bg-zinc-900/80 border border-zinc-800 p-1 backdrop-blur px-1 text-zinc-400">
            <TabsTrigger 
              value="dorks" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-zinc-950 data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-zinc-800"
            >
              <Database className="h-4 w-4 mr-2" /> Dorks
            </TabsTrigger>
            <TabsTrigger 
              value="pivot" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-zinc-950 data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-zinc-800"
            >
              <UserRoundSearch className="h-4 w-4 mr-2" /> Pivot
            </TabsTrigger>
            <TabsTrigger 
              value="all" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-zinc-950 data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-zinc-800"
            >
              <Globe className="h-4 w-4 mr-2" /> All
            </TabsTrigger>
            <TabsTrigger 
              value="images" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-zinc-950 data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-zinc-800"
            >
              <ImageIcon className="h-4 w-4 mr-2" /> Images
            </TabsTrigger>
            <TabsTrigger 
              value="github" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-zinc-950 data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-zinc-800"
            >
              <Code className="h-4 w-4 mr-2" /> GitHub
            </TabsTrigger>
            <TabsTrigger 
              value="wiki" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-zinc-950 data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-zinc-800"
            >
              <BookOpen className="h-4 w-4 mr-2" /> Wiki
            </TabsTrigger>
            <TabsTrigger 
              value="geo" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-zinc-950 data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-zinc-800"
            >
              <MapPinned className="h-4 w-4 mr-2" /> Geo
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      <TabsContent value="dorks" className="min-h-[500px] outline-none">
        <DorkEngine query={query} />
      </TabsContent>

      <TabsContent value="all" className="min-h-[500px] outline-none">
        <GeneralResults query={query} />
      </TabsContent>

      <TabsContent value="pivot" className="min-h-[500px] outline-none">
        <UsernamePivotPanel query={query} />
      </TabsContent>
      
      <TabsContent value="images" className="min-h-[500px] outline-none">
        <ImageGrid query={query} />
      </TabsContent>

      <TabsContent value="github" className="min-h-[500px] outline-none">
        <GitHubPanel query={query} />
      </TabsContent>

      <TabsContent value="wiki" className="min-h-[500px] outline-none">
        <WikiPanel query={query} />
      </TabsContent>

      <TabsContent value="geo" className="min-h-[500px] outline-none">
        <GeoToolkitPanel query={query} />
      </TabsContent>
    </Tabs>
  );
}
