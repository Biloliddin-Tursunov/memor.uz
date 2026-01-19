
import React from 'react';

interface SkeletonProps {
  className?: string;
  type?: 'card' | 'text' | 'image' | 'circle' | 'list' | 'news-item' | 'creation';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', type = 'card' }) => {
  // Ko'proq ko'zga tashlanadigan, yuqori kontrastli fon
  const baseClass = "bg-graphite/20 dark:bg-white/15 animate-pulse-slow relative overflow-hidden rounded-sm";
  
  // Professional blueprint detallari (o'lchov va panjara chiziqlari)
  const lineOverlay = (
    <div className="absolute inset-0 pointer-events-none opacity-[0.25] flex items-center justify-center">
       <div className="w-full h-px bg-current absolute top-1/4"></div>
       <div className="w-full h-px bg-current absolute top-2/4"></div>
       <div className="w-full h-px bg-current absolute top-3/4"></div>
       <div className="h-full w-px bg-current absolute left-1/4"></div>
       <div className="h-full w-px bg-current absolute left-2/4"></div>
       <div className="h-full w-px bg-current absolute left-3/4"></div>
       
       {/* Burchak o'lchov belgilari */}
       <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-current"></div>
       <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-current"></div>
       <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-current"></div>
       <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-current"></div>
       
       <div className="absolute inset-0 border border-current opacity-10"></div>
    </div>
  );

  if (type === 'circle') {
    return <div className={`${baseClass} rounded-full ${className}`}>{lineOverlay}</div>;
  }

  if (type === 'text') {
    return <div className={`${baseClass} h-4 w-3/4 rounded ${className}`}>{lineOverlay}</div>;
  }

  if (type === 'image') {
    return <div className={`${baseClass} aspect-video md:aspect-square ${className}`}>{lineOverlay}</div>;
  }

  if (type === 'creation') {
    return (
      <div className={`break-inside-avoid mb-8 p-4 border border-graphite/20 dark:border-white/20 ${className}`}>
        <div className={`${baseClass} aspect-[4/5] mb-4`}>{lineOverlay}</div>
        <div className={`${baseClass} h-6 w-3/4 mb-2`}>{lineOverlay}</div>
        <div className={`${baseClass} h-4 w-1/2 mb-4`}>{lineOverlay}</div>
      </div>
    );
  }

  if (type === 'news-item') {
    return (
      <div className={`flex flex-col md:flex-row gap-6 p-6 border border-graphite/15 dark:border-white/15 ${className}`}>
        <div className="md:w-32 flex-shrink-0">
            <div className={`${baseClass} h-12 w-28`}>{lineOverlay}</div>
        </div>
        <div className="flex-1 space-y-4">
            <div className={`${baseClass} h-8 w-full md:w-3/4`}>{lineOverlay}</div>
            <div className={`${baseClass} h-20 w-full`}>{lineOverlay}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${baseClass} border border-graphite/30 dark:border-white/30 p-6 ${className}`}>
      {lineOverlay}
      <div className="h-48 bg-graphite/10 dark:bg-white/10 mb-6 rounded-sm"></div>
      <div className="h-6 bg-graphite/20 dark:bg-white/20 w-5/6 mb-3 rounded"></div>
      <div className="h-4 bg-graphite/10 dark:bg-white/10 w-2/3 rounded"></div>
    </div>
  );
};
