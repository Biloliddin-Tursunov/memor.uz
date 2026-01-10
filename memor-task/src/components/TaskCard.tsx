import React from 'react';
import { Task } from '../../types';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';

interface TaskCardProps {
    task: Task;
    onEdit?: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
    const { isAdmin } = useAuth();
    const { deleteTask } = useTasks();

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Archive this artifact permanently?')) {
            deleteTask(task.id);
        }
    };

    // Determine pin color based on common keywords in the manual type, or random fallback
    const getPinColor = (type: string) => {
        const t = type.toLowerCase();
        if (t.includes('bug') || t.includes('fix')) return 'pin-red';
        if (t.includes('feature') || t.includes('loyiha')) return 'pin-blue';
        if (t.includes('content') || t.includes('maqola') || t.includes('kitob')) return 'pin-gold';
        return 'pin-silver';
    };

    // Organic rotation logic
    const rotation = (task.id.charCodeAt(task.id.length - 1) % 6) - 3;

    return (
        <motion.div
            layoutId={task.id}
            initial={{ opacity: 0, y: 50, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: `${rotation}deg` }}
            whileHover={{
                scale: 1.05,
                rotate: '0deg',
                zIndex: 50,
                transition: { duration: 0.2 }
            }}
            onClick={() => onEdit && onEdit(task)}
            className="paper-curl relative bg-kraft p-6 mb-8 shadow-floating cursor-pointer min-h-[220px] flex flex-col group transition-shadow hover:shadow-deep"
        >
            {/* The 3D Pin */}
            <div className={`pin-3d ${getPinColor(task.type)}`} />

            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 bg-paper-texture opacity-20 pointer-events-none mix-blend-multiply rounded-[inherit]" />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header: Date & Type */}
                <div className="flex justify-between items-start mb-4 border-b border-ink/10 pb-3">
                    <span className="font-typewriter text-[10px] text-ink/60 tracking-wider">
                        {new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="font-typewriter text-[9px] font-bold uppercase tracking-widest text-ink/40 border border-ink/10 px-1 py-0.5 rounded-[2px] max-w-[50%] truncate">
                        {task.type}
                    </span>
                </div>

                {/* Title */}
                <h4 className="font-serif font-bold text-2xl leading-tight text-ink mb-3 group-hover:text-ink-blue transition-colors">
                    {task.title}
                </h4>

                {/* Description Preview */}
                <p className="font-serif text-base text-ink/80 line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {task.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t-2 border-dotted border-ink/20">
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${task.status === 'Done' ? 'bg-green-700' :
                                task.status === 'Doing' ? 'bg-amber-600' : 'bg-ink/30'
                            }`} />
                        <span className={`
                        text-xs font-typewriter uppercase tracking-wider
                        ${task.status === 'Done' ? 'line-through text-ink/40' : 'text-ink'}
                    `}>
                            {task.status}
                        </span>
                    </div>

                    {isAdmin && (
                        <button
                            onClick={handleDelete}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-800 hover:text-red-600 text-xs font-bold font-sans uppercase"
                        >
                            Burn
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default TaskCard;