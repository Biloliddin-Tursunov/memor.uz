import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../../constants';
import { useStore } from '../../store/useStore';
import { Ornament } from '../Ornament';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Language, GalleryImage as GalleryImageType } from '../../types';
import { getLocalizedContent } from '../../lib/content';
import SEO from '../SEO';

// MarqueeRow: Mobil versiyada rasmlar to'liq ko'rinadigan galereya
const MarqueeRow: React.FC<{
  items: GalleryImageType[];
  direction: 'left' | 'right';
  onImageClick: (url: string) => void
}> = ({ items, direction, onImageClick }) => {
  if (!items || items.length === 0) return null;

  const duplicatedItems = [...items, ...items, ...items, ...items];
  const animationClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div className="flex overflow-hidden w-full group py-2 select-none">
      <div className={`flex w-max gap-4 md:gap-6 pr-4 md:pr-6 ${animationClass} group-hover:[animation-play-state:paused]`}>
        {duplicatedItems.map((img, idx) => (
          <div
            key={idx}
            className="h-40 md:h-56 w-auto max-w-[85vw] md:max-w-none bg-graphite/5 dark:bg-white/5 rounded-sm p-1 border border-graphite/5 dark:border-white/5 cursor-pointer hover:shadow-md transition-all duration-500 shrink-0"
            onClick={() => onImageClick(img.url)}
          >
            <img
              src={img.url}
              alt={`Jarayon rasmi ${idx}`}
              // object-contain rasmni qirqmasdan to'liq ko'rsatadi
              className="h-full w-full object-contain grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const CreationDetail: React.FC<{ language: Language }> = ({ language }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { creations, fetchCreations, creationsLoading } = useStore();

  const creation = creations.find(c => c.slug === slug || c.id === slug || c.slug === decodeURIComponent(slug || ''));
  const t = TRANSLATIONS[language];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (creations.length === 0) {
      fetchCreations();
    }
  }, [creations.length, fetchCreations]);

  const closeModal = () => setSelectedImage(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (selectedImage) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  if (creationsLoading && !creation) {
    return (
      <div className="p-20 text-center min-h-screen flex items-center justify-center">
        <div className="animate-pulse font-display text-2xl opacity-50 text-teal uppercase tracking-widest">Yuklanmoqda...</div>
      </div>
    );
  }

  if (!creation) {
    return <div className="p-20 text-center font-display text-2xl opacity-50">{t.notFound || 'Topilmadi'}</div>;
  }

  const { title, description } = getLocalizedContent(creation, language);
  const leftGallery = creation.gallery_images?.filter(img => img.direction === 'left') || [];
  const rightGallery = creation.gallery_images?.filter(img => img.direction === 'right') || [];

  return (
    // Yonma-yon turishi uchun max-w-7xl gacha kengaytirildi
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SEO
        title={title}
        description={description?.replace(/<[^>]*>?/gm, '').substring(0, 150) || ''}
        image={creation.imageUrl}
        lang={language}
      />

      {/* Yuqori Panel: Orqaga va Til o'zgartirish */}
      <div className="flex justify-between items-center mb-12">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-graphite/40 hover:text-teal transition-all"
        >
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> {t.back || 'ORTGA'}
        </button>
        <LanguageSwitcher currentLang={language} variant="list" />
      </div>

      {/* Asosiy Qism: Rasm va Ma'lumotlar yonma-yon (Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-24">

        {/* Chap tomon: Asosiy rasm (To'liq hajm, qirqilmagan, lekin max-h bilan cheklangan) */}
        <div className="lg:col-span-7 xl:col-span-7 bg-graphite/5 dark:bg-white/5 border border-graphite/5 dark:border-white/5 rounded-sm p-4 md:p-8 flex items-center justify-center relative">
          {/* Orqa fon bezagi */}
          <div className="absolute inset-0 bg-teal/5 blur-3xl rounded-[3rem] -z-10" />

          <img
            src={creation.imageUrl}
            alt={title}
            // object-contain: rasmni kesmaydi, bor holatida ramkaga kiritadi. max-h-[70vh] o'ta yiriklashib ketishdan saqlaydi.
            className="w-full h-auto max-h-[60vh] lg:max-h-[700px] object-contain drop-shadow-md transition-all duration-700"
          />
        </div>

        {/* O'ng tomon: Ma'lumotlar */}
        <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-12 flex flex-col">

          <header className="mb-8">
            <span className="text-teal text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">
              {creation.type}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-4xl xl:text-5xl text-graphite dark:text-white leading-tight mb-6">
              {title}
            </h1>
            <div className="flex items-center gap-4 text-[10px] font-mono text-graphite/40 uppercase tracking-widest border-t border-graphite/5 pt-4">
              <span>{creation.author}</span>
              {/* Sana qo'shmoqchi bo'lsangiz, shu yerga qo'shiladi */}
            </div>
          </header>

          <article className="prose prose-md md:prose-lg font-serif text-graphite/80 dark:text-slate-300 editorial-drop-cap max-w-none mb-10">
            {description ? (
              <div dangerouslySetInnerHTML={{ __html: description }} />
            ) : (
              <div className="italic opacity-50">{language === 'uz' ? 'Tafsilotlar kiritilmagan.' : (language === 'ru' ? 'Детали не указаны.' : (language === 'tr' ? 'Detaylar belirtilmemiş.' : 'Details not provided.'))}</div>
            )}
          </article>

          {/* Yuklab olish tugmasi */}
          {creation.downloadUrl && (
            <div className="mt-auto">
              <a
                href={creation.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-graphite/20 dark:border-white/20 text-graphite dark:text-white rounded-sm font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-graphite hover:text-white dark:hover:bg-white dark:hover:text-graphite transition-all duration-300 w-fit"
              >
                <span>{language === 'uz' ? 'FAYLNI YUKLASH' : (language === 'ru' ? 'СКАЧАТЬ ФАЙЛ' : (language === 'tr' ? 'DOSYAYI İNDİR' : 'DOWNLOAD FILE'))}</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Pastki Qism: Karusel (Jarayon) */}
      {(leftGallery.length > 0 || rightGallery.length > 0) && (
        <div className="pt-12 border-t border-graphite/10 dark:border-white/10">
          <h3 className="font-display italic text-2xl text-graphite/60 dark:text-white/60 mb-8 opacity-90 text-center md:text-left">
            {language === 'uz' ? 'Jarayon' : (language === 'ru' ? 'Процесс' : (language === 'tr' ? 'Süreç' : 'Process'))}
          </h3>
          <div className="flex flex-col gap-2 -mx-6 md:mx-0">
            {/* -mx-6 mobil versiyada lentani ekran chetiga taqab qo'yadi */}
            {leftGallery.length > 0 && <MarqueeRow items={leftGallery} direction="left" onImageClick={setSelectedImage} />}
            {rightGallery.length > 0 && <MarqueeRow items={rightGallery} direction="right" onImageClick={setSelectedImage} />}
          </div>
        </div>
      )}

      {/* Modal (Katta rasm) */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10 transition-opacity duration-300"
          onClick={closeModal}
        >
          <button
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            onClick={closeModal}
          >
            <span className="font-mono text-xs tracking-widest uppercase">Yopish &times;</span>
          </button>

          <img
            src={selectedImage}
            alt="Jarayon detali"
            className="w-auto h-auto max-w-full max-h-full object-contain rounded-sm shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="mt-24 pt-10 border-t border-graphite/10 text-center">
        <Ornament type="flourish" className="opacity-10 mb-4" />
        <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-graphite/20">ME'MOR ARCHIVE • 2026</p>
      </footer>

      {/* Global CSS for Editorial Drop Cap */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .editorial-drop-cap p:first-of-type::first-letter {
          float: left;
          font-family: var(--font-display, serif);
          font-size: 4rem; 
          line-height: 0.9;
          margin-right: 0.8rem;
          margin-top: 0.2rem;
          color: var(--color-sepia);
          font-weight: normal;
          font-style: italic;
        }
      `}} />
    </div>
  );
};