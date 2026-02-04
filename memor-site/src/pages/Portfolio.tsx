
import React from 'react';
import { useParams } from 'react-router-dom';
import { PORTFOLIO_ITEMS } from '../constants';
import { PortfolioItem, Language } from '../types';

const Portfolio: React.FC = () => {
  const { lang } = useParams<{ lang: Language }>();
  const currentLang = (lang && ['uz', 'en', 'ru', 'tr'].includes(lang)) ? lang : 'uz';

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="font-display text-5xl mb-4 text-graphite dark:text-white">
          {currentLang === 'uz' ? 'Usta Alisherning Ishlari' :
            currentLang === 'ru' ? 'Работы Мастера Алишера' :
              currentLang === 'tr' ? 'Usta Alişer\'in İşleri' :
                'Works of Master Alisher'}
        </h2>
        <p className="font-serif italic text-graphite/60 dark:text-gray-400 max-w-2xl mx-auto">
          {currentLang === 'uz' ? "Qurilish maydonidan olingan eskizlar va fotosuratlar jamlanmasi. Ramkasiz, samimiy va haqiqiy." :
            currentLang === 'ru' ? "Коллекция эскизов и фотографий со строительной площадки. Без рамок, искренне и правдиво." :
              currentLang === 'tr' ? "Şantiyeden alınan eskiz ve fotoğraf koleksiyonu. Çerçevesiz, samimi ve gerçek." :
                "A collection of sketches and photographs from the construction site. Frameless, sincere, and real."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-y-24">
        {PORTFOLIO_ITEMS.map((item, idx) => (
          <AlbumItem key={item.id} item={item} rotation={idx % 2 === 0 ? 'rotate-1' : '-rotate-1'} />
        ))}
        {/* Duplicate items to fill the grid for demo */}
        {PORTFOLIO_ITEMS.map((item, idx) => (
          <AlbumItem key={`${item.id}-copy`} item={item} rotation={idx % 2 === 0 ? '-rotate-2' : 'rotate-2'} />
        ))}
      </div>
    </div>
  );
};

const AlbumItem: React.FC<{ item: PortfolioItem; rotation: string }> = ({ item, rotation }) => {
  return (
    <div className={`relative group ${rotation} hover:rotate-0 transition-transform duration-500`}>
      {/* Photo Corners (CSS Simulation) */}
      <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-graphite/20 dark:border-white/20 z-10"></div>
      <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-graphite/20 dark:border-white/20 z-10"></div>
      <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-graphite/20 dark:border-white/20 z-10"></div>
      <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-graphite/20 dark:border-white/20 z-10"></div>

      {/* Image - No Border, Just Shadow on Hover */}
      <div className="bg-white p-2 shadow-sm group-hover:shadow-xl transition-shadow duration-300">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-64 object-cover contrast-[0.9]"
        />
      </div>

      {/* Handwritten Caption */}
      <div className="mt-4 text-center">
        <h3 className="font-display text-xl text-graphite">{item.title}</h3>
        <p className="font-serif text-sm italic text-graphite/60 dark:text-gray-400 mt-1">
          {item.year}, {item.architect}
        </p>
        <p className="text-xs text-teal/80 mt-2 font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          {item.type}
        </p>
      </div>
    </div>
  );
};

export default Portfolio;
