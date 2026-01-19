
import React from 'react';

interface SkeletonProps {
  className?: string;
  type?: 'card' | 'text' | 'image' | 'circle' | 'event-item' | 'news-item' | 'creation';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', type = 'card' }) => {
  const baseClass = "bg-graphite/10 dark:bg-white/10 animate-pulse-slow relative overflow-hidden rounded-sm";
  
  const lineOverlay = (
    <div className="absolute inset-0 pointer-events-none opacity-[0.15] flex items-center justify-center">
       <div className="w-full h-px bg-current absolute top-1/4"></div>
       <div className="w-full h-px bg-current absolute top-2/4"></div>
       <div className="w-full h-px bg-current absolute top-3/4"></div>
       <div className="h-full w-px bg-current absolute left-1/4"></div>
       <div className="h-full w-px bg-current absolute left-2/4"></div>
       <div className="h-full w-px bg-current absolute left-3/4"></div>
       <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-current"></div>
       <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-current"></div>
       <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-current"></div>
       <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-current"></div>
    </div>
  );

  if (type === 'circle') {
    return <div className={`${baseClass} rounded-full ${className}`}>{lineOverlay}</div>;
  }

  if (type === 'text') {
    return <div className={`${baseClass} h-4 w-3/4 rounded ${className}`}>{lineOverlay}</div>;
  }

  if (type === 'creation') {
    return (
      <div className={`break-inside-avoid mb-8 p-4 border border-graphite/10 dark:border-white/10 ${className}`}>
        <div className={`${baseClass} aspect-[4/5] mb-4`}>{lineOverlay}</div>
        <div className={`${baseClass} h-6 w-3/4 mb-2`}>{lineOverlay}</div>
        <div className={`${baseClass} h-4 w-1/2`}>{lineOverlay}</div>
      </div>
    );
  }

  if (type === 'news-item') {
    return (
      <div className={`flex flex-col md:flex-row gap-6 p-6 border border-graphite/10 dark:border-white/10 ${className}`}>
        <div className="md:w-32 flex-shrink-0">
            <div className={`${baseClass} h-10 w-24`}>{lineOverlay}</div>
        </div>
        <div className="flex-1 space-y-3">
            <div className={`${baseClass} h-6 w-3/4`}>{lineOverlay}</div>
            <div className={`${baseClass} h-12 w-full`}>{lineOverlay}</div>
        </div>
      </div>
    );
  }

  if (type === 'event-item') {
    return (
      <div className={`flex bg-white dark:bg-white/5 border border-graphite/5 p-6 items-center gap-8 ${className}`}>
        <div className={`${baseClass} w-20 h-20 flex-shrink-0`}>{lineOverlay}</div>
        <div className="flex-grow space-y-3">
          <div className={`${baseClass} h-6 w-1/2`}>{lineOverlay}</div>
          <div className={`${baseClass} h-4 w-1/3`}>{lineOverlay}</div>
        </div>
        <div className={`${baseClass} w-24 h-8 hidden sm:block`}>{lineOverlay}</div>
      </div>
    );
  }

  return (
    <div className={`${baseClass} p-6 ${className}`}>
      {lineOverlay}
      <div className="h-48 bg-graphite/5 dark:bg-white/5 mb-4"></div>
      <div className="h-6 bg-graphite/10 dark:bg-white/10 w-5/6 mb-2"></div>
      <div className="h-4 bg-graphite/5 dark:bg-white/5 w-1/2"></div>
    </div>
  );
};
