
import React from 'react';
import { Ornament } from '../components/Ornament';

const Contact: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-12">

        {/* Contact Info */}
        <div className="w-full md:w-1/3 space-y-8 border-r border-graphite/10 pr-8">
          <div>
            <h2 className="font-display text-3xl mb-4 text-graphite">Aloqa Uchun</h2>
            <div className="w-12 h-px bg-teal mb-6"></div>
            <p className="font-serif italic text-graphite/70 mb-6">
              Takliflar, hamkorlik yoki shunchaki bir piyola choy ustida suhbat uchun.
            </p>
          </div>

          <div className="space-y-4 font-serif">
            <div>
              <span className="block text-xs uppercase tracking-widest text-teal mb-1">Manzil</span>
              <p>Samarqand shahri, Lolazor ko'chasi, 70-uy</p>
              <p className="text-sm text-graphite/60">Samarqand Davlat Arxitektura-Qurilish Universiteti, Yangi Campus 5-qavat 525-xona</p>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-widest text-teal mb-1">Xat yo'llash</span>
              <p>biloliddin@memor.uz</p>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-widest text-teal mb-1">Bog'lanish</span>
              <p>+998 (88) 209-99-79</p>
            </div>
          </div>

          <div className="pt-8">
            <Ornament type="corner" className="w-6 h-6" />
          </div>
        </div>

        {/* Form */}
        <div className="w-full md:w-2/3">
          <div className="bg-white p-8 border border-graphite/10 shadow-sm relative">
            <Ornament type="corner" className="absolute top-2 right-2 w-4 h-4 rotate-90 opacity-40" />

            <h3 className="font-display text-2xl mb-6">Maktub Yozish</h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-graphite/60">Ism Sharif</label>
                  <input type="text" className="w-full bg-parchment border-b border-graphite/20 p-2 focus:border-teal focus:outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-graphite/60">Aloqa Raqami</label>
                  <input type="tel" className="w-full bg-parchment border-b border-graphite/20 p-2 focus:border-teal focus:outline-none transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-graphite/60">Mavzu</label>
                <select className="w-full bg-parchment border-b border-graphite/20 p-2 focus:border-teal focus:outline-none transition-colors font-serif">
                  <option>Hamkorlik masalasida</option>
                  <option>Texnik yordam</option>
                  <option>Maqola yuborish</option>
                  <option>Boshqa</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-graphite/60">Maktub Mazmuni</label>
                <textarea rows={5} className="w-full bg-parchment border border-graphite/20 p-3 focus:border-teal focus:outline-none transition-colors font-serif resize-none"></textarea>
              </div>

              <div className="text-right">
                <button type="button" className="px-8 py-3 bg-graphite text-white font-display uppercase tracking-widest hover:bg-teal transition-colors">
                  Yuborish
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
