'use client';

import React, { useState, useEffect } from 'react';
import type { GitHubResults } from '@/lib/github';
import { SkeletonLoader } from './SkeletonLoader';
import { Code, Users, MapPin, Building, Link as LinkIcon, Star, GitBranch } from 'lucide-react';

interface GitHubPanelProps {
  query: string;
}

export function GitHubPanel({ query }: GitHubPanelProps) {
  const [results, setResults] = useState<GitHubResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);

  useEffect(() => {
    async function fetchGitHub() {
      if (!query) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/github?q=${encodeURIComponent(query)}`);
        if (!res.ok) {
          if (res.status === 403 || res.status === 429) setRateLimited(true);
          throw new Error('GitHub fetch failed');
        }
        const data = await res.json();
        setResults(data);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHub();
  }, [query]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in">
        <div className="space-y-4">
          <SkeletonLoader type="card" />
        </div>
        <div className="space-y-4">
          <SkeletonLoader type="card" />
          <SkeletonLoader type="card" />
        </div>
      </div>
    );
  }

  if (rateLimited) {
    return (
      <div className="border border-zinc-800 rounded-xl p-8 bg-zinc-950/50 flex flex-col items-center justify-center text-center animate-in fade-in">
        <Code className="h-10 w-10 text-yellow-600 mb-3" />
        <h3 className="text-zinc-300 font-medium mb-1">GitHub API Rate Limit Exceeded</h3>
        <p className="text-zinc-500 text-sm max-w-md">
          Unauthenticated requests are limited. Please add a GitHub token to your environment variables to increase the limit.
        </p>
      </div>
    );
  }

  if (error || !results || (results.users.length === 0 && results.repos.length === 0)) {
    return (
      <div className="border border-zinc-800 border-dashed rounded-xl p-8 bg-zinc-950/50 flex flex-col items-center justify-center text-center animate-in fade-in">
        <Code className="h-10 w-10 text-zinc-600 mb-3" />
        <h3 className="text-zinc-300 font-medium mb-1">No GitHub Intelligence Found</h3>
        <p className="text-zinc-500 text-sm">
          No matching users or repositories found for "{query}".
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Users Section */}
      <div className="lg:col-span-5 space-y-4">
        <h3 className="font-mono text-zinc-400 text-sm flex items-center gap-2 uppercase tracking-widest mb-4">
          <Users className="h-4 w-4" /> Profiles
        </h3>
        
        {results.users.length === 0 ? (
          <p className="text-zinc-500 text-sm italic">No user profiles matched.</p>
        ) : (
          results.users.map((user) => (
            <a 
              key={user.login}
              href={user.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 rounded-xl p-4 transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.05)]"
            >
              <div className="flex items-start gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={user.avatarUrl} 
                  alt={user.login} 
                  className="w-12 h-12 rounded-full border border-zinc-800 group-hover:border-emerald-500/50 transition-colors"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-medium text-emerald-400 truncate">{user.login}</h4>
                    {user.name && <span className="text-xs text-zinc-500 truncate">{user.name}</span>}
                  </div>
                  
                  {user.bio && (
                    <p className="text-sm text-zinc-300 mt-1 line-clamp-2">{user.bio}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-xs text-zinc-500 font-mono">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span><strong className="text-zinc-300">{user.followers}</strong> flwrs</span>
                    </div>
                    {user.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate max-w-[120px]">{user.location}</span>
                      </div>
                    )}
                    {user.company && (
                      <div className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        <span className="truncate max-w-[120px]">{user.company}</span>
                      </div>
                    )}
                    {user.blog && (
                      <div className="flex items-center gap-1">
                        <LinkIcon className="h-3 w-3" />
                        <span className="truncate max-w-[120px]">{new URL(user.blog.startsWith('http') ? user.blog : `https://${user.blog}`).hostname}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))
        )}
      </div>

      {/* Repositories Section */}
      <div className="lg:col-span-7 space-y-4">
        <h3 className="font-mono text-zinc-400 text-sm flex items-center gap-2 uppercase tracking-widest mb-4">
          <GitBranch className="h-4 w-4" /> Code Intelligence
        </h3>
        
        {results.repos.length === 0 ? (
          <p className="text-zinc-500 text-sm italic">No relevant repositories found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.repos.map((repo) => (
              <a
                key={repo.fullName}
                href={repo.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 rounded-xl p-4 transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.05)] h-full"
              >
                <h4 className="font-medium text-emerald-400 truncate mb-2">{repo.fullName}</h4>
                <p className="text-sm text-zinc-400 line-clamp-3 mb-4 flex-1">
                  {repo.description || 'No description provided.'}
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 mt-auto">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {repo.language}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" /> {repo.stars}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitBranch className="h-3 w-3" /> {repo.forks}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
