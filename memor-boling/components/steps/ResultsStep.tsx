import React from 'react';
import { ArrowRight, Download, Share2 } from 'lucide-react';

const ResultsStep: React.FC<{ mode: 'design'|'plan', onNext: () => void }> = ({ mode, onNext }) => {
  return (
    <div className="h-full flex flex-col">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl md:text-3xl font-serif text-slate-900">
                {mode === 'design' ? 'Taklif etilgan dizaynlar' : 'Loyihaviy reja (Plan)'}
            </h2>
            <div className="flex gap-2">
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
                    <Share2 size={18} />
                </button>
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
                    <Download size={18} />
                </button>
            </div>
       </div>
       
       {mode === 'design' ? (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 overflow-y-auto">
             {[1,2,3,4].map(i => (
                 <div key={i} className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer h-64 border border-slate-200">
                    <img src={`https://picsum.photos/seed/house${i}/600/400`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                        <span className="text-white font-bold text-lg">Variant #{i}</span>
                        <span className="text-slate-300 text-sm">Modern • 250m²</span>
                    </div>
                 </div>
             ))}
           </div>
       ) : (
           <div className="flex-1 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center mb-8 p-4 overflow-hidden">
              <img src="https://picsum.photos/seed/floorplan/800/500?grayscale" className="max-w-full max-h-full rounded shadow-md bg-white p-2 object-contain" alt="Plan" />
           </div>
       )}

       <div className="flex justify-end mt-auto">
            <button 
                onClick={onNext}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-2 uppercase tracking-wide"
            >
                {mode === 'design' ? 'Planirovkani ko\'rish' : 'Tugatish'} <ArrowRight size={16} />
            </button>
       </div>
    </div>
  );
};

export default ResultsStep;