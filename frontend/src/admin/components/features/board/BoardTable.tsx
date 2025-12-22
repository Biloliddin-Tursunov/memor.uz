import React, { useState, useRef } from 'react';
import { Type, Layers, Tag, Clock, AlignLeft, GripVertical, Calendar, Users } from 'lucide-react';
import { Task, User, canEdit } from '../../../types';
import { useTheme } from '../../../contexts/ThemeContext';
import IconPicker from '../../ui/IconPicker';
import CustomDatePicker from '../../ui/CustomDatePicker';
import SmartIcon from '../../ui/SmartIcon';
import StatusBadge from '../../ui/StatusBadge';
import { TagCell } from '../../ui/TagCell';

interface BoardTableProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onAddTask: (name: string) => void;
  onRowClick: (task: Task) => void;
  onDeleteTask?: (id: string) => void;
  searchQuery?: string;
  currentUser: User;
}

const BoardTable: React.FC<BoardTableProps> = ({ 
  tasks, onUpdateTask, onRowClick, onDeleteTask, searchQuery = '', currentUser,
}) => {
  const { t } = useTheme();
  const filteredTasks = (tasks || []).filter((task) => (task.name || '').toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="w-full flex flex-col text-sm text-textMain bg-transparent relative font-sans h-full">
      <div className="flex-1 overflow-x-auto custom-scrollbar rounded-xl border border-borderDark shadow-lg bg-cardBg/30">
        <div className="min-w-[1100px] w-full pb-10">
          <div className="flex items-center h-12 border-b border-borderDark text-textMuted bg-bgSidebar/80 backdrop-blur-md sticky top-0 z-20 font-black uppercase tracking-[0.2em] text-[10px]">
            <div className="flex-[2.5] min-w-[320px] flex items-center border-r border-borderDark px-6 gap-3"><Type size={14} className="text-accent"/><span>{t('th_name')}</span></div>
            <div className="w-[150px] shrink-0 flex items-center border-r border-borderDark px-4 gap-3"><Users size={14} className="text-accent" /><span>MAS'ULLAR</span></div>
            <div className="w-[130px] shrink-0 flex items-center border-r border-borderDark px-4 gap-3"><Layers size={14} className="text-accent" /><span>{t('th_type')}</span></div>
            <div className="w-[130px] shrink-0 flex items-center border-r border-borderDark px-4 gap-3"><Tag size={14} className="text-accent" /><span>{t('th_format')}</span></div>
            <div className="w-[140px] shrink-0 flex items-center border-r border-borderDark px-4 gap-3"><Calendar size={14} className="text-accent" /><span>MUDDATI</span></div>
            <div className="w-[150px] shrink-0 flex items-center border-r border-borderDark px-4 gap-3"><Clock size={14} className="text-accent" /><span>{t('th_status')}</span></div>
            <div className="flex-1 min-w-[200px] flex items-center border-r border-borderDark px-4 gap-3"><AlignLeft size={14} className="text-accent" /><span>TAVSIF</span></div>
          </div>
          <div className="flex flex-col bg-transparent min-h-[400px]">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (<TableRow key={task.id} task={task} onUpdate={onUpdateTask} onOpenModal={() => onRowClick(task)} readOnly={!canEdit(currentUser.role)} t={t} />))
            ) : (
              <div className="flex flex-col items-center justify-center py-40 text-textMuted italic opacity-20 scale-150"><SmartIcon name="Database" size={100} glow={false} /><span className="mt-4 font-black uppercase tracking-widest text-xs">{t('no_data')}</span></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TableRow: React.FC<{ task: Task; onUpdate: (id: string, updates: Partial<Task>) => void; onOpenModal: () => void; readOnly: boolean; t: (k: string) => string; }> = ({ task, onUpdate, onOpenModal, readOnly, t }) => {
  const [showPicker, setShowPicker] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex items-center h-14 border-b border-borderDark/40 group hover:bg-accent/5 transition-all relative">
      <div className="flex-[2.5] min-w-[320px] flex items-center border-r border-borderDark/40 px-6 gap-3 relative">
        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1 text-textMuted opacity-0 group-hover:opacity-100 cursor-grab hover:text-accent transition-all"><GripVertical size={14} /></div>
        <div ref={iconRef} onClick={() => !readOnly && setShowPicker(true)} className={`flex items-center justify-center p-2 cursor-pointer ml-3 select-none transition-all ${!readOnly ? 'hover:bg-accent/10 rounded-xl shadow-inner' : ''}`}><SmartIcon name={task.icon || 'File'} size={22} color={task.iconColor} /></div>
        <input className="bg-transparent border-none outline-none text-textMain truncate w-full font-serif font-bold cursor-text py-1 placeholder:text-textMuted/20 focus:text-accent" value={task.name} onChange={(e) => !readOnly && onUpdate(task.id, { name: e.target.value })} readOnly={readOnly} placeholder="Yangi vazifa..." />
        <button onClick={onOpenModal} className="ml-auto opacity-0 group-hover:opacity-100 text-[9px] font-black uppercase tracking-widest text-accent border border-accent/20 rounded-lg px-3 py-1.5 bg-cardBg hover:bg-accent hover:text-bgMain shadow-xl transition-all scale-90 group-hover:scale-100">{t('open')}</button>
      </div>
      <div className="w-[150px] shrink-0 flex items-center border-r border-borderDark/40 px-4">
         <div className="flex -space-x-2.5">
            {task.assignees.map((as, i) => (<img key={i} title={as.name} src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${as.avatar}`} className="w-8 h-8 rounded-full border-2 border-cardBg shadow-lg transition-transform hover:scale-125 hover:z-20 cursor-pointer" />))}
            {task.assignees.length === 0 && <span className="text-[9px] font-black text-textMuted uppercase opacity-40">Bo'sh</span>}
         </div>
      </div>
      <div className="w-[130px] shrink-0 flex items-center border-r border-borderDark/40 px-4 relative"><TagCell value={task.taskType} color={task.taskTypeColor} onChange={(val, col) => onUpdate(task.id, { taskType: val, taskTypeColor: col })} readOnly={readOnly} /></div>
      <div className="w-[130px] shrink-0 flex items-center border-r border-borderDark/40 px-4 relative"><TagCell value={task.format} color={task.formatColor} onChange={(val, col) => onUpdate(task.id, { format: val, formatColor: col })} readOnly={readOnly} /></div>
      <div className="w-[140px] shrink-0 flex items-center border-r border-borderDark/40 px-4 relative"><CustomDatePicker value={task.deadline} onChange={(val) => !readOnly && onUpdate(task.id, { deadline: val })} /></div>
      <div className="w-[150px] shrink-0 flex items-center border-r border-borderDark/40 px-4"><StatusBadge status={task.status} /></div>
      <div className="flex-1 min-w-[200px] flex items-center border-r border-borderDark/40 px-6 text-textMuted text-[11px] truncate italic font-serif opacity-60 group-hover:opacity-100 transition-opacity">{task.description || '---'}</div>
       {showPicker && <IconPicker onSelect={(icon, color) => { onUpdate(task.id, { icon, iconColor: color }); setShowPicker(false); }} onClose={() => setShowPicker(false)} anchorRect={iconRef.current?.getBoundingClientRect()} currentIcon={task.icon} currentColor={task.iconColor} />}
    </div>
  );
};

export default BoardTable;