
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRightLeft, User, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTeams } from '../context/TeamContext';
import { Member, Team } from '../types';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member;
  currentTeamId: string;
}

const MemberModal: React.FC<MemberModalProps> = ({ isOpen, onClose, member, currentTeamId }) => {
  const { t } = useLanguage();
  const { teams, updateTeamMembers, members } = useTeams();
  
  const [selectedTeam, setSelectedTeam] = useState<string>(currentTeamId);
  // We can also allow editing name/role if needed, but primarily moving teams
  // For simplicity, let's allow basic edits since we removed Add/Delete
  const [name, setName] = useState(member.name);
  const [role, setRole] = useState(member.role || '');
  const [isVolunteer, setIsVolunteer] = useState(member.isVolunteer || false);

  const handleSave = () => {
      // 1. Update basic info locally in the context (We need an updateMember function, 
      // but for now we can simulate it by modifying the array in place if we had that function.
      // Since we don't have a direct 'updateMember' function in the simplified context, 
      // we can do a trick: find the member in the list and replace it using updateTeamMembers)
      
      const currentTeamMembers = [...(members[currentTeamId] || [])];
      const memberIndex = currentTeamMembers.findIndex(m => m.id === member.id);
      
      if (memberIndex !== -1) {
          const updatedMember = {
              ...member,
              name,
              role,
              isVolunteer
          };
          
          // If team didn't change, just update info
          if (selectedTeam === currentTeamId) {
             currentTeamMembers[memberIndex] = updatedMember;
             updateTeamMembers(currentTeamId, currentTeamMembers);
          } else {
             // If team changed, we first update the member object "in transit" (conceptually)
             // But moveMember just moves the object. 
             // We need to implement a smarter update. 
             // Workaround: We remove from current, add modified to new.
             
             // Remove from old
             const filteredOld = currentTeamMembers.filter(m => m.id !== member.id);
             updateTeamMembers(currentTeamId, filteredOld);
             
             // Add to new
             const newTeamMembers = [...(members[selectedTeam] || []), updatedMember];
             updateTeamMembers(selectedTeam, newTeamMembers);
          }
      }

      onClose();
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-space-bg/80 backdrop-blur-sm"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-paper-white w-full max-w-md shadow-2xl relative z-10 overflow-hidden flex flex-col rounded-sm border border-ink/5 p-6"
                style={{
                    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')",
                }}
            >
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-ink/10">
                    <h3 className="font-serif text-2xl text-ink">{t("Creator Info")}</h3>
                    <button onClick={onClose} className="text-ink/40 hover:text-ink transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/40 mb-1">{t("Name")}</label>
                        <input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-ink/5 border-b border-ink/10 focus:border-ink outline-none px-2 py-1 text-ink font-serif text-lg"
                        />
                    </div>

                     {/* Role */}
                     <div>
                        <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/40 mb-1">{t("Role")}</label>
                        <input 
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-ink/5 border-b border-ink/10 focus:border-ink outline-none px-2 py-1 text-ink font-typewriter text-sm"
                        />
                    </div>

                    {/* Volunteer Toggle */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsVolunteer(!isVolunteer)}>
                         <div className={`w-4 h-4 border border-ink/20 flex items-center justify-center transition-colors ${isVolunteer ? 'bg-ink' : 'bg-transparent'}`}>
                             {isVolunteer && <Check size={10} className="text-white" />}
                         </div>
                         <span className="font-typewriter text-xs text-ink/70 uppercase tracking-widest select-none">{t("Volunteer")}</span>
                    </div>

                    {/* Team Selection */}
                    <div className="pt-4 border-t border-ink/10 mt-2">
                        <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/40 mb-2 flex items-center gap-2">
                             <ArrowRightLeft size={12} /> {t("Move to Team")}
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {teams.map(team => (
                                <button
                                    key={team.id}
                                    onClick={() => setSelectedTeam(team.id)}
                                    className={`
                                        px-2 py-2 text-xs font-typewriter uppercase tracking-widest border rounded-sm transition-all text-left truncate
                                        ${selectedTeam === team.id 
                                            ? 'bg-ink text-white border-ink' 
                                            : 'bg-transparent text-ink/60 border-ink/10 hover:border-ink/30'}
                                    `}
                                >
                                    {t(team.name)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                     <button onClick={onClose} className="px-4 py-2 hover:bg-ink/5 transition-colors font-typewriter text-[10px] uppercase tracking-widest text-ink/60">
                        {t("Discard")}
                    </button>
                    <button onClick={handleSave} className="px-6 py-2 bg-ink text-white hover:bg-ink-light transition-colors font-typewriter text-[10px] uppercase tracking-widest shadow-lg flex items-center gap-2">
                        <Check size={14} />
                        {t("Update")}
                    </button>
                </div>

            </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default MemberModal;
