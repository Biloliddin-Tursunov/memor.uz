import React from 'react';
import { personalInfo } from '../data/localDb';

const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-teal text-parchment py-16 border-t border-sepia/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        <div className="mb-8">
           <span className="font-serif text-3xl font-bold tracking-tight">
              Biloliddin<span className="text-sepia">.</span>
            </span>
        </div>

        <div className="flex space-x-8 mb-8">
          <a href={personalInfo.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-parchment/60 hover:text-sepia transition-colors font-sans text-sm uppercase tracking-widest">
            Instagram
          </a>
          <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-parchment/60 hover:text-sepia transition-colors font-sans text-sm uppercase tracking-widest">
            LinkedIn
          </a>
          <a href={personalInfo.socials.telegram} target="_blank" rel="noopener noreferrer" className="text-parchment/60 hover:text-sepia transition-colors font-sans text-sm uppercase tracking-widest">
            Telegram
          </a>
        </div>

        <div className="w-12 h-px bg-sepia/30 mb-8"></div>

        <div className="text-center text-parchment/40 text-xs font-sans">
          &copy; {new Date().getFullYear()} Biloliddin. <br className="md:hidden" /> Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  );
};

export default Footer;