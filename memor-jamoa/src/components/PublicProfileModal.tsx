
import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, User, Settings2 } from 'lucide-react';
import { Member } from '../types';
import { useTeams } from '../context/TeamContext';
import { useLanguage } from '../context/LanguageContext';

interface PublicProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
  onManage?: () => void;
}

const PublicProfileModal: React.FC<PublicProfileModalProps> = ({ isOpen, onClose, member, onManage }) => {
  const { teams, getMemberTeams } = useTeams();
  const { t } = useLanguage();

  if (!member) return null;

  const memberTeamIds = getMemberTeams(member.id);
  const memberTeamNames = teams
    .filter(t => memberTeamIds.includes(t.id))
    .map(t => t.name);

  const isSupervisor = member.role === 'Supervisor';
  const isCigdem = member.id === 'u_cigdem' || member.name.includes('Çiğdem');

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-space-bg/90 backdrop-blur-md"
                onClick={onClose}
            />
            
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-gradient-to-br from-[#1a1510] to-[#050510] border border-white/10 w-full max-w-sm rounded-lg shadow-2xl overflow-hidden p-8 flex flex-col items-center text-center group"
            >
                {/* Controls */}
                <div className="absolute top-4 right-4 flex items-center gap-3">
                    {onManage && (
                        <button onClick={onManage} className="text-white/20 hover:text-amber-400 transition-colors">
                            <Settings2 size={18} />
                        </button>
                    )}
                    <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Avatar Area */}
                <div className="relative mb-6 mt-4">
                    <div className={`
                        w-28 h-28 rounded-full flex items-center justify-center overflow-hidden transition-all duration-700
                        ${isSupervisor 
                          ? 'border-2 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)] bg-amber-900/10' 
                          : member.isVolunteer 
                            ? 'border-2 border-white/10 bg-white/5' 
                            : 'border-2 border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.3)] bg-amber-900/5'}
                    `}>
                        {member.avatar ? (
                            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                            member.isVolunteer && !isSupervisor ? <Sparkles size={32} className="text-white/20" /> : <User size={48} className="text-amber-200/20" />
                        )}
                    </div>
                    {(member.isVolunteer || isSupervisor) && (
                        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 backdrop-blur-sm px-3 py-1 rounded-full border whitespace-nowrap transition-colors
                            ${isSupervisor ? 'bg-amber-500/10 border-amber-500/20 text-amber-200' : 'bg-white/10 border-white/5 text-white/70'}
                        `}>
                            <span className="text-[10px] uppercase tracking-widest font-bold">
                                {t(member.role || (member.isVolunteer ? "Volunteer" : "Creator"))}
                            </span>
                        </div>
                    )}
                </div>

                {/* Name */}
                <h3 className={`font-serif text-3xl text-white mb-2 leading-tight ${isCigdem ? 'border-b border-white/20 pb-1' : ''}`}>
                    {member.name}
                </h3>
                <p className={`font-typewriter text-[10px] uppercase tracking-widest mb-6 text-amber-200/40`}>
                    {member.role ? t(member.role) : t("Creator")}
                </p>

                {/* Teams */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {memberTeamNames.map((name, i) => (
                        <span key={i} className="px-3 py-1 border border-white/10 bg-white/5 rounded-sm text-[10px] font-typewriter uppercase tracking-widest text-white/50">
                            {t(name)}
                        </span>
                    ))}
                </div>

                {/* Bio */}
                <div className="w-full border-t border-white/5 pt-6 relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0d0a08] px-2 text-[10px] text-white/20 font-typewriter uppercase">
                        {t("Bio")}
                    </span>
                    <p className="font-hand text-lg text-white/70 leading-relaxed italic">
                        "{member.bio || t("Floating in the void")}"
                    </p>
                </div>
            </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default PublicProfileModal;
