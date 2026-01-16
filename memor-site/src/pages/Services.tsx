import React from 'react';
import { Ornament } from '../components/Ornament';

const Services: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      
      <div className="text-center mb-16">
        <Ornament type="flourish" />
        <h2 className="font-display text-4xl mt-6 mb-2">Imkoniyatlar va Xizmatlar</h2>
        <div className="w-24 h-px bg-teal mx-auto"></div>
      </div>

      <div className="space-y-20">
        {/* Service 1 */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 order-2 md:order-1">
             <h3 className="font-display text-3xl mb-4 text-teal">Karera va Portfolio</h3>
             <p className="font-serif text-lg leading-relaxed text-graphite/80 mb-6">
               Har bir usta va me'mor o'zining shaxsiy "sahifa"siga ega bo'ladi. 
               Bu yerda sizning ishlaringiz xuddi muzey eksponatlari kabi namoyish etiladi.
               Buyurtmachilar sizni reyting va sharhlar orqali emas, ishingizning "ruhi" orqali topadilar.
             </p>
             <button className="text-sm font-bold uppercase tracking-widest border-b border-graphite hover:border-teal hover:text-teal transition-colors pb-1">
               Batafsil ma'lumot
             </button>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
             <div className="relative w-64 h-64 rounded-full border border-dashed border-graphite/30 flex items-center justify-center p-4">
                 <div className="text-center">
                    <span className="block text-6xl mb-2">✦</span>
                    <span className="font-display italic">Shaxsiy Brend</span>
                 </div>
             </div>
          </div>
        </div>

        <Ornament />

        {/* Service 2 */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
           <div className="w-full md:w-1/2 flex justify-center">
             <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Abstract graphic representation */}
                <svg className="w-full h-full text-sepia opacity-60" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                    <rect x="20" y="40" width="20" height="40" />
                    <rect x="45" y="30" width="20" height="50" />
                    <rect x="70" y="50" width="20" height="30" />
                    <path d="M10 90H90" />
                </svg>
             </div>
          </div>
          <div className="w-full md:w-1/2">
             <h3 className="font-display text-3xl mb-4 text-teal">Qurilish Bozori</h3>
             <p className="font-serif text-lg leading-relaxed text-graphite/80 mb-6">
               O'rtakashlarsiz bozor. Siz materialni to'g'ridan-to'g'ri ishlab chiqaruvchidan yoki 
               qadimiy uslubdagi g'ishtlarni qo'lda quyuvchi ustadan olishingiz mumkin.
               Aniq narx, halol savdo.
             </p>
             <button className="text-sm font-bold uppercase tracking-widest border-b border-graphite hover:border-teal hover:text-teal transition-colors pb-1">
               Bozorni ko'rish
             </button>
          </div>
        </div>

        <Ornament />

        {/* Service 3 */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 order-2 md:order-1">
             <h3 className="font-display text-3xl mb-4 text-teal">Ilm va Sertifikat</h3>
             <p className="font-serif text-lg leading-relaxed text-graphite/80 mb-6">
               "Ustoz-shogird" an'anasi raqamli formatda. Video darslar emas, balki amaliy topshiriqlar.
               Kursni tugatgach, qog'oz sertifikat emas, balki "Oq Fotiha" (Raqamli Tavsiyanoma) olasiz.
             </p>
             <button className="text-sm font-bold uppercase tracking-widest border-b border-graphite hover:border-teal hover:text-teal transition-colors pb-1">
               Maktabga kirish
             </button>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
             <div className="w-48 h-56 border-l-2 border-graphite/20 pl-4 flex flex-col justify-center">
                 <h4 className="font-display text-xl mb-2">Diplom</h4>
                 <div className="h-px w-12 bg-graphite mb-2"></div>
                 <p className="text-xs italic text-graphite/50">Mulla To'ychi Tashmuhamedov nomidagi me'morchilik maktabi</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Services;
