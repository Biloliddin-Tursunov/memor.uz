// No changes needed for Hero.tsx as it uses the wrapper passed from App
import React from 'react';
import { personalInfo } from '../data/localDb';
import { PageView } from '../types';

interface HeroProps {
  onNavigate: (page: PageView) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-24 min-h-[85vh] flex items-center relative overflow-hidden bg-parchment border-b border-sepia/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">

          {/* Image Side (Left) */}
          <div className="w-full md:w-5/12 flex justify-center md:justify-end animate-fade-in order-1 md:order-1">
            <div className="relative w-64 md:w-80 aspect-[3/4] bg-white p-2 shadow-xl rounded-sm rotate-2 hover:rotate-0 transition-transform duration-700 border border-sepia/20">
              <div className="absolute -inset-2 bg-sepia/5 -z-10 rotate-3 rounded-sm"></div>
              <div className="w-full h-full overflow-hidden relative">
                <div className="absolute inset-0 bg-sepia/10 mix-blend-multiply pointer-events-none z-10"></div>
                <img
                  src={personalInfo.image}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>

          {/* Text Side (Right) */}
          <div className="w-full md:w-7/12 text-center md:text-left space-y-6 animate-fade-in-up delay-100 order-2 md:order-2">
            <div>
              <span className="text-sepia font-sans uppercase tracking-widest text-xs font-semibold block mb-2">
                Bir Inson
              </span>
              <h1 className="font-serif text-4xl md:text-6xl text-deep-teal leading-tight">
                Me'morchilik <br /> va <span className="italic text-sepia">Men</span>.
              </h1>
            </div>

            <p className="font-sans text-graphite/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto md:mx-0">
              Men bir yosh ilm talabida yurgan inson, <a href="https://samgasi.uz/" target="_blank" rel="noopener noreferrer" className="text-deep-teal border-b border-deep-teal hover:text-sepia hover:border-sepia transition-colors">Samarqand davlat arxitektura qurilishi universitetida</a> shaharsozlik yo'nalishida o'qiyman. <a href="https://memor.uz" target="_blank" rel="noopener noreferrer" className="text-deep-teal border-b border-deep-teal hover:text-sepia hover:border-sepia transition-colors">Me'mor</a> talabalar harakati a'zosiman.
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
              <button onClick={() => onNavigate('blog')} className="px-8 py-3 bg-deep-teal text-white font-sans text-sm tracking-wider hover:bg-opacity-90 transition-all shadow-md">
                MAQOLALARNI O'QISH
              </button>
              <button onClick={() => onNavigate('projects')} className="px-8 py-3 border border-deep-teal text-deep-teal font-sans text-sm tracking-wider hover:bg-deep-teal hover:text-white transition-all">
                LOYIHALAR
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Abstract Background Decoration */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-sepia/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-deep-teal/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default Hero;