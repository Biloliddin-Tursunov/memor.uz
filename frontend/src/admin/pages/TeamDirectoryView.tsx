
import React, { useState, useMemo } from 'react';
import { 
   Search, Mail, Edit2, Trash2, Key, Plus, X, 
   Activity, Monitor, Smartphone, Tablet, ExternalLink, 
   Clock, Calendar, ChevronDown, ChevronUp, MapPin, Eye,
   CheckCircle2, FileText, UploadCloud, Zap,
   MessageSquare, Flame, UserCheck, Shield, Lock, Phone, Send, User as UserIcon
} from 'lucide-react';
import { User, Role, EnhancedActivity, DeviceType, ActivityAction, NavigationState } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface TeamDirectoryViewProps {
  currentUser: User;
  teamUsers: User[];
  onUpdateUser: (id: string, updates: Partial<User>) => void;
  onNavigate: (state: NavigationState) => void;
}

const TeamDirectoryView: React.FC<TeamDirectoryViewProps> = ({ currentUser, teamUsers, onUpdateUser, onNavigate }) => {
   const { t } = useTheme();
   const [search, setSearch] = useState('');
   const [viewMode, setViewMode] = useState<'cards' | 'monitoring'>('cards');
   const [showAddModal, setShowAddModal] = useState(false);
   const [editingUser, setEditingUser] = useState<User | null>(null);
   
   const [newMember, setNewMember] = useState({
      name: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      role: 'Viewer' as Role,
      department: 'General'
   });

   const isSuperAdmin = currentUser.role === 'Lead Admin' || currentUser.role === 'Super Admin';

   const filteredUsers = useMemo(() => 
      teamUsers.filter(u => 
         u.name.toLowerCase().includes(search.toLowerCase()) || 
         u.email.toLowerCase().includes(search.toLowerCase()) ||
         (u.username || '').toLowerCase().includes(search.toLowerCase())
      ), [teamUsers, search]
   );

   const getDeviceIcon = (device: DeviceType) => {
      switch(device) {
         case 'Desktop': return <Monitor size={14}/>;
         case 'Mobile': return <Smartphone size={14}/>;
         case 'Tablet': return <Tablet size={14}/>;
         default: return <Activity size={14}/>;
      }
   };

   const getActionColor = (action: ActivityAction) => {
      switch(action) {
         case 'Login': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
         case 'Create': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
         case 'Edit': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
         case 'Upload': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
         case 'Task Action': return 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20';
         default: return 'text-textMuted bg-textMuted/10 border-textMuted/20';
      }
   };

   const handleAddMember = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`${newMember.name} muvaffaqiyatli qo'shildi! Roli: ${newMember.role}`);
      setShowAddModal(false);
      setNewMember({ name: '', email: '', phone: '', username: '', password: '', role: 'Viewer', department: 'General' });
   };

   const handleRoleUpdate = (userId: string, newRole: Role) => {
      onUpdateUser(userId, { role: newRole });
      setEditingUser(null);
   };

   return (
      <div className="p-4 md:p-8 flex flex-col animate-fadeIn bg-transparent font-sans min-h-full pb-32">
         {/* Top Header */}
         <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8 border-b border-borderDark pb-8 shrink-0">
            <div className="text-center xl:text-left">
               <h1 className="text-3xl md:text-5xl font-black font-caslon text-textMain mb-2 uppercase tracking-widest leading-none">Jamoa Nazorati</h1>
               <p className="text-textMuted font-serif italic text-sm opacity-70">Xodimlar katalogi va faoliyat monitoringi.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full xl:w-auto">
               <div className="flex bg-bgSidebar border border-borderDark p-1 rounded-xl shadow-inner shrink-0">
                  <button 
                    onClick={() => setViewMode('cards')}
                    className={`flex-1 sm:flex-none px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${viewMode === 'cards' ? 'bg-cardBg text-accent shadow-lg' : 'text-textMuted'}`}
                  >
                     Directory
                  </button>
                  <button 
                    onClick={() => setViewMode('monitoring')}
                    className={`flex-1 sm:flex-none px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${viewMode === 'monitoring' ? 'bg-cardBg text-accent shadow-lg' : 'text-textMuted'}`}
                  >
                     Monitoring
                  </button>
               </div>

               <div className="relative group flex-1 xl:w-80">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-accent transition-colors" />
                  <input 
                     type="text" 
                     placeholder="Qidirish..." 
                     className="w-full bg-cardBg border border-borderDark py-3 pl-12 pr-6 text-sm text-textMain rounded-xl outline-none focus:border-accent shadow-sm transition-all"
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                  />
               </div>

               {isSuperAdmin && (
                  <button 
                     onClick={() => setShowAddModal(true)}
                     className="bg-accent hover:bg-accentHover text-bgMain px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl flex items-center justify-center gap-2 transition-all active:scale-95 whitespace-nowrap"
                  >
                     <Plus size={18}/> A'zo Qo'shish
                  </button>
               )}
            </div>
         </div>

         {/* Content Area */}
         <div className="flex-1">
            {viewMode === 'cards' ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {filteredUsers.map(user => (
                     <UserDirectoryCard 
                        key={user.id} 
                        user={user} 
                        isAdmin={isSuperAdmin}
                        onEdit={() => setEditingUser(user)}
                        onSendMessage={() => onNavigate({ type: 'inbox', title: 'Inbox', payload: { to: user.email, subject: 'Jamoaviy xabar' } })}
                     />
                  ))}
               </div>
            ) : (
               <div className="bg-cardBg border border-borderDark rounded-2xl shadow-2xl overflow-hidden animate-fadeIn mb-20">
                  <div className="overflow-x-auto custom-scrollbar">
                     <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead className="bg-bgSidebar border-b border-borderDark">
                           <tr className="text-[10px] font-black text-textMuted uppercase tracking-[0.2em]">
                              <th className="px-8 py-5">Xodim</th>
                              <th className="px-8 py-5">Status</th>
                              <th className="px-8 py-5">So'nggi Harakat</th>
                              <th className="px-8 py-5">Qurilma</th>
                              <th className="px-8 py-5">Vaqt</th>
                              <th className="px-8 py-5"></th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-borderDark/20">
                           {filteredUsers.map(user => (
                              <MonitoringDashboardRow 
                                 key={user.id} 
                                 user={user} 
                                 getActionColor={getActionColor}
                                 getDeviceIcon={getDeviceIcon}
                              />
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}
         </div>

         {/* Role Edit Modal */}
         {editingUser && (
            <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
               <div className="bg-bgMain w-full max-w-md border border-borderDark shadow-2xl rounded-2xl p-10 animate-slideDown font-serif">
                  <h3 className="text-2xl font-caslon font-bold text-textMain mb-8 border-b border-borderDark pb-4 uppercase tracking-widest">Rolni O'zgartirish</h3>
                  <div className="space-y-4 font-sans">
                     <p className="text-sm text-textMuted mb-6 italic">Foydalanuvchi: <span className="font-bold text-textMain">{editingUser.name}</span></p>
                     {(['Lead Admin', 'Admin', 'Editor', 'Viewer', 'Investor'] as Role[]).map(r => (
                        <button 
                           key={r}
                           onClick={() => handleRoleUpdate(editingUser.id, r)}
                           className={`w-full py-4 text-xs font-black uppercase tracking-widest rounded-xl border-2 transition-all flex items-center justify-between px-6 ${editingUser.role === r ? 'bg-accent text-bgMain border-accent shadow-lg scale-105' : 'bg-cardBg text-textMuted border-borderDark hover:border-accent hover:text-textMain'}`}
                        >
                           {r}
                           {editingUser.role === r && <UserCheck size={16} />}
                        </button>
                     ))}
                     <button onClick={() => setEditingUser(null)} className="w-full py-4 text-[10px] font-black uppercase text-red-500 hover:bg-red-500/10 mt-6 rounded-xl transition-all">Bekor qilish</button>
                  </div>
               </div>
            </div>
         )}

         {/* Add Modal */}
         {showAddModal && (
            <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
               <div className="bg-bgMain w-full max-w-lg border border-borderDark shadow-2xl rounded-3xl overflow-hidden animate-slideDown max-h-[90vh] flex flex-col font-serif">
                  <div className="bg-bgSidebar px-10 py-8 border-b border-borderDark flex items-center justify-between shrink-0">
                     <div>
                        <h3 className="text-2xl font-black text-textMain uppercase tracking-tight font-caslon">Yangi A'zo</h3>
                        <p className="text-[10px] font-black text-accent uppercase tracking-widest mt-1 opacity-60">Tizim ruxsatnomasi</p>
                     </div>
                     <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-red-500/10 text-textMuted rounded-full transition-colors"><X size={24}/></button>
                  </div>
                  
                  <form onSubmit={handleAddMember} className="p-10 space-y-6 overflow-y-auto custom-scrollbar font-sans">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                           <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1">Ism Familiya</label>
                           <input required value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} className="w-full bg-cardBg border border-borderDark p-3 rounded-xl text-sm text-textMain focus:border-accent outline-none shadow-inner" placeholder="Aziz Rahimov" />
                        </div>
                        <div className="space-y-1">
                           <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1">Username</label>
                           <input required value={newMember.username} onChange={e => setNewMember({...newMember, username: e.target.value})} className="w-full bg-cardBg border border-borderDark p-3 rounded-xl text-sm text-textMain focus:border-accent outline-none shadow-inner" placeholder="@aziz_arch" />
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                           <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1">E-pochta</label>
                           <input type="email" required value={newMember.email} onChange={e => setNewMember({...newMember, email: e.target.value})} className="w-full bg-cardBg border border-borderDark p-3 rounded-xl text-sm text-textMain focus:border-accent outline-none shadow-inner" placeholder="aziz@memor.uz" />
                        </div>
                        <div className="space-y-1">
                           <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1">Tizimdagi roli</label>
                           <div className="relative">
                              <select 
                                 value={newMember.role} 
                                 onChange={e => setNewMember({...newMember, role: e.target.value as Role})}
                                 className="w-full bg-cardBg border border-borderDark p-3 rounded-xl text-sm text-textMain focus:border-accent outline-none shadow-inner appearance-none cursor-pointer font-bold"
                              >
                                 <option value="Viewer">Viewer (Ko'ruvchi)</option>
                                 <option value="Editor">Editor (Muharrir)</option>
                                 <option value="Admin">Admin (Boshqaruvchi)</option>
                                 <option value="Investor">Investor</option>
                              </select>
                              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none" />
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                           <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1">Telefon</label>
                           <input required value={newMember.phone} onChange={e => setNewMember({...newMember, phone: e.target.value})} className="w-full bg-cardBg border border-borderDark p-3 rounded-xl text-sm text-textMain focus:border-accent outline-none shadow-inner" placeholder="+998 XX XXX XX XX" />
                        </div>
                        <div className="space-y-1">
                           <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1">Parol</label>
                           <input type="password" required value={newMember.password} onChange={e => setNewMember({...newMember, password: e.target.value})} className="w-full bg-cardBg border border-borderDark p-3 rounded-xl text-sm text-textMain focus:border-accent outline-none shadow-inner" placeholder="••••••••" />
                        </div>
                     </div>

                     <button type="submit" className="w-full bg-accent hover:bg-accentHover text-bgMain py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-[0.98] mt-4">
                        A'zoni Qo'shish
                     </button>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
};

/* USER CARD */
const UserDirectoryCard: React.FC<{ user: User, isAdmin: boolean, onEdit: () => void, onSendMessage: () => void }> = ({ user, isAdmin, onEdit, onSendMessage }) => (
   <div className="bg-cardBg border border-borderDark rounded-2xl p-6 md:p-8 flex flex-col items-center text-center hover:border-accent transition-all group shadow-xl relative overflow-hidden">
      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
          {isAdmin && <button onClick={onEdit} className="p-2.5 bg-bgMain border border-borderDark text-accent rounded-full shadow-lg hover:scale-110 transition-transform"><Edit2 size={16}/></button>}
          <button onClick={onSendMessage} className="p-2.5 bg-bgMain border border-borderDark text-accent rounded-full shadow-lg hover:scale-110 transition-transform"><Send size={16}/></button>
      </div>

      <div className="relative mb-6">
         <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-bgSidebar shadow-2xl overflow-hidden bg-bgSidebar relative">
            <img src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${user.avatar}`} alt={user.name} className="w-full h-full object-cover" />
         </div>
         <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-4 border-cardBg rounded-full"></div>
      </div>

      <h3 className="font-black font-caslon text-textMain text-xl md:text-2xl leading-none mb-1 group-hover:text-accent transition-colors">{user.name}</h3>
      <p className="text-[10px] font-black text-textMuted uppercase tracking-[0.2em] mb-6 opacity-60">@{user.username || 'user'} • {user.role}</p>
      
      <div className="w-full space-y-4 pt-6 border-t border-borderDark/20">
         <div className="flex flex-col items-center">
            <span className="text-[8px] font-black text-textMuted uppercase tracking-widest opacity-40 mb-1">Aloqa</span>
            <div className="flex flex-col gap-1 text-[11px] font-bold text-textMain">
               <span className="flex items-center justify-center gap-2"><Mail size={12} className="text-accent opacity-50"/> {user.email}</span>
               <span className="flex items-center justify-center gap-2"><Phone size={12} className="text-accent opacity-50"/> {user.phone || '+998 -- --- -- --'}</span>
            </div>
         </div>
         <div className="bg-bgSidebar py-2 px-4 rounded-xl text-[9px] font-black uppercase text-accent tracking-[0.2em] border border-borderDark shadow-inner">
            {user.department}
         </div>
      </div>
   </div>
);

/* MONITORING ROW */
const MonitoringDashboardRow: React.FC<{ 
   user: User, 
   getActionColor: (a: ActivityAction) => string,
   getDeviceIcon: (d: DeviceType) => React.ReactNode
}> = ({ user, getActionColor, getDeviceIcon }) => {
   const [isExpanded, setIsExpanded] = useState(false);
   const lastLog = user.activities?.[0];

   return (
      <>
         <tr 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`group cursor-pointer transition-colors border-b border-borderDark/10 ${isExpanded ? 'bg-accent/5' : 'hover:bg-accent/5'}`}
         >
            <td className="px-8 py-5">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-borderDark overflow-hidden shrink-0 shadow-lg bg-bgSidebar">
                     <img src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${user.avatar}`} />
                  </div>
                  <div>
                     <p className="text-sm font-bold text-textMain group-hover:text-accent transition-colors">{user.name}</p>
                     <p className="text-[9px] text-textMuted font-mono font-bold">@{user.username || 'user'}</p>
                  </div>
               </div>
            </td>
            <td className="px-8 py-5">
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Online</span>
               </div>
            </td>
            <td className="px-8 py-5">
               {lastLog ? (
                  <div className="flex items-center gap-3">
                     <span className={`text-[8px] font-black uppercase px-2 py-1 rounded border shadow-sm ${getActionColor(lastLog.action)}`}>{lastLog.action}</span>
                     <span className="text-xs font-bold text-textMain truncate max-w-[150px]">{lastLog.targetName}</span>
                  </div>
               ) : <span className="text-xs text-textMuted italic opacity-30">No activity</span>}
            </td>
            <td className="px-8 py-5">
               <div className="flex items-center gap-2 text-textMuted">
                  {lastLog ? (
                     <>
                        {getDeviceIcon(lastLog.device)}
                        <span className="text-[9px] font-black uppercase tracking-widest">{lastLog.device}</span>
                     </>
                  ) : '---'}
               </div>
            </td>
            <td className="px-8 py-5">
               <div className="flex items-center gap-2 text-textMain">
                  <Clock size={12} className="text-accent opacity-50"/>
                  <span className="text-[11px] font-mono font-bold">{lastLog?.duration || '---'}</span>
               </div>
            </td>
            <td className="px-8 py-5 text-right">
               <button className="p-2 text-textMuted group-hover:text-accent transition-all transform group-hover:scale-110">
                  {isExpanded ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
               </button>
            </td>
         </tr>

         {isExpanded && (
            <tr className="animate-fadeIn">
               <td colSpan={6} className="p-0">
                  <div className="bg-bgSidebar/30 border-b border-borderDark px-12 py-10">
                     <div className="max-w-4xl space-y-8">
                        <div className="flex items-center justify-between border-b border-borderDark pb-4">
                           <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">Activity Log History</h5>
                           <div className="flex gap-4">
                              <span className="text-[10px] font-bold text-textMuted uppercase flex items-center gap-2"><Mail size={12}/> {user.email}</span>
                              <span className="text-[10px] font-bold text-textMuted uppercase flex items-center gap-2"><Phone size={12}/> {user.phone}</span>
                           </div>
                        </div>
                        <div className="space-y-4">
                           {user.activities?.map(log => (
                              <div key={log.id} className="flex items-center justify-between p-4 bg-cardBg border border-borderDark rounded-xl shadow-sm group hover:border-accent/40 transition-colors">
                                 <div className="flex items-center gap-4">
                                    <div className={`p-2.5 rounded-lg border shadow-inner ${getActionColor(log.action)}`}>
                                       {log.action === 'Login' ? <Lock size={16}/> : <FileText size={16}/>}
                                    </div>
                                    <div className="min-w-0">
                                       <p className="text-sm font-bold text-textMain">{log.targetName}</p>
                                       <p className="text-[9px] text-textMuted font-black uppercase tracking-tighter opacity-50">{log.path} • {log.date}</p>
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <p className="text-[11px] font-black text-textMain font-mono">{log.entryTime}</p>
                                    <p className="text-[9px] font-bold text-textMuted uppercase tracking-widest">{log.duration}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </td>
            </tr>
         )}
      </>
   );
};

export default TeamDirectoryView;
