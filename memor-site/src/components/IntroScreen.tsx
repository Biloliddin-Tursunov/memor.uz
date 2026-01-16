
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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-parchment transition-opacity duration-1000 ease-in-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
    >
      {/* Texture Overlay consistent with App */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-paper-texture mix-blend-multiply"></div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 animate-in fade-in zoom-in duration-1000">

        {/* Logo - Filter applied to make the white SVG visible on light bg (black) */}
        <img
          src="https://memor.uz/favicon-light.svg"
          alt="Me'mor Logo"
          className="h-24 md:h-40 w-auto mb-6 md:mb-8 opacity-90 drop-shadow-sm filter brightness-0"
        />

        {/* Main Title */}
        <h1 className="font-display text-5xl md:text-8xl text-graphite tracking-tight mb-4">
          ME'MOR
        </h1>

        {/* Divider */}
        <div className="w-16 md:w-24 h-[2px] bg-gradient-to-r from-transparent via-sepia to-transparent mb-4"></div>

        {/* Slogan */}
        <p className="font-serif italic text-xs md:text-lg tracking-[0.2em] text-sepia-dark uppercase">
          Dunyoni go'zallashtirish uchun!
        </p>

      </div>
    </div>
  );
};

export default IntroScreen;
