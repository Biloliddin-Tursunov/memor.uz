
import React from 'react';
import { DisplayItem, PageRoute } from '../types';
import { Ornament } from './Ornament';

interface ItemDetailProps {
    item: DisplayItem;
    onBack: () => void;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item, onBack }) => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Navigation Back */}
            <button
                onClick={onBack}
                className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal hover:text-sepia transition-colors"
            >
                &larr; Ortga qaytish
            </button>

            {/* Header Section */}
            <div className="text-center mb-8">
                {item.type && (
                    <span className="inline-block px-3 py-1 mb-4 border border-teal/30 text-teal text-[10px] md:text-xs font-bold uppercase tracking-widest bg-teal/5">
                        {item.type}
                    </span>
                )}
                <h1 className="font-display text-3xl md:text-5xl text-graphite mb-4 leading-tight">
                    {item.title}
                </h1>
                {item.subtitle && (
                    <p className="font-serif italic text-graphite/60 text-lg">
                        {item.subtitle}
                    </p>
                )}
            </div>

            {/* Main Image */}
            {item.imageUrl && (
                <div className="w-full h-[40vh] md:h-[60vh] mb-12 relative overflow-hidden rounded-sm shadow-sm border border-graphite/10 dark:border-white/10">
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Content Area */}
            <div className="max-w-2xl mx-auto">
                <Ornament type="divider" className="mb-8" />

                <div className="prose prose-lg prose-headings:font-display prose-p:font-serif prose-p:text-graphite/80 dark:prose-invert dark:text-gray-300">
                    <p className="text-xl leading-relaxed first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:text-sepia first-letter:font-display">
                        {item.description}
                    </p>

                    {/* Mock Long Content Generation if content is missing */}
                    <p>
                        Ushbu loyiha an'anaviy me'morchilik an'analarini zamonaviy texnologiyalar bilan uyg'unlashtirishga qaratilgan.
                        Bizning asosiy maqsadimiz — tarixiy obidalarning asl qiyofasini saqlab qolgan holda, ularga yangi hayot bag'ishlashdir.
                    </p>
                    <p>
                        Loyihaning har bir bosqichida mutaxassislarimiz arxiv hujjatlari, qadimiy chizmalar va ustozlarning maslahatlariga tayanadilar.
                        Bu esa, o'z navbatida, ishning sifati va tarixiy haqiqatga mosligini ta'minlaydi.
                    </p>

                    <h3 className="text-2xl mt-8 mb-4 font-display text-teal">Asosiy Xususiyatlar</h3>
                    <ul className="list-disc pl-5 space-y-2 marker:text-sepia">
                        <li>Tarixiy aniqlik va ilmiy yondashuv.</li>
                        <li>Tabiiy va mahalliy qurilish materiallaridan foydalanish.</li>
                        <li>Ustoz-shogird an'analarini davom ettirish.</li>
                        <li>Zamonaviy konstruktiv yechimlar.</li>
                    </ul>

                    <blockquote className="border-l-4 border-sepia pl-4 italic my-8 text-graphite/70 bg-graphite/5 p-4 rounded-r">
                        "Me'morchilik — bu toshlarda qotgan musiqa."
                    </blockquote>

                    <p>
                        Kelajakda ushbu yo'nalishda yanada ko'proq izlanishlar olib borish va xalqaro hamkorlikni kengaytirish rejalashtirilgan.
                    </p>
                </div>

                <div className="mt-12 pt-8 border-t border-graphite/10 flex justify-between items-center text-xs font-mono text-graphite/50">
                    <span>ID: {item.id}</span>
                    <span>{item.date || '2025'}</span>
                </div>
            </div>

        </div>
    );
};

export default ItemDetail;
