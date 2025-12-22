
import React, { useState, useRef, useEffect } from 'react';

interface TagCellProps {
  value?: string;
  color?: string;
  onChange: (val: string, col: string) => void;
  readOnly: boolean;
}

export const TagCell: React.FC<TagCellProps> = ({ value, color = 'gray', onChange, readOnly }) => {
   const [isOpen, setIsOpen] = useState(false);
   const triggerRef = useRef<HTMLDivElement>(null);
   const [position, setPosition] = useState({ top: 0, left: 0 });

   const toggleOpen = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (readOnly) return;
      if (!isOpen && triggerRef.current) {
         const rect = triggerRef.current.getBoundingClientRect();
         setPosition({ top: rect.bottom + 5, left: rect.left });
      }
      setIsOpen(!isOpen);
   };

   useEffect(() => {
     if (!isOpen) return;
     const handleClickOutside = () => setIsOpen(false);
     document.addEventListener('click', handleClickOutside);
     return () => document.removeEventListener('click', handleClickOutside);
   }, [isOpen]);

   const colors = ['blue', 'purple', 'emerald', 'orange', 'pink', 'red', 'gray'];
   
   const getBadgeClasses = (c: string) => {
      switch(c) {
         case 'blue': return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800/50";
         case 'purple': return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/40 dark:text-purple-400 dark:border-purple-800/50";
         case 'emerald': return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800/50";
         case 'orange': return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/40 dark:text-orange-400 dark:border-orange-800/50";
         default: return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700/50";
      }
   };

   return (
      <div className="relative w-full" ref={triggerRef}>
         <div className="flex items-center gap-2">
             {value ? (
                 <div className={`px-3 py-1 rounded-full text-[10px] flex items-center gap-2 w-fit border font-black uppercase tracking-widest ${getBadgeClasses(color)} shadow-sm transition-all hover:scale-105`}>
                    <div onClick={toggleOpen} className="w-1.5 h-1.5 rounded-full cursor-pointer bg-current opacity-60 hover:scale-150 transition-transform" />
                    <input value={value} onChange={(e) => onChange(e.target.value, color)} className="bg-transparent border-none outline-none w-full cursor-text p-0 m-0 min-w-[50px]" readOnly={readOnly} />
                 </div>
             ) : (
                 <input placeholder="Empty" value="" onChange={(e) => onChange(e.target.value, 'gray')} className="bg-transparent text-[10px] text-textMuted/20 outline-none w-full font-black uppercase tracking-widest italic" readOnly={readOnly} />
             )}
         </div>
         
         {isOpen && (
            <div 
               className="fixed z-[9999] bg-cardBg border border-borderDark rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-3 flex gap-2 animate-in fade-in zoom-in-95"
               style={{ top: position.top, left: position.left }}
               onClick={(e) => e.stopPropagation()}
            >
               {colors.map(c => (
                  <button 
                     key={c} 
                     onClick={() => { onChange(value || '', c); setIsOpen(false); }} 
                     className="w-5 h-5 rounded-full border border-borderDark hover:scale-125 transition-transform shadow-md"
                     style={{ backgroundColor: c }}
                  />
               ))}
            </div>
         )}
      </div>
   );
};
