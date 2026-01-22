import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { analyzeArea } from '../../services/geminiService';

const StyleStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [analyzing, setAnalyzing] = useState(true);
  const [analysisText, setAnalysisText] = useState('');

  useEffect(() => {
    const runAnalysis = async () => {
        const text = await analyzeArea("Tashkent");
        setAnalysisText(text);
        setAnalyzing(false);
    };
    runAnalysis();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6">
      {/* Main Grid */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <h2 className="text-2xl font-serif text-slate-900 mb-6 sticky top-0 bg-white z-10 py-2">Uslubni tanlang</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pb-4">
          {[...Array(8)].map((_, i) => (
             <div key={i} className="aspect-square rounded-lg overflow-hidden relative cursor-pointer group border border-slate-200 grayscale hover:grayscale-0 transition-all">
                <img 
                    src={`https://picsum.photos/seed/arch${i+10}/300/300`} 
                    alt="Style" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 border border-white text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-all">
                        Tanlash
                    </span>
                </div>
             </div>
          ))}
        </div>
      </div>

      {/* AI Sidebar - Bottom on mobile, Right on desktop */}
      <div className="w-full lg:w-72 shrink-0 flex flex-col">
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Hudud Analizi</h3>
                {analyzing ? <Loader2 className="animate-spin text-slate-400" size={16} /> : <CheckCircle2 className="text-slate-900" size={16} />}
            </div>
            
            <div className="space-y-4">
                <div className="h-24 bg-white border border-slate-200 rounded-lg relative overflow-hidden p-2">
                     {/* Simplified Chart */}
                     <div className="flex items-end justify-between h-full gap-1">
                        <div className="w-full bg-slate-200 h-[40%]"></div>
                        <div className="w-full bg-slate-300 h-[70%]"></div>
                        <div className="w-full bg-slate-800 h-[50%]"></div>
                        <div className="w-full bg-slate-400 h-[80%]"></div>
                     </div>
                </div>
                
                <div className="text-xs text-slate-500 leading-relaxed min-h-[3rem]">
                    {analyzing ? (
                        <span className="animate-pulse">Sun'iy intellekt hududni o'rganmoqda...</span>
                    ) : (
                        <span className="fade-in">{analysisText}</span>
                    )}
                </div>
            </div>
        </div>

        <div className="mt-4 lg:mt-auto flex justify-end">
            <button 
                onClick={onNext}
                className="w-full lg:w-auto bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
            >
                Keyingisi <ArrowRight size={16} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default StyleStep;