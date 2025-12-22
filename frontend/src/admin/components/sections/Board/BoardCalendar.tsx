
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Task } from '../../../types';
import SmartIcon from '../../SmartIcon';

interface BoardCalendarProps {
  tasks: Task[];
  onTaskClick: (t: Task) => void;
}

const BoardCalendar: React.FC<BoardCalendarProps> = ({ tasks, onTaskClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  const offset = new Date(year, month, 1).getDay();
  const calendarDays = [];
  for (let i = 0; i < offset; i++) calendarDays.push(null);
  for (let i = 1; i <= days; i++) calendarDays.push(i);

  return (
    <div className="bg-cardBg border border-borderDark shadow-2xl font-sans mt-4 overflow-hidden rounded-xl overflow-x-auto custom-scrollbar">
      <div className="min-w-[700px]">
        <div className="p-4 md:p-6 border-b border-borderDark flex items-center justify-between bg-bgSidebar backdrop-blur-md">
           <h3 className="text-xl md:text-3xl font-caslon font-bold text-textMain">{currentDate.toLocaleString('default', { month: 'long' })} {year}</h3>
           <div className="flex items-center gap-2 md:gap-4">
              <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-1.5 md:p-2 border border-borderDark rounded-md hover:bg-accent/10 transition-colors"><ChevronLeft size={18}/></button>
              <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-1.5 md:p-2 border border-borderDark rounded-md hover:bg-accent/10 transition-colors"><ChevronRight size={18}/></button>
           </div>
        </div>
        <div className="grid grid-cols-7 border-b border-borderDark bg-bgSidebar">
           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (<div key={d} className="p-2 md:p-3 text-center text-[9px] md:text-[10px] font-black uppercase tracking-widest text-textMuted">{d}</div>))}
        </div>
        <div className="grid grid-cols-7 auto-rows-[100px] md:auto-rows-[160px]">
           {calendarDays.map((day, idx) => { 
              if (day === null) return <div key={`empty-${idx}`} className="border-r border-b border-borderDark bg-bgSidebar/20"></div>; 
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; 
              const dayTasks = tasks.filter(task => task.deadline === dateStr); 
              return (
                 <div key={day} className="border-r border-b border-borderDark p-2 md:p-3 flex flex-col gap-1 md:gap-2 overflow-hidden hover:bg-accent/5">
                    <span className="text-[10px] md:text-xs font-black text-textMuted">{day}</span>
                    <div className="flex flex-col gap-1 overflow-y-auto no-scrollbar flex-1 pb-2">
                       {dayTasks.map(task => (<div key={task.id} onClick={() => onTaskClick(task)} className="text-[8px] md:text-[10px] font-bold p-1 md:p-2 bg-cardBg border border-borderDark truncate cursor-pointer hover:border-accent flex items-center gap-1 md:gap-2 rounded-md"><SmartIcon name={task.icon || 'File'} size={12} className="text-accent/70" /><span className="truncate">{task.name}</span></div>))}
                    </div>
                 </div>
              ); 
           })}
        </div>
      </div>
    </div>
  );
};

export default BoardCalendar;
