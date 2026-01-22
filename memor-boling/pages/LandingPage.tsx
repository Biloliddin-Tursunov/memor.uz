import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Home, Building2 } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col justify-center items-center overflow-y-auto">
      <div className="text-center mb-8 md:mb-12 fade-in px-4">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-3">
          Orzuyingizni loyihalashtiring
        </h2>
        <p className="text-base md:text-lg text-slate-500 max-w-xl mx-auto font-light">
          Sun'iy intellekt va professional vositalar yordamida mukammal makon yarating.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Card 1: Home - Monochrome Active Style */}
        <div 
          onClick={() => navigate('/wizard')}
          className="group relative bg-white rounded-xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-900 transition-all cursor-pointer flex flex-col items-center text-center h-[320px] md:h-[360px] justify-between"
        >
          <div className="mt-6 p-5 rounded-full bg-slate-50 border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
            <Home size={40} strokeWidth={1.5} />
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">BUILD MY HOME</h3>
            <p className="text-slate-500 text-sm">Shaxsiy uy loyihasi va dizayni</p>
          </div>

          <button className="w-full py-3 rounded-lg border border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all flex items-center justify-center gap-2">
            Boshlash <ArrowRight size={14} />
          </button>
        </div>

        {/* Card 2: Company - Monochrome Disabled Style */}
        <div className="relative bg-slate-50 rounded-xl p-6 md:p-8 border border-slate-200 flex flex-col items-center text-center h-[320px] md:h-[360px] justify-between opacity-70 grayscale">
          <div className="absolute top-4 right-4 bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1 rounded tracking-wide uppercase">
            Tez Kunda
          </div>
          
          <div className="mt-6 p-5 rounded-full bg-slate-200 text-slate-500">
            <Building2 size={40} strokeWidth={1.5} />
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-slate-700 mb-2">BUILD MY COMPANY</h3>
            <p className="text-slate-400 text-sm">Ofis va tijorat binolari</p>
          </div>

          <button className="w-full py-3 rounded-lg border border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-400 cursor-not-allowed">
            Boshlash
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;