import React from 'react';

export const MemorLogo = () => (
  <g>
    {/* Icon: Stylized Dome/Stone */}
    <path 
        d="M10 40 L40 40 L45 30 L45 20 C45 10 35 0 22.5 0 C10 0 0 10 0 20 L0 30 Z" 
        fill="#1a1a1a"
    />
    <rect x="0" y="44" width="40" height="6" fill="#1a1a1a" />
    
    {/* Text: Me'mor & Land */}
    <text x="55" y="18" fontSize="14" fontFamily="sans-serif" fontWeight="bold" fill="#1a1a1a">Me'mor</text>
    <text x="70" y="32" fontSize="12" fontFamily="sans-serif" fontWeight="bold" fill="#1a1a1a">&</text>
    <text x="58" y="46" fontSize="14" fontFamily="sans-serif" fontWeight="bold" fill="#1a1a1a">Land</text>
  </g>
);

export const NaqshLogo = () => (
  <g>
    {/* Icon: Geometric Pattern (simplified mandala/rosette) */}
    <g transform="translate(20, 25)">
      <circle cx="0" cy="0" r="18" fill="none" stroke="#1a1a1a" strokeWidth="1" />
      {/* Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <circle 
            key={angle}
            cx={12 * Math.cos(angle * Math.PI / 180)} 
            cy={12 * Math.sin(angle * Math.PI / 180)} 
            r="4" 
            fill="#1a4d2e" 
            opacity="0.9"
        />
      ))}
      {/* Center detail */}
      <path d="M-20 -20 L20 20 M-20 20 L20 -20" stroke="#1a1a1a" strokeWidth="0.5" />
      <circle cx="0" cy="0" r="6" fill="#e5baba" /> 
    </g>

    {/* Text: Naqsh School of Crafts */}
    <text x="50" y="15" fontSize="14" fontFamily="sans-serif" fontWeight="bold" fill="#1a1a1a">Naqsh School</text>
    <text x="50" y="35" fontSize="14" fontFamily="sans-serif" fontWeight="400" fill="#1a1a1a">of Crafts</text>
  </g>
);