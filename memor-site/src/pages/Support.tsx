
import React from 'react';
import { Ornament } from '../components/Ornament';

const Support: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <Ornament type="flourish" className="mb-6 opacity-60" />
      <h2 className="font-display text-4xl mb-6 text-graphite">Loyihani Qo'llab-Quvvatlash</h2>
      <p className="font-serif text-xl italic text-graphite/70 mb-12">
        "Me'mor" mustaqil platforma bo'lib, siz kabi san'at ixlosmandlari ko'magida yashaydi.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
         {/* Tier 1 */}
         <div className="border border-graphite/20 p-6 hover:border-teal transition-colors group cursor-pointer bg-white">
            <h3 className="font-display text-xl mb-2 text-sepia-dark">Shogird</h3>
            <div className="text-3xl font-bold text-graphite mb-4">50,000 so'm</div>
            <p className="text-sm font-serif text-graphite/60 mb-4">
              Oylik obuna. Eksklyuziv maqolalar va yopiq darslarga kirish imkoniyati.
            </p>
            <button className="w-full py-2 bg-graphite/5 group-hover:bg-teal group-hover:text-white transition-colors text-xs uppercase tracking-widest">
              Tanlash
            </button>
         </div>

         {/* Tier 2 */}
         <div className="border border-teal p-6 relative transform scale-105 shadow-xl bg-parchment">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal text-white text-[10px] uppercase px-3 py-1 tracking-widest">
               Tavsiya etiladi
            </div>
            <h3 className="font-display text-2xl mb-2 text-teal">Usta</h3>
            <div className="text-4xl font-bold text-graphite mb-4">150,000 so'm</div>
            <p className="text-sm font-serif text-graphite/60 mb-4">
              Portfolio yaratish, shaxsiy brending va ustozlar bilan to'g'ridan-to'g'ri aloqa.
            </p>
            <button className="w-full py-2 bg-teal text-white transition-colors text-xs uppercase tracking-widest">
              Tanlash
            </button>
         </div>

         {/* Tier 3 */}
         <div className="border border-graphite/20 p-6 hover:border-sepia transition-colors group cursor-pointer bg-white">
            <h3 className="font-display text-xl mb-2 text-sepia-dark">Homiylik</h3>
            <div className="text-3xl font-bold text-graphite mb-4">Erkin</div>
            <p className="text-sm font-serif text-graphite/60 mb-4">
              Loyihani rivojlantirish uchun ixtiyoriy xayriya. Tarixga hissa qo'shing.
            </p>
            <button className="w-full py-2 bg-graphite/5 group-hover:bg-sepia group-hover:text-white transition-colors text-xs uppercase tracking-widest">
              Yuborish
            </button>
         </div>
      </div>

      <p className="text-xs font-mono text-graphite/40 max-w-lg mx-auto">
        Barcha to'lovlar xavfsiz himoyalangan. Tushgan mablag'lar qadimiy obidalarni raqamlashtirish va yosh me'morlarni o'qitishga yo'naltiriladi.
      </p>
    </div>
  );
};

export default Support;
