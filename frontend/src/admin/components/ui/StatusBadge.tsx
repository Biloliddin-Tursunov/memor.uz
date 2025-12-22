
import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let styles = "";
  switch(status) {
    case 'Joylandi!': case 'Done': styles = "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800/50"; break;
    case 'Boshlanmadi': case 'Not Started': styles = "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700/50"; break;
    case 'In Progress': styles = "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800/50"; break;
    case 'Review': styles = "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/40 dark:text-orange-400 dark:border-orange-800/50"; break;
    default: styles = "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700/50";
  }
  
  return (
    <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 w-fit border ${styles} shadow-sm transition-all hover:scale-105`}>
      <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></div>
      {status}
    </span>
  );
};

export default StatusBadge;
