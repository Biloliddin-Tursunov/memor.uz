
import React, { useEffect, useState } from 'react';

interface IntroScreenProps {
  onFinish: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onFinish }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 2 soniya ko'rsatib turadi, keyin fade out boshlanadi
    const timer = setTimeout(() => {
      setIsFading(true);
      // Fade out tugagach (1s) onFinish chaqiriladi
      setTimeout(onFinish, 1000);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-parchment transition-opacity duration-1000 ease-in-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Texture Overlay consistent with App */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-paper-texture mix-blend-multiply"></div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 animate-in fade-in zoom-in duration-1000">
        
        {/* Logo - Filter applied to make the white SVG visible on light bg (dark charcoal/sepia tone) */}
        <img 
          src="https://memor.uz/favicon-light.svg" 
          alt="Me'mor Logo" 
          className="h-32 md:h-40 w-auto mb-8 opacity-90 drop-shadow-sm filter brightness-0 sepia-[0.3] contrast-[0.8]"
        />

        {/* Main Title */}
        <h1 className="font-display text-6xl md:text-8xl text-graphite tracking-tight mb-4">
          ME'MOR
        </h1>

        {/* Divider */}
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-sepia to-transparent mb-4"></div>

        {/* Slogan */}
        <p className="font-serif italic text-sm md:text-lg tracking-[0.2em] text-sepia-dark uppercase">
          Dunyoni go'zallashtirish uchun!
        </p>

      </div>
    </div>
  );
};

export default IntroScreen;
