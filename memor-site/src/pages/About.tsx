import React from 'react';
import { Ornament } from '../components/Ornament';
import TeamSection from '../components/TeamSection';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

const About: React.FC<{ language: Language }> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl mb-4 text-graphite dark:text-white">{t.aboutTitle}</h2>
        <Ornament type="divider" className="w-48 mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-2">
        <div>
          <p className="font-serif text-lg leading-relaxed text-justify first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:text-sepia dark:text-gray-300">
            {t.aboutP1}
          </p>
          <p className="font-serif text-lg leading-relaxed text-justify mt-4 dark:text-gray-300">
            {t.aboutP2}
          </p>
        </div>
        <div className="relative p-4 border border-graphite/20 dark:border-white/20 rotate-1 bg-white dark:bg-white/5 shadow-lg">
          <img
            src="/family.jpg"
            alt="Team working"
            className="w-full h-80 object-cover"
          />
          <div className="text-center mt-2 font-mono text-xs uppercase tracking-widest text-graphite/60 dark:text-gray-400">
            {t.teamMeeting}
          </div>
        </div>
      </div>

      {/* Team Section Component */}
      <TeamSection language={language} />


    </div>
  );
};

export default About;
