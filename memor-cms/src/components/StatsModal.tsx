import React from 'react';
import { X, TrendingUp, Users, Eye, BookOpen, Clock, Activity, Calendar } from 'lucide-react';

interface StatsModalProps {
  onClose: () => void;
  type: 'visitors' | 'views' | 'content' | 'admins';
}

const StatsModal: React.FC<StatsModalProps> = ({ onClose, type }) => {
  
  const renderContent = () => {
      switch(type) {
          case 'admins':
              return (
                  <div className="space-y-8 animate-fadeIn">
                       <h3 className="font-cinzel text-xl text-[#2c1810] border-b border-[#a68a64] pb-2">Adminlar Faoliyati (Hisobot)</h3>
                       
                       {/* Otabek Stats */}
                       <div className="bg-[#e3d5b8]/30 p-4 rounded border border-[#a68a64]">
                           <div className="flex items-center gap-4 mb-4">
                               <div className="w-12 h-12 rounded-full bg-[#1e3a8a] text-[#f0e6d2] flex items-center justify-center font-bold text-xl border-2 border-[#d4af37]">O</div>
                               <div>
                                   <h4 className="font-cinzel font-bold text-lg text-[#2c1810]">Otabek</h4>
                                   <span className="text-xs text-[#5c4033] uppercase">Boshqaruvchi • Online</span>
                               </div>
                           </div>
                           <div className="grid grid-cols-3 gap-4 text-center">
                               <div className="bg-[#f0e6d2] p-2 rounded">
                                   <span className="block text-xs text-[#a68a64]">Ish vaqti (Haftalik)</span>
                                   <span className="font-cinzel font-bold text-[#2c1810]">24 soat 20 daqiqa</span>
                               </div>
                               <div className="bg-[#f0e6d2] p-2 rounded">
                                   <span className="block text-xs text-[#a68a64]">Postlar (Haftalik)</span>
                                   <span className="font-cinzel font-bold text-[#2c1810]">12 ta</span>
                               </div>
                               <div className="bg-[#f0e6d2] p-2 rounded">
                                   <span className="block text-xs text-[#a68a64]">Tahrirlar</span>
                                   <span className="font-cinzel font-bold text-[#2c1810]">45 ta</span>
                               </div>
                           </div>
                       </div>

                       {/* Aminaxon Stats */}
                       <div className="bg-[#e3d5b8]/30 p-4 rounded border border-[#a68a64]">
                           <div className="flex items-center gap-4 mb-4">
                               <div className="w-12 h-12 rounded-full bg-[#740001] text-[#f0e6d2] flex items-center justify-center font-bold text-xl border-2 border-[#d4af37]">A</div>
                               <div>
                                   <h4 className="font-cinzel font-bold text-lg text-[#2c1810]">Aminaxon</h4>
                                   <span className="text-xs text-[#5c4033] uppercase">Muharrir • Online</span>
                               </div>
                           </div>
                           <div className="grid grid-cols-3 gap-4 text-center">
                               <div className="bg-[#f0e6d2] p-2 rounded">
                                   <span className="block text-xs text-[#a68a64]">Ish vaqti (Haftalik)</span>
                                   <span className="font-cinzel font-bold text-[#2c1810]">18 soat 45 daqiqa</span>
                               </div>
                               <div className="bg-[#f0e6d2] p-2 rounded">
                                   <span className="block text-xs text-[#a68a64]">Postlar (Haftalik)</span>
                                   <span className="font-cinzel font-bold text-[#2c1810]">8 ta</span>
                               </div>
                               <div className="bg-[#f0e6d2] p-2 rounded">
                                   <span className="block text-xs text-[#a68a64]">Tahrirlar</span>
                                   <span className="font-cinzel font-bold text-[#2c1810]">22 ta</span>
                               </div>
                           </div>
                       </div>
                  </div>
              );
          case 'visitors':
              return (
                  <div className="space-y-6 animate-fadeIn">
                      <div className="p-6 border border-[#a68a64] rounded bg-[#e3d5b8]/50 text-center">
                           <Activity size={48} className="mx-auto text-[#740001] mb-4"/>
                           <h3 className="font-cinzel text-4xl text-[#2c1810] mb-2">142</h3>
                           <p className="text-[#5c4033] font-serif">Ayni damda saytda bo'lgan sehrgarlar</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-[#f0e6d2] rounded border border-[#a68a64]">
                              <span className="text-xs text-[#5c4033] uppercase block">Mobil Qurilmalar</span>
                              <span className="font-bold text-xl text-[#2c1810]">85%</span>
                          </div>
                          <div className="p-4 bg-[#f0e6d2] rounded border border-[#a68a64]">
                              <span className="text-xs text-[#5c4033] uppercase block">Kompyuter</span>
                              <span className="font-bold text-xl text-[#2c1810]">15%</span>
                          </div>
                      </div>
                  </div>
              );
          case 'content':
              return (
                  <div className="space-y-4 animate-fadeIn">
                      <h3 className="font-cinzel text-xl text-[#2c1810] border-b border-[#a68a64] pb-2">Kutubxona Hisoboti</h3>
                      <div className="grid grid-cols-2 gap-4">
                           <div className="p-4 bg-[#1e3a8a]/10 border border-[#1e3a8a] rounded text-center">
                               <BookOpen className="mx-auto text-[#1e3a8a] mb-2"/>
                               <span className="block font-bold text-2xl text-[#1e3a8a]">156</span>
                               <span className="text-xs">Maqolalar</span>
                           </div>
                           <div className="p-4 bg-[#740001]/10 border border-[#740001] rounded text-center">
                               <Clock className="mx-auto text-[#740001] mb-2"/>
                               <span className="block font-bold text-2xl text-[#740001]">36</span>
                               <span className="text-xs">Kitoblar</span>
                           </div>
                      </div>
                  </div>
              )
          default: 
              return (
                  <div className="text-center py-10">
                      <Eye size={48} className="mx-auto text-[#d4af37] mb-4"/>
                      <p>Umumiy statistika yuklanmoqda...</p>
                  </div>
              )
      }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#1a110e]/90 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#f0e6d2] rounded-lg shadow-2xl border-4 border-[#5c4033] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#2c1810] p-4 flex justify-between items-center border-b-4 border-[#d4af37]">
          <h2 className="font-cinzel text-xl text-[#d4af37] flex items-center gap-2 uppercase tracking-widest">
            {type === 'admins' ? 'Adminlar Xonasi' : type === 'visitors' ? 'Tashriflar Oqimi' : 'Kutubxona Holati'}
          </h2>
          <button onClick={onClose} className="text-[#a68a64] hover:text-[#f0e6d2] transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]">
           {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default StatsModal;