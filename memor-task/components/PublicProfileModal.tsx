
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
  onManage?: () => void; // Optional: Only for Super Admins
}

const PublicProfileModal: React.FC<PublicProfileModalProps> = ({ isOpen, onClose, member, onManage }) => {
  const { teams, getMemberTeams } = useTeams();
  const { t } = useLanguage();

  if (!member) return null;

  const memberTeamIds = getMemberTeams(member.id);
  const memberTeamNames = teams
    .filter(t => memberTeamIds.includes(t.id))
    .map(t => t.name);

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
                className="relative bg-gradient-to-br from-[#1a103c] to-[#050510] border border-white/10 w-full max-w-sm rounded-lg shadow-2xl overflow-hidden p-8 flex flex-col items-center text-center group"
            >
                {/* Controls Area (Top Right) */}
                <div className="absolute top-4 right-4 flex items-center gap-3">
                    {/* Super Admin Edit Shortcut */}
                    {onManage && (
                        <button 
                            onClick={onManage}
                            className="text-white/20 hover:text-indigo-400 transition-colors"
                            title="Manage Creator"
                        >
                            <Settings2 size={18} />
                        </button>
                    )}
                    <button 
                        onClick={onClose}
                        className="text-white/30 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Avatar */}
                <div className="relative mb-6 mt-4">
                    <div className={`
                        w-28 h-28 rounded-full flex items-center justify-center overflow-hidden
                        ${member.isVolunteer 
                            ? 'border-2 border-white/10 bg-white/5' 
                            : 'border-2 border-indigo-400/30 shadow-[0_0_30px_rgba(99,102,241,0.3)]'}
                    `}>
                        {member.avatar ? (
                            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                            member.isVolunteer ? <Sparkles size={32} className="text-white/20" /> : <User size={48} className="text-white/20" />
                        )}
                    </div>
                    {member.isVolunteer && (
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5">
                            <span className="text-[10px] uppercase tracking-widest text-white/60">Volunteer</span>
                        </div>
                    )}
                </div>

                {/* Name & Role */}
                <h3 className="font-serif text-3xl text-white mb-2">{member.name}</h3>
                <p className="font-typewriter text-xs uppercase tracking-widest text-indigo-300/70 mb-6">
                    {member.role || t("Creator")}
                </p>

                {/* Teams */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {memberTeamNames.map((name, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-[10px] font-typewriter uppercase tracking-widest text-white/60">
                            {t(name)}
                        </span>
                    ))}
                </div>

                {/* Bio */}
                <div className="w-full border-t border-white/5 pt-6 relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0d091f] px-2 text-[10px] text-white/20 font-typewriter uppercase">
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
