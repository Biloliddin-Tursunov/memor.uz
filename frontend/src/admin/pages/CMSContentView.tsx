
import React, { useState, useMemo } from 'react';
import { 
  Search, BookOpen, Zap, Palette, Ghost, Trash2, ArrowRight, LayoutGrid, List, User, Edit2, Clock, Filter, ChevronDown, CheckCircle2, Film, Layout
} from 'lucide-react';
import { ContentPost, CMSDomain, Status } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface CMSContentViewProps {
  currentUser: any;
  posts: ContentPost[];
  onDelete: (id: string) => void;
  onEdit: (post: ContentPost) => void;
}

const DOMAINS = [
  { id: 'KNOWLEDGE', label: 'Bilim', icon: <BookOpen size={20} /> },
  { id: 'MOVEMENT', label: 'Harakat', icon: <Zap size={20} /> },
  { id: 'CREATION', label: 'Ijod', icon: <Palette size={20} /> }
];

const CMSContentView: React.FC<CMSContentViewProps> = ({ currentUser, posts, onDelete, onEdit }) => {
  const { t } = useTheme();
  const [activeDomain, setActiveDomain] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      let match = true;
      if (activeDomain) match = match && post.domain === activeDomain;
      if (activeStatus !== 'all') match = match && (post.status?.toLowerCase() === activeStatus.toLowerCase());
      if (searchQuery) match = match && (post.title || post.name || '').toLowerCase().includes(searchQuery.toLowerCase());
      return match;
    });
  }, [posts, activeDomain, activeStatus, searchQuery]);

  const getStatusBadge = (status: string) => {
      switch(status) {
         case 'Published': case 'Joylandi!': 
            return <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800/50"><CheckCircle2 size={10}/> {status}</span>;
         case 'Scheduled':
            return <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 border border-blue-200 text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800/50"><Clock size={10}/> Scheduled</span>;
         default:
            return <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-800 border border-slate-200 text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm dark:bg-slate-800/40 dark:text-slate-400 dark:border-slate-700/50">Draft</span>;
      }
  };

  return (
    <div className="animate-fadeIn bg-bgMain font-serif relative z-10 pb-20">
       <div className="h-auto min-h-[5rem] border-b border-borderDark flex flex-col md:flex-row items-center justify-between px-6 md:px-8 py-6 bg-bgSidebar backdrop-blur-xl shadow-sm gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full md:w-auto text-center md:text-left">
             <div className="flex flex-col shrink-0">
                <h1 className="text-3xl md:text-4xl font-black font-caslon text-textMain tracking-widest uppercase leading-none mb-1">Database</h1>
                <span className="text-[9px] font-black text-accent uppercase tracking-[0.4em] opacity-60">Materials Archive</span>
             </div>
             
             <div className="flex items-center gap-2 bg-cardBg border border-borderDark p-1 shadow-inner rounded-xl overflow-x-auto no-scrollbar max-w-full">
                <button 
                  onClick={() => setActiveDomain(null)} 
                  className={`px-6 py-2 text-[9px] font-black uppercase tracking-widest transition-all rounded-md shrink-0 ${!activeDomain ? 'bg-accent text-bgMain shadow-lg' : 'text-textMuted hover:text-textMain'}`}
                >
                   All
                </button>
                {DOMAINS.map(d => (
                   <button 
                      key={d.id} 
                      onClick={() => setActiveDomain(d.id)}
                      className={`px-6 py-2 text-[9px] font-black uppercase tracking-widest transition-all rounded-md shrink-0 ${activeDomain === d.id ? 'bg-accent text-bgMain shadow-lg' : 'text-textMuted hover:text-textMain'}`}
                   >
                      {d.label}
                   </button>
                ))}
             </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-72 group">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-accent transition-colors" />
                <input 
                   value={searchQuery}
                   onChange={e => setSearchQuery(e.target.value)}
                   placeholder="Arxivni qidirish..."
                   className="w-full bg-cardBg border border-borderDark rounded-xl py-3 pl-11 pr-4 text-sm text-textMain focus:border-accent outline-none font-sans shadow-sm transition-all"
                />
             </div>
             <div className="hidden sm:flex bg-cardBg rounded-xl p-1 border border-borderDark shadow-sm overflow-hidden shrink-0">
                <button onClick={() => setViewMode('grid')} className={`p-2 transition-all rounded-lg ${viewMode === 'grid' ? 'bg-accent/10 text-accent' : 'text-textMuted hover:text-textMain'}`}><LayoutGrid size={18}/></button>
                <button onClick={() => setViewMode('list')} className={`p-2 transition-all rounded-lg ${viewMode === 'list' ? 'bg-accent/10 text-accent' : 'text-textMuted hover:text-textMain'}`}><List size={18}/></button>
             </div>
          </div>
       </div>

       <div className="px-6 md:px-8 py-4 border-b border-borderDark bg-bgMain flex items-center justify-between gap-4 z-[5] overflow-x-auto custom-scrollbar scroll-smooth">
          <div className="flex gap-2 min-w-max">
             {['all', 'Published', 'Draft', 'Scheduled'].map(status => (
                <button 
                   key={status}
                   onClick={() => setActiveStatus(status)}
                   className={`px-6 py-2 border text-[9px] font-black uppercase tracking-widest transition-all rounded-full shadow-sm ${activeStatus === status ? 'bg-textMain text-bgMain border-textMain' : 'bg-cardBg border-borderDark text-textMuted hover:border-accent hover:text-textMain'}`}
                >
                   {status === 'all' ? 'Hammasi' : status}
                </button>
             ))}
          </div>
          <div className="text-[9px] font-black text-textMuted uppercase tracking-[0.2em] opacity-40 hidden lg:block whitespace-nowrap">
             Arxiv: {filteredPosts.length} ta material
          </div>
       </div>

       <div className="p-4 md:p-10 bg-transparent">
          {filteredPosts.length === 0 ? (
             <div className="min-h-[400px] flex flex-col items-center justify-center text-textMuted opacity-50 border-4 border-dashed border-borderDark bg-cardBg/30 animate-fadeIn rounded-2xl">
                <Ghost size={80} className="mb-6 opacity-10" />
                <p className="text-2xl md:text-3xl font-caslon italic mb-2 tracking-tighter">Ma'lumot topilmadi</p>
                <p className="text-[10px] uppercase tracking-widest font-black">Filtrlarni tekshirib ko'ring</p>
             </div>
          ) : viewMode === 'grid' ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-10 pb-20 animate-fadeIn">
                {filteredPosts.map(post => (
                   <div key={post.id} className="group bg-cardBg border border-borderDark hover:border-accent shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col h-auto sm:h-[480px] overflow-hidden relative rounded-2xl">
                      <div className="h-48 sm:h-60 bg-bgSidebar relative overflow-hidden border-b border-borderDark shrink-0">
                         {post.coverImage ? (
                            <img src={post.coverImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125 filter sepia-[.15] brightness-90 group-hover:brightness-100" />
                         ) : (
                            <div className="w-full h-full flex items-center justify-center text-accent/10">
                               <span className="text-6xl">{post.category === 'VIDEOS' ? <Film size={60}/> : <BookOpen size={60}/>}</span>
                            </div>
                         )}
                         <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                            <button onClick={() => onEdit(post)} className="p-3 bg-cardBg text-accent hover:bg-accent hover:text-bgMain shadow-2xl border border-borderDark rounded-full transition-all"><Edit2 size={16}/></button>
                            <button onClick={() => onDelete(post.id)} className="p-3 bg-cardBg text-red-500 hover:bg-red-500 hover:text-bgMain shadow-2xl border border-borderDark rounded-full transition-all"><Trash2 size={16}/></button>
                         </div>
                         <div className="absolute bottom-4 left-4 scale-90 origin-left transform group-hover:scale-100 transition-transform duration-500">
                            {getStatusBadge(post.status || 'Draft')}
                         </div>
                      </div>
                      
                      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                         <div className="space-y-3">
                            <div className="flex items-center justify-between">
                               <span className="text-[9px] font-black uppercase text-accent tracking-[0.4em]">{post.category}</span>
                               <Layout size={12} className="text-textMuted opacity-20" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-caslon font-bold text-textMain group-hover:text-accent transition-colors line-clamp-2 leading-tight uppercase tracking-tighter">
                               {post.title || post.name}
                            </h3>
                         </div>
                         
                         <div className="flex items-center justify-between pt-6 border-t border-borderDark/10 mt-6">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-accent font-black text-xs uppercase shadow-inner">
                                  {(post.assignees?.[0]?.name || 'B').charAt(0)}
                               </div>
                               <div className="flex flex-col">
                                  <span className="text-[8px] font-black text-textMuted uppercase tracking-widest">{post.deadline}</span>
                                  <span className="text-[7px] font-bold text-accent uppercase tracking-[0.2em]">{post.domain}</span>
                               </div>
                            </div>
                            <button onClick={() => onEdit(post)} className="text-textMuted hover:text-accent transition-all duration-500 hover:rotate-45"><ArrowRight size={20}/></button>
                         </div>
                      </div>
                      <div className="absolute bottom-0 left-0 h-1.5 bg-accent w-0 group-hover:w-full transition-all duration-700"></div>
                   </div>
                ))}
             </div>
          ) : (
             <div className="bg-cardBg border border-borderDark shadow-2xl mb-20 animate-fadeIn overflow-hidden rounded-xl">
                <div className="overflow-x-auto custom-scrollbar">
                   <table className="w-full text-left min-w-[800px]">
                      <thead className="bg-bgSidebar text-[9px] font-black uppercase tracking-[0.3em] text-textMuted border-b border-borderDark">
                         <tr>
                            <th className="px-8 py-5">Sarlavha va ID</th>
                            <th className="px-8 py-5">Kategoriya</th>
                            <th className="px-8 py-5">Status</th>
                            <th className="px-8 py-5">Sana</th>
                            <th className="px-8 py-5 text-right">Amallar</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-borderDark/20">
                         {filteredPosts.map(post => (
                            <tr key={post.id} className="hover:bg-accent/5 transition-all duration-300 group">
                               <td className="px-8 py-5">
                                  <div className="flex items-center gap-5">
                                     <div className="w-12 h-12 bg-bgSidebar border border-borderDark flex items-center justify-center text-accent/40 group-hover:text-accent group-hover:scale-110 transition-all shadow-inner relative overflow-hidden shrink-0 rounded-lg">
                                        {post.coverImage ? (
                                           <img src={post.coverImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
                                        ) : (
                                           <LayoutGrid size={18}/>
                                        )}
                                     </div>
                                     <div className="min-w-0">
                                        <p className="font-bold text-textMain text-lg font-caslon leading-none mb-1.5 truncate group-hover:text-accent transition-colors uppercase tracking-tight">{post.title || post.name}</p>
                                        <p className="text-[8px] text-textMuted font-black uppercase tracking-[0.3em] opacity-40">REF: {post.id}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-8 py-5">
                                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent px-3 py-1 bg-accent/5 border border-accent/10 rounded-full">
                                     {post.category}
                                  </span>
                               </td>
                               <td className="px-8 py-5">
                                   {getStatusBadge(post.status || 'Draft')}
                               </td>
                               <td className="px-8 py-5">
                                  <div className="flex flex-col">
                                     <span className="text-xs font-bold text-textMain font-sans">{post.deadline}</span>
                                     <span className="text-[8px] font-black uppercase tracking-widest text-textMuted opacity-50">Publish Date</span>
                                  </div>
                               </td>
                               <td className="px-8 py-5 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                     <button onClick={() => onEdit(post)} className="p-2.5 text-textMuted hover:text-accent hover:bg-accent/10 rounded-full transition-all"><Edit2 size={16}/></button>
                                     <button onClick={() => onDelete(post.id)} className="p-2.5 text-textMuted hover:text-red-500 hover:bg-red-50/10 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16}/></button>
                                  </div>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          )}
       </div>
    </div>
  );
};

export default CMSContentView;
