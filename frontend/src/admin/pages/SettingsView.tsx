
import React, { useState, useRef } from 'react';
import { 
  User as UserIcon, 
  LogOut,
  Smartphone,
  Laptop,
  Moon,
  Sun,
  Globe,
  RefreshCw,
  Edit3,
  CheckCheck,
  Save,
  Briefcase,
  Camera,
  Plus
} from 'lucide-react';
import { User } from '../types';
import { useTheme, Language } from '../contexts/ThemeContext';

interface SettingsViewProps {
   currentUser: User;
   onLogout: () => void;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'jp', label: '日本語', flag: '🇯🇵' },
];

const AVATAR_STYLES = [
  { key: 'lorelei-neutral', label: 'Lorelei Neutral' },
  { key: 'shapes', label: 'Shapes' },
  { key: 'thumbs', label: 'Thumbs' },
  { key: 'rings', label: 'Rings' },
  { key: 'fun-emoji', label: 'Fun Emoji' }
];

const SettingsView: React.FC<SettingsViewProps> = ({ currentUser, onLogout }) => {
  const { theme, toggleTheme, language, setLanguage, t } = useTheme();
  const [avatarSeed, setAvatarSeed] = useState(currentUser.avatar || currentUser.name);
  const [avatarStyle, setAvatarStyle] = useState('lorelei-neutral');
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState(currentUser.role);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profileCoverStyle = {
      background: `
        radial-gradient(circle at 10% 20%, hsla(180, 40%, 40%, 0.1) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, hsla(300, 40%, 40%, 0.1) 0%, transparent 40%),
        linear-gradient(180deg, var(--bg-sidebar) 0%, var(--bg-main) 100%)
      `
  };

  const handleCustomAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setCustomAvatar(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  const getAvatarUrl = (seed: string, style: string) => `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar bg-bgMain animate-fadeIn pb-32">
       <div className="max-w-6xl mx-auto p-4 md:p-10 font-serif">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-8 p-6 md:p-12 border border-borderDark relative overflow-hidden shadow-sm" style={profileCoverStyle}>
             <div className="relative group shrink-0">
               {/* Unified Avatar Container with Solid Background */}
               <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-bgSidebar border-4 border-cardBg shadow-2xl z-10 overflow-hidden flex items-center justify-center relative">
                  <img src={customAvatar || getAvatarUrl(avatarSeed, avatarStyle)} className="w-full h-full object-cover" alt="Profile" />
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white"
                  >
                     <Camera size={24} className="mb-1" />
                     <span className="text-[10px] font-bold uppercase">{t('choose_avatar')}</span>
                  </div>
               </div>
               
               <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleCustomAvatar} 
               />

               <button 
                  onClick={() => { setCustomAvatar(null); setAvatarSeed(Math.random().toString(36).substring(7)); }}
                  className="absolute bottom-2 right-2 p-2.5 bg-accent text-white rounded-full shadow-lg hover:scale-110 transition-transform z-20 border-2 border-bgMain"
                  title="Randomize"
               >
                  <RefreshCw size={18}/>
               </button>
             </div>

             <div className="relative text-center md:text-left z-10 flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4 mb-2">
                   <h1 className="text-3xl md:text-5xl font-caslon text-textMain truncate w-full">{currentUser.name}</h1>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                   <Briefcase size={14} className="text-accent" />
                   <span className="text-xs md:text-sm font-bold text-textMuted uppercase tracking-widest">{role}</span>
                </div>
                
                {!customAvatar && (
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-textMuted uppercase mb-1 tracking-widest opacity-60">Avatar Generator</span>
                            <select 
                                value={avatarStyle} 
                                onChange={e => setAvatarStyle(e.target.value)}
                                className="bg-cardBg border border-borderDark text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 outline-none cursor-pointer hover:border-accent transition-colors"
                            >
                                {AVATAR_STYLES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                            </select>
                        </div>
                    </div>
                )}
             </div>
             
             <button 
               onClick={() => setIsEditing(!isEditing)}
               className={`px-8 py-3 shadow-lg text-xs font-black transition-all font-sans uppercase tracking-[0.2em] flex items-center gap-3 self-center md:self-end border-2 ${
                  isEditing 
                  ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700' 
                  : 'bg-cardBg text-textMain border-borderDark hover:border-accent hover:text-accent'
               }`}
             >
                {/* Fixed: Unique icons for Edit vs Save */}
                {isEditing ? <CheckCheck size={18}/> : <Edit3 size={18}/>}
                {isEditing ? t('save_profile') : t('edit_profile')}
             </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
             {/* Info Columns */}
             <div className="lg:col-span-2 space-y-6 md:space-y-10">
                <section className="bg-cardBg border border-borderDark p-6 md:p-10 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-accent/20"></div>
                   <h2 className="text-2xl font-caslon text-textMain mb-8 flex items-center gap-3 border-b border-borderDark pb-4">
                      <UserIcon size={24} className="text-accent"/> {t('personal_info')}
                   </h2>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 font-sans">
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-textMuted uppercase tracking-widest opacity-60">{t('name')}</label>
                         <input defaultValue={currentUser.name.split(' ')[0]} className="w-full bg-bgMain border border-borderDark p-3.5 text-sm text-textMain outline-none focus:border-accent transition-all font-bold" disabled={!isEditing} />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-textMuted uppercase tracking-widest opacity-60">{t('surname')}</label>
                         <input defaultValue={currentUser.name.split(' ')[1] || ''} className="w-full bg-bgMain border border-borderDark p-3.5 text-sm text-textMain outline-none focus:border-accent transition-all font-bold" disabled={!isEditing} />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-textMuted uppercase tracking-widest opacity-60">{t('position')}</label>
                         <input value={role} onChange={e => setRole(e.target.value as any)} className="w-full bg-bgMain border border-borderDark p-3.5 text-sm text-textMain font-black outline-none focus:border-accent transition-all" disabled={!isEditing} />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-textMuted uppercase tracking-widest opacity-60">{t('email_label')}</label>
                         <input defaultValue={currentUser.email} className="w-full bg-bgMain border border-borderDark p-3.5 text-sm text-textMain outline-none focus:border-accent transition-all" disabled={!isEditing} />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                         <label className="text-[10px] font-black text-textMuted uppercase tracking-widest opacity-60">{t('bio')}</label>
                         <textarea className="w-full bg-bgMain border border-borderDark p-4 text-base text-textMain outline-none focus:border-accent min-h-[150px] resize-none font-serif leading-relaxed" disabled={!isEditing} placeholder="Yozing..." />
                      </div>
                   </div>
                </section>
             </div>

             <div className="space-y-6 md:space-y-10">
                <section className="bg-bgSidebar border border-borderDark p-8 shadow-sm">
                   <h2 className="text-xl font-caslon text-textMain mb-6 border-b border-borderDark pb-2 uppercase tracking-widest">{t('settings')}</h2>
                   <div className="space-y-6 font-sans">
                      <div className="space-y-2">
                         <div className="flex items-center gap-3 text-[10px] text-textMuted font-black uppercase tracking-widest opacity-60"><Globe size={14} /> {t('language')}</div>
                         <div className="relative">
                            <select value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="w-full bg-cardBg border border-borderDark p-3 text-textMain text-xs font-bold outline-none cursor-pointer appearance-none">
                                {LANGUAGES.map(lang => (<option key={lang.code} value={lang.code}>{lang.flag} {lang.label}</option>))}
                            </select>
                            <Plus size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-30" />
                         </div>
                      </div>

                      <div onClick={toggleTheme} className="flex items-center justify-between p-4 bg-cardBg border border-borderDark cursor-pointer hover:border-accent transition-all group shadow-sm">
                         <div className="flex items-center gap-3 text-xs text-textMain font-black uppercase tracking-wider">
                            {theme === 'dark' ? <Moon size={18} className="text-accent"/> : <Sun size={18} className="text-orange-500"/>} {t('dark_mode')}
                         </div>
                         <div className={`w-12 h-6 rounded-full relative transition-all border-2 ${theme === 'dark' ? 'bg-accent border-accent' : 'bg-borderDark border-borderDark'}`}>
                            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-lg transition-all ${theme === 'dark' ? 'left-6' : 'left-0.5'}`}></div>
                         </div>
                      </div>
                   </div>
                </section>

                <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 text-red-600 hover:bg-red-600 hover:text-white py-5 border-2 border-red-200 hover:border-red-600 transition-all font-black shadow-lg font-sans uppercase tracking-[0.25em] text-xs">
                   <LogOut size={18} /> {t('logout')}
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};

export default SettingsView;
