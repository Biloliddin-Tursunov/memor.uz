import React from 'react';
import { Task } from '../types';
import TaskCard from '../components/TaskCard';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface BoardViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

const BoardView: React.FC<BoardViewProps> = ({ tasks, onEditTask }) => {
  const { t } = useLanguage();

  // Sort: Done items last, High Priority first within status (simplified)
  const sortedTasks = [...tasks].sort((a, b) => {
      if (a.status === 'Done' && b.status !== 'Done') return 1;
      if (a.status !== 'Done' && b.status === 'Done') return -1;
      return 0; 
  });

  return (
    <div className="w-full pb-20">
        {sortedTasks.length === 0 ? (
             <div className="text-center py-20 px-8">
                <div className="border-2 border-dashed border-white/5 rounded-lg p-12 inline-flex flex-col items-center justify-center">
                    <span className="text-white/20 font-typewriter text-lg tracking-widest">[ {t("Empty Void")} ]</span>
                </div>
            </div>
        ) : (
            <motion.div 
                layout 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start"
            >
                {sortedTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onEdit={onEditTask} />
                ))}
            </motion.div>
        )}
    </div>
  );
};

export default BoardView;