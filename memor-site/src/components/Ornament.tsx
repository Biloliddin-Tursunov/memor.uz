
import React from 'react';

interface OrnamentProps {
  className?: string;
  type?: 'divider' | 'corner' | 'flourish' | 'tile-header' | 'arch' | 'dome';
}

export const Ornament: React.FC<OrnamentProps> = ({ className = '', type = 'divider' }) => {

  if (type === 'tile-header') {
    return (
      <svg className={`${className}`} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 20C0 8.9543 8.95431 0 20 0H100C111.046 0 120 8.9543 120 20V40H0V20Z" fill="#000000" fillOpacity="0.1" />
        <path d="M10 20C10 14.4772 14.4772 10 20 10H100C105.523 10 110 14.4772 110 20V35H10V20Z" stroke="#000000" strokeWidth="1" />
        <path d="M15 20C15 17.2386 17.2386 15 20 15H100C102.761 15 105 17.2386 105 20V30H15V20Z" fill="#000000" fillOpacity="0.2" />

        {/* Geometric Islamic Pattern Simulation */}
        <path d="M30 20L35 15L40 20L35 25L30 20Z" stroke="#000000" strokeWidth="1" />
        <path d="M50 20L55 15L60 20L55 25L50 20Z" stroke="#000000" strokeWidth="1" />
        <path d="M70 20L75 15L80 20L75 25L70 20Z" stroke="#000000" strokeWidth="1" />
        <path d="M90 20L95 15L100 20L95 25L90 20Z" stroke="#000000" strokeWidth="1" />

        {/* Border Detail */}
        <rect x="2" y="2" width="116" height="36" rx="18" stroke="#000000" strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>
    );
  }

  if (type === 'dome') {
    return (
      <svg className={`${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M12 2C7 2 3 7 3 12V22H21V12C21 7 17 2 12 2Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M12 2C7 2 3 7 3 12V22H21V12C21 7 17 2 12 2Z" stroke="currentColor" />
        <path d="M12 2V4" stroke="currentColor" />
        <path d="M12 22V12" stroke="currentColor" strokeOpacity="0.3" />
        <path d="M3 12H21" stroke="currentColor" strokeOpacity="0.3" />
      </svg>
    )
  }

  if (type === 'arch') {
    return (
      <svg className={`${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M4 22V10C4 5 7 2 12 2C17 2 20 5 20 10V22" stroke="currentColor" />
        <path d="M6 22V11C6 7 8 4 12 4C16 4 18 7 18 11V22" stroke="currentColor" strokeOpacity="0.5" />
        <rect x="2" y="22" width="20" height="1" fill="currentColor" />
      </svg>
    )
  }

  if (type === 'corner') {
    return (
      <svg className={`w-8 h-8 text-teal opacity-80 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2V10C2 14.4183 5.58172 18 10 18H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2 2H10C14.4183 2 18 5.58172 18 10V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="6" cy="6" r="1.5" fill="currentColor" />
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
