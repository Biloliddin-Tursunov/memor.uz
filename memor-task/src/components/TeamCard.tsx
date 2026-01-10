import React from 'react';
import { Link } from 'react-router-dom';
import { Team } from '../types';
import { motion } from 'framer-motion';

interface TeamCardProps {
  team: Team;
  index: number;
}

// Specific mapping as requested
const TEAM_PIN_MAP: Record<string, string> = {
  translators: 'pin-red',
  architects: 'pin-blue',
  artwork: 'pin-gold',
  media: 'pin-yellow',
  students: 'pin-green',
  software: 'pin-silver'
};

const TeamCard: React.FC<TeamCardProps> = ({ team, index }) => {
  // Random slight rotation for organic feel
  const rotation = index % 2 === 0 ? '1deg' : '-1deg';
  
  // Assign pin color based on ID, fallback to gold
  const pinClass = TEAM_PIN_MAP[team.id] || 'pin-gold';

  // Helper to process description and bold headers
  const renderDescription = (text: string) => {
    return text.split('\n').map((line, i) => {
      const trimmed = line.trim();
      // Check if the line matches the headers we want to bold
      if (trimmed.startsWith('Vazifasi') || trimmed.startsWith('Kimlar ishlaydi')) {
        return (
          <React.Fragment key={i}>
            <strong className="block font-bold text-ink-light mt-3 mb-1 text-sm">{line}</strong>
          </React.Fragment>
        );
      }
      // Render normal lines
      return (
        <React.Fragment key={i}>
          {line}
          {i < text.split('\n').length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <Link to={`/team/${team.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: rotation }}
        whileHover={{ 
            scale: 1.05, 
            rotate: '0deg',
            zIndex: 30,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
        transition={{ 
          type: "spring", 
          stiffness: 350, 
          damping: 25
        }}
        className="relative min-h-[260px] bg-kraft w-full p-6 shadow-floating cursor-pointer group flex flex-col z-10"
        style={{
            borderRadius: '2px 2px 2px 25px', // Folded corner effect
        }}
      >
        {/* The 3D Pin with Unique Color */}
        <div className={`pin-3d ${pinClass}`} />

        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none mix-blend-multiply rounded-[inherit]" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col text-ink">
           <div className="border-b-2 border-ink/10 pb-4 mb-4 text-center">
              <span 
                className="font-typewriter text-[10px] text-ink/50 uppercase tracking-widest block mb-1"
              >
                 Department 0{index + 1}
              </span>
              <motion.h3 
                layoutId={`card-title-${team.id}`}
                className="font-serif text-3xl font-bold leading-none group-hover:text-ink-blue transition-colors"
              >
                {team.name}
              </motion.h3>
           </div>

           <div className="flex-grow">
              <motion.div 
                 initial={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="font-typewriter text-xs text-ink/70 leading-relaxed"
              >
                {renderDescription(team.description)}
              </motion.div>
           </div>
           
           <div className="mt-4 pt-4 border-t border-ink/5 text-center">
               <span className="font-serif italic text-ink/40 text-xs">Access Archives &rarr;</span>
           </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default TeamCard;