import React from 'react';
import { Task, TaskStatus } from '../../types';
import TaskCard from '../components/TaskCard';
import { motion } from 'framer-motion';

interface BoardViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

const columns: TaskStatus[] = ['To Do', 'Doing', 'Done'];

const BoardView: React.FC<BoardViewProps> = ({ tasks, onEditTask }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-12 pb-12">
      {columns.map((status) => {
        const columnTasks = tasks.filter((t) => t.status === status);

        return (
          <div key={status} className="flex flex-col relative min-h-[500px]">
            {/* Header */}
            <div className="mb-6 border-b border-white/10 pb-2 flex items-baseline justify-between">
              <span className="text-white/60 font-typewriter uppercase text-xs tracking-widest">
                {status}
              </span>
              <span className="text-white/30 text-[10px] font-mono">
                {columnTasks.length}
              </span>
            </div>

            <div className="flex-grow p-2">
              {columnTasks.length === 0 ? (
                <div className="text-center py-20 px-8">
                  <div className="border-2 border-dashed border-white/5 rounded-lg p-8 flex flex-col items-center justify-center">
                    <span className="text-white/20 font-typewriter text-sm mb-2">[ Empty Void ]</span>
                  </div>
                </div>
              ) : (
                <motion.div layout className="space-y-8">
                  {columnTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onEdit={onEditTask} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BoardView;