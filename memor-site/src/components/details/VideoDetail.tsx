import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { TRANSLATIONS } from '../../constants';
import { useStore } from '../../store/useStore';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Language } from '../../types';
import { getLocalizedContent, getYoutubeID } from '../../lib/content';
import SEO from '../SEO';

export const VideoDetail: React.FC<{ language: Language }> = ({ language }) => {
  // Endi id emas, URL'dan videoning slugini (tozalangan sarlavhasini) olamiz
  const { slug } = useParams();
  const navigate = useNavigate();
  const { videos, fetchVideos, videosLoading } = useStore();

  // Videoni slug bo'yicha qidiramiz.
  const video = videos.find(v => v.slug === slug || v.id === slug);

  const t = TRANSLATIONS[language];

  React.useEffect(() => {
    if (videos.length === 0) {
      fetchVideos();
    }
  }, [videos.length, fetchVideos]);

  if (videosLoading && !video) return <div className="p-20 text-center"><div className="animate-pulse font-display text-2xl opacity-50">Yuklanmoqda...</div></div>;
  if (!video) return <div className="p-20 text-center">{t.notFound}</div>;

  const { title, description } = getLocalizedContent(video, language);
  const youtubeId = getYoutubeID(video.videoUrl || '');
  const isGood = 'Hammasi Good'
  console.log(isGood);
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <SEO
        title={title}
        description={language === 'uz' ? `${video.author} tomonidan mahorat darsi.` :
          language === 'ru' ? `Мастер-класс от ${video.author}.` :
            language === 'tr' ? `${video.author} tarafından ustalık sınıfı.` :
              `Masterclass by ${video.author}.`}
        image={video.thumbnailUrl}
        type="video.other"
        lang={language}
      />

      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-graphite/40 hover:text-teal transition-all group"
      >
        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> {t.back}
      </button>

      <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl mb-12">
        {youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <img src={video.thumbnailUrl} className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="flex-grow">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-teal text-[10px] font-bold uppercase tracking-widest">{video.type}</span>
            {video.duration && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-teal/5 border border-teal/10 rounded-full">
                <Clock className="w-3 h-3 text-teal" />
                <span className="text-[10px] font-bold text-teal/80 uppercase tracking-wider">{video.duration}</span>
              </div>
            )}
          </div>

          <h1 className="font-display text-3xl md:text-5xl dark:text-white mb-6 leading-tight">{title}</h1>
          <div className="mb-6">
            <LanguageSwitcher currentLang={language} variant="list" className="bg-black/5 dark:bg-white/5 backdrop-blur-sm p-1 rounded-md inline-block" />
          </div>
          <div
            className="font-serif text-lg text-graphite/70 dark:text-slate-300 leading-relaxed max-w-2xl"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        <div className="w-full md:w-64 flex-shrink-0 pt-4">
          <div className="border-t border-graphite/10 pt-6">
            <span className="text-[10px] font-bold uppercase text-graphite/30 tracking-widest block mb-4">
              {t.author}
            </span>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-sepia/20 border border-sepia/30 flex items-center justify-center text-sepia font-display">M</div>
              <div>
                <p className="font-bold dark:text-white text-sm">{video.author}</p>
                <p className="text-[10px] text-graphite/40 uppercase">Me'mor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};