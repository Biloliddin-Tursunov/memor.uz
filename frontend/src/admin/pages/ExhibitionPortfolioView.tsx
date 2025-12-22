
import React, { useMemo } from 'react';
import { 
  ArrowLeft, ExternalLink, MapPin, Grid, 
  User, Award, Layers, Monitor, ChevronRight
} from 'lucide-react';
import { ExhibitionItem, NavigationState } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface ExhibitionPortfolioViewProps {
  studentName: string;
  items: ExhibitionItem[];
  onNavigate: (state: NavigationState) => void;
}

const ExhibitionPortfolioView: React.FC<ExhibitionPortfolioViewProps> = ({ studentName, items, onNavigate }) => {
  const { t } = useTheme();

  const studentProjects = useMemo(() => 
    items.filter(item => item.studentName === studentName), 
    [items, studentName]
  );

  const stats = useMemo(() => {
    const categories = new Set(studentProjects.map(p => p.category));
    const latestYear = studentProjects.length > 0 ? Math.max(...studentProjects.map(p => parseInt(p.year))) : '-';
    return {
      total: studentProjects.length,
      categoryCount: categories.size,
      latest: latestYear
    };
  }, [studentProjects]);

  return (
    <div className="min-h-full bg-transparent animate-fadeIn font-serif pb-40">
      
      {/* Portfolio Header Bar */}
      <div className="h-20 border-b border-borderDark flex items-center justify-between px-6 bg-bgSidebar backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
           <button 
             onClick={() => onNavigate({ type: 'exhibition', title: t('exhibition') })}
             className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full text-textMuted transition-colors"
           >
              <ArrowLeft size={24} />
           </button>
           <div className="h-8 w-px bg-borderDark"></div>
           <h1 className="text-xl font-bold font-caslon text-textMain uppercase tracking-widest">Portfolio Hub</h1>
        </div>
      </div>

      {/* Profile Hero Section */}
      <div className="bg-bgSidebar border-b border-borderDark pt-24 pb-32 px-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none text-accent">
            <User size={500} />
         </div>

         <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-accent text-bgMain flex items-center justify-center text-5xl font-bold font-serif shadow-2xl mb-10 border-8 border-cardBg">
               {studentName.charAt(0)}
            </div>
            <h4 className="text-accent text-[10px] md:text-sm font-black uppercase tracking-[0.4em] mb-4 font-sans opacity-70">Architectural Designer</h4>
            <h1 className="text-6xl md:text-8xl font-caslon text-textMain tracking-tighter leading-tight mb-8 uppercase">
               {studentName}
            </h1>
            <p className="text-textMuted text-lg md:text-2xl max-w-3xl leading-relaxed font-serif italic mb-12 px-4 opacity-80">
               A showcase of spatial reasoning, urban explorations, and design methodologies gathered through academic and creative practice.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl">
               <StatCard label="Total Projects" value={stats.total.toString()} icon={<Layers size={18}/>} />
               <StatCard label="Categories" value={stats.categoryCount.toString()} icon={<Grid size={18}/>} />
               <StatCard label="Active Since" value={stats.latest.toString()} icon={<Award size={18}/>} />
               <StatCard label="Tech Stack" value="5+" icon={<Monitor size={18}/>} />
            </div>
         </div>
      </div>

      {/* Projects Inventory */}
      <div className="p-6 md:p-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between border-b-2 border-accent/10 pb-8 mb-16">
           <div>
              <h2 className="text-3xl md:text-4xl font-caslon text-textMain tracking-tight uppercase leading-none">Selected Works</h2>
              <p className="text-textMuted font-serif italic border-l-4 border-accent pl-5 mt-3 text-base md:text-lg">A chronological catalog of realized concepts.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
           {studentProjects.map(item => (
              <div 
                 key={item.id}
                 onClick={() => onNavigate({ type: 'exhibition-detail', title: item.projectTitle, payload: item })}
                 className="group cursor-pointer bg-cardBg border border-borderDark flex flex-col h-full hover:border-accent transition-all duration-700 hover:shadow-2xl rounded-xl overflow-hidden"
              >
                 <div className="aspect-square relative overflow-hidden border-b border-borderDark">
                    <img 
                       src={item.image} 
                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter sepia-[.1]" 
                    />
                    <div className="absolute inset-0 bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                       <div className="bg-bgMain text-accent p-4 rounded-full shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500">
                          <ExternalLink size={24} />
                       </div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white text-[9px] px-3 py-1.5 font-black uppercase tracking-widest backdrop-blur-md border border-white/10 rounded-sm">
                       {item.category}
                    </div>
                 </div>
                 
                 <div className="p-8 flex flex-col flex-1">
                    <div className="text-[10px] font-mono font-bold text-accent uppercase tracking-[0.2em] mb-3 opacity-60">{item.year} EDITION</div>
                    <h3 className="text-2xl md:text-3xl font-caslon font-bold text-textMain mb-6 leading-tight group-hover:text-accent transition-colors flex-1 uppercase tracking-tight">{item.projectTitle}</h3>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-borderDark/20">
                       <div className="flex items-center gap-2 text-textMuted text-[10px] font-black uppercase tracking-widest font-sans italic opacity-50">
                          <MapPin size={12} className="text-accent"/> {item.location || 'Not Specified'}
                       </div>
                       <ChevronRight size={18} className="text-accent opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all" />
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: string, icon: React.ReactNode }> = ({ label, value, icon }) => (
   <div className="bg-cardBg border border-borderDark p-8 shadow-sm hover:shadow-2xl transition-all group flex flex-col items-center rounded-xl hover:-translate-y-1">
      <div className="text-accent mb-4 group-hover:scale-125 transition-transform bg-accent/5 p-3 rounded-full border border-accent/10 shadow-inner">{icon}</div>
      <div className="text-3xl md:text-4xl font-caslon text-textMain mb-1 font-bold">{value}</div>
      <div className="text-[9px] md:text-[10px] font-black text-textMuted uppercase tracking-widest font-sans opacity-60">{label}</div>
   </div>
);

export default ExhibitionPortfolioView;
