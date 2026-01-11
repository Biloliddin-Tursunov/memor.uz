
import React from 'react';
import { Link } from 'react-router-dom';
import { Team } from '../types';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface TeamCardProps {
  team: Team;
  index: number;
}

const TEAM_PIN_MAP: Record<string, string> = {
  translators: 'pin-red',
  architects: 'pin-blue',
  artwork: 'pin-gold',
  media: 'pin-yellow',
  students: 'pin-green',
  software: 'pin-silver'
};

const TeamCard: React.FC<TeamCardProps> = ({ team, index }) => {
  const { t } = useLanguage();
  const rotation = index % 2 === 0 ? '1deg' : '-1deg';
  const pinClass = TEAM_PIN_MAP[team.id] || 'pin-gold';

  // Translate description content
  const descriptionContent = t(team.description);

  const renderDescription = (text: string) => {
    return text.split('\n').map((line, i) => {
      const trimmed = line.trim();
      const lower = trimmed.toLowerCase();

      // Flexible check for headers in different languages
      const isHeader = lower.startsWith('vazifasi') || lower.startsWith('kimlar ishlaydi') || 
                       lower.startsWith('görev') || lower.startsWith('kimler') ||
                       lower.startsWith('duties') || lower.startsWith('who works') ||
                       lower.startsWith('обязанности') || lower.startsWith('кто работает');
      
      return (
        <div key={i} className={`
            leading-relaxed font-typewriter text-xs text-ink/80
            ${isHeader ? 'font-bold mt-3 mb-1 text-ink underline decoration-dotted decoration-ink/30' : 'font-normal pl-2'}
        `}>
          {line}
        </div>
      );
    });
  };

  return (
    <Link to={`/team/${team.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1, rotate: rotation }}
        whileHover={{ 
            scale: 1.02, 
            rotate: '0deg',
            zIndex: 30,
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="paper-curl relative bg-[#f0eadd] w-full p-6 shadow-md cursor-pointer group flex flex-col z-10"
        style={{
            minHeight: '280px',
            borderRadius: '2px 2px 2px 20px', // Explicit corner fold styling
            boxShadow: '2px 2px 10px rgba(0,0,0,0.2)' 
        }}
      >
        {/* Simple Pin */}
        <div className={`pin-3d ${pinClass}`} />

        {/* Paper Texture */}
        <div className="absolute inset-0 bg-paper-texture opacity-40 pointer-events-none mix-blend-multiply rounded-[inherit]" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col text-ink">
           <div className="border-b border-ink/10 pb-3 mb-3 text-center">
              <span className="font-typewriter text-[9px] text-ink/40 uppercase tracking-widest block mb-1">
                 {t("Team")} 0{index + 1}
              </span>
              <h3 className="font-serif text-3xl text-ink font-normal tracking-wide group-hover:text-ink-blue transition-colors">
                {t(team.name)}
              </h3>
           </div>

           <div className="flex-grow">
              {renderDescription(descriptionContent)}
           </div>
           
           <div className="mt-4 pt-4 border-t border-ink/5 text-center">
               <span className="font-hand text-lg text-ink/50 group-hover:text-ink transition-colors">
                   {t("Missiyalar")} &rarr;
               </span>
           </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default TeamCard;
