
import React, { useState } from 'react';
import { 
  ArrowLeft, X, ChevronLeft, ChevronRight, 
  MapPin, Calendar, Layers, Monitor, Link2, 
  ExternalLink, Edit2, Share2, Info
} from 'lucide-react';
import { ExhibitionItem, NavigationState } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface ExhibitionDetailViewProps {
  item: ExhibitionItem;
  onNavigate: (state: NavigationState) => void;
}

const ExhibitionDetailView: React.FC<ExhibitionDetailViewProps> = ({ item, onNavigate }) => {
  const { t } = useTheme();
  const [currentIdx, setCurrentIdx] = useState(0);
  const images = [item.image, ...(item.gallery || [])];

  return (
    <div className="min-h-full bg-transparent animate-fadeIn font-serif pb-32">
      {/* Header Bar */}
      <div className="h-20 border-b border-borderDark flex items-center justify-between px-6 bg-bgSidebar backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
           <button 
             onClick={() => onNavigate({ type: 'exhibition', title: t('exhibition') })}
             className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full text-textMuted hover:text-textMain transition-colors"
           >
              <ArrowLeft size={24} />
           </button>
           <div className="h-8 w-px bg-borderDark"></div>
           <div>
              <h1 className="text-xl font-bold font-caslon text-textMain line-clamp-1">{item.projectTitle}</h1>
              <p className="text-xs text-textMuted font-sans uppercase tracking-widest">{item.studentName}</p>
           </div>
        </div>
        
        <div className="flex items-center gap-3">
           <button 
             onClick={() => onNavigate({ type: 'exhibition-editor', title: 'Edit Work', payload: item })}
             className="p-2 text-textMuted hover:text-accent transition-colors"
           >
              <Edit2 size={20} />
           </button>
           <button className="p-2 text-textMuted hover:text-accent transition-colors"><Share2 size={20} /></button>
        </div>
      </div>

      {/* Main Visual Section */}
      <div className="w-full h-[75vh] bg-black relative flex items-center justify-center overflow-hidden">
         <img 
           src={images[currentIdx]} 
           className="w-full h-full object-contain transition-opacity duration-500" 
           key={currentIdx}
         />
         
         {images.length > 1 && (
            <>
               <button 
                 onClick={() => setCurrentIdx(prev => prev > 0 ? prev - 1 : images.length - 1)}
                 className="absolute left-8 p-4 bg-white/10 hover:bg-accent text-white rounded-full backdrop-blur-sm transition-all"
               >
                  <ChevronLeft size={32} />
               </button>
               <button 
                 onClick={() => setCurrentIdx(prev => prev < images.length - 1 ? prev + 1 : 0)}
                 className="absolute right-8 p-4 bg-white/10 hover:bg-accent text-white rounded-full backdrop-blur-sm transition-all"
               >
                  <ChevronRight size={32} />
               </button>
               <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                  {images.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setCurrentIdx(i)}
                      className={`h-1.5 transition-all ${i === currentIdx ? 'w-12 bg-accent' : 'w-4 bg-white/40'}`} 
                    />
                  ))}
               </div>
            </>
         )}
      </div>

      {/* Project Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row gap-20">
         
         {/* Left Side: Story & Context */}
         <div className="flex-1 space-y-12">
            <div>
               <div className="flex items-center gap-3 text-accent font-sans text-xs font-bold uppercase tracking-[0.3em] mb-4">
                  <Layers size={14} />
                  <span>{item.category}</span>
                  <span className="text-borderDark">•</span>
                  <span>{item.year}</span>
               </div>
               <h2 className="text-6xl md:text-7xl font-caslon text-textMain leading-tight mb-8">
                  {item.projectTitle}
               </h2>
               <div className="prose prose-xl prose-stone dark:prose-invert max-w-none">
                  <p className="italic font-serif leading-relaxed text-textMuted border-l-4 border-accent/20 pl-8 py-4 bg-cardBg shadow-sm">
                     "{item.description}"
                  </p>
               </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
               <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                  {images.map((img, i) => (
                     <div 
                        key={i} 
                        onClick={() => setCurrentIdx(i)}
                        className={`aspect-square cursor-pointer border-2 transition-all ${i === currentIdx ? 'border-accent p-1' : 'border-borderDark hover:border-accent/50'} rounded-lg overflow-hidden shadow-md`}
                     >
                        <img src={img} className="w-full h-full object-cover" />
                     </div>
                  ))}
               </div>
            )}
         </div>

         {/* Right Side: Sidebar Meta */}
         <div className="w-full lg:w-[400px] space-y-8">
            <div className="bg-cardBg border border-borderDark p-10 space-y-10 shadow-lg relative overflow-hidden rounded-2xl backdrop-blur-md">
               <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
               
               {item.location && (
                  <div className="flex items-center gap-5">
                     <div className="p-3 bg-accent/5 rounded-full text-accent shadow-inner border border-accent/10"><MapPin size={24}/></div>
                     <div>
                        <p className="text-[10px] font-black uppercase text-textMuted tracking-widest font-sans mb-1 opacity-60">Project Location</p>
                        <p className="text-lg font-bold text-textMain">{item.location}</p>
                     </div>
                  </div>
               )}

               {item.tools && item.tools.length > 0 && (
                  <div className="flex items-start gap-5">
                     <div className="p-3 bg-accent/5 rounded-full text-accent shadow-inner border border-accent/10"><Monitor size={24}/></div>
                     <div>
                        <p className="text-[10px] font-black uppercase text-textMuted tracking-widest font-sans mb-2 opacity-60">Architectural Tools</p>
                        <div className="flex flex-wrap gap-2">
                           {item.tools.map(tool => (
                              <span key={tool} className="bg-bgSidebar border border-borderDark px-2 py-1 rounded-sm text-[10px] font-black text-textMain uppercase tracking-tighter shadow-sm">{tool}</span>
                           ))}
                        </div>
                     </div>
                  </div>
               )}

               {item.presentationLink && (
                  <div className="flex items-center gap-5">
                     <div className="p-3 bg-accent/5 rounded-full text-accent shadow-inner border border-accent/10"><Link2 size={24}/></div>
                     <div className="flex-1">
                        <p className="text-[10px] font-black uppercase text-textMuted tracking-widest font-sans mb-1 opacity-60">Portfolio Resource</p>
                        <a href={item.presentationLink} target="_blank" className="text-lg font-bold text-accent hover:underline flex items-center gap-2">
                           Full Presentation <ExternalLink size={16}/>
                        </a>
                     </div>
                  </div>
               )}
            </div>

            {/* Author Profile Card */}
            <div className="border border-borderDark bg-cardBg p-10 flex flex-col items-center text-center shadow-lg group rounded-2xl backdrop-blur-md">
               <div className="w-24 h-24 rounded-full bg-accent text-bgMain flex items-center justify-center text-4xl font-bold font-serif shadow-2xl mb-6 group-hover:scale-110 transition-transform border-4 border-bgSidebar">
                  {item.studentName.charAt(0)}
               </div>
               <p className="text-xs text-textMuted uppercase font-black tracking-[0.2em] font-sans mb-1 opacity-60">Designer / Student</p>
               <h3 className="text-2xl font-bold text-textMain font-caslon mb-6">{item.studentName}</h3>
               <button 
                  onClick={() => onNavigate({ type: 'exhibition-portfolio', title: item.studentName, payload: item.studentName })}
                  className="w-full bg-accent text-bgMain py-4 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-accentHover transition-all flex items-center justify-center gap-2 font-sans shadow-xl active:scale-95 rounded-xl"
               >
                  <Info size={16}/> View Full Portfolio
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ExhibitionDetailView;
