import React from 'react';
import { CheckSquare, CheckCircle2, FileText, Bell } from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    activeTasks: number;
    completedTasks: number;
    publishedCms: number;
    unreadInbox: number;
  };
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <section className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-6">
      <StatMini label="Aktiv Vazifalar" value={stats.activeTasks} icon={<CheckSquare size={16}/>} />
      <StatMini label="Tugallangan" value={stats.completedTasks} icon={<CheckCircle2 size={16}/>} />
      <StatMini label="Nashr etilgan" value={stats.publishedCms} icon={<FileText size={16}/>} />
      <StatMini label="Yangi bildirishlar" value={stats.unreadInbox} icon={<Bell size={16}/>} isAccent />
    </section>
  );
};

const StatMini = ({ label, value, icon, isAccent }: any) => (
   <div className={`bg-cardBg border border-borderDark p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-lg transition-all group ${isAccent ? 'border-accent/40 bg-accent/[0.02]' : ''}`}>
      <div className="flex items-center justify-between mb-4">
         <span className={`p-2 rounded-xl bg-bgSidebar border border-borderDark transition-all group-hover:scale-110 ${isAccent ? 'text-accent border-accent/20' : 'text-textMuted'}`}>
            {React.cloneElement(icon, { size: 16 })}
         </span>
         <span className="text-[9px] font-black text-textMuted/20 uppercase tracking-[0.2em] hidden sm:block">Live</span>
      </div>
      <div>
         <p className="text-[10px] font-black text-textMuted uppercase tracking-widest mb-1 opacity-60">{label}</p>
         <div className={`text-4xl font-caslon font-bold tracking-tighter leading-none ${isAccent ? 'text-accent' : 'text-textMain'}`}>{value}</div>
      </div>
   </div>
);