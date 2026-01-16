import React from 'react';

interface OrnamentProps {
  className?: string;
  type?: 'divider' | 'corner' | 'flourish';
}

export const Ornament: React.FC<OrnamentProps> = ({ className = '', type = 'divider' }) => {
  if (type === 'corner') {
    return (
      <svg className={`w-8 h-8 text-teal opacity-80 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2V10C2 14.4183 5.58172 18 10 18H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2 2H10C14.4183 2 18 5.58172 18 10V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="6" cy="6" r="1.5" fill="currentColor"/>
      </svg>
    );
  }

  if (type === 'flourish') {
    return (
      <svg className={`w-12 h-12 text-sepia mx-auto ${className}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1">
         <path d="M24 4C24 4 20 16 12 24C4 32 4 44 4 44" />
         <path d="M24 4C24 4 28 16 36 24C44 32 44 44 44 44" />
         <circle cx="24" cy="24" r="2" fill="currentColor" />
         <path d="M24 44V34" />
      </svg>
    )
  }

  // Default Divider
  return (
    <div className={`flex items-center justify-center gap-4 py-4 opacity-70 ${className}`}>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-teal to-transparent" />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-sepia shrink-0">
        <rect x="9.5" y="0.5" width="1" height="19" fill="currentColor" />
        <rect x="0.5" y="9.5" width="19" height="1" fill="currentColor" />
        <circle cx="10" cy="10" r="3" stroke="currentColor" />
      </svg>
      <div className="h-[1px] w-full bg-gradient-to-l from-transparent via-teal to-transparent" />
    </div>
  );
};
