import React from 'react';
import { Edit2, Scroll, Sparkles } from 'lucide-react';
import { Article, Artwork } from '../types';

export const MagicCard: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onClick: () => void;
  colorClass?: string;
}> = ({ title, subtitle, icon, onClick, colorClass = "bg-[#2a1b0e]" }) => (
  <button
    onClick={onClick}
    className="relative group w-full text-left parchment-texture rounded-lg p-1 border-2 border-sepia overflow-hidden hover-float transition-all duration-500"
  >
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-50"></div>
    <div className="relative z-10 p-6 flex flex-col items-center text-center h-full justify-center gap-4 border border-sepia/30 m-1 rounded bg-parchment/80">
      <div className={`p-4 rounded-full text-parchment shadow-inner ${colorClass} group-hover:scale-110 transition-transform duration-500 border border-sepia`}>
        {icon}
      </div>
      <div>
        <h3 className="font-cinzel font-bold text-2xl text-[#2c1810] tracking-wide group-hover:text-[#740001] transition-colors">
          {title}
        </h3>
        <p className="font-serif italic text-[#5c4033] mt-1 text-lg">
          {subtitle}
        </p>
      </div>
    </div>
    {/* Magical Corner Ornaments */}
    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4af37] rounded-tl-lg m-2 opacity-50"></div>
    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#d4af37] rounded-tr-lg m-2 opacity-50"></div>
    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#d4af37] rounded-bl-lg m-2 opacity-50"></div>
    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4af37] rounded-br-lg m-2 opacity-50"></div>
  </button>
);

export const ScrollItem: React.FC<{
  title: string;
  meta: string;
  status?: string;
  onClick?: () => void
}> = ({ title, meta, status, onClick }) => (
  <div
    onClick={onClick}
    className="bg-[#e3d5b8] p-4 rounded border-b-2 border-[#d4af37]/30 hover:bg-[#d4af37]/20 cursor-pointer transition-colors flex items-center justify-between group shadow-sm"
  >
    <div className="flex items-center gap-4">
      <div className="text-[#740001] opacity-70 group-hover:opacity-100 transition-opacity">
        <Scroll size={20} />
      </div>
      <div>
        <h4 className="font-serif font-bold text-xl text-[#2c1810] leading-none mb-1">{title}</h4>
        <p className="text-sm italic text-[#5c4033]">{meta}</p>
      </div>
    </div>
    {status && (
      <span className={`text-xs font-cinzel font-bold px-2 py-1 rounded border ${status === 'published' ? 'border-green-800 text-green-900 bg-green-100/50' : 'border-gray-600 text-gray-800 bg-gray-100/50'}`}>
        {status === 'published' ? 'Nashr etilgan' : 'Qoralama'}
      </span>
    )}
    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[#740001]">
      <Edit2 size={18} />
    </div>
  </div>
);

export const ArtifactCard: React.FC<{ artwork: Artwork; onClick?: () => void }> = ({ artwork, onClick }) => (
  <div
    onClick={onClick}
    className="bg-[#1a110e] p-2 rounded border border-[#5c4033] shadow-lg group hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
  >
    <div className="relative overflow-hidden rounded border border-[#4a3b32]">
      <img src={artwork.image_url} alt={artwork.title_uz} className="w-full h-48 object-cover sepia-[.5] group-hover:sepia-0 transition-all duration-500 opacity-90 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
        <h3 className="text-[#d4af37] font-cinzel text-sm tracking-widest">{artwork.title_uz}</h3>
      </div>
      <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit2 size={14} />
      </div>
    </div>
    <div className="p-3 flex justify-between items-center">
      <span className="text-[#a68a64] text-xs uppercase tracking-wider">{artwork.type}</span>
      {artwork.price && <span className="text-[#d4af37] font-serif italic">{artwork.price}</span>}
    </div>
  </div>
);