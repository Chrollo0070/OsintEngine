import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  type?: 'card' | 'text' | 'image' | 'avatar';
  lines?: number;
}

export function SkeletonLoader({ className, type = 'text', lines = 1, ...props }: SkeletonLoaderProps) {
  if (type === 'text') {
    return (
      <div className={cn('space-y-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-4 w-full animate-pulse rounded bg-zinc-800',
              i === lines - 1 && lines > 1 && 'w-2/3'
            )}
          />
        ))}
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className={cn('rounded-lg border border-zinc-800 bg-zinc-900/50 p-4', className)} {...props}>
        <div className="h-5 w-1/3 animate-pulse rounded bg-zinc-800 mb-4" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-800" />
        </div>
      </div>
    );
  }

  if (type === 'image') {
    return (
      <div
        className={cn('w-full animate-pulse rounded-lg bg-zinc-800', className)}
        {...props}
      />
    );
  }

  if (type === 'avatar') {
    return (
      <div
        className={cn('h-10 w-10 animate-pulse rounded-full bg-zinc-800', className)}
        {...props}
      />
    );
  }

  return null;
}
