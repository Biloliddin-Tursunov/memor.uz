
import React, { useState } from 'react';
import { ArrowLeft, Shield, User, Mail, Calendar, Clock, CheckCircle2, AlertTriangle, Ban, FileText, Film, Palette, MessageSquare, Save, Trash2, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Member, MemberStatus, MemberRole, MemberActivity, NavigationState } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface MemberDetailViewProps {
  member: Member;
  onUpdate: (member: Member) => void;
  onNavigate: (state: NavigationState) => void;
}

const MemberDetailView: React.FC<MemberDetailViewProps> = ({ member, onUpdate, onNavigate }) => {
  const { t } = useTheme();
  const [data, setData] = useState<Member>(member);
  const [activeTab, setActiveTab] = useState<'activity' | 'notes'>('activity');

  const handleSave = () => {
    onUpdate(data);
    alert('Foydalanuvchi ma’lumotlari muvaffaqiyatli saqlandi.');
  };

  const getActivityIcon = (type: MemberActivity['type']) => {
    switch (type) {
      case 'create': return <CheckCircle2 size={16} className="text-emerald-500"/>;
      case 'edit': return <Palette size={16} className="text-blue-500"/>;
      case 'request': return <MessageSquare size={16} className="text-orange-500"/>;
      case 'login': return <ShieldCheck size={16} className="text-purple-500"/>;
      default: return <FileText size={16} className="text-gray-400"/>;
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent animate-fadeIn font-sans overflow-hidden">
      {/* Detail Header */}
      <div className="h-16 border-b border-borderDark flex items-center justify-between px-6 bg-bgSidebar backdrop-blur-md shrink-0 z-20 shadow-sm">
         <div className="flex items-center gap-4">
            <button onClick={() => onNavigate({ type: 'cms-members', title: 'Members Control' })} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full text-textMuted transition-colors"><ArrowLeft size={20}/></button>
            <div className="h-8 w-px bg-borderDark"></div>
            <div className="flex flex-col">
               <h2 className="text-sm font-black uppercase tracking-widest text-textMain">Member Management</h2>
               <p className="text-[10px] text-textMuted font-bold uppercase tracking-widest opacity-60">ID: {data.id}</p>
            </div>
         </div>

         <div className="flex items-center gap-4">
            <button 
              onClick={handleSave}
              className="bg-accent hover:bg-accentHover text-bgMain px-8 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl flex items-center gap-2 transition-all active:scale-95 rounded-sm"
            >
               <Save size={14}/> {t('save').toUpperCase()}
            </button>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-10 pb-40">
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* LEFT: Profile Info Card */}
            <div className="lg:col-span-1 space-y-6">
               <div className="bg-cardBg border border-borderDark rounded-2xl p-8 shadow-xl flex flex-col items-center text-center backdrop-blur-md">
                  <div className="w-32 h-32 rounded-full border-4 border-bgSidebar shadow-2xl overflow-hidden mb-6 bg-bgSidebar relative">
                     <img src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${data.avatar}`} alt={data.name} className="w-full h-full object-cover"/>
                  </div>
                  <h3 className="text-2xl font-bold font-caslon text-textMain">{data.name}</h3>
                  <p className="text-sm text-textMuted mb-6 opacity-60">@{data.username || 'username_yoq'}</p>
                  
                  <div className="w-full grid grid-cols-2 gap-2 border-t border-borderDark/20 pt-6">
                     <div className="bg-bgSidebar/50 p-3 rounded-xl flex flex-col items-center shadow-inner">
                        <span className="text-[9px] font-black text-textMuted uppercase mb-1 opacity-50">Joined</span>
                        <span className="text-xs font-bold text-textMain">{data.joinedAt}</span>
                     </div>
                     <div className="bg-bgSidebar/50 p-3 rounded-xl flex flex-col items-center shadow-inner">
                        <span className="text-[9px] font-black text-textMuted uppercase mb-1 opacity-50">Created</span>
                        <span className="text-xs font-bold text-textMain">{data.activities.filter(a => a.type === 'create').length}</span>
                     </div>
                  </div>
               </div>

               {/* ADMIN CONTROLS */}
               <div className="bg-cardBg border border-borderDark rounded-2xl p-8 shadow-xl space-y-8 backdrop-blur-md">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-textMuted border-b border-borderDark/20 pb-2 flex items-center gap-2 opacity-60"><Shield size={14}/> Control Center</h4>
                  
                  <div className="space-y-6">
                     <div className="space-y-3">
                        <label className="text-[9px] font-black text-textMuted uppercase tracking-widest ml-1">Account Status</label>
                        <div className="grid grid-cols-3 gap-1 p-1 bg-bgSidebar rounded-xl shadow-inner">
                           {(['Active', 'Suspended', 'Banned'] as MemberStatus[]).map(s => (
                              <button 
                                 key={s} 
                                 onClick={() => setData({...data, status: s})}
                                 className={`py-2 text-[9px] font-black uppercase rounded-lg transition-all ${data.status === s ? (s === 'Active' ? 'bg-emerald-500 text-white shadow-lg' : s === 'Banned' ? 'bg-red-500 text-white shadow-lg' : 'bg-amber-500 text-white shadow-lg') : 'text-textMuted hover:bg-black/5 dark:hover:bg-white/5'}`}
                              >
                                 {s}
                              </button>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[9px] font-black text-textMuted uppercase tracking-widest ml-1">System Role</label>
                        <select 
                           value={data.role}
                           onChange={e => setData({...data, role: e.target.value as MemberRole})}
                           className="w-full bg-bgSidebar border border-borderDark rounded-xl p-3 text-xs font-bold text-textMain outline-none focus:border-accent shadow-inner cursor-pointer"
                        >
                           <option value="User">Standard User</option>
                           <option value="Creator">Content Creator</option>
                           <option value="Editor">Verified Editor</option>
                           <option value="Admin">Moderator/Admin</option>
                        </select>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-borderDark/20">
                     <button className="w-full flex items-center justify-center gap-2 py-4 text-[9px] font-black uppercase text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20">
                        <Trash2 size={16}/> Delete Account Permanently
                     </button>
                  </div>
               </div>
            </div>

            {/* RIGHT: Main Activity & Logs */}
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-cardBg border border-borderDark rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[650px] backdrop-blur-md">
                  <div className="flex border-b border-borderDark bg-bgSidebar/30">
                     <button 
                        onClick={() => setActiveTab('activity')}
                        className={`px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] border-b-2 transition-all ${activeTab === 'activity' ? 'border-accent text-accent' : 'border-transparent text-textMuted hover:text-textMain'}`}
                     >
                        Faoliyat Tarixi
                     </button>
                     <button 
                        onClick={() => setActiveTab('notes')}
                        className={`px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] border-b-2 transition-all ${activeTab === 'notes' ? 'border-accent text-accent' : 'border-transparent text-textMuted hover:text-textMain'}`}
                     >
                        Admin Izohlari
                     </button>
                  </div>

                  <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
                     {activeTab === 'activity' ? (
                        <div className="space-y-8">
                           {data.activities.length > 0 ? (
                              data.activities.map((act, idx) => (
                                 <div key={act.id} className="flex gap-6 group">
                                    <div className="flex flex-col items-center">
                                       <div className="p-2.5 bg-bgSidebar rounded-full border border-borderDark transition-all group-hover:border-accent group-hover:bg-accent/10 shadow-sm">
                                          {getActivityIcon(act.type)}
                                       </div>
                                       {idx !== data.activities.length - 1 && <div className="w-px h-full bg-borderDark/20 my-2"></div>}
                                    </div>
                                    <div className="pb-8 flex-1 border-b border-borderDark/10 last:border-0">
                                       <div className="flex items-center justify-between mb-2">
                                          <div className="flex items-center gap-3">
                                             <span className="text-[9px] font-black text-accent uppercase bg-accent/5 px-2 py-0.5 rounded border border-accent/10 shadow-sm">{act.type}</span>
                                             <span className="text-[10px] font-mono text-textMuted font-bold opacity-60">{act.date}</span>
                                          </div>
                                       </div>
                                       <h5 className="text-base font-bold text-textMain mb-2 font-caslon tracking-tight">
                                          {act.contentType === 'account' ? 'Profile Management' : `${act.contentType.toUpperCase()}: ${act.title}`}
                                       </h5>
                                       <p className="text-sm text-textMuted leading-relaxed opacity-80">
                                          {act.type === 'create' && `Yangi material muvaffaqiyatli bazaga qo'shildi.`}
                                          {act.type === 'edit' && `Mavjud material tahrirlandi va yangilandi.`}
                                          {act.type === 'request' && `Foydalanuvchi tomonidan yangi ariza/so'rov yuborildi.`}
                                          {act.type === 'login' && `Tizimga muvaffaqiyatli kirish qayd etildi.`}
                                       </p>
                                    </div>
                                 </div>
                              ))
                           ) : (
                              <div className="h-full flex flex-col items-center justify-center text-center py-32 opacity-20">
                                 <AlertTriangle size={64} className="text-textMuted mb-6"/>
                                 <p className="text-lg text-textMuted font-black uppercase tracking-widest">Harakatlar yo'q</p>
                              </div>
                           )}
                        </div>
                     ) : (
                        <div className="space-y-8 animate-fadeIn h-full flex flex-col">
                           <div className="space-y-4 flex-1 flex flex-col">
                              <h4 className="text-[11px] font-black uppercase text-accent tracking-[0.3em] ml-1 opacity-70">Faqat Adminlar uchun</h4>
                              <textarea 
                                 value={data.notes}
                                 onChange={e => setData({...data, notes: e.target.value})}
                                 className="w-full flex-1 bg-bgSidebar border border-borderDark rounded-2xl p-8 text-lg font-serif italic text-textMain outline-none focus:border-accent shadow-inner transition-all resize-none overscroll-contain"
                                 placeholder="Ushbu foydalanuvchi haqida muhim eslatmalarni bu yerga yozib qoldirishingiz mumkin..."
                              />
                           </div>
                           <div className="p-5 bg-orange-500/5 border border-orange-500/20 rounded-xl flex gap-4 text-orange-600 dark:text-orange-400 backdrop-blur-md">
                              <ShieldAlert size={24} className="shrink-0"/>
                              <p className="text-[11px] font-bold uppercase tracking-wide leading-relaxed">
                                 Izohlar foydalanuvchiga ko'rinmaydi va faqat platforma boshqaruvchilari uchun maxfiy arxiv sifatida saqlanadi.
                              </p>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MemberDetailView;
