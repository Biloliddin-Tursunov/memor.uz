
import React from 'react';

interface OrnamentProps {
  className?: string;
  type?: 'divider' | 'corner' | 'flourish' | 'tile-header' | 'arch' | 'dome';
}

export const Ornament: React.FC<OrnamentProps> = ({ className = '', type = 'divider' }) => {
  
  if (type === 'tile-header') {
    // 8-pointed star (Rub el Hizb) with geometric internal patterns
    return (
      <svg className={`${className}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 5L62 38H95L68 58L78 91L50 71L22 91L32 58L5 38H38L50 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.05"/>
        <path d="M50 20L58 42H80L62 55L68 77L50 64L32 77L38 55L20 42H42L50 20Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
        <circle cx="50" cy="50" r="3" fill="currentColor" />
        <path d="M50 5V15M50 85V95M5 50H15M85 50H95" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      </svg>
    );
  }

  if (type === 'dome') {
     // Ribbed dome (Samarkand style)
     return (
        <svg className={`${className}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M10 85H90V90H10V85Z" fill="currentColor" fillOpacity="0.2"/>
           <path d="M15 85V75C15 75 15 20 50 20C85 20 85 75 85 75V85" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
           <path d="M50 10V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
           {/* Ribs of the dome */}
           <path d="M30 25C30 25 35 45 35 75" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
           <path d="M50 20V75" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
           <path d="M70 25C70 25 65 45 65 75" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
           {/* Base detail */}
           <rect x="20" y="75" width="60" height="10" stroke="currentColor" strokeWidth="1"/>
           <path d="M25 80H75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2"/>
        </svg>
     )
  }

  if (type === 'arch') {
     // Pointed arch (Islamic/Persian style)
     return (
        <svg className={`${className}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M15 90V55C15 40 30 15 50 10C70 15 85 40 85 55V90" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
           <path d="M25 90V58C25 45 35 25 50 20C65 25 75 45 75 58V90" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
           <path d="M10 90H90" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
           {/* Geometric motif inside arch */}
           <circle cx="50" cy="40" r="4" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
           <path d="M50 30V35M50 45V50M40 40H45M55 40H60" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
        </svg>
     )
  }

  if (type === 'corner') {
    return (
      <svg className={`w-8 h-8 text-teal opacity-80 ${className}`} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2H15M2 2V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2 2L10 10" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
        <rect x="1" y="1" width="4" height="4" fill="currentColor"/>
        <path d="M38 2H25M38 2V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="rotate(90 38 2)"/>
      </svg>
    );
  }

  if (type === 'flourish') {
    // Elegant Islamic Calligraphic Flourish (Islimi motif)
    return (
      <svg className={`w-16 h-16 text-sepia mx-auto ${className}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M50 10C50 10 45 30 20 45C10 52 10 65 10 65C10 65 25 60 40 80L50 90L60 80C75 60 90 65 90 65C90 65 90 52 80 45C55 30 50 10 50 10Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05"/>
         <circle cx="50" cy="50" r="2" fill="currentColor" />
         <path d="M50 10V25M50 75V90" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
         <path d="M35 50C35 50 42 40 50 40C58 40 65 50 65 50" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
      </svg>
    )
  }

  // Default Divider (An'anaviy zanjira hoshiya uslubida)
  return (
    <div className={`flex items-center justify-center gap-4 py-8 opacity-70 ${className}`}>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-sepia to-transparent" />
      <div className="shrink-0 flex items-center gap-2 text-sepia">
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
         </svg>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-l from-transparent via-sepia to-transparent" />
    </div>
  );
};
