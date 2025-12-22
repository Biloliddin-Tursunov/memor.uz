import React from 'react';
import { Plus, Clock } from 'lucide-react';
import { Task, Status } from '../../../types';
import SmartIcon from '../../ui/SmartIcon';

interface BoardKanbanProps {
  tasks: Task[];
  onTaskClick: (t: Task) => void;
  onAddTask: () => void;
}

const BoardKanban: React.FC<BoardKanbanProps> = ({ tasks, onTaskClick, onAddTask }) => {
  const columns: Status[] = ['Boshlanmadi', 'In Progress', 'Review', 'Done'];
  
  return (
    <div className="flex gap-4 md:gap-6 h-full overflow-x-auto pb-10 custom-scrollbar font-sans pt-4">
      {columns.map(status => {
        const columnTasks = tasks.filter(task => { if (status === 'Done') return task.status === 'Done' || task.status === 'Joylandi!'; return task.status === status; });
        return (
          <div key={status} className="flex-1 min-w-[280px] md:min-w-[320px] flex flex-col gap-4">
             <div className="flex items-center justify-between px-2 bg-bgSidebar py-2 rounded-md border-l-2 border-accent backdrop-blur-md">
                <div className="flex items-center gap-2">
                   <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-textMain">{status}</span>
                   <span className="bg-accent/10 text-accent text-[9px] md:text-[10px] px-2 py-0.5 rounded-full font-black border border-accent/20">{columnTasks.length}</span>
                </div>
                <button onClick={onAddTask} className="text-textMuted hover:text-accent transition-colors"><Plus size={16}/></button>
             </div>
             <div className="flex-1 flex flex-col gap-4 min-h-[400px]">
                {columnTasks.map(task => (
                  <div key={task.id} onClick={() => onTaskClick(task)} className="bg-cardBg border border-borderDark p-4 md:p-5 shadow-sm hover:shadow-2xl hover:border-accent transition-all cursor-pointer group relative overflow-hidden rounded-xl">
                     <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="flex items-center justify-between mb-4">
                        <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm border ${task.taskTypeColor === 'blue' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400'}`}>{task.taskType || 'Task'}</span>
                        <SmartIcon name={task.icon || 'File'} size={20} className="text-accent/60 group-hover:text-accent" />
                     </div>
                     <h4 className="text-sm md:text-base font-bold text-textMain mb-6 group-hover:text-accent transition-colors line-clamp-2 font-serif leading-snug">{task.name}</h4>
                     <div className="flex items-center justify-between pt-4 border-t border-borderDark/20">
                        <div className="flex -space-x-1.5 md:-space-x-2">
                           {task.assignees.slice(0, 3).map((a, i) => (<img key={i} title={a.name} src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${a.avatar}`} className="w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-cardBg shadow-md hover:z-10 transition-transform hover:scale-110" />))}
                           {task.assignees.length > 3 && (<div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-bgSidebar border-2 border-cardBg flex items-center justify-center text-[7px] md:text-[8px] font-bold text-textMuted shadow-sm">+{task.assignees.length - 3}</div>)}
                        </div>
                        <div className="flex items-center gap-1.5 text-[8px] md:text-[10px] text-textMuted font-mono font-bold uppercase tracking-wider"><Clock size={10} className="text-accent" />{task.deadline}</div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )
      })}
    </div>
  );
};

export default BoardKanban;