
import React from 'react';
import { Ornament } from './Ornament';
import { TEAM_MEMBERS } from '../constants';

interface TeamSectionProps {
    className?: string;
}

const TeamSection: React.FC<TeamSectionProps> = ({ className = '' }) => {
  return (
    <div className={`py-16 md:py-24 ${className}`}>
        <div className="text-center mb-20 relative">
           <div className="inline-block bg-transparent px-8">
              <Ornament type="flourish" className="mb-4 opacity-30 w-10 h-10" />
              <h3 className="font-display text-4xl text-graphite dark:text-white tracking-tight">Bizning Jamoa</h3>
              <p className="font-serif italic text-sepia mt-2 text-sm">G'oyadan ijrogacha bo'lgan yo'l</p>
           </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-14 max-w-6xl mx-auto px-6">
           {TEAM_MEMBERS.map((member) => (
             <div key={member.name} className="flex flex-col items-center group">
                <div className="relative mb-8">
                    <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-[4px] border-white shadow-xl transition-all duration-500 group-hover:scale-105">
                       <img 
                         src={member.image} 
                         alt={member.name} 
                         className="w-full h-full object-cover transition-all duration-700"
                       />
                       <div className="absolute inset-0 bg-graphite/5 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                </div>

                <div className="text-center">
                    <h4 className="font-display text-xl text-graphite dark:text-white mb-2 font-medium">
                      {member.name}
                    </h4>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-graphite/50 dark:text-gray-400 font-bold">
                      {member.role}
                    </p>
                </div>
             </div>
           ))}
        </div>
    </div>
  );
};

export default TeamSection;
