import React, { useState } from 'react';
import { BookOpen, Compass, PenTool, Bird, Sparkles, Search, Eye, Activity, Video, Library, Users, Mail } from 'lucide-react';
import { MagicCard } from '../components/Cards';
import StatsModal from '../components/StatsModal';
import { Section, TeamMember } from '../types';
import { useStatistics } from '../hooks/useStatistics';

interface DashboardProps {
    currentUser: TeamMember | null;
    navigateTo: (section: Section) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser, navigateTo }) => {
    const [statType, setStatType] = useState<'visitors' | 'views' | 'content' | 'admins' | null>(null);
    const { stats, loading } = useStatistics();

    return (
        <div className="max-w-5xl mx-auto pt-36 px-6 animate-fadeIn pb-20">
            <header className="text-center mb-10 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sepia opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
                <h1 className="relative z-10 font-cinzel text-4xl md:text-5xl text-sepia mb-3 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] leading-tight px-4">
                    Xush Kelibsiz, {currentUser?.name}
                </h1>
                <p className="font-serif text-lg text-sepia/80 italic mb-8">
                    "Bugun qaysi olamni kashf qilamiz?"
                </p>

                {/* Magical Search Bar */}
                <div className="max-w-md mx-auto relative group">
                    <input
                        type="text"
                        placeholder="Sirlarni va sahifalarni izlash..."
                        className="w-full bg-transparent border-b-2 border-[#5c4033] py-2 pl-10 pr-4 font-cinzel text-[#f0e6d2] placeholder-[#5c4033] focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                    <Search className="absolute left-0 top-2 text-[#5c4033] group-hover:text-[#d4af37] transition-colors" size={20} />
                </div>
            </header>

            {/* Main Navigation Cards - Updated grid for mobile */}
            <div className={`grid grid-cols-2 ${currentUser?.role === 'admin' ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-6 max-w-6xl mx-auto mb-20`}>
                <MagicCard
                    title="Ilmiy bo'lim"
                    subtitle="Kutubxona"
                    icon={<BookOpen size={28} />}
                    colorClass="bg-[#1e3a8a]"
                    onClick={() => navigateTo('ilm')}
                />
                <MagicCard
                    title="Harakat"
                    subtitle="Ekspeditsiyalar"
                    icon={<Compass size={28} />}
                    colorClass="bg-[#740001]"
                    onClick={() => navigateTo('harakat')}
                />
                <MagicCard
                    title="Ijod"
                    subtitle="Galereya"
                    icon={<PenTool size={28} />}
                    colorClass="bg-[#14532d]"
                    onClick={() => navigateTo('ijod')}
                />
                {currentUser?.role === 'admin' ? (
                    <>
                        <MagicCard
                            title="Xabarlar"
                            subtitle={`${stats.messagesCount} ta yangi`}
                            icon={<Mail size={28} />}
                            colorClass="bg-[#d97706]"
                            onClick={() => navigateTo('messages')}
                        />
                        <MagicCard
                            title="Jamoa"
                            subtitle="A'zolar"
                            icon={<Users size={28} />}
                            colorClass="bg-[#f59e0b]"
                            onClick={() => navigateTo('team')}
                        />
                    </>
                ) : (
                    <MagicCard
                        title="Rejalar"
                        subtitle="Taqdir Lavhasi"
                        icon={<Bird size={28} />}
                        colorClass="bg-[#6b7280]"
                        onClick={() => navigateTo('settings')}
                    />
                )}
            </div>

            {/* Statistics Footer (Clickable) */}
            <div className="border-t border-sepia/30 pt-10">
                <h3 className="text-center font-cinzel text-sepia tracking-[0.3em] uppercase text-sm mb-8 flex items-center justify-center gap-4">
                    <span className="h-px w-12 bg-sepia/30"></span>
                    Statistika & Holat
                    <span className="h-px w-12 bg-[#5c4033]/30"></span>
                </h3>

                <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10"
                >
                    <div onClick={() => setStatType('visitors')} className="text-center group cursor-pointer hover:scale-105 transition-transform">
                        <div className="flex justify-center mb-2 text-[#5c4033] group-hover:text-[#d4af37] transition-colors"><Activity size={24} /></div>
                        <div className="font-cinzel text-2xl text-[#f0e6d2]">{loading ? '...' : stats.visitorsOnline}</div>
                        <div className="text-xs text-[#a68a64] uppercase tracking-wider">Ayni damda saytda</div>
                    </div>
                    <div onClick={() => setStatType('views')} className="text-center group cursor-pointer hover:scale-105 transition-transform">
                        <div className="flex justify-center mb-2 text-[#5c4033] group-hover:text-[#d4af37] transition-colors"><Eye size={24} /></div>
                        <div className="font-cinzel text-2xl text-[#f0e6d2]">{loading ? '...' : stats.viewsCount.toLocaleString()}</div>
                        <div className="text-xs text-[#a68a64] uppercase tracking-wider">Jami Ko'rishlar</div>
                    </div>
                    <div onClick={() => setStatType('content')} className="text-center group cursor-pointer hover:scale-105 transition-transform">
                        <div className="flex justify-center mb-2 text-[#5c4033] group-hover:text-[#d4af37] transition-colors"><Library size={24} /></div>
                        <div className="font-cinzel text-2xl text-[#f0e6d2]">{loading ? '...' : (stats.articlesCount + stats.booksCount)}</div>
                        <div className="text-xs text-[#a68a64] uppercase tracking-wider">Maqola va Kitoblar</div>
                    </div>
                    <div onClick={() => setStatType('content')} className="text-center group cursor-pointer hover:scale-105 transition-transform">
                        <div className="flex justify-center mb-2 text-[#5c4033] group-hover:text-[#d4af37] transition-colors"><Video size={24} /></div>
                        <div className="font-cinzel text-2xl text-[#f0e6d2]">{loading ? '...' : stats.videosCount}</div>
                        <div className="text-xs text-[#a68a64] uppercase tracking-wider">Videodarslar</div>
                    </div>
                </div>

                {/* Online Admins */}
                <div
                    onClick={() => setStatType('admins')}
                    className="bg-[#2c1810]/30 rounded-lg p-4 border border-[#5c4033]/30 flex flex-col md:flex-row items-center justify-between gap-4 cursor-pointer hover:bg-[#2c1810]/50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Users size={20} className="text-[#d4af37]" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        </div>
                        <span className="font-serif text-[#a68a64] italic">Hozir onlayn adminlar:</span>
                    </div>
                    <div className="flex gap-4 font-cinzel text-sm text-[#f0e6d2]">
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            Otabek
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            Aminaxon
                        </span>
                    </div>
                </div>
            </div>
            {statType && <StatsModal type={statType} onClose={() => setStatType(null)} />}
        </div>
    );
};

export default Dashboard;
