
import React, { useMemo } from 'react';
import { Inbox as InboxIcon, ChevronRight, Zap, UserPlus, CheckCircle2, ArrowRight } from 'lucide-react';
import { User, Task, ContentPost, NavigationState } from '../../../types';

interface SmartInboxProps {
  currentUser: User;
  tasks: Task[];
  cmsPosts: ContentPost[];
  onNavigate?: (state: NavigationState) => void;
}

export const SmartInbox: React.FC<SmartInboxProps> = ({ currentUser, tasks, cmsPosts, onNavigate }) => {
  const smartMessages = useMemo(() => {
    const msgs: any[] = [];
    cmsPosts.filter(p => p.status === 'Published').forEach(post => {
      msgs.push({
        id: `cms-${post.id}`, sender: 'Tizim', subject: 'Yangi material nashr etildi',
        preview: `"${post.title || post.name}" maqolasi hamma uchun ochiq.`, date: 'Bugun',
        icon: <Zap size={14} className="text-amber-500" />, link: { type: 'cms-content', title: 'Bazani ko\'rish' }
      });
    });

    const userFirstName = currentUser.name.split(' ')[0];
    tasks.filter(t => t.assignees.some(a => a.name.includes(userFirstName))).forEach(task => {
      msgs.push({
        id: `task-assign-${task.id}`, sender: 'Menejer', subject: 'Yangi vazifa biriktirildi',
        preview: `${task.name} vazifasiga mas'ul etib tayinlandingiz.`, date: 'Bugun',
        icon: <UserPlus size={14} className="text-blue-500" />, link: { type: 'project', id: task.projectId, title: 'Vazifaga o\'tish' }
      });
    });

    return msgs.slice(0, 3);
  }, [cmsPosts, tasks, currentUser]);

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8 border-b border-borderDark pb-5">
         <h3 className="text-xs font-black font-sans uppercase tracking-[0.3em] flex items-center gap-3 text-textMain">
            <InboxIcon size={18} className="text-accent" /> Muloqot va bildirishnomalar
         </h3>
         <button onClick={() => onNavigate?.({ type: 'inbox', title: 'Inbox' })} className="text-[10px] font-black text-accent hover:underline uppercase tracking-widest">
            Xabarlar markazi <ChevronRight size={12} className="inline ml-1"/>
         </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {smartMessages.map((msg: any) => (
            <div key={msg.id} onClick={() => msg.link && onNavigate?.(msg.link)} className="bg-cardBg border border-borderDark p-6 rounded-2xl hover:border-accent/40 transition-all group cursor-pointer relative overflow-hidden shadow-sm">
               <div className="absolute top-0 right-0 w-8 h-8 bg-accent/5 flex items-center justify-center rounded-bl-2xl border-l border-b border-borderDark group-hover:bg-accent group-hover:text-bgMain transition-colors">{msg.icon}</div>
               <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-bgSidebar border border-borderDark flex items-center justify-center text-accent font-black text-xs uppercase shadow-inner group-hover:scale-110 transition-transform">{msg.sender.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                     <p className="text-[10px] font-black text-accent uppercase tracking-widest truncate">{msg.sender}</p>
                     <p className="text-[9px] text-textMuted font-bold uppercase opacity-40">{msg.date}</p>
                  </div>
               </div>
               <h4 className="text-sm font-bold text-textMain group-hover:text-accent transition-colors truncate mb-1.5">{msg.subject}</h4>
               <p className="text-[11px] text-textMuted font-serif italic opacity-60 leading-relaxed mb-4 line-clamp-2">"{msg.preview}"</p>
               <div className="flex items-center gap-2 text-[8px] font-black text-accent uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Batafsil <ArrowRight size={10}/></div>
            </div>
         ))}
      </div>
    </section>
  );
};
