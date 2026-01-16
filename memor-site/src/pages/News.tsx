
import React from 'react';
import { Ornament } from '../components/Ornament';

const News: React.FC = () => {
  const newsItems = [
    {
      date: '12.12.2024',
      title: 'Samarqanddagi Qadimiy Madrasa Qayta Ta\'mirlandi',
      desc: '3 yillik izlanishlar natijasida Sherdor madrasasining asl ranglari tiklandi. Bu haqda madaniy meros agentligi xabar berdi.'
    },
    {
      date: '10.12.2024',
      title: 'Yangi "Me\'mor" Grantlari E\'lon Qilindi',
      desc: 'Yosh arxitektorlar uchun mo\'ljallangan ushbu grant dasturi milliy uslubdagi loyihalarni qo\'llab-quvvatlashga qaratilgan.'
    },
    {
      date: '05.12.2024',
      title: 'G\'isht Quyish San\'ati: Usta Boqiy Darslari',
      desc: 'Mashhur usta Boqiy o\'zining onlayn kurslarini platformamizda ishga tushirdi. Ro\'yxatdan o\'tish boshlandi.'
    },
    {
      date: '01.12.2024',
      title: 'Xalqaro Ko\'rgazmada O\'zbekiston Paviljoni',
      desc: 'Venetsiya biennalesida taqdim etilgan "Mahalla" loyihasi xalqaro ekspertlar tomonidan yuqori baholandi.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-12 border-b border-graphite/10 pb-4">
        <h2 className="font-display text-4xl text-graphite">So'nggi Xabarlar</h2>
        <span className="text-xs font-mono uppercase tracking-widest text-graphite/50">Arxiv: 2024-2025</span>
      </div>

      <div className="space-y-12">
         {newsItems.map((item, idx) => (
           <div key={idx} className="group flex flex-col md:flex-row gap-6 hover:bg-white hover:shadow-sm p-4 -mx-4 transition-all rounded-sm border border-transparent hover:border-graphite/5">
              <div className="md:w-32 flex-shrink-0 pt-2">
                 <span className="text-teal font-bold text-sm border-b border-teal/30 pb-1">{item.date}</span>
              </div>
              <div>
                 <h3 className="font-display text-2xl mb-2 group-hover:text-teal transition-colors cursor-pointer">{item.title}</h3>
                 <p className="font-serif text-graphite/70 leading-relaxed">{item.desc}</p>
                 <button className="text-xs uppercase tracking-widest text-sepia-dark mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Batafsil o'qish &rarr;
                 </button>
              </div>
           </div>
         ))}
      </div>
      
      <div className="mt-16 text-center">
         <Ornament type="divider" />
         <button className="mt-4 px-6 py-2 border border-graphite/20 hover:border-teal hover:text-teal transition-colors text-xs uppercase tracking-widest">
            Ko'proq yuklash
         </button>
      </div>
    </div>
  );
};

export default News;
