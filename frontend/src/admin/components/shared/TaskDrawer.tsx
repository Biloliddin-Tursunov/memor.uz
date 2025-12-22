import React, { useState, useRef } from 'react';
import { 
  X, Maximize2, Minimize2, Clock, Calendar, Trash2, Layers, 
  AlignLeft, FileText, UploadCloud, Paperclip, Plus,
  Users, CalendarRange, FileCheck, Check, ChevronDown
} from 'lucide-react';
import { Task, Status, User, canEdit, Assignee } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import CustomDatePicker from '../ui/CustomDatePicker';
import SmartIcon from '../ui/SmartIcon';

interface TaskDrawerProps {
  task: Task;
  onClose: () => void;
  onUpdate: (updates: Partial<Task>) => void;
  onDelete: () => void;
  currentUser: User;
}

const TEAM_MEMBERS: Assignee[] = [
  { name: 'Biloliddin', avatar: 'Biloliddin' }, { name: 'Aziz', avatar: 'Aziz' }, { name: 'Sarah Miller', avatar: 'Sarah' },
  { name: 'Mike', avatar: 'Mike' }, { name: 'Alex', avatar: 'Alex' }, { name: 'Liam Johnson', avatar: 'Liam' }
];

const STATUS_OPTIONS: Status[] = ['Boshlanmadi', 'In Progress', 'Review', 'Done', 'Joylandi!'];

const getStatusStyle = (s: string) => {
  switch (s) {
    case 'Joylandi!': case 'Done': return 'bg-emerald-700 text-white border-emerald-800 dark:bg-emerald-600';
    case 'In Progress': return 'bg-blue-700 text-white border-blue-800 dark:bg-blue-600';
    case 'Review': return 'bg-amber-700 text-white border-amber-800 dark:bg-amber-600';
    case 'Boshlanmadi': case 'Not Started': return 'bg-slate-700 text-white border-slate-800 dark:bg-slate-600';
    default: return 'bg-gray-700 text-white border-gray-800 dark:bg-gray-600';
  }
};

const TaskDrawer: React.FC<TaskDrawerProps> = ({ task, onClose, onUpdate, onDelete, currentUser }) => {
  const { theme, t } = useTheme();
  const [isMaximized, setIsMaximized] = useState(false);
  const [showAssigneePicker, setShowAssigneePicker] = useState(false);
  const assigneeBtnRef = useRef<HTMLButtonElement>(null);
  const isAdmin = canEdit(currentUser.role);
  const isAssignee = task.assignees.some(a => a.name === currentUser.name);
  const canModify = isAdmin || isAssignee;

  const toggleAssignee = (member: Assignee) => {
    const exists = task.assignees.find(a => a.name === member.name);
    onUpdate({ assignees: exists ? task.assignees.filter(a => a.name !== member.name) : [...task.assignees, member] });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[5000] animate-fadeIn" onClick={onClose}></div>
      <div className={`fixed top-0 right-0 h-full bg-bgMain shadow-2xl z-[5001] transform transition-all duration-300 ease-out border-l border-borderDark flex flex-col font-sans ${isMaximized ? 'w-[95vw]' : 'w-full md:w-[750px]'}`}>
        <div className="h-11 flex items-center justify-between px-3 shrink-0 border-b border-borderDark/50 bg-bgMain select-none">
           <div className="flex items-center gap-1">
             <button onClick={() => setIsMaximized(!isMaximized)} className="hidden md:block p-1.5 text-textMuted hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors">{isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}</button>
           </div>
           <div className="flex items-center gap-2">
             <span className="text-[9px] md:text-[10px] text-textMuted opacity-50 font-mono">Auto-saved</span>
             <button onClick={onClose} className="p-1.5 text-textMuted hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors"><X size={16} /></button>
           </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-10">
          <div className="px-6 md:px-12 py-6 md:py-10 max-w-4xl mx-auto">
            <div className="group mb-6 md:mb-8">
                <div className="w-14 h-14 md:w-[72px] md:h-[72px] flex items-center justify-center mb-4 rounded-lg"><SmartIcon name={task.icon || 'File'} size={32} className="md:w-10 md:h-10" color={task.iconColor} /></div>
                <textarea className="w-full bg-transparent text-2xl md:text-[32px] font-bold text-textMain outline-none resize-none overflow-hidden placeholder:text-textMuted/30 leading-tight" value={task.name} rows={1} onChange={(e) => onUpdate({ name: e.target.value })} placeholder="Vazifa nomi..." readOnly={!canModify} />
            </div>
            <div className="space-y-1 mb-8">
              <PropertyRow icon={<Clock size={14}/>} label="Status">
                 <div className="relative group/status w-fit">
                    <select value={task.status} onChange={(e) => onUpdate({ status: e.target.value as Status })} disabled={!canModify} className={`appearance-none pl-3 pr-8 py-1.5 rounded-md text-[10px] md:text-[11px] font-bold border uppercase tracking-wide cursor-pointer outline-none transition-all shadow-sm ${getStatusStyle(task.status)}`}>
                       {STATUS_OPTIONS.map(s => <option key={s} value={s} className="text-black bg-white">{s}</option>)}
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-80 text-white"><ChevronDown size={10}/></div>
                 </div>
              </PropertyRow>
              <PropertyRow icon={<Users size={14}/>} label="Assignees">
                 <div className="flex flex-wrap items-center gap-1.5 relative min-h-[24px]">
                    {task.assignees.map((a, i) => (
                       <div key={i} className="flex items-center gap-1.5 pl-1 pr-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 group/member relative">
                          <img src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${a.avatar}`} className="w-4 h-4 rounded-full bg-white shadow-sm" />
                          <span className="text-[10px] md:text-xs font-medium text-textMain">{a.name}</span>
                          {canModify && (<button onClick={() => toggleAssignee(a)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover/member:opacity-100 transition-opacity"><X size={8} /></button>)}
                       </div>
                    ))}
                    {canModify && (
                      <div className="relative">
                        <button ref={assigneeBtnRef} onClick={() => setShowAssigneePicker(!showAssigneePicker)} className="w-6 h-6 rounded-full border border-dashed border-borderDark hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center text-textMuted transition-colors"><Plus size={14} /></button>
                        {showAssigneePicker && (
                          <div className="absolute top-full left-0 mt-2 z-[6000] w-64 bg-cardBg border border-borderDark rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.2)] p-2 animate-popIn">
                            <div className="px-2 py-1.5 border-b border-borderDark/50 mb-1 flex items-center justify-between"><span className="text-[9px] font-black uppercase text-textMuted tracking-widest">{t('assignees')}</span><button onClick={() => setShowAssigneePicker(false)} className="text-textMuted hover:text-textMain"><X size={12}/></button></div>
                            <div className="max-h-60 overflow-y-auto custom-scrollbar">
                               {TEAM_MEMBERS.map(member => {
                                  const isSelected = task.assignees.some(a => a.name === member.name);
                                  return (<button key={member.name} onClick={() => toggleAssignee(member)} className="w-full flex items-center justify-between p-2 hover:bg-accent/10 rounded-lg transition-colors group/item"><div className="flex items-center gap-2"><img src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${member.avatar}`} className="w-6 h-6 rounded-full border border-borderDark" /><span className={`text-xs font-semibold ${isSelected ? 'text-accent' : 'text-textMain'}`}>{member.name}</span></div>{isSelected && <Check size={14} className="text-accent" />}</button>);
                               })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                 </div>
              </PropertyRow>
              <PropertyRow icon={<Layers size={14}/>} label="Type"><DrawerTagInput value={task.taskType} color={task.taskTypeColor} onChange={(val, col) => onUpdate({ taskType: val, taskTypeColor: col })} readOnly={!canModify} placeholder="Bo'sh" /></PropertyRow>
              <PropertyRow icon={<FileText size={14}/>} label="Format"><DrawerTagInput value={task.format} color={task.formatColor} onChange={(val, col) => onUpdate({ format: val, formatColor: col })} readOnly={!canModify} placeholder="Bo'sh" /></PropertyRow>
              <PropertyRow icon={<Calendar size={14}/>} label="Start Date"><div className="-ml-2"><CustomDatePicker value={task.startDate} onChange={val => onUpdate({ startDate: val })} placeholder="Bo'sh" /></div></PropertyRow>
              <PropertyRow icon={<CalendarRange size={14}/>} label="Deadline"><div className="-ml-2"><CustomDatePicker value={task.deadline} onChange={val => onUpdate({ deadline: val })} placeholder="Bo'sh" /></div></PropertyRow>
            </div>
            <div className="border-t border-borderDark/50 my-6 md:my-8"></div>
            <div className="space-y-2 mb-10">
               <div className="flex items-center gap-2 text-sm font-semibold text-textMain mb-2"><AlignLeft size={16} /> Tavsif</div>
               <textarea className="w-full min-h-[120px] md:min-h-[150px] bg-transparent resize-none outline-none text-sm md:text-[15px] text-textMain placeholder:text-textMuted/40 leading-relaxed" value={task.description || ''} onChange={e => onUpdate({ description: e.target.value })} placeholder="Batafsil yozing..." readOnly={!canModify} />
            </div>
            <div className="space-y-4">
               <div className="flex items-center gap-2 text-sm font-semibold text-textMain"><FileCheck size={16} /> Hisobot</div>
               <div className="bg-gray-50 dark:bg-white/[0.02] border border-borderDark rounded-md overflow-hidden">
                  <textarea className="w-full bg-transparent p-3 text-sm text-textMain outline-none min-h-[80px] resize-y" value={task.workerReport || ''} onChange={e => onUpdate({ workerReport: e.target.value })} placeholder="Ish natijasi haqida yozing..." readOnly={!canModify} />
                  <div className="bg-white dark:bg-[#1F1F1F] px-3 py-2 border-t border-borderDark flex items-center justify-between">
                      <div className="flex gap-2 flex-wrap">{task.submissionFiles?.map((file, i) => (<div key={i} className="flex items-center gap-1 text-[10px] bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded border border-gray-200 dark:border-white/10 text-textMain font-medium shadow-sm"><Paperclip size={10} /> {file}</div>))}</div>
                      {canModify && <button className="flex items-center gap-1.5 text-xs font-medium text-textMuted hover:text-textMain"><UploadCloud size={14} /> Biriktirish</button>}
                   </div>
               </div>
            </div>
          </div>
        </div>
        <div className="shrink-0 border-t border-borderDark px-4 py-3 flex items-center justify-between bg-bgMain">
            {isAdmin && (<button onClick={() => confirm('O\'chirib tashlaysizmi?') && onDelete()} className="text-textMuted hover:text-red-500 p-2 rounded transition-colors"><Trash2 size={16} /></button>)}
            <button onClick={onClose} className="ml-auto px-6 py-2 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-widest text-textMuted hover:bg-black/5 dark:hover:bg-white/5 transition-all">Yopish</button>
        </div>
      </div>
    </>
  );
};

const PropertyRow: React.FC<{ icon: React.ReactNode, label: string, children: React.ReactNode }> = ({ icon, label, children }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center py-1.5 group hover:bg-black/[0.02] dark:hover:bg-white/[0.02] rounded -mx-2 px-2 transition-colors">
    <div className="w-full sm:w-[150px] flex items-center gap-2 text-textMuted shrink-0 sm:pt-1 select-none mb-1 sm:mb-0"><span className="opacity-60">{icon}</span><span className="text-[12px] md:text-[13px]">{label}</span></div>
    <div className="flex-1 min-h-[26px] flex items-center">{children}</div>
  </div>
);

const DrawerTagInput: React.FC<{ value?: string, color?: string, onChange: (val: string, col: string) => void, readOnly: boolean, placeholder?: string }> = ({ value, color = 'gray', onChange, readOnly, placeholder }) => {
   const colors = [{ name: 'gray', bg: 'bg-gray-700' }, { name: 'blue', bg: 'bg-blue-700' }, { name: 'purple', bg: 'bg-purple-700' }, { name: 'emerald', bg: 'bg-emerald-700' }, { name: 'orange', bg: 'bg-orange-700' }, { name: 'red', bg: 'bg-red-700' }];
   const cur = colors.find(c => c.name === color) || colors[0];
   return (<div className="relative w-fit"><div className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-all w-fit shadow-sm ${value ? `${cur.bg} text-white` : 'border border-transparent text-textMuted hover:bg-black/5 dark:hover:bg-white/5'}`}><input value={value || ''} onChange={(e) => onChange(e.target.value, color)} className={`bg-transparent border-none outline-none w-full min-w-[60px] cursor-text text-[10px] md:text-[11px] font-bold placeholder:text-textMuted/40 ${value ? 'text-white' : ''}`} readOnly={readOnly} placeholder={placeholder} /></div></div>);
};

export default TaskDrawer;