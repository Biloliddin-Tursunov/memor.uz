import React from 'react';
import { Search, Plus, Minus, Check } from 'lucide-react';

const LocationStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="flex flex-col h-full pt-2">
      <div className="flex justify-between items-end mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-serif text-slate-900">Yerni belgilang</h2>
      </div>
      
      <div className="relative flex-1 bg-slate-200 rounded-xl border border-slate-300 overflow-hidden shadow-inner group min-h-[300px]">
        {/* Map Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center grayscale opacity-80 group-hover:opacity-100 transition-all duration-700"></div>
        
        {/* Center Indicator */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm border border-slate-200 font-medium text-slate-800 flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse"></span>
                Xarita rejimi (Demo)
            </div>
        </div>

        {/* Search Bar Overlay */}
        <div className="absolute top-4 left-4 right-4 md:w-80">
            <div className="bg-white rounded-lg shadow-sm flex items-center p-1.5 border border-slate-300">
                <Search className="text-slate-400 ml-2" size={18} />
                <input type="text" placeholder="Manzilni qidiring..." className="w-full px-2 py-1 outline-none text-sm text-slate-800 placeholder-slate-400" />
            </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button className="w-9 h-9 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center hover:bg-slate-50 text-slate-700"><Plus size={18}/></button>
            <button className="w-9 h-9 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center hover:bg-slate-50 text-slate-700"><Minus size={18}/></button>
        </div>
      </div>

      <div className="flex justify-end mt-6">
         <button 
           onClick={onNext}
           className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-md flex items-center gap-2 uppercase tracking-wide"
         >
           Tasdiqlash
           <Check size={16} />
         </button>
      </div>
    </div>
  );
};

export default LocationStep;