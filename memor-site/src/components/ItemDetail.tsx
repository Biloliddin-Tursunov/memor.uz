
import React from 'react';
import { useParams } from 'react-router-dom';
import { DisplayItem, Language } from '../types';
import { Ornament } from './Ornament';
import { getLocalizedContent } from '../lib/content';
import { LanguageSwitcher } from './LanguageSwitcher';

interface ItemDetailProps {
    item: DisplayItem;
    onBack: () => void;
}

// --- 1. ARTICLE VIEW (Default) ---
const ArticleView: React.FC<ItemDetailProps> = ({ item, onBack }) => {
    const { lang } = useParams<{ lang: string }>();
    const currentLang = (lang || 'uz') as Language;
    const { title, description } = getLocalizedContent(item, currentLang);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button onClick={onBack} className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal hover:text-sepia transition-colors">
                &larr; Ortga
            </button>

            <div className="text-center mb-8">
                <span className="inline-block px-3 py-1 mb-4 border border-teal/30 text-teal text-[10px] md:text-xs font-bold uppercase tracking-widest bg-teal/5">
                    {item.type || 'Maqola'}
                </span>
                <h1 className="font-display text-3xl md:text-5xl text-graphite mb-4 leading-tight">{title}</h1>
                <div className="flex justify-center mb-6">
                    <LanguageSwitcher currentLang={currentLang} />
                </div>
                <div className="flex justify-center items-center gap-4 text-xs font-mono text-graphite/50">
                    {item.subtitle && <span>Muallif: {item.subtitle}</span>}
                    {item.date && <span>• {item.date}</span>}
                </div>
            </div>
            {item.imageUrl && (
                <div className="w-full h-[40vh] md:h-[60vh] mb-12 relative overflow-hidden rounded-sm shadow-sm border border-graphite/10 dark:border-white/10">
                    <img src={item.imageUrl} alt={title} className="w-full h-full object-cover" />
                </div>
            )}
            <div className="max-w-2xl mx-auto">
                <Ornament type="divider" className="mb-8" />
                <div className="prose prose-lg prose-headings:font-display prose-p:font-serif prose-p:text-graphite/80 dark:prose-invert dark:text-gray-300">
                    <p className="text-xl leading-relaxed first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:text-sepia first-letter:font-display">
                        {description}
                    </p>
                    <p>
                        Ushbu maqola orqali biz tarixiy merosimizning naqadar boy ekanligiga yana bir bor amin bo'lamiz.
                        Mutaxassislarning fikriga ko'ra, har bir detal o'zida chuqur falsafiy ma'no tashiydi.
                    </p>
                    <blockquote className="border-l-4 border-sepia pl-4 italic my-8 text-graphite/70 bg-graphite/5 p-4 rounded-r">
                        "Tarix — bu kelajakning poydevori."
                    </blockquote>
                    <p>Mavzu yuzasidan qo'shimcha izlanishlar davom etmoqda.</p>
                </div>
            </div>
        </div>
    );
};

// --- 2. VIDEO VIEW ---
const VideoView: React.FC<ItemDetailProps> = ({ item, onBack }) => {
    const { lang } = useParams<{ lang: string }>();
    const currentLang = (lang || 'uz') as Language;
    const { title, description } = getLocalizedContent(item, currentLang);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 animate-in fade-in zoom-in duration-500">
            <button onClick={onBack} className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors bg-black/50 w-fit px-3 py-1 rounded-full">
                &larr; Videolarga qaytish
            </button>


            {/* Video Player Placeholder */}
            <div className="relative w-full aspect-video bg-black shadow-2xl rounded-lg overflow-hidden border border-graphite/20 dark:border-white/10 mb-8 group">
                <img src={item.imageUrl} alt={title} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                    </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <h1 className="text-white font-display text-2xl md:text-4xl mb-2">{title}</h1>
                    <div className="mb-4">
                        <LanguageSwitcher currentLang={currentLang} className="bg-black/20 backdrop-blur-sm p-1 rounded-md inline-block" />
                    </div>
                    <p className="text-white/70 font-mono text-sm">{item.subtitle} • {description?.slice(0, 50)}...</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <h3 className="font-display text-2xl mb-4 text-graphite dark:text-white">Video Haqida</h3>
                    <p className="font-serif text-graphite/80 dark:text-gray-300 leading-relaxed mb-6">
                        {description} Ushbu video darslikda siz qadimiy uslublar va zamonaviy texnologiyalar uyg'unligini ko'rishingiz mumkin.
                        Har bir detalga alohida e'tibor qaratilgan.
                    </p>
                    <div className="flex gap-4">
                        <button className="px-6 py-2 border border-graphite/20 dark:border-white/20 font-bold uppercase text-xs tracking-widest hover:bg-graphite/5 dark:hover:bg-white/5 transition-colors">Saqlash</button>
                    </div>
                </div>
                <div className="bg-graphite/5 dark:bg-white/5 p-6 rounded-lg h-fit">
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-4 text-graphite/50 dark:text-gray-400">Muallif</h4>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-sepia rounded-full flex items-center justify-center text-white font-display">M</div>
                        <div>
                            <p className="font-bold text-graphite dark:text-white">{item.subtitle || 'Me\'mor Jamoasi'}</p>
                            <p className="text-xs text-graphite/50 dark:text-gray-500">Ekspert</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 3. BOOK VIEW ---
const BookView: React.FC<ItemDetailProps> = ({ item, onBack }) => {
    const { lang } = useParams<{ lang: string }>();
    const currentLang = (lang || 'uz') as Language;
    const { title, description } = getLocalizedContent(item, currentLang);

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-right-4 duration-500">
            <button onClick={onBack} className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-graphite/60 hover:text-teal transition-colors">
                &larr; Kutubxonaga qaytish
            </button>


            <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Book Details */}
                <div className="w-full md:w-1/3 flex justify-center sticky top-24">
                    <div className="relative w-64 md:w-full aspect-[2/3] shadow-2xl rounded-r-lg border-l-4 border-graphite/20 dark:border-white/10 overflow-hidden">
                        <img src={item.imageUrl} alt={title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent pointer-events-none"></div>
                    </div>
                </div>

                <div className="w-full md:w-2/3">
                    <span className="text-sepia font-bold uppercase tracking-widest text-xs mb-2 block">Nodir Kitoblar To'plami</span>
                    <h1 className="font-display text-4xl md:text-6xl text-graphite dark:text-white mb-4">{title}</h1>
                    <div className="mb-6">
                        <LanguageSwitcher currentLang={currentLang} />
                    </div>
                    <p className="font-serif italic text-xl text-graphite/60 dark:text-gray-400 mb-8">{item.subtitle} (Nashr: {item.date})</p>

                    <div className="prose prose-lg dark:prose-invert mb-8">
                        <p className="lead">{description}</p>
                        <p>
                            Ushbu kitob me'morchilik tarixi, nazariyasi va amaliyoti bo'yicha fundamental bilimlar manbai hisoblanadi.
                            Kitobda keltirilgan chizmalar va ma'lumotlar bugungi kunda ham o'z ahamiyatini yo'qotmagan.
                        </p>
                        <h4 className="font-display text-teal">Mundarija:</h4>
                        <ul className="list-disc pl-5 marker:text-sepia space-y-1 font-serif text-sm">
                            <li>Kirish: O'rta asrlar me'morchiligi</li>
                            <li>Gumbazlar va ularning turlari</li>
                            <li>Naqshlar geometriyasi</li>
                            <li>Xulosa va ilovalar</li>
                        </ul>
                    </div>

                    <div className="flex gap-4 border-t border-graphite/10 dark:border-white/10 pt-6">
                        <button className="flex-1 py-3 bg-graphite text-white font-display uppercase tracking-widest hover:bg-teal transition-colors">
                            O'qish (PDF)
                        </button>
                        <button className="flex-1 py-3 border border-graphite text-graphite dark:text-white dark:border-white font-display uppercase tracking-widest hover:bg-graphite hover:text-white dark:hover:bg-white dark:hover:text-graphite transition-colors">
                            Sotib Olish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 4. CREATOR (USTA) VIEW ---
const CreatorView: React.FC<ItemDetailProps> = ({ item, onBack }) => {
    const { lang } = useParams<{ lang: string }>();
    const currentLang = (lang || 'uz') as Language;
    const { title, description } = getLocalizedContent(item, currentLang);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-700">
            <button onClick={onBack} className="mb-12 mx-auto block text-xs font-bold uppercase tracking-widest text-graphite/40 hover:text-graphite transition-colors">
                &uarr; Ustalar Ro'yxatiga Qaytish
            </button>


            <div className="text-center relative mb-16">
                <div className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-parchment shadow-xl relative z-10">
                    <img src={item.imageUrl} alt={title} className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-1/2 left-0 w-full h-px bg-graphite/10 dark:bg-white/10 -z-0"></div>

                <h1 className="font-display text-4xl md:text-5xl mt-6 mb-2 text-graphite dark:text-white">{title}</h1>
                <div className="flex justify-center mb-4">
                    <LanguageSwitcher currentLang={currentLang} />
                </div>
                <span className="inline-block px-4 py-1 bg-sepia text-white text-xs font-bold uppercase tracking-widest rounded-full">
                    {item.subtitle}
                </span>
            </div>

            <div className="bg-white dark:bg-white/5 p-8 md:p-12 border border-graphite/10 dark:border-white/10 shadow-sm text-center">
                <Ornament type="flourish" className="mb-6 opacity-50" />
                <p className="font-serif text-xl leading-relaxed text-graphite/80 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                    "{description}"
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-graphite/10 dark:border-white/10 pt-8">
                    <div>
                        <span className="block text-2xl font-display text-teal">20+</span>
                        <span className="text-[10px] uppercase tracking-widest text-graphite/50">Yillik Tajriba</span>
                    </div>
                    <div>
                        <span className="block text-2xl font-display text-teal">15</span>
                        <span className="text-[10px] uppercase tracking-widest text-graphite/50">Yirik Loyihalar</span>
                    </div>
                    <div>
                        <span className="block text-2xl font-display text-teal">50+</span>
                        <span className="text-[10px] uppercase tracking-widest text-graphite/50">Shogirdlar</span>
                    </div>
                    <div>
                        <span className="block text-2xl font-display text-teal">∞</span>
                        <span className="text-[10px] uppercase tracking-widest text-graphite/50">Ilhom</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center">
                <button className="text-teal font-bold uppercase tracking-widest border-b border-teal hover:text-sepia hover:border-sepia transition-colors pb-1">
                    Portfolio va Bog'lanish
                </button>
            </div>
        </div>
    );
};

// --- 5. EVENT VIEW ---
const EventView: React.FC<ItemDetailProps> = ({ item, onBack }) => {
    const { lang } = useParams<{ lang: string }>();
    const currentLang = (lang || 'uz') as Language;
    const { title, description } = getLocalizedContent(item, currentLang);

    return (
        <div className="max-w-3xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-8 duration-500">
            <button onClick={onBack} className="mb-8 text-xs font-bold uppercase tracking-widest text-graphite/50 hover:text-graphite transition-colors">
                &larr; Tadbirlar
            </button>


            <div className="bg-parchment dark:bg-[#1a1a1a] border-2 border-dashed border-sepia p-8 md:p-12 relative shadow-2xl">
                {/* Ticket Cutouts */}
                <div className="absolute -left-3 top-1/2 w-6 h-6 bg-parchment dark:bg-[#1E1E1E] rounded-full transform -translate-y-1/2"></div>
                <div className="absolute -right-3 top-1/2 w-6 h-6 bg-parchment dark:bg-[#1E1E1E] rounded-full transform -translate-y-1/2"></div>

                <div className="text-center mb-8">
                    <span className="text-sepia font-display text-6xl block mb-2">{item.subtitle?.split('|')[0].trim().split(' ')[0]}</span>
                    <span className="text-graphite/50 uppercase tracking-[0.3em] text-sm block">{item.subtitle?.split('|')[0].trim().split(' ').slice(1).join(' ')}</span>
                </div>

                <div className="border-y border-graphite/10 dark:border-white/10 py-8 text-center space-y-4">
                    <h1 className="font-display text-3xl md:text-5xl text-graphite dark:text-white leading-tight uppercase">{title}</h1>
                    <div className="flex justify-center mb-4">
                        <LanguageSwitcher currentLang={currentLang} />
                    </div>
                    <div className="flex justify-center items-center gap-2 text-teal font-mono uppercase tracking-widest text-xs">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {item.subtitle?.split('|')[1] || 'Lokatsiya aniqlanmoqda'}
                    </div>
                </div>

                <div className="py-8 font-serif text-center text-graphite/80 dark:text-gray-300">
                    <p>{description}</p>
                    <p className="mt-4 text-sm opacity-70">
                        Ishtirok etish uchun ro'yxatdan o'tish talab etiladi. Joylar soni cheklangan.
                    </p>
                </div>

                <div className="text-center">
                    <button className="px-10 py-3 bg-teal text-white font-display uppercase tracking-widest text-lg hover:bg-teal-dark shadow-lg hover:shadow-teal/20 transition-all transform hover:-translate-y-1">
                        Ro'yxatdan O'tish
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- 6. PROJECT & CREATION VIEW (Visual Heavy) ---
const ProjectView: React.FC<ItemDetailProps> = ({ item, onBack }) => {
    const { lang } = useParams<{ lang: string }>();
    const currentLang = (lang || 'uz') as Language;
    const { title, description } = getLocalizedContent(item, currentLang);

    return (
        <div className="w-full animate-in fade-in duration-700">
            <div className="relative h-[60vh] md:h-[80vh]">
                <img src={item.imageUrl} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90"></div>

                <button
                    onClick={onBack}
                    className="absolute top-8 left-8 text-white/80 hover:text-white border border-white/20 px-4 py-2 uppercase text-xs tracking-widest backdrop-blur-md"
                >
                    &larr; Ortga
                </button>



                <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3">
                    <span className="bg-sepia text-white px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                        {item.type} {item.date ? `• ${item.date}` : ''}
                    </span>
                    <h1 className="font-display text-5xl md:text-7xl text-white mb-6 leading-none">{title}</h1>
                    <div className="mb-6">
                        <LanguageSwitcher currentLang={currentLang} className="bg-black/20 backdrop-blur-sm p-1 rounded-md inline-block" />
                    </div>
                    <p className="font-serif text-xl text-white/80 leading-relaxed border-l-2 border-white/30 pl-6">
                        {description}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 prose prose-lg dark:prose-invert">
                    <h3 className="font-display text-3xl mb-6">Loyiha Tafsilotlari</h3>
                    <p>
                        Ushbu loyiha ustida ishlash jarayoni {item.date || 'bir necha oy'} davom etdi.
                        Asosiy e'tibor tarixiy aniqlik va badiiy yechimning uyg'unligiga qaratildi.
                        Materiallar tanlovi, ranglar gammasi va kompozitsiya — barchasi chuqur o'rganish natijasidir.
                    </p>
                    <div className="grid grid-cols-2 gap-4 my-8">
                        <div className="bg-graphite/5 dark:bg-white/5 p-4 h-32 flex items-center justify-center text-center italic text-sm">Qoralama eskizlar</div>
                        <div className="bg-graphite/5 dark:bg-white/5 p-4 h-32 flex items-center justify-center text-center italic text-sm">3D Modellar</div>
                    </div>
                </div>
                <div className="space-y-8">
                    <div className="border border-graphite/10 dark:border-white/10 p-6">
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-4 text-teal">Ma'lumotlar</h4>
                        <ul className="space-y-3 text-sm font-mono text-graphite/70 dark:text-gray-400">
                            <li className="flex justify-between border-b border-graphite/10 pb-2">
                                <span>Status:</span> <span>{item.subtitle?.split('|')[0] || 'Yakunlangan'}</span>
                            </li>
                            <li className="flex justify-between border-b border-graphite/10 pb-2">
                                <span>Lokatsiya:</span> <span>{item.subtitle?.split('|')[1] || 'Toshkent'}</span>
                            </li>
                            <li className="flex justify-between border-b border-graphite/10 pb-2">
                                <span>Yil:</span> <span>2024-2025</span>
                            </li>
                        </ul>
                    </div>
                    {item.type !== 'Loyiha' && (
                        <button className="w-full py-4 bg-graphite text-white font-display uppercase tracking-widest hover:bg-teal transition-colors">
                            Yuklab Olish / Buyurtma
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- MAIN DISPATCHER ---
const ItemDetail: React.FC<ItemDetailProps> = (props) => {
    const { item } = props;
    const type = item.type?.toLowerCase();

    // Route to specific views based on type
    if (type?.includes('video')) return <VideoView {...props} />;
    if (type?.includes('kitob') || type === 'book') return <BookView {...props} />;
    if (type?.includes('usta') || type === 'creator') return <CreatorView {...props} />;
    if (type?.includes('tadbir') || type === 'event') return <EventView {...props} />;
    if (type?.includes('loyiha') || type === 'project' || type === 'vector' || type === 'artwork' || type === 'concept') return <ProjectView {...props} />;

    // Default to Article View
    return <ArticleView {...props} />;
};

export default ItemDetail;
