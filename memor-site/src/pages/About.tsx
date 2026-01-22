
import React from 'react';
import { Ornament } from '../components/Ornament';
import TeamSection from '../components/TeamSection';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl mb-4 text-graphite">Tahririyat Tarixi</h2>
        <Ornament type="divider" className="w-48 mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-2">
        <div>
          <p className="font-serif text-lg leading-relaxed text-justify first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:text-sepia dark:text-gray-300">
            "Me'mor" loyihasi 2024-yilda Samarqand Davlat Arxitektura va Qurilish Universiteti talabalari orasida tug'ilgan. Bizning maqsadimiz — shunchaki bino qurish emas, balki me'morchiligimizni "registondan ozod qilish" — ya'ni tarix bilan kelajak o'rtasida ko'prik bunyod etishdir.
          </p>
          <p className="font-serif text-lg leading-relaxed text-justify mt-4 dark:text-gray-300">
            Biz an'anaviy ustoz-shogird maktabini raqamli davrga moslashtirish, unutilib borayotgan hunarmandchilik sirlarini qayta tiklash va yosh me'morlarga o'zligini anglashda yordam berishni niyat qildik.
          </p>
        </div>
        <div className="relative p-4 border border-graphite/20 dark:border-white/20 rotate-1 bg-white dark:bg-white/5 shadow-lg">
          <img
            src="/family.jpg"
            alt="Team working"
            className="w-full h-80 object-cover"
          />
          <div className="text-center mt-2 font-mono text-xs uppercase tracking-widest text-graphite/60 dark:text-gray-400">
            Ilk jamoa yig'ilishi, 2024
          </div>
        </div>
      </div>

      {/* Team Section Component */}
      <TeamSection />

      <div className="bg-graphite/5 dark:bg-white/5 p-8 md:p-12 border-y border-double border-graphite/20 dark:border-white/20 text-center">
        <Ornament type="flourish" className="mb-4" />
        <h3 className="font-display text-2xl mb-4">Bizning Qadriyatlarimiz</h3>
        <ul className="space-y-4 font-serif italic text-lg text-graphite/80 dark:text-gray-300">
          <li>"Toshlar so'zlaganda, tarix uyg'onadi."</li>
          <li>"Har bir chiziqda ma'no, har bir g'ishtda hikmat."</li>
          <li>"Ilm — harakat — ijod."</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
