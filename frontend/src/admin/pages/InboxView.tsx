
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Mail, 
  Trash2, 
  Search, 
  PenSquare, 
  X, 
  SendHorizontal, 
  Inbox, 
  Send,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Zap,
  UserPlus,
  CheckCircle2,
  Bell,
  User as UserIcon,
  AtSign
} from 'lucide-react';
import { Message, User, Task, ContentPost, NavigationState } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface InboxViewProps {
  currentUser: User;
  tasks?: Task[];
  cmsPosts?: ContentPost[];
  teamUsers?: User[];
  onNavigate?: (state: NavigationState) => void;
}

const InboxView: React.FC<InboxViewProps> = ({ currentUser, tasks = [], cmsPosts = [], teamUsers = [], onNavigate }) => {
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent'>('inbox');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  // Mention system state
  const [mentionQuery, setMentionQuery] = useState('');
  const [showMentionList, setShowMentionList] = useState(false);
  const mentionRef = useRef<HTMLDivElement>(null);

  // NOTIFICATION ENGINE LOGIC
  const liveMessages = useMemo(() => {
     const msgs: Message[] = [];
     const firstName = currentUser.name.split(' ')[0];

     // 1. Content Publication (Everyone)
     cmsPosts.filter(p => p.status === 'Published').forEach(post => {
        msgs.push({
           id: `pub-${post.id}`,
           sender: 'Me\'mor Tizimi',
           avatar: 'Zap',
           subject: 'Yangi material nashr etildi',
           preview: `"${post.title || post.name}" maqolasi hamma uchun ochiq. Bazada ko'rishingiz mumkin.`,
           date: post.deadline || 'Hozir',
           read: false,
           tag: 'System',
           link: { type: 'cms-content', title: 'Bazani ko\'rish' }
        });
     });

     // 2. Task Assignment (SYSTEM NOMIDAN)
     tasks.filter(t => t.assignees.some(a => a.name.includes(firstName))).forEach(task => {
        msgs.push({
           id: `task-assign-${task.id}`,
           sender: 'Me\'mor Tizimi',
           avatar: 'Zap',
           subject: 'Sizga yangi vazifa biriktirildi',
           preview: `"${task.name}" vazifasiga mas'ul etib tayinlandingiz. Muddat: ${task.deadline}.`,
           date: 'Bugun',
           read: false,
           tag: 'Team',
           link: { type: 'project', id: task.projectId, title: 'Vazifaga o\'tish' }
        });
     });

     // 3. Task Done / Report (MEMBER NOMIDAN - Adminlar uchun)
     const isAdmin = currentUser.role.includes('Admin');
     if (isAdmin) {
        tasks.filter(t => t.status === 'Done' || t.status === 'Joylandi!').forEach(task => {
           const reporter = task.assignees[task.assignees.length - 1] || { name: 'A\'zo', avatar: 'User' };
           msgs.push({
              id: `task-done-${task.id}`,
              sender: reporter.name,
              avatar: reporter.avatar,
              subject: 'Hisobot: Vazifa yakunlandi',
              preview: `"${task.name}" vazifasi bo'yicha yakuniy hisobot topshirildi. Ko'rib chiqish kutilmoqda.`,
              date: 'Hozir',
              read: true,
              tag: 'System',
              link: { type: 'project', id: task.projectId, title: 'Tekshirish' }
           });
        });
     }

     return msgs.sort((a, b) => b.id.localeCompare(a.id));
  }, [cmsPosts, tasks, currentUser]);

  const selectedMessage = liveMessages.find(m => m.id === selectedId);

  const filteredMessages = liveMessages.filter(m => 
      (m.subject.toLowerCase().includes(searchQuery.toLowerCase()) || m.sender.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // MENTION LOGIC
  const handleComposeToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setComposeTo(val);
    
    if (val.includes('@')) {
       const parts = val.split('@');
       const query = parts[parts.length - 1];
       setMentionQuery(query);
       setShowMentionList(true);
    } else {
       setShowMentionList(false);
    }
  };

  const selectMention = (user: User) => {
     const parts = composeTo.split('@');
     parts.pop(); // remove search query
     setComposeTo(parts.join('') + user.name + ' <' + user.email + '>');
     setShowMentionList(false);
  };

  const filteredTeam = useMemo(() => {
     return teamUsers.filter(u => 
        u.name.toLowerCase().includes(mentionQuery.toLowerCase()) || 
        u.email.toLowerCase().includes(mentionQuery.toLowerCase())
     ).slice(0, 5);
  }, [teamUsers, mentionQuery]);

  const handleSend = (e: React.FormEvent) => {
      e.preventDefault();
      setIsComposing(false);
      setComposeTo('');
      setComposeSubject('');
      setComposeBody('');
      alert(t('sent'));
  };

  const getMessageIcon = (m: Message) => {
     if (m.sender === 'Me\'mor Tizimi') return <Zap size={14} className="text-amber-500" />;
     if (m.subject.includes('Hisobot')) return <CheckCircle2 size={14} className="text-emerald-500" />;
     return <UserIcon size={14} className="text-blue-500" />;
  };

  const getAvatarUrl = (seed: string) => {
     if (seed === 'Zap') return ''; // Handle separately
     return `https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${seed}`;
  };

  return (
    <div className="h-full flex bg-bgMain animate-fadeIn overflow-hidden font-serif relative">
       {/* Sidebar (Desktop) */}
       <div className="w-[260px] flex-col border-r border-borderDark bg-bgSidebar backdrop-blur-xl hidden lg:flex shrink-0 pt-6">
          <div className="px-4 mb-6">
             <button 
               onClick={() => setIsComposing(true)}
               className="w-full bg-accent hover:bg-accentHover text-bgMain p-3 shadow-lg flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[10px] font-sans transition-all active:scale-95"
             >
                <PenSquare size={16} />
                <span>{t('compose')}</span>
             </button>
          </div>
          <div className="px-2 space-y-1">
             <button 
                onClick={() => { setActiveTab('inbox'); setSelectedId(null); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-black transition-all font-sans uppercase tracking-widest rounded-lg ${activeTab === 'inbox' ? 'bg-cardBg border border-borderDark text-accent shadow-sm' : 'text-textMuted hover:bg-cardBg/50 border border-transparent'}`}
             >
                <Inbox size={18} /> <span>{t('inbox_tab') || 'Inbox'}</span>
             </button>
             <button 
                onClick={() => { setActiveTab('sent'); setSelectedId(null); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-black transition-all font-sans uppercase tracking-widest rounded-lg ${activeTab === 'sent' ? 'bg-cardBg border border-borderDark text-accent shadow-sm' : 'text-textMuted hover:bg-cardBg/50 border border-transparent'}`}
             >
                <SendHorizontal size={18} /> <span>{t('sent_tab') || 'Sent'}</span>
             </button>
          </div>
       </div>

       {/* Message List Panel */}
       <div className={`flex-1 lg:w-[380px] lg:flex-none border-r border-borderDark bg-bgMain flex flex-col transition-all duration-300 ${selectedId ? 'hidden lg:flex' : 'flex'}`}>
           <div className="h-16 border-b border-borderDark flex items-center px-4 md:px-6 bg-bgSidebar shrink-0 gap-4">
             <div className="lg:hidden flex bg-cardBg border border-borderDark rounded-lg p-0.5 shadow-inner">
                <button onClick={() => setActiveTab('inbox')} className={`px-3 py-1.5 rounded-md text-[9px] font-black transition-all ${activeTab === 'inbox' ? 'bg-accent text-bgMain shadow-sm' : 'text-textMuted'}`}>Inbox</button>
                <button onClick={() => setActiveTab('sent')} className={`px-3 py-1.5 rounded-md text-[9px] font-black transition-all ${activeTab === 'sent' ? 'bg-accent text-bgMain shadow-sm' : 'text-textMuted'}`}>Sent</button>
             </div>
             <h2 className="text-xl font-bold font-caslon text-textMain capitalize hidden lg:block">{activeTab}</h2>
             <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t('search')} className="w-full bg-cardBg border border-borderDark py-2 pl-9 pr-3 text-sm rounded-md outline-none font-sans" />
             </div>
           </div>
           
           <div className="flex-1 overflow-y-auto custom-scrollbar">
              {filteredMessages.length === 0 ? (
                 <div className="p-12 text-center text-textMuted text-sm font-serif italic">{t('no_messages') || 'Xabarlar yo‘q'}</div>
              ) : (
                 filteredMessages.map(msg => (
                    <div key={msg.id} onClick={() => setSelectedId(msg.id)} className={`p-5 border-b border-borderDark/30 cursor-pointer hover:bg-accent/5 transition-all relative ${selectedId === msg.id ? 'bg-cardBg border-l-4 border-l-accent shadow-sm' : ''}`}>
                       {!msg.read && <div className="absolute top-6 left-2 w-1.5 h-1.5 bg-accent rounded-full"></div>}
                       <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                             {getMessageIcon(msg)}
                             <span className={`text-sm ${!msg.read ? 'font-bold text-accent' : 'text-textMain'}`}>{msg.sender}</span>
                          </div>
                          <span className="text-[10px] text-textMuted font-mono font-bold">{msg.date}</span>
                       </div>
                       <div className={`text-sm mb-2 truncate font-bold text-textMain`}>{msg.subject}</div>
                       <div className="text-[11px] text-textMuted line-clamp-2 font-sans leading-relaxed">{msg.preview}</div>
                    </div>
                 ))
              )}
           </div>
       </div>

       {/* Message Detail Panel */}
       <div className={`flex-1 flex flex-col bg-bgMain h-full relative ${!selectedId ? 'hidden lg:flex' : 'flex'}`}>
           {selectedMessage ? (
              <div className="flex flex-col h-full animate-fadeIn">
                 <div className="h-16 border-b border-borderDark flex items-center justify-between px-6 shrink-0">
                    <button onClick={() => setSelectedId(null)} className="lg:hidden p-2 text-textMuted flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><ArrowLeft size={18}/> {t('back') || 'Orqaga'}</button>
                    <div className="flex gap-2 ml-auto">
                       <button className="p-2 text-textMuted hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
                    </div>
                 </div>
                 <div className="p-8 md:p-12 flex-1 overflow-y-auto custom-scrollbar">
                    <div className="max-w-3xl mx-auto">
                       <h1 className="text-2xl md:text-5xl font-bold font-caslon text-textMain mb-10 leading-tight">{selectedMessage.subject}</h1>
                       <div className="flex items-center gap-5 mb-10 border-b border-borderDark pb-8">
                          {selectedMessage.avatar === 'Zap' ? (
                             <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg border-4 border-bgMain text-bgMain">
                                <Zap size={24} />
                             </div>
                          ) : (
                             <img src={getAvatarUrl(selectedMessage.avatar)} className="w-14 h-14 rounded-full border-4 border-bgMain shadow-lg" />
                          )}
                          <div>
                             <div className="font-bold text-lg text-textMain font-serif">{selectedMessage.sender}</div>
                             <div className="text-[10px] text-textMuted font-black font-sans uppercase tracking-[0.2em]">{selectedMessage.tag === 'System' ? 'Sizga tizimdan bildirishnoma keldi' : 'Jamoaviy muloqot'} • {selectedMessage.date}</div>
                          </div>
                       </div>
                       <div className="text-textMain font-serif text-lg md:text-xl leading-relaxed space-y-8">
                          <p className="bg-bgSidebar/50 p-6 border-l-4 border-accent italic shadow-inner">"{selectedMessage.preview}"</p>
                          {selectedMessage.link && (
                             <div className="pt-6">
                                <button 
                                   onClick={() => selectedMessage.link && onNavigate?.(selectedMessage.link)}
                                   className="bg-accent text-bgMain px-8 py-4 rounded-xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-accentHover transition-all flex items-center gap-3 group active:scale-95"
                                >
                                   {selectedMessage.link.title} <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform"/>
                                </button>
                             </div>
                          )}
                       </div>
                    </div>
                 </div>
              </div>
           ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-textMuted opacity-20 hidden lg:flex">
                 <Mail size={120} strokeWidth={0.5} className="mb-6" />
                 <p className="font-serif italic text-2xl tracking-widest uppercase">{t('select_message') || 'Xabarni tanlang'}</p>
              </div>
           )}
       </div>

       {/* Compose Modal with @mention Search */}
       {isComposing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex items-center justify-center p-4">
             <div className="bg-bgMain w-full max-w-2xl border border-borderDark shadow-2xl flex flex-col overflow-hidden animate-slideDown font-serif rounded-xl">
                <div className="flex items-center justify-between p-6 border-b border-borderDark bg-bgSidebar">
                   <h3 className="font-bold text-textMain font-caslon text-2xl tracking-tight">{t('compose')}</h3>
                   <button onClick={() => setIsComposing(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors"><X size={24} className="text-textMuted" /></button>
                </div>
                <form onSubmit={handleSend} className="p-8 space-y-6 relative">
                   <div className="space-y-2 relative" ref={mentionRef}>
                      <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1 font-sans flex items-center gap-2">
                        {t('to')} <span className="opacity-40 italic lowercase font-normal">(ismini yozish uchun @ bosing)</span>
                      </label>
                      <div className="relative group">
                         <input 
                           value={composeTo}
                           onChange={handleComposeToChange}
                           className="w-full bg-cardBg border border-borderDark p-3 text-sm text-textMain outline-none focus:border-accent font-sans rounded-lg shadow-sm"
                           placeholder="Email yoki @mention..."
                           required
                         />
                         {showMentionList && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-cardBg border border-borderDark shadow-2xl z-[210] p-1 rounded-xl animate-popIn">
                               <div className="px-3 py-1.5 border-b border-borderDark/40 flex items-center justify-between">
                                  <span className="text-[9px] font-black uppercase text-accent tracking-widest">Jamoani qidirish...</span>
                                  <AtSign size={12} className="text-accent" />
                               </div>
                               {filteredTeam.map(user => (
                                  <button 
                                     key={user.id} 
                                     type="button"
                                     onClick={() => selectMention(user)}
                                     className="w-full flex items-center gap-3 p-3 hover:bg-accent/10 transition-colors rounded-lg text-left group/user"
                                  >
                                     <img src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${user.avatar}`} className="w-8 h-8 rounded-full border border-borderDark shadow-sm" />
                                     <div className="flex-1 min-w-0">
                                        <div className="text-xs font-bold text-textMain group-hover/user:text-accent truncate">{user.name}</div>
                                        <div className="text-[9px] text-textMuted truncate">@{user.username || 'user'} • {user.email}</div>
                                     </div>
                                  </button>
                               ))}
                               {filteredTeam.length === 0 && (
                                  <div className="p-4 text-center text-[10px] text-textMuted italic">A'zo topilmadi</div>
                               )}
                            </div>
                         )}
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1 font-sans">{t('subject')}</label>
                      <input 
                        value={composeSubject}
                        onChange={e => setComposeSubject(e.target.value)}
                        className="w-full bg-cardBg border border-borderDark p-3 text-sm text-textMain outline-none focus:border-accent font-serif rounded-lg shadow-sm"
                        required
                        placeholder="Mavzu..."
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1 font-sans">{t('message_body')}</label>
                      <textarea 
                        value={composeBody}
                        onChange={e => setComposeBody(e.target.value)}
                        className="w-full h-48 bg-cardBg border border-borderDark p-4 text-base text-textMain outline-none focus:border-accent resize-none font-serif rounded-lg shadow-sm"
                        required
                        placeholder="Xabar matni..."
                      ></textarea>
                   </div>
                   <div className="flex justify-end pt-4 border-t border-borderDark/30">
                      <button type="submit" className="bg-accent hover:bg-accentHover text-bgMain px-10 py-3 shadow-xl font-black flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 rounded-lg">
                         {t('send')} <Send size={16} />
                      </button>
                   </div>
                </form>
             </div>
          </div>
       )}
    </div>
  );
};

export default InboxView;
