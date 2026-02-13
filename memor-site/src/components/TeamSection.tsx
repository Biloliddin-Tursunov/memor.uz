import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ornament } from './Ornament';
import { TEAM_MEMBERS, TRANSLATIONS } from '../constants';
import { Skeleton } from './Skeleton';
import { Language } from '../types';

interface TeamSectionProps {
  className?: string;
  language?: Language;
}

const TeamSection: React.FC<TeamSectionProps> = ({ className = '', language = 'uz' }) => {
  const t = TRANSLATIONS[language];
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  const handleMemberClick = (member: any) => {
    if (member.name === 'Biloliddin') {
      setSelectedMember(member);
    }
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  const handleSeeMore = () => {
    navigate('/biloliddin');
  };

  return (
    <div className={`py-16 md:py-24 ${className}`}>
      <div className="text-center mb-20 relative">
        <div className="inline-block bg-transparent px-8">
          <Ornament type="flourish" className="mb-4 opacity-30 w-10 h-10" />
          <h3 className="font-display text-4xl text-graphite dark:text-white tracking-tight">{t.ourTeam}</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-6">
        {TEAM_MEMBERS.length > 0 ? TEAM_MEMBERS.map((member) => (
          <div
            key={member.name}
            className={`flex flex-col items-center group ${member.name === 'Biloliddin' ? 'cursor-pointer' : ''}`}
            onClick={() => handleMemberClick(member)}
          >
            <div className="relative mb-8 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full aspect-square max-w-[9rem] md:max-w-[11rem] rounded-full overflow-hidden border-[4px] border-white shadow-xl ring-2 ring-deep-teal ring-offset-4 mx-auto">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-display text-xl text-graphite dark:text-white mb-2 group-hover:text-deep-teal transition-colors">{member.name}</h4>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-graphite/50 dark:text-gray-400 font-bold">{member.role}</p>
            </div>
          </div>
        )) : [1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex flex-col items-center">
            <Skeleton className="w-full aspect-square max-w-[9rem] md:max-w-[11rem] mb-8 rounded-full" type="circle" />
            <Skeleton className="h-6 w-3/4 mb-2" type="text" />
            <Skeleton className="h-4 w-1/2" type="text" />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-8 max-w-sm w-full relative transform transition-all scale-100" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 ring-2 ring-deep-teal ring-offset-4">
                <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-display text-2xl text-deep-teal mb-2">{selectedMember.name}</h3>
              <p className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-6">{selectedMember.role}</p>

              <button
                onClick={handleSeeMore}
                className="px-6 py-2 bg-deep-teal text-white font-sans text-sm tracking-widest hover:bg-opacity-90 transition-all rounded shadow-md uppercase"
              >
                {t.seeMore}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSection;
