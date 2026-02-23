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
  const { videos, fetchVideos, isLoading } = useStore();

  // Videoni slug bo'yicha qidiramiz.
  const video = videos.find(v => v.slug === slug || v.id === slug);

  const t = TRANSLATIONS[language];

  React.useEffect(() => {
    if (videos.length === 0) {
      fetchVideos();
    }
  }, [videos.length, fetchVideos]);

  if (isLoading && !video) return <div className="p-20 text-center"><div className="animate-pulse font-display text-2xl opacity-50">Yuklanmoqda...</div></div>;
  if (!video) return <div className="p-20 text-center">{t.notFound}</div>;

  const { title } = getLocalizedContent(video, language);
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
          <p className="font-serif text-lg text-graphite/70 dark:text-slate-300 leading-relaxed max-w-2xl">
            {language === 'uz' ? `Tabiatdagi har bir gul, o'simlik va boshqa elementlar asosida geometriya yotishi va ular o'zida naqshlarni jamlagani bizni hayratda qoldirdi. Ustozlar tomonidan berilgan har bir bilim bizni chuqur fikrlashga undadi; birgalikda jonli san’at muhiti va qadim naqshlar dunyosini kashf etdik. Amaliy mashg‘ulotlarda naqqoshlik sirlarini o‘rgandik va ulardan ilhom, sokinlik topdik. Bu imkoniyat bizga chin dildan shukr tuyg‘usini hamda sabr-bardoshlik sabog‘ini baxsh etdi.` :

              language === 'ru' ? `Геометрия, лежащая в основе каждого цветка, растения и других природных элементов, а также узоры, которые они в себе содержат, поразили нас. Каждое знание, переданное наставниками, побуждало нас к глубокому размышлению; вместе мы открыли живую атмосферу искусства и мир древних орнаментов. На практических занятиях мы изучили секреты орнаментального искусства и нашли в нём вдохновение и спокойствие. Эта возможность подарила нам искреннее чувство благодарности и урок терпения и стойкости.` :

                language === 'tr' ? `Doğadaki her çiçeğin, bitkinin ve diğer unsurların temelinde yatan geometri ve onların içinde barındırdığı desenler bizi hayran bıraktı. Hocalarımız tarafından verilen her bilgi bizi derin düşünmeye teşvik etti; birlikte canlı bir sanat ortamını ve kadim motifler dünyasını keşfettik. Uygulamalı derslerde nakış sanatının inceliklerini öğrendik ve onlardan ilham ile huzur bulduk. Bu fırsat bize içten bir şükür duygusu ve sabır dersi kazandırdı.` :

                  `The geometry underlying every flower, plant, and other natural elements, and the patterns they embody, left us in awe. Every piece of knowledge given by our teachers encouraged us to think deeply; together we discovered a living artistic environment and the world of ancient ornaments. During practical sessions, we learned the secrets of ornamental art and found inspiration and tranquility in them. This opportunity granted us a sincere sense of gratitude and a lesson in patience and perseverance.`}
          </p>
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