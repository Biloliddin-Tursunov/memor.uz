
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../../constants';
import { useStore } from '../../store/useStore';
import { Ornament } from '../Ornament';
import { Language } from '../../types';

export const ProjectDetail: React.FC<{ language: Language }> = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, fetchProjects, isLoading } = useStore();
  const project = projects.find(p => p.id === id);

  React.useEffect(() => {
    if (projects.length === 0) {
      fetchProjects();
    }
  }, [projects.length, fetchProjects]);

  if (isLoading && !project) return <div className="p-20 text-center"><div className="animate-pulse font-display text-2xl opacity-50">Yuklanmoqda...</div></div>;
  if (!project) return <div className="p-20 text-center">{TRANSLATIONS[language].notFound}</div>;

  return (
    <div className="w-full animate-in fade-in duration-700 bg-parchment dark:bg-[#020617]">
      {/* Back Button Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-graphite/40 hover:text-teal transition-all"
        >
          <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> {TRANSLATIONS[language].back}
        </button>
      </div>

      {/* Compact Cover Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative h-[45vh] min-h-[300px] overflow-hidden rounded-sm shadow-2xl border border-graphite/5">
          <img src={project.imageUrl} className="w-full h-full object-cover" alt={project.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-0.5 bg-teal text-white text-[9px] font-bold uppercase tracking-widest">{project.status}</span>
                <span className="text-white/60 font-mono text-[10px] tracking-widest uppercase">{project.location}</span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl text-white leading-none tracking-tight">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-display text-2xl dark:text-white uppercase tracking-wide">{TRANSLATIONS[language].description}</h2>
            <div className="h-px flex-grow bg-graphite/10 dark:bg-white/10"></div>
          </div>

          <div className="prose prose-lg dark:prose-invert font-serif text-graphite/80 dark:text-slate-300 max-w-none">
            <p className="leading-relaxed mb-8 text-xl italic text-sepia">
              {project.description}
            </p>
            <p className="leading-relaxed mb-10">
              {language === 'uz' ? "Ushbu loyiha Me'mor jamoasining uzoq yillik izlanishlari mahsulidir. Biz har bir detalda tarixiy haqiqiylikni saqlab qolgan holda, zamonaviy hayot talablariga javob beradigan muhandislik yechimlarini qo'lladik. Bu nafaqat bino, balki madaniy merosning davomidir." :
                language === 'ru' ? "Этот проект — результат многолетних исследований команды Me'mor. Мы применили инженерные решения, отвечающие требованиям современной жизни, сохранив историческую достоверность в каждой детали. Это не просто здание, а продолжение культурного наследия." :
                  language === 'tr' ? "Bu proje, Me'mor ekibinin uzun yıllara dayanan araştırmalarının bir ürünüdür. Her detayda tarihi özgünlüğü koruyarak, modern yaşamın gereksinimlerini karşılayan mühendislik çözümleri uyguladık. Bu sadece bir bina değil, kültürel mirasın bir devamıdır." :
                    "This project is the product of many years of research by the Me'mor team. We applied engineering solutions that meet the requirements of modern life, while preserving historical authenticity in every detail. This is not just a building, but a continuation of cultural heritage."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
              <div className="aspect-[4/3] bg-graphite/5 dark:bg-white/5 border border-graphite/10 dark:border-white/10 flex flex-col items-center justify-center p-6 text-center">
                <Ornament type="arch" className="w-12 h-12 mb-4 opacity-20" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-graphite/40">[ {TRANSLATIONS[language].technicalDrawing} A-01 ]</span>
              </div>
              <div className="aspect-[4/3] bg-graphite/5 dark:bg-white/5 border border-graphite/10 dark:border-white/10 flex flex-col items-center justify-center p-6 text-center">
                <Ornament type="tile-header" className="w-16 h-8 mb-4 opacity-20" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-graphite/40">[ {TRANSLATIONS[language].materialTexture} ]</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-8 bg-white dark:bg-white/5 p-8 border border-graphite/5 shadow-sm">
            <div className="border-l-2 border-sepia pl-6">
              <h3 className="font-display text-lg mb-4 dark:text-white uppercase tracking-widest">{TRANSLATIONS[language].specifications}</h3>
              <ul className="space-y-4 text-[11px] font-mono text-graphite/50 dark:text-white/40 uppercase tracking-[0.2em]">
                <li className="flex justify-between"><span>{TRANSLATIONS[language].start}</span> <span className="text-graphite dark:text-white">2024</span></li>
                <li className="flex justify-between"><span>{TRANSLATIONS[language].type}</span> <span className="text-graphite dark:text-white">{language === 'uz' ? 'Restavratsiya' : (language === 'ru' ? 'Реставрация' : (language === 'tr' ? 'Restorasyon' : 'Restoration'))}</span></li>
                <li className="flex justify-between"><span>{TRANSLATIONS[language].scale}</span> <span className="text-graphite dark:text-white">1,200 m²</span></li>
                <li className="flex justify-between"><span>{TRANSLATIONS[language].team}</span> <span className="text-graphite dark:text-white">12 {TRANSLATIONS[language].experts}</span></li>
              </ul>
            </div>

            <button className="w-full py-4 bg-graphite dark:bg-white dark:text-black text-white font-display text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-teal transition-all">
              {TRANSLATIONS[language].downloadFiles}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
