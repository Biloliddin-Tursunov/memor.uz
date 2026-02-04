import React, { useState } from 'react';
import { Sparkles, Wand2, Trash2, Compass, Scroll, User, Video, Library } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useContent } from '../hooks/useContent';
import { TabSwitcher } from '../components/TabSwitcher';
import Editor from '../components/Editor';
import { ScrollItem, ArtifactCard } from '../components/Cards';
import ContentPlanner from '../components/ContentPlanner';
import TeamMembers from '../components/TeamMembers';
import { Section, IlmTab, HarakatTab, TeamMember } from '../types';

interface ContentPageProps {
    view: Section;
    currentUser: TeamMember;
}

const ContentPage: React.FC<ContentPageProps> = ({ view, currentUser }) => {
    const {
        articles, books, creators, artifacts, events, missions, loading, refreshContent
    } = useContent(currentUser);

    const [ilmTab, setIlmTab] = useState<IlmTab>('articles');
    const [harakatTab, setHarakatTab] = useState<HarakatTab>('events');
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const getEditorCategory = () => {
        if (view === 'ilm') {
            if (ilmTab === 'articles') return 'article';
            if (ilmTab === 'books') return 'book';
            if (ilmTab === 'creators') return 'creator';
        }
        if (view === 'harakat') {
            if (harakatTab === 'events') return 'event';
            if (harakatTab === 'missions') return 'mission';
        }
        if (view === 'ijod') return 'art';
        return 'article';
    };

    const handleCreateNew = () => {
        setEditingItem(null);
        setIsEditorOpen(true);
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setIsEditorOpen(true);
    };

    const closeEditor = () => {
        setIsEditorOpen(false);
        setEditingItem(null);
    };

    const handleDelete = async (id: string, type: string) => {
        if (!confirm("Haqiqatan ham o'chirmoqchimisiz?")) return;

        let table = '';
        switch (type) {
            case 'article': table = 'articles'; break;
            case 'book': table = 'books'; break;
            case 'creator': table = 'creators'; break;
            case 'art': table = 'creations'; break;
            case 'event':
            case 'mission': table = 'events'; break;
        }

        if (table) {
            const { error } = await supabase.from(table).delete().eq('id', id);
            if (!error) refreshContent();
        }
    };

    const handleSaveItem = async (data: any, category: string) => {
        const isNew = !data.id;
        let table = '';

        const payload = {
            ...data,
            updated_by: currentUser?.id,
            ...(isNew ? { created_by: currentUser?.id } : {})
        };
        delete payload.id;
        // Remove status field as it doesn't exist in the database tables yet
        // @ts-ignore
        delete payload.status;

        switch (category) {
            case 'article': table = 'articles'; break;
            case 'book': table = 'books'; break;
            case 'creator': table = 'creators'; break;
            case 'art': table = 'creations'; break;
            case 'event':
            case 'mission': table = 'events'; break;
        }

        if (table) {
            let error;
            if (isNew) {
                ({ error } = await supabase.from(table).insert(payload));
            } else {
                ({ error } = await supabase.from(table).update(payload).eq('id', data.id));
            }

            if (!error) refreshContent();
        }

        setIsEditorOpen(false);
        setEditingItem(null);
    };

    if (loading && !isEditorOpen) return <div className="text-center pt-40 text-[#a68a64] font-cinzel">Yuklanmoqda...</div>;

    if (isEditorOpen) {
        return (
            <div className="pt-24 pb-10 px-4">
                <Editor
                    onBack={closeEditor}
                    category={getEditorCategory()}
                    initialData={editingItem}
                    onSave={handleSaveItem}
                />
            </div>
        );
    }

    if (view === 'settings') {
        return (
            <div className="max-w-5xl mx-auto pt-28 px-6 pb-20 animate-slideUp">
                <div className="mb-10 border-b-2 border-[#d4af37]/20 pb-4">
                    <h2 className="font-cinzel text-4xl text-[#f0e6d2] mb-2 flex items-center gap-3">
                        <Sparkles className="text-[#d4af37]" size={24} />
                        Taqdir Lavhasi
                    </h2>
                    <p className="text-[#a68a64] font-serif italic">Barcha ma'lumotlar sehrli kitobda saqlanadi.</p>
                </div>
                <ContentPlanner />
            </div>
        );
    }

    if (view === 'team') {
        return (
            <div className="max-w-5xl mx-auto pt-28 px-6 pb-20 animate-slideUp">
                <div className="mb-10 border-b-2 border-sepia/20 pb-4">
                    <h2 className="font-cinzel text-4xl text-parchment mb-2 flex items-center gap-3">
                        <Sparkles className="text-sepia" size={24} />
                        Jamoa A'zolari
                    </h2>
                    <p className="text-sepia/80 font-serif italic">Barcha ma'lumotlar sehrli kitobda saqlanadi.</p>
                </div>
                <TeamMembers />
            </div>
        );
    }

    let title = "";
    let content = null;
    let actionLabel = "Yaratish";

    switch (view) {
        case 'ilm':
            title = "Ilmiy bo'lim";
            actionLabel = ilmTab === 'articles' ? "Maqola Yozish" : ilmTab === 'books' ? "Kitob Qo'shish" : "Ijodkor Qo'shish";
            content = (
                <div className="space-y-4">
                    <TabSwitcher
                        current={ilmTab}
                        set={setIlmTab}
                        tabs={[
                            { key: 'articles', label: 'Maqolalar' },
                            { key: 'books', label: 'Kitoblar' },
                            { key: 'creators', label: 'Ijodkorlar' }
                        ]}
                    />

                    {ilmTab === 'articles' && (
                        <div className="animate-fadeIn space-y-4">
                            {articles.map(article => (
                                <div key={article.id} className="relative group">
                                    <ScrollItem
                                        title={article.title_uz}
                                        meta={`${article.author} • ${article.date}`}
                                        status={article.status}
                                        onClick={() => handleEdit(article)}
                                    />
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(article.id, 'article') }} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-red-800 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 rounded">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {ilmTab === 'books' && (
                        <div className="animate-fadeIn space-y-4">
                            {books.map(book => (
                                <div key={book.id} className="relative group">
                                    <ScrollItem
                                        title={book.title_uz}
                                        meta={`Muallif: ${book.author}`}
                                        status="published"
                                        onClick={() => handleEdit(book)}
                                    />
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(book.id, 'book') }} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-red-800 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 rounded">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {ilmTab === 'creators' && (
                        <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-4">
                            {creators.map(creator => (
                                <div key={creator.id} className="relative group">
                                    <div onClick={() => handleEdit(creator)} className="flex items-center gap-4 p-4 bg-[#e3d5b8] rounded border border-[#a68a64] cursor-pointer hover:border-[#d4af37]">
                                        <div className="w-12 h-12 bg-[#5c4033] rounded-full flex items-center justify-center text-[#f0e6d2] overflow-hidden">
                                            {creator.avatar_url ? <img src={creator.avatar_url} className="w-full h-full object-cover" /> : <User size={20} />}
                                        </div>
                                        <div>
                                            <h4 className="font-cinzel font-bold text-[#2c1810]">{creator.name}</h4>
                                            <p className="text-sm italic text-[#5c4033]">{creator.role_uz}</p>
                                        </div>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(creator.id, 'creator') }} className="absolute top-2 right-2 text-red-800 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
            break;
        case 'harakat':
            title = "Harakat";
            actionLabel = harakatTab === 'events' ? "Tadbir Qo'shish" : "Missiya Rejalash";
            content = (
                <div className="space-y-6">
                    <TabSwitcher
                        current={harakatTab}
                        set={setHarakatTab}
                        tabs={[
                            { key: 'events', label: 'Tadbirlar' },
                            { key: 'missions', label: 'Kelajak Missiyalari' }
                        ]}
                    />

                    {harakatTab === 'events' && events.map(q => (
                        <div key={q.id} className="relative group">
                            <div onClick={() => handleEdit(q)} className="animate-fadeIn relative bg-[#2a1b0e] border border-[#5c4033] p-6 rounded-lg hover:border-[#d4af37] transition-all cursor-pointer">
                                <div className="flex items-start gap-4">
                                    <div className="text-center min-w-[60px]">
                                        <span className="block text-2xl font-cinzel text-[#d4af37]">{q.date.split(' ')[0]}</span>
                                        <span className="text-xs uppercase text-[#a68a64]">{q.date.split(' ')[1] || ''}</span>
                                    </div>
                                    <div className="h-10 w-px bg-[#5c4033]"></div>
                                    <div>
                                        <h3 className="font-serif text-2xl text-[#f0e6d2]">{q.title_uz}</h3>
                                        <p className="text-[#a68a64] italic mt-1 flex items-center gap-2">
                                            <div className="w-4 h-4"><Compass size={16} /></div> {q.location_uz}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); handleDelete(q.id, 'event') }} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}

                    {harakatTab === 'missions' && missions.map(q => (
                        <div key={q.id} className="relative group">
                            <div onClick={() => handleEdit(q)} className="animate-fadeIn relative bg-[#14532d]/20 border border-[#14532d] p-6 rounded-lg hover:bg-[#14532d]/30 transition-all cursor-pointer">
                                <div className="absolute top-2 right-2 text-[#14532d] opacity-50"><Scroll size={20} /></div>
                                <h3 className="font-cinzel text-xl text-[#f0e6d2] mb-2">{q.title_uz}</h3>
                                <p className="text-[#a68a64] font-serif">Kutilayotgan sana: {q.date}</p>
                                <p className="text-[#a68a64] font-serif">Manzil: {q.location_uz}</p>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); handleDelete(q.id, 'mission') }} className="absolute bottom-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            );
            break;
        case 'ijod':
            title = "Ijod";
            actionLabel = "Asar Yaratish";
            content = (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {artifacts.map(art => (
                        <div key={art.id} className="relative group">
                            <ArtifactCard artwork={art} onClick={() => handleEdit(art)} />
                            <button onClick={(e) => { e.stopPropagation(); handleDelete(art.id, 'art') }} className="absolute top-2 left-2 bg-red-900/80 p-1.5 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            );
            break;
    }

    return (
        <div className="max-w-5xl mx-auto pt-28 px-6 pb-20 animate-slideUp">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b-2 border-sepia/20 pb-4 gap-4">
                <div>
                    <h2 className="font-cinzel text-4xl text-parchment mb-2 flex items-center gap-3">
                        <Sparkles className="text-sepia" size={24} />
                        {title}
                    </h2>
                    <p className="text-sepia/70 font-serif italic">Barcha ma'lumotlar sehrli kitobda saqlanadi.</p>
                </div>
                <button
                    onClick={handleCreateNew}
                    className="flex items-center gap-2 bg-sepia text-ink px-6 py-3 rounded font-cinzel font-bold hover:bg-sepia/80 transition-all hover:scale-105 shadow-[0_0_20px_rgba(176,137,104,0.3)] w-full md:w-auto justify-center"
                >
                    <Wand2 size={20} />
                    {actionLabel}
                </button>
            </div>
            {content}
        </div>
    );
};

export default ContentPage;
