import React from 'react';
import { Task } from '../types';
import { motion } from 'framer-motion';

interface CalendarViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ tasks, onEditTask }) => {
  // Simple Mock Calendar for current month visualization logic
  const daysInMonth = 30; // Simplified for demo
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="bg-parchment p-6 rounded-sm shadow-paper border border-parchment-dark h-full">
      <h3 className="font-serif text-2xl text-parchment-text mb-6 text-center border-b border-parchment-dark/30 pb-4">
        Timeline View
      </h3>
      
      <div className="grid grid-cols-7 gap-px bg-parchment-dark/30 border border-parchment-dark/30">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-parchment p-2 text-center text-xs font-bold uppercase text-parchment-dim">
                {day}
            </div>
        ))}
        
        {/* Placeholder for empty start days */}
        <div className="bg-parchment h-24 md:h-32"></div>
        <div className="bg-parchment h-24 md:h-32"></div>

        {days.map(day => {
            // Simplified matching: Just checks day of month from deadline string
            const tasksForDay = tasks.filter(t => {
                const date = new Date(t.deadline);
                return date.getDate() === day;
            });

            return (
                <div key={day} className="bg-parchment h-24 md:h-32 p-2 relative hover:bg-parchment-light transition-colors group border border-transparent hover:border-parchment-dark/20">
                    <span className="text-parchment-dim font-serif text-lg">{day}</span>
                    <div className="mt-1 space-y-1 overflow-y-auto max-h-[70%] custom-scrollbar">
                        {tasksForDay.map(t => (
                             <motion.div 
                                key={t.id}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => onEditTask(t)}
                                className={`
                                    text-[9px] p-1 rounded-sm cursor-pointer shadow-sm truncate
                                    ${t.status === 'Done' ? 'bg-emerald-100 text-emerald-900' : 'bg-white text-black'}
                                    border border-black/10
                                `}
                             >
                                {t.title}
                             </motion.div>
                        ))}
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default CalendarView;