
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findVideo } from '../../constants';
import { Language } from '../../types';

export const VideoDetail: React.FC<{ language: Language }> = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const video = findVideo(id || '');

  if (!video) return <div className="p-20 text-center">Video topilmadi.</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 text-[10px] font-bold uppercase tracking-widest text-graphite/40 hover:text-teal transition-all"
      >
        &larr; {language === 'uz' ? 'Videolarga Qaytish' : 'Back'}
      </button>

      <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl mb-12 group cursor-pointer">
        <img src={video.thumbnailUrl} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
            </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="flex-grow">
          <span className="text-teal text-[10px] font-bold uppercase tracking-widest mb-3 block">{video.type}</span>
          <h1 className="font-display text-3xl md:text-5xl dark:text-white mb-6 leading-tight">{video.title}</h1>
          <p className="font-serif text-lg text-graphite/70 dark:text-slate-300 leading-relaxed max-w-2xl">
            Ushbu darslikda {video.author} tomonidan an'anaviy hunarmandchilikning eng nozik jihatlari ko'rsatib beriladi. 
            Davomiyligi: {video.duration}.
          </p>
        </div>
        <div className="w-full md:w-64 flex-shrink-0 pt-4">
           <div className="border-t border-graphite/10 pt-6">
              <span className="text-[10px] font-bold uppercase text-graphite/30 tracking-widest block mb-4">Muallif</span>
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-sepia/20 border border-sepia/30 flex items-center justify-center text-sepia font-display">M</div>
                 <div>
                    <p className="font-bold dark:text-white text-sm">{video.author}</p>
                    <p className="text-[10px] text-graphite/40 uppercase">Ekspert</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
