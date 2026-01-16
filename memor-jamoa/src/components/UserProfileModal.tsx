
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, User, Shield, Camera, Upload } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useTeams } from '../context/TeamContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { currentUser, updateCurrentUser } = useAuth();
  const { teams, getMemberTeams, saveGlobalMember } = useTeams();

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [myTeams, setMyTeams] = useState<string[]>([]);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setBio(currentUser.bio || '');
      setAvatar(currentUser.avatar || '');
      setPassword(currentUser.password || '');
      setMyTeams(getMemberTeams(currentUser.id));
    }
  }, [currentUser, getMemberTeams, isOpen]);

  const onSaveClick = () => {
      if (!currentUser) return;
      const updatedUser = {
          ...currentUser,
          name,
          bio,
          avatar,
          password
      };
      saveGlobalMember(updatedUser, myTeams);
      updateCurrentUser(updatedUser); 
      onClose();
  };

  const toggleTeam = (tid: string) => {
    setMyTeams(prev => prev.includes(tid) ? prev.filter(id => id !== tid) : [...prev, tid]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setAvatar(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  if (!currentUser) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-space-bg/90 backdrop-blur-sm"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-paper-white w-full max-w-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col rounded-sm border border-ink/5"
            >
                <div className="p-6 border-b border-ink/10 flex justify-between items-center bg-white/50">
                    <h3 className="font-serif text-2xl text-ink flex items-center gap-2">
                        <User size={24} /> {t("Profile")}
                    </h3>
                    <button onClick={onClose} className="text-ink/40 hover:text-ink transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto max-h-[70vh] custom-scrollbar space-y-8">
                    
                    {/* Identity Section */}
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Avatar */}
                        <div className="flex-shrink-0 flex flex-col items-center gap-2">
                            <div className="w-24 h-24 rounded-full border-2 border-ink/10 bg-ink/5 flex items-center justify-center overflow-hidden relative">
                                {avatar ? (
                                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="font-serif text-4xl text-ink/30">{name.charAt(0)}</span>
                                )}
                            </div>
                            <label className="cursor-pointer flex items-center gap-1 text-[10px] uppercase tracking-widest text-ink/50 hover:text-ink transition-colors bg-ink/5 px-3 py-1 rounded-full">
                                <Upload size={10} /> Upload Photo
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                        </div>

                        {/* Fields */}
                        <div className="flex-grow w-full space-y-4">
                             <div>
                                <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/40 mb-1">{t("Username")} (Name)</label>
                                <input 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-ink/5 border-b border-ink/10 focus:border-ink outline-none px-3 py-2 text-ink font-serif text-xl"
                                />
                             </div>
                             <div>
                                <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/40 mb-1">{t("Role")}</label>
                                <input 
                                    readOnly
                                    value={currentUser.role || 'Creator'}
                                    className="w-full bg-transparent border-b border-ink/10 outline-none px-3 py-2 text-ink/50 font-typewriter text-sm"
                                />
                             </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/40 mb-2">{t("Bio")}</label>
                        <textarea 
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full bg-white border border-ink/10 p-3 focus:border-ink outline-none font-hand text-lg text-ink/80 rounded-sm resize-none h-24"
                            placeholder={t("Write something about yourself...")}
                        />
                    </div>

                    {/* Team Selection */}
                    <div>
                        <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/40 mb-4 flex items-center gap-2">
                            My Departments
                        </label>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                            {teams.map(t => (
                                <div 
                                    key={t.id}
                                    onClick={() => toggleTeam(t.id)}
                                    className={`
                                        cursor-pointer p-3 border rounded-sm flex items-center gap-3 transition-all
                                        ${myTeams.includes(t.id) 
                                            ? 'bg-ink text-white border-ink shadow-md' 
                                            : 'bg-white border-ink/10 text-ink/60 hover:border-ink/30'}
                                    `}
                                >
                                    <div className={`w-3 h-3 border border-current flex items-center justify-center ${myTeams.includes(t.id) ? 'bg-white' : ''}`}>
                                        {myTeams.includes(t.id) && <div className="w-1.5 h-1.5 bg-ink" />}
                                    </div>
                                    <span className="font-typewriter text-xs uppercase tracking-widest truncate">{t.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Security */}
                    <div className="border border-ink/10 rounded-sm p-6 bg-red-50/30">
                        <div className="flex items-center gap-2 text-ink/70 font-serif text-lg mb-4">
                            <Shield size={18} /> {t("Access Code")}
                        </div>
                        <input 
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white border border-ink/10 focus:border-ink outline-none px-3 py-2 text-ink font-typewriter text-sm tracking-widest"
                        />
                    </div>
                </div>

                <div className="p-6 border-t border-ink/10 flex justify-end gap-3 bg-paper-white">
                    <button onClick={onClose} className="px-6 py-2 hover:bg-ink/5 transition-colors font-typewriter text-xs uppercase tracking-widest text-ink/60">
                        {t("Cancel")}
                    </button>
                    <button onClick={onSaveClick} className="px-8 py-2 bg-ink text-white hover:bg-ink-light transition-colors font-typewriter text-xs uppercase tracking-widest shadow-lg flex items-center gap-2">
                        <Check size={16} />
                        {t("Save Profile")}
                    </button>
                </div>

            </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default UserProfileModal;
