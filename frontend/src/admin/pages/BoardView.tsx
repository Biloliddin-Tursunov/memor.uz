import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Layout, Calendar as CalIcon, List as ListIcon, Plus, ImageIcon, RefreshCw, Palette, UserPlus, X } from 'lucide-react';
import BoardTable from '../components/features/board/BoardTable';
import BoardKanban from '../components/features/board/BoardKanban';
import BoardCalendar from '../components/features/board/BoardCalendar';
import TaskDrawer from '../components/shared/TaskDrawer';
import CMSExploreView from './CMSExploreView';
import CMSContentView from './CMSContentView';
import MediaLibraryView from './MediaLibraryView';
import DashboardView from './DashboardView';
import SettingsView from './SettingsView';
import InboxView from './InboxView';
import TeamDirectoryView from './TeamDirectoryView';
import ExhibitionView from './ExhibitionView';
import ExhibitionDetailView from './ExhibitionDetailView';
import ExhibitionEditorView from './ExhibitionEditorView';
import ExhibitionPortfolioView from './ExhibitionPortfolioView';
import FinanceView from './FinanceView';
import IconPicker from '../components/ui/IconPicker';
import SmartIcon from '../components/ui/SmartIcon';
import { useCoverStyle } from '../hooks/useCoverStyle';
import { PageType, Task, User, ContentPost, MediaFile, ExhibitionItem, NavigationState, Assignee } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface BoardViewProps {
  title: string; type: PageType; projectId?: string; projectIcon?: string; projectColor?: string; onProjectIconChange?: (icon: string, color?: string) => void;
  currentUser: User; onLogout: () => void; tasks: Task[]; onUpdateTask: (id: string, updates: Partial<Task>) => void; onDeleteTask: (id: string) => void; onAddTask: () => void;
  cmsPosts: ContentPost[]; onUpdateCmsPost: (p: ContentPost) => void; onDeleteCmsPost: (id: string) => void; initialPostToEdit?: ContentPost | null;
  mediaFiles: MediaFile[]; onUploadMedia: (file: MediaFile) => void; onDeleteMedia?: (id: string) => void; onEditMedia?: (id: string, updates: Partial<MediaFile>) => void;
  exhibitionItems: ExhibitionItem[]; onUpdateExhibition: (item: ExhibitionItem) => void; activePagePayload?: any; onNavigate: (state: NavigationState) => void;
  teamUsers: User[]; onUpdateUser: (id: string, updates: Partial<User>) => void;
}

const TEAM_POOL: Assignee[] = [
  { name: 'Biloliddin', avatar: 'Biloliddin' }, { name: 'Aziz', avatar: 'Aziz' }, { name: 'Mike', avatar: 'Mike' }, { name: 'Alex', avatar: 'Alex' }, { name: 'Sarah Miller', avatar: 'Sarah' }, { name: 'Liam Johnson', avatar: 'Liam' }
];

const BoardView: React.FC<BoardViewProps> = (props) => {
  const { t } = useTheme();
  const { title: initialTitle, type, onNavigate, tasks, onUpdateTask, onDeleteTask, onAddTask, currentUser, projectIcon: initialProjectIcon, projectColor, onProjectIconChange } = props;

  if (type === 'dashboard') return <DashboardView {...props} />;
  if (type === 'profile') return <SettingsView currentUser={currentUser} onLogout={props.onLogout} />;
  if (type === 'cms-studio') return <CMSExploreView onSave={props.onUpdateCmsPost} initialPost={props.initialPostToEdit} mediaFiles={props.mediaFiles} onUploadMedia={props.onUploadMedia} allPosts={props.cmsPosts} />;
  if (type === 'cms-content') return <CMSContentView currentUser={currentUser} posts={props.cmsPosts} onDelete={props.onDeleteCmsPost} onEdit={(post) => props.onUpdateCmsPost(post)} />;
  if (type === 'cms-media') return <MediaLibraryView files={props.mediaFiles} onUpload={props.onUploadMedia} onDelete={props.onDeleteMedia} onEdit={props.onEditMedia} />;
  if (type === 'inbox') return <InboxView currentUser={currentUser} tasks={tasks} cmsPosts={props.cmsPosts} teamUsers={props.teamUsers} onNavigate={onNavigate} />;
  if (type === 'team-directory') return <TeamDirectoryView currentUser={currentUser} teamUsers={props.teamUsers} onUpdateUser={props.onUpdateUser} onNavigate={onNavigate} />;
  if (type === 'exhibition') return <ExhibitionView items={props.exhibitionItems} onNavigate={onNavigate} />;
  if (type === 'exhibition-detail') return <ExhibitionDetailView item={props.activePagePayload} onNavigate={onNavigate} />;
  if (type === 'exhibition-editor') return <ExhibitionEditorView initialItem={props.activePagePayload} onSave={props.onUpdateExhibition} mediaFiles={props.mediaFiles} onUploadMedia={props.onUploadMedia} onNavigate={onNavigate} />;
  if (type === 'exhibition-portfolio') return <ExhibitionPortfolioView studentName={props.activePagePayload} items={props.exhibitionItems} onNavigate={onNavigate} />;
  if (type === 'finance') return <FinanceView currentUser={currentUser} />;

  const [viewMode, setViewMode] = useState<'table' | 'board' | 'calendar'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [pageTitle, setPageTitle] = useState(initialTitle);
  const [showPicker, setShowPicker] = useState(false);
  const projectIconRef = useRef<HTMLDivElement>(null);
  const [coverSeed, setCoverSeed] = useState(Math.floor(Math.random() * 1000));
  const [coverType, setCoverType] = useState<'geometric' | 'gradient'>('geometric');
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [projectMembers, setProjectMembers] = useState<Assignee[]>([]);
  const [showMemberPicker, setShowMemberPicker] = useState(false);

  const coverStyle = useCoverStyle(coverSeed, coverType);
  const activeTask = useMemo(() => tasks.find(t => t.id === activeTaskId) || null, [tasks, activeTaskId]);
  const filteredTasks = tasks.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => { setPageTitle(initialTitle); }, [initialTitle]);

  return (
    <div className="w-full h-full flex flex-col animate-fadeIn bg-bgMain font-serif transition-colors duration-300 overflow-y-auto custom-scrollbar">
      <div className="h-24 md:h-44 w-full shrink-0 relative group border-b border-borderDark/20 transition-all" style={coverStyle}>
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bgMain/50"></div>
         <div className={`absolute bottom-4 right-4 md:right-12 z-10 flex gap-2 transition-opacity duration-200 ${showCoverMenu ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
           <div className="relative">
              <button onClick={() => setShowCoverMenu(!showCoverMenu)} className="text-[10px] md:text-xs bg-cardBg border border-borderDark px-3 py-1.5 shadow-sm text-textMain hover:bg-bgSidebar uppercase tracking-widest font-bold flex items-center gap-2 rounded-md"><ImageIcon size={14} /> {t('change')}</button>
              {showCoverMenu && (
                 <div className="absolute top-full right-0 mt-2 bg-cardBg border border-borderDark shadow-xl p-1 rounded-sm flex flex-col w-40 z-50 animate-fadeIn">
                    <button onClick={() => { setCoverType('geometric'); setShowCoverMenu(false); }} className="text-left px-3 py-2 text-xs font-bold hover:bg-accent/10 hover:text-accent flex items-center gap-2 text-textMain transition-colors"><Layout size={14}/> Pattern</button>
                    <button onClick={() => { setCoverType('gradient'); setShowCoverMenu(false); }} className="text-left px-3 py-2 text-xs font-bold hover:bg-accent/10 hover:text-accent flex items-center gap-2 text-textMain transition-colors"><Palette size={14}/> Gradient</button>
                    <div className="h-px bg-borderDark my-1"></div>
                    <button onClick={() => { setCoverSeed(prev => prev + 100); }} className="text-left px-3 py-2 text-xs font-bold hover:bg-accent/10 hover:text-accent flex items-center gap-2 text-textMain transition-colors"><RefreshCw size={14}/> Shuffle</button>
                 </div>
              )}
           </div>
         </div>
      </div>
      <div className="px-4 md:px-12 w-full max-w-[1600px] mx-auto flex flex-col h-auto min-h-full -mt-8 md:-mt-16 relative z-10 pb-32">
        <div className="group mb-4 md:mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-8">
             <div ref={projectIconRef} onClick={() => onProjectIconChange && setShowPicker(!showPicker)} className="w-20 h-20 md:w-32 md:h-32 flex items-center justify-center select-none bg-bgMain border border-borderDark shadow-2xl p-4 group-hover:rotate-[-2deg] transition-all cursor-pointer hover:scale-105 active:scale-95 rounded-xl"><SmartIcon name={initialProjectIcon || 'Building'} size={60} className="md:w-20 md:h-20 lg:w-24 lg:h-24" color={projectColor} /></div>
             <div className="flex-1 w-full text-center md:text-left">
               <input value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} className="text-3xl md:text-6xl font-black font-caslon text-textMain mb-2 md:mb-4 outline-none bg-transparent w-full focus:underline decoration-borderDark text-center md:text-left" />
               <div className="flex items-center justify-center md:justify-start gap-4 md:gap-5 text-textMuted text-[10px] md:text-sm font-sans relative">
                  <span className="text-textMuted/70 uppercase text-[9px] md:text-[11px] font-black tracking-[0.2em]">{t('owner').toUpperCase()}</span>
                  <div className="flex items-center gap-2">
                      <div className="flex -space-x-2 md:-space-x-3 group/avatars">
                          {projectMembers.map((m, idx) => (<img key={idx} src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${m.avatar}`} className="w-7 h-7 md:w-9 md:h-9 rounded-full border-2 border-bgMain shadow-lg transition-transform hover:z-10 hover:scale-110 cursor-pointer" title={m.name} />))}
                          {projectMembers.length === 0 && <div className="text-[10px] md:text-xs italic opacity-50">Hech kim biriktirilmagan</div>}
                      </div>
                      <button onClick={() => setShowMemberPicker(!showMemberPicker)} className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center bg-cardBg border-2 border-borderDark/60 text-accent rounded-full hover:bg-accent hover:text-bgMain hover:border-accent transition-all shadow-md active:scale-90"><UserPlus size={14} className="md:w-5 md:h-5" /></button>
                      {showMemberPicker && (
                         <div className="absolute top-full left-0 mt-3 w-64 md:w-72 bg-cardBg border-2 border-borderDark shadow-2xl z-[60] p-2 animate-slideDown rounded-xl">
                            <div className="flex items-center justify-between px-3 py-2 border-b border-borderDark/50 mb-1"><span className="text-[9px] md:text-[10px] font-black text-accent uppercase tracking-widest">Jamoani boshqarish</span><button onClick={() => setShowMemberPicker(false)}><X size={14}/></button></div>
                            <div className="max-h-48 md:max-h-60 overflow-y-auto custom-scrollbar">{TEAM_POOL.map(m => { const isSelected = projectMembers.some(pm => pm.name === m.name); return (<button key={m.name} onClick={() => { if(isSelected) setProjectMembers(projectMembers.filter(x => x.name !== m.name)); else setProjectMembers([...projectMembers, m]); }} className={`w-full flex items-center justify-between p-2 md:p-3 hover:bg-accent/5 transition-colors border-b border-borderDark/20 last:border-0 ${isSelected ? 'bg-accent/5' : 'bg-transparent'}`}><div className="flex items-center gap-2 md:gap-3"><img src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${m.avatar}`} className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-borderDark shadow-sm" /><span className={`text-xs md:text-sm font-bold ${isSelected ? 'text-accent' : 'text-textMain'}`}>{m.name}</span></div>{isSelected && <div className="w-2 h-2 bg-accent rounded-full"></div>}</button>); })}</div>
                         </div>
                      )}
                  </div>
               </div>
             </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-2 h-auto min-h-0">
          <div className="flex flex-col md:flex-row md:items-center border-b border-borderDark pb-2 gap-4 shrink-0">
             <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth">
                <TabButton active={viewMode === 'table'} onClick={() => setViewMode('table')} icon={<ListIcon size={14}/>} label={t('table_view')} />
                <TabButton active={viewMode === 'board'} onClick={() => setViewMode('board')} icon={<Layout size={14}/>} label={t('board_view')} />
                <TabButton active={viewMode === 'calendar'} onClick={() => setViewMode('calendar')} icon={<CalIcon size={14}/>} label={t('calendar_view')} />
             </div>
             <div className="flex items-center gap-2 w-full md:w-auto md:ml-auto">
                <div className="relative flex-1 md:flex-none">
                   <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-textMuted" />
                   <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t('search')} className="bg-cardBg border border-borderDark text-sm pl-8 pr-2 py-1.5 outline-none w-full md:w-32 md:focus:w-48 transition-all rounded-md" />
                </div>
                <button onClick={onAddTask} className="bg-accent text-bgMain px-4 py-1.5 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-accentHover shadow-sm transition-all active:scale-[0.98] whitespace-nowrap"><Plus size={14}/> {t('new_task')}</button>
             </div>
          </div>
          <div className="flex-1 min-h-0 h-auto">
            {viewMode === 'table' && <BoardTable tasks={filteredTasks} onUpdateTask={onUpdateTask} onAddTask={() => {}} onRowClick={(t) => setActiveTaskId(t.id)} searchQuery={searchQuery} currentUser={currentUser} />}
            {viewMode === 'board' && <BoardKanban tasks={filteredTasks} onTaskClick={(t) => setActiveTaskId(t.id)} onAddTask={onAddTask} />}
            {viewMode === 'calendar' && <BoardCalendar tasks={tasks} onTaskClick={(t) => setActiveTaskId(t.id)} />}
          </div>
        </div>
      </div>
      {activeTask && (<TaskDrawer task={activeTask} onClose={() => setActiveTaskId(null)} onUpdate={(updates) => onUpdateTask(activeTask.id, updates)} onDelete={() => { onDeleteTask(activeTask.id); setActiveTaskId(null); }} currentUser={currentUser} />)}
      {showPicker && <IconPicker onSelect={(icon, color) => onProjectIconChange && onProjectIconChange(icon, color)} onClose={() => setShowPicker(false)} anchorRect={projectIconRef.current?.getBoundingClientRect()} currentIcon={initialProjectIcon} currentColor={projectColor} />}
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }: any) => (<button onClick={onClick} className={`flex items-center gap-2 px-3 md:px-4 py-2 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 font-sans ${active ? 'border-accent text-accent' : 'border-transparent text-textMuted hover:text-textMain'}`}>{icon}{label}</button>);

export default BoardView;