import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface CustomDatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ value, onChange, placeholder }) => {
  const { t, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = theme !== 'light';

  useEffect(() => {
    if (value) setCurrentDate(new Date(value));
    else setCurrentDate(new Date());
  }, [value, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => { if (containerRef.current && !containerRef.current.contains(event.target as Node)) setIsOpen(false); };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateSelect = (day: number) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onChange(`${selected.getFullYear()}-${String(selected.getMonth() + 1).padStart(2, '0')}-${String(selected.getDate()).padStart(2, '0')}`);
    setIsOpen(false);
  };

  const handleToday = () => {
    const today = new Date();
    onChange(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`);
    setIsOpen(false);
  };

  const formatDateDisplay = (dateStr?: string) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const calendarDays = Array.from({ length: 42 }, (_, i) => { const day = i - firstDayIndex + 1; return day > 0 && day <= daysInMonth ? day : null; });
  const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const years = Array.from({ length: 41 }, (_, i) => new Date().getFullYear() - 20 + i);

  return (
    <div className="relative font-sans" ref={containerRef}>
      <button onClick={() => setIsOpen(!isOpen)} className={`group flex items-center gap-2 px-2 py-1 rounded-md transition-all text-sm ${value ? 'text-textMain hover:bg-black/5 dark:hover:bg-white/10' : 'text-textMuted hover:text-textMain hover:bg-black/5 dark:hover:bg-white/5'}`}>
        <CalendarIcon size={14} className={`opacity-70 group-hover:opacity-100 ${value ? 'text-accent' : ''}`} />
        <span className={!value ? 'opacity-50' : ''}>{formatDateDisplay(value) || placeholder || t('select_date')}</span>
      </button>
      {isOpen && (
        <div className={`absolute top-full left-0 mt-2 z-[5010] w-[280px] p-4 rounded-xl shadow-2xl border animate-in fade-in zoom-in-95 duration-100 ${isDark ? 'bg-[#1F1F1F] border-[#2F2F2F] text-gray-200' : 'bg-white border-gray-200 text-gray-800'}`}>
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-center justify-between">
                <div className="flex gap-1">
                    <select value={month} onChange={(e) => setCurrentDate(new Date(year, parseInt(e.target.value)))} className="bg-transparent text-xs font-bold outline-none cursor-pointer hover:text-accent transition-colors appearance-none pr-1">
                        {monthNames.map((m, i) => <option key={m} value={i} className="text-black">{t(m)}</option>)}
                    </select>
                    <select value={year} onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value), month))} className="bg-transparent text-xs font-bold outline-none cursor-pointer hover:text-accent transition-colors appearance-none">
                        {years.map(y => <option key={y} value={y} className="text-black">{y}</option>)}
                    </select>
                </div>
                <div className="flex gap-1">
                    <button onClick={() => setCurrentDate(new Date(year, month - 1))} className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10"><ChevronLeft size={16}/></button>
                    <button onClick={() => setCurrentDate(new Date(year, month + 1))} className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10"><ChevronRight size={16}/></button>
                </div>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">{weekDays.map(d => (<div key={d} className="text-[10px] font-black text-center opacity-30 uppercase tracking-widest">{t(d)}</div>))}</div>
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              if (!day) return <div key={i} />;
              const isSelected = value && new Date(value).getDate() === day && new Date(value).getMonth() === month && new Date(value).getFullYear() === year;
              const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;
              return (<button key={i} onClick={() => handleDateSelect(day)} className={`h-8 w-8 rounded-lg text-xs flex items-center justify-center transition-all ${isSelected ? 'bg-accent text-white font-bold shadow-lg scale-110' : isToday ? 'bg-accent/10 text-accent font-black border border-accent/20' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}>{day}</button>);
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-borderDark/40 flex items-center justify-between gap-2">
            <button onClick={handleToday} className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md bg-accent/5 hover:bg-accent hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"><Clock size={12}/> Bugun</button>
            {value && (<button onClick={() => { onChange(''); setIsOpen(false); }} className="px-3 py-1.5 text-[10px] font-black uppercase text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-all tracking-widest">{t('clear') || 'Tozalash'}</button>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;