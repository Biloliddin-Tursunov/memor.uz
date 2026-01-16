
import React from 'react';
import { Task, TaskStatus } from '../types';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { useLanguage } from '../context/LanguageContext';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { isAdmin } = useAuth();
  const { deleteTask, updateTask } = useTasks();
  const { t } = useLanguage();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if(window.confirm(t('Archive this artifact?'))) deleteTask(task.id);
  };

  const handleStatusCycle = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isAdmin) return;
      const next: Record<TaskStatus, TaskStatus> = { 'To Do': 'Doing', 'Doing': 'Done', 'Done': 'To Do' };
      updateTask({ ...task, status: next[task.status] });
  };

  const getWatercolorClass = (type: string) => {
    const lo = type.toLowerCase();
    if (lo.includes('muhim') || lo.includes('bug')) return 'bg-watercolor-red';
    if (lo.includes('loyiha') || lo.includes('feature')) return 'bg-watercolor-blue';
    if (lo.includes('content') || lo.includes('kitob')) return 'bg-watercolor-gold';
    return 'bg-watercolor-green';
  };

  const getStatusColor = (status: TaskStatus) => {
      switch(status) {
          case 'Done': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
          case 'Doing': return 'bg-amber-100 text-amber-800 border-amber-200';
          default: return 'bg-ink/5 text-ink/50 border-ink/10';
      }
  };

  const rotation = (task.id.charCodeAt(task.id.length - 1) % 4) - 2; 

  return (
    <motion.div
      layoutId={task.id}
      whileHover={{ scale: 1.05, rotate: '0deg', zIndex: 10, boxShadow: '0 15px 30px -10px rgba(0,0,0,0.3)' }}
      onClick={() => onEdit && onEdit(task)}
      className="paper-curl relative bg-[#fdfcf0] p-4 md:p-6 mb-4 md:mb-6 cursor-pointer min-h-[140px] md:min-h-[180px] flex flex-col group border border-black/5"
      style={{ 
        borderRadius: '2px 2px 2px 20px', 
        rotate: `${rotation}deg`,
        boxShadow: '1px 1px 5px rgba(0,0,0,0.1)'
      }}
    >
        {/* Realistic Pin - Absolute position ensures it stays on top and visible */}
        <div className={`pin-3d ${task.type.toLowerCase().includes('muhim') ? 'pin-red' : 'pin-gold'}`} />
        
        {/* Watercolor Background Effect */}
        <div className={`absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply transition-opacity group-hover:opacity-25 ${getWatercolorClass(task.type)} rounded-[inherit]`} />
        
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none mix-blend-multiply rounded-[inherit]" />

        <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-2">
                <span className="font-hand text-[10px] md:text-xs text-ink/40 tracking-wider">
                    {task.deadline ? new Date(task.deadline).toLocaleDateString() : '---'}
                </span>
                <span className={`font-typewriter text-[7px] md:text-[9px] font-bold uppercase tracking-widest border-b px-1 py-0.5 ${task.priority?.toLowerCase().includes('muhim') ? 'text-red-800 border-red-100' : 'text-ink/30 border-ink/5'}`}>
                    {t(task.type)}
                </span>
            </div>

            <h4 className="font-serif font-medium text-lg md:text-2xl leading-tight text-ink mb-2 group-hover:text-ink-blue transition-colors">
                {t(task.title)}
            </h4>

            <div className="flex-grow overflow-hidden">
                <p className="font-hand text-base md:text-lg text-ink/60 leading-snug line-clamp-2 md:line-clamp-3">
                    {t(task.description)}
                </p>
            </div>

            <div className="mt-4 pt-2 border-t border-ink/5 flex items-end justify-between">
                <button 
                  onClick={handleStatusCycle} 
                  className={`px-2 py-0.5 rounded-sm border text-[8px] md:text-[9px] font-typewriter uppercase tracking-tighter transition-all ${getStatusColor(task.status)} ${task.status === 'Done' ? 'line-through opacity-70' : ''}`}
                >
                    {t(task.status)}
                </button>
                
                {isAdmin && (
                    <button 
                      onClick={handleDelete} 
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] text-red-800/40 hover:text-red-800 font-bold uppercase tracking-widest"
                    >
                      {t("Burn")}
                    </button>
                )}
            </div>
        </div>
    </motion.div>
  );
};

export default TaskCard;
