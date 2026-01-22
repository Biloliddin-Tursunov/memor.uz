import React from 'react';
import { Mic, ArrowRight } from 'lucide-react';

interface Props {
    onSelectBot: () => void;
    onSelectManual: () => void;
}

const IntroStep: React.FC<Props> = ({ onSelectBot, onSelectManual }) => (
  <div className="flex flex-col h-full px-4 py-8 md:p-12 relative items-center justify-center">
    
    {/* Top Mode Selection */}
    <div className="flex justify-center gap-6 md:gap-12 w-full max-w-lg mb-8 md:mb-16">
        {/* Chat Bot Option */}
        <div className="flex flex-col items-center gap-2 group cursor-pointer w-1/2" onClick={onSelectBot}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-600">chat bot</span>
            <button className="w-full border border-slate-200 bg-white text-slate-800 font-bold py-3 md:py-4 rounded-xl text-base md:text-lg hover:border-slate-900 hover:shadow-md transition-all flex items-center justify-center gap-2">
                al-Me'mor 👽
            </button>
        </div>

        {/* Expert Option */}
        <div className="flex flex-col items-center gap-2 group cursor-pointer w-1/2" onClick={onSelectManual}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-600">o'zim bilaman</span>
            <button className="w-full border border-slate-200 bg-slate-50 text-slate-800 font-bold py-3 md:py-4 rounded-xl text-base md:text-lg hover:bg-white hover:border-slate-900 hover:shadow-md transition-all flex items-center justify-center gap-2">
                Maxsus 🤓
            </button>
        </div>
    </div>

    {/* Center Content */}
    <div className="text-center w-full max-w-2xl mb-12 md:mb-20">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6 md:mb-8 leading-tight">
            Loyihalashdan avval <br className="hidden md:block"/> dildan suhbat
        </h2>
        
        <button 
          onClick={onSelectBot}
          className="inline-block border border-slate-300 text-slate-600 px-8 py-3 rounded-full text-sm font-medium hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
        >
          Bir nechta savol so'rashimiz mumkinmi?
        </button>
    </div>

    {/* Bottom Input Area */}
    <div className="w-full max-w-xl relative mt-auto md:mt-0">
        <div className="relative flex items-center group">
            <input 
              type="text" 
              placeholder="Birga quramiz..." 
              className="w-full bg-transparent border-b-2 border-slate-300 px-2 py-4 text-lg text-slate-800 focus:outline-none focus:border-slate-900 transition-colors placeholder-slate-400 font-serif"
            />
            <div className="absolute right-0 top-0 bottom-0 flex items-center gap-4">
                <Mic size={24} className="text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                <button onClick={onSelectManual} className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors">
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    </div>
  </div>
);

export default IntroStep;