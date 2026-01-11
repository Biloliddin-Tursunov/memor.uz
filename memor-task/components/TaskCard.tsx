
import React from 'react';
import { Task, TaskStatus } from '../types';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink } from 'lucide-react';

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
    if(window.confirm(t('Archive this artifact?'))) {
        deleteTask(task.id);
    }
  };

  // Cycle Status Logic
  const handleStatusCycle = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isAdmin) return;

      const nextStatus: Record<TaskStatus, TaskStatus> = {
          'To Do': 'Doing',
          'Doing': 'Done',
          'Done': 'To Do'
      };

      updateTask({ ...task, status: nextStatus[task.status] });
  };

  // Determine watercolor accent based on type
  const getWatercolorClass = (type: string) => {
    const loType = type.toLowerCase();
    if (loType.includes('muhim') || loType.includes('bug')) return 'bg-watercolor-red';
    if (loType.includes('loyiha') || loType.includes('feature')) return 'bg-watercolor-blue';
    if (loType.includes('content') || loType.includes('kitob')) return 'bg-watercolor-gold';
    return 'bg-watercolor-green';
  };

  const getPriorityColor = (p?: string) => {
     if (!p) return 'text-ink/30';
     const lower = p.toLowerCase();
     if (lower.includes('o\'ta') || lower.includes('critical')) return 'text-red-700 font-bold';
     if (lower.includes('tavsiya') || lower.includes('low')) return 'text-green-700';
     return 'text-ink/60';
  };

  const getStatusStyle = (status: string) => {
     switch (status) {
         case 'Done': return 'bg-emerald-100/80 text-emerald-800 border-emerald-200';
         case 'Doing': return 'bg-amber-100/80 text-amber-800 border-amber-200';
         default: return 'bg-ink/5 text-ink/60 border-ink/10'; // To Do
     }
  };

  const rotation = (task.id.charCodeAt(task.id.length - 1) % 4) - 2; 

  return (
    <motion.div
      layoutId={task.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, rotate: `${rotation}deg` }}
      whileHover={{ scale: 1.02, rotate: '0deg', zIndex: 50 }}
      onClick={() => onEdit && onEdit(task)}
      className="paper-curl relative bg-white p-6 mb-6 shadow-sm cursor-pointer min-h-[200px] flex flex-col group overflow-visible"
      style={{
          borderRadius: '2px 2px 2px 15px', // Restored Folded Corner
          boxShadow: '3px 3px 8px rgba(0,0,0,0.1)'
      }}
    >
        {/* Pin (Restored) */}
        <div className={`pin-3d ${task.type.toLowerCase().includes('muhim') ? 'pin-red' : 'pin-silver'}`} />

        {/* Watercolor Background Effect */}
        <div className={`absolute inset-0 opacity-30 pointer-events-none mix-blend-multiply transition-opacity group-hover:opacity-50 ${getWatercolorClass(task.type)} rounded-[inherit]`} />
        
        {/* Paper Texture */}
        <div className="absolute inset-0 bg-paper-texture opacity-20 pointer-events-none rounded-[inherit]" />

        <div className="relative z-10 flex flex-col h-full">
            {/* Top Row: Date & Type */}
            <div className="flex justify-between items-start mb-2 h-6">
                 {task.deadline ? (
                     <span className="font-hand text-lg text-ink/40">
                        {new Date(task.deadline).toLocaleDateString()}
                    </span>
                 ) : <span></span>}
                <span className="font-typewriter text-[10px] font-bold uppercase tracking-widest text-ink/40 border border-ink/10 px-1 rounded-sm bg-white/50">
                    {t(task.type)}
                </span>
            </div>

            {/* Title (Serif) */}
            <h4 className="font-serif font-medium text-2xl leading-[1.1] text-ink mb-3 group-hover:text-ink-blue transition-colors">
                {t(task.title)}
            </h4>
            
            {/* Description (Handwritten - Friendly/Blurrier) */}
            <div className="flex-grow">
                <p className="font-hand text-lg text-ink/60 leading-snug -rotate-1 origin-left">
                    {t(task.description)}
                </p>
                {/* Resource Button has been removed from here as requested */}
            </div>

            {/* Bottom Row: Status & Priority */}
            <div className="mt-4 pt-3 border-t border-ink/5 flex items-end justify-between">
                 {/* Status Indicator */}
                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleStatusCycle}
                        className={`px-2 py-0.5 rounded-sm border ${getStatusStyle(task.status)} transition-all hover:scale-105 ${isAdmin ? 'cursor-pointer hover:shadow-sm' : 'cursor-default'}`}
                        title={isAdmin ? "Click to change status" : ""}
                    >
                        <span className={`font-typewriter text-[9px] uppercase tracking-wider ${task.status === 'Done' ? 'line-through opacity-70' : ''}`}>
                            {t(task.status)}
                        </span>
                    </button>
                </div>

                {/* Priority (Bottom Right, Subtle) */}
                {task.priority && (
                    <span className={`font-typewriter text-[10px] uppercase tracking-widest ${getPriorityColor(task.priority)}`}>
                        {t(task.priority)}
                    </span>
                )}
            </div>
            
            {isAdmin && (
                 <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    <button onClick={handleDelete} className="bg-white border border-red-200 shadow-sm px-2 py-0.5 rounded-sm text-[10px] text-red-400 hover:text-red-700 font-bold uppercase tracking-widest">
                        {t("Burn")}
                    </button>
                 </div>
            )}
        </div>
    </motion.div>
  );
};

export default TaskCard;
