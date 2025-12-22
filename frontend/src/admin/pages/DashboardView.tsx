import React, { useMemo } from 'react';
import { Plus, Clock } from 'lucide-react';
import { User, Task, ContentPost, NavigationState } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import SmartIcon from '../components/ui/SmartIcon';
import { DashboardStats } from '../components/features/dashboard/DashboardStats';
import { SmartInbox } from '../components/features/dashboard/SmartInbox';

interface DashboardViewProps {
  currentUser: User; tasks: Task[]; cmsPosts: ContentPost[]; onNavigate?: (state: NavigationState) => void; onAddTask?: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ currentUser, tasks, cmsPosts, onNavigate, onAddTask }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const stats = useMemo(() => ({
    activeTasks: tasks.filter(t => t.status === 'In Progress' || t.status === 'Review').length,
    completedTasks: tasks.filter(t => t.status === 'Done' || t.status === 'Joylandi!').length,
    publishedCms: cmsPosts.filter(p => p.status === 'Published').length,
    unreadInbox: 3
  }), [tasks, cmsPosts]);

  return (
    <div className="p-4 md:p-10 lg:p-14 w-full max-w-[1500px] mx-auto animate-fadeIn pb-40 font-sans transition-colors duration-500">
       <div className="mb-14">
          <div className="flex items-center gap-3 text-accent font-black text-[10px] uppercase tracking-[0.4em] mb-4 opacity-50"><div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>Tizim ruxsati: {currentUser.role}</div>
          <h1 className="text-4xl md:text-7xl font-caslon text-textMain tracking-tighter uppercase leading-none">Assalomu alaykum, <span className="text-textMuted/40 italic font-serif lowercase font-normal">{currentUser.name.split(' ')[0]}</span></h1>
       </div>
       <SmartInbox currentUser={currentUser} tasks={tasks} cmsPosts={cmsPosts} onNavigate={onNavigate} />
       <DashboardStats stats={stats} />
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
             <div className="flex items-center justify-between mb-4 border-b border-borderDark pb-5"><h3 className="text-lg font-black font-caslon uppercase tracking-widest text-textMain">Vazifalar</h3><button onClick={onAddTask} className="p-2 text-textMuted hover:text-accent transition-colors"><Plus size={20}/></button></div>
             <div className="bg-cardBg border border-borderDark rounded-2xl overflow-hidden shadow-sm divide-y divide-borderDark/10">
                {tasks.slice(0, 6).map(task => (
                   <div key={task.id} onClick={() => onNavigate?.({ type: 'project', id: task.projectId, title: 'Tasks' })} className="p-6 hover:bg-accent/5 transition-all group flex items-center gap-6 cursor-pointer">
                      <div className="w-12 h-12 rounded-xl bg-bgSidebar border border-borderDark flex items-center justify-center text-accent/40 group-hover:text-accent transition-all shrink-0"><SmartIcon name={task.icon || 'File'} size={24} color={isDark ? '#FFF' : '#000'} /></div>
                      <div className="flex-1 min-w-0"><h4 className="text-base font-bold text-textMain truncate mb-1 group-hover:text-accent transition-colors">{task.name}</h4>
                         <div className="flex items-center gap-4 text-[10px] text-textMuted font-black uppercase tracking-widest opacity-60"><span className="flex items-center gap-1.5"><Clock size={12}/> {task.deadline}</span><span className="w-1 h-1 bg-borderDark rounded-full"></span><span>{task.taskType || 'Task'}</span></div>
                      </div>
                      <div className="flex -space-x-2 shrink-0">{task.assignees.slice(0, 3).map((a, i) => (<img key={i} title={a.name} src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${a.avatar}`} className="w-8 h-8 rounded-full border-2 border-cardBg shadow-sm hover:z-10 transition-transform" />))}</div>
                   </div>
                ))}
                <button onClick={() => onNavigate?.({ type: 'project', id: 'it-website', title: 'Loyihalar' })} className="w-full py-5 text-[11px] font-black uppercase tracking-[0.3em] text-textMuted hover:text-accent transition-all bg-bgSidebar/10 border-t border-borderDark/50">Barcha vazifalarni ko'rish</button>
             </div>
          </div>
          <div className="lg:col-span-5 space-y-6">
             <div className="flex items-center justify-between mb-4 border-b border-borderDark pb-5"><h3 className="text-lg font-black font-caslon uppercase tracking-widest text-textMain">So'nggi kontentlar</h3></div>
             <div className="space-y-5">
                {cmsPosts.slice(0, 4).map(post => (
                   <div key={post.id} onClick={() => onNavigate?.({ type: 'cms-content', title: 'CMS Content' })} className="group bg-cardBg border border-borderDark rounded-2xl overflow-hidden hover:border-accent/40 transition-all cursor-pointer flex shadow-sm">
                      <div className="w-24 md:w-32 h-24 md:h-32 relative overflow-hidden border-r border-borderDark shrink-0">
                         {post.coverImage ? (<img src={post.coverImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />) : (<div className="w-full h-full flex items-center justify-center bg-bgSidebar text-textMuted/20"><Plus size={32}/></div>)}
                         <div className="absolute top-2 left-2 bg-black/80 text-white text-[7px] font-black uppercase px-2 py-0.5 rounded backdrop-blur-md">{post.category}</div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                         <div><h4 className="text-sm font-bold text-textMain line-clamp-1 group-hover:text-accent transition-colors uppercase tracking-tight">{post.title || post.name}</h4><p className="text-[10px] text-textMuted font-serif italic mt-1 opacity-50"># {post.id.slice(-4)}</p></div>
                         <div className="flex items-center justify-between pt-2"><span className="text-[9px] font-black text-textMuted uppercase opacity-40">{post.deadline}</span><span className={`text-[8px] font-black px-2 py-0.5 rounded border ${post.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20' : 'bg-accent/5 text-accent'}`}>{post.status}</span></div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};

export default DashboardView;