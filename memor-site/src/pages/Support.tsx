import React from 'react';
import { Ornament } from '../components/Ornament';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

const Support: React.FC<{ language: Language }> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <Ornament type="flourish" className="mb-6 opacity-60" />
      <h2 className="font-display text-4xl mb-6 text-graphite dark:text-white">{t.supportTitle}</h2>
      <p className="font-serif text-xl italic text-graphite/70 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
        {t.supportDesc}
      </p>

      {/* Donation Platforms */}
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12 max-w-3xl mx-auto mb-16">

        {/* Tirikchilik Card - Blue Brand Style */}
        <a
          href="https://tirikchilik.uz/memor"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl bg-white dark:bg-[#1e1e1e] flex flex-col"
        >
          {/* Brand Header */}
          <div className="h-32 bg-[#3396FF] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 to-transparent scale-150"></div>

            {/* Logo Container */}
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg z-10 transform group-hover:scale-110 transition-transform duration-300 overflow-hidden p-2">
              <img
                src="https://memor.uz/tirikchilik.png"
                alt="Tirikchilik Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="p-8 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-2xl text-graphite dark:text-white mb-2 font-sans tracking-tight">Tirikchilik</h3>
              <p className="text-graphite/60 dark:text-gray-400 text-sm mb-6 font-medium leading-relaxed">
                {t.localCards}
              </p>
            </div>

            <div className="w-full py-4 rounded-xl bg-[#3396FF] text-white font-bold text-sm uppercase tracking-wider group-hover:bg-[#2879D0] transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              <span>{t.sponsorButton}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </div>
        </a>

        {/* Buy Me a Coffee Card - Yellow Brand Style */}
        <a
          href="https://buymeacoffee.com/memor.uz"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl bg-white dark:bg-[#1e1e1e] flex flex-col"
        >
          {/* Brand Header */}
          <div className="h-32 bg-[#FFDD00] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/50 to-transparent scale-150"></div>

            {/* Logo Container */}
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg z-10 transform group-hover:scale-110 transition-transform duration-300 overflow-hidden p-4">
              <img
                src="https://memor.uz/buy-coffe.png"
                alt="Buy Me a Coffee Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="p-8 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-2xl text-graphite dark:text-white mb-2 font-sans tracking-tight">Buy Me a Coffee</h3>
              <p className="text-graphite/60 dark:text-gray-400 text-sm mb-6 font-medium leading-relaxed">
                {t.intlCards}
              </p>
            </div>

            <div className="w-full py-4 rounded-xl bg-[#FFDD00] text-black font-bold text-sm uppercase tracking-wider group-hover:bg-[#FFEA55] transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              <span>{t.coffeeButton}</span>
              <span className="text-xl">☕</span>
            </div>
          </div>
        </a>

      </div>

      <div className="border-t border-graphite/10 dark:border-white/10 pt-8">
        <p className="text-xs font-mono text-graphite/40 dark:text-gray-500">
          {t.supportFooter}
        </p>
      </div>
    </div>
  );
};

export default Support;
