
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Team } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const rotation = index % 2 === 0 ? '1deg' : '-1deg';
  const pinClass = TEAM_PIN_MAP[team.id] || 'pin-gold';

  const descriptionContent = t(team.description);

  const renderDescription = (text: string) => {
    return text.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      const lower = trimmed.toLowerCase();

      const isHeader = lower.startsWith('vazifasi') || lower.startsWith('kimlar ishlaydi') || 
                       lower.startsWith('görev') || lower.startsWith('kimler') ||
                       lower.startsWith('duties') || lower.startsWith('who works') ||
                       lower.startsWith('обязанности') || lower.startsWith('кто работает');
      
      return (
        <div key={i} className={`
            leading-relaxed font-typewriter text-[10px] md:text-xs text-ink/80
            ${isHeader ? 'font-bold mt-2 md:mt-3 mb-1 text-ink underline decoration-dotted decoration-ink/30' : 'font-normal pl-1 md:pl-2'}
        `}>
          {line}
        </div>
      );
    });
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative group">
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
          className={`paper-curl relative bg-[#f0eadd] w-full p-4 md:p-6 shadow-md cursor-pointer flex flex-col z-10 transition-all duration-300 ${isExpanded ? 'min-h-[400px]' : 'min-h-[160px] md:min-h-[280px]'}`}
          style={{
              borderRadius: '2px 2px 2px 20px',
              boxShadow: '2px 2px 10px rgba(0,0,0,0.2)' 
          }}
        >
          {/* Simple Pin */}
          <div className={`pin-3d ${pinClass}`} />

          {/* Paper Texture */}
          <div className="absolute inset-0 bg-paper-texture opacity-40 pointer-events-none mix-blend-multiply rounded-[inherit]" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col text-ink">
             <div className="border-b border-ink/10 pb-2 md:pb-3 mb-2 md:mb-3 text-center">
                <span className="font-typewriter text-[8px] md:text-[9px] text-ink/40 uppercase tracking-widest block mb-0.5">
                   {t("Team")} 0{index + 1}
                </span>
                <h3 className="font-serif text-xl md:text-3xl text-ink font-normal tracking-wide group-hover:text-ink-blue transition-colors truncate">
                  {t(team.name)}
                </h3>
             </div>

             <div className={`flex-grow overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-none' : 'max-h-20 md:max-h-none'}`}>
                {renderDescription(descriptionContent)}
             </div>
             
             {/* Mobile Subtle Expand Trigger */}
             <div className="md:hidden mt-1 mb-2">
                <button 
                    onClick={handleToggleExpand}
                    className="flex items-center gap-1 text-[8px] uppercase tracking-tighter text-ink/20 hover:text-ink/40 transition-colors"
                >
                    {isExpanded ? <><ChevronUp size={8} /> {t("Yopish")}</> : <><ChevronDown size={8} /> {t("Kengaytirish")}</>}
                </button>
             </div>
             
             {/* Missions Link (Always visible, more prominent on hover) */}
             <div className="mt-auto pt-2 md:pt-4 border-t border-ink/5 text-center flex items-center justify-center gap-1 group/btn">
                 <span className="font-hand text-sm md:text-lg text-ink/40 group-hover:text-ink transition-colors">
                     {t("Missiyalar")}
                 </span>
                 <ArrowRight size={12} className="text-ink/20 group-hover:text-ink group-hover:translate-x-1 transition-all" />
             </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default TeamCard;
