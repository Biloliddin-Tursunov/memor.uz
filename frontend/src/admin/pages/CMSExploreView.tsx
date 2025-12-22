import React, { useState, useEffect } from 'react';
import { Plus, ArrowRight, Film, Book, User, Calendar, Palette, Pen } from 'lucide-react';
import { ContentPost, CMSDomain, MediaFile } from '../types';
import VideoStudioEditor from '../components/features/studio/VideoStudioEditor';
import BookStudioEditor from '../components/features/studio/BookStudioEditor';
import ArtistStudioEditor from '../components/features/studio/ArtistStudioEditor';
import EventStudioEditor from '../components/features/studio/EventStudioEditor';
import ArtworkStudioEditor from '../components/features/studio/ArtworkStudioEditor';
import ArticleStudioEditor from '../components/features/studio/ArticleStudioEditor';
import { useTheme } from '../contexts/ThemeContext';

interface CMSExploreViewProps {
   onSave: (post: ContentPost) => void;
   initialPost?: ContentPost | null;
   allPosts?: ContentPost[];
   mediaFiles: MediaFile[];
   onUploadMedia: (file: MediaFile) => void;
}

const PILLARS = [
  { id: 'KNOWLEDGE' as CMSDomain, title: 'Bilim', subtitle: 'Arxiv va tahliliy resurslar', items: [
      { id: 'ARTICLES', label: 'Maqolalar', icon: <Pen size={20} />, desc: 'Chukur tahliliy maqolalar yozish' },
      { id: 'VIDEOS', label: 'Videolar', icon: <Film size={20} />, desc: 'Hujjatli va qisqa materiallar' },
      { id: 'BOOKS', label: 'Kitoblar', icon: <Book size={20} />, desc: 'Arxiv nashrlar va PDF kitoblar' },
      { id: 'ARTISTS', label: 'Ijodkorlar', icon: <User size={20} />, desc: 'Shaxsiy portfoliolar' },
  ]},
  { id: 'MOVEMENT' as CMSDomain, title: 'Harakat', subtitle: 'Tadbirlar va loyihalar', items: [{ id: 'EVENTS', label: 'Tadbirlar', icon: <Calendar size={20} />, desc: 'Master-klass va uchrashuvlar' }]},
  { id: 'CREATION' as CMSDomain, title: 'Ijod', subtitle: 'Galereya va asarlar', items: [{ id: 'ARTWORKS', label: 'Asarlar', icon: <Palette size={20} />, desc: 'Raqamli va jismoniy ijod namunasi' }]}
];

const CMSExploreView: React.FC<CMSExploreViewProps> = ({ onSave, initialPost, allPosts = [], mediaFiles, onUploadMedia }) => {
  const { t } = useTheme();
  const [editingPost, setEditingPost] = useState<ContentPost | null>(null);
  useEffect(() => { if (initialPost) setEditingPost(initialPost); }, [initialPost]);
  const handleCreate = (domain: CMSDomain, category: string) => {
     setEditingPost({ id: Math.random().toString(36).substring(7), name: '', title: '', domain, category, status: 'Draft', deadline: new Date().toISOString().split('T')[0], assignees: [{ name: 'Biloliddin', avatar: 'Biloliddin' }], taskType: category, format: category === 'VIDEOS' ? 'Video' : category === 'BOOKS' ? 'Book' : category === 'ARTISTS' ? 'Artist' : category === 'EVENTS' ? 'Event' : category === 'ARTWORKS' ? 'Artwork' : 'Article', content: '', description: '', coverImage: '', tags: [], translations: { uz: { title: '', content: '' }, en: { title: '', content: '' } } });
  };
  if (editingPost) {
     if (editingPost.category === 'VIDEOS') return <VideoStudioEditor post={editingPost} onSave={onSave} onClose={() => setEditingPost(null)} mediaFiles={mediaFiles} onUploadMedia={onUploadMedia} />;
     if (editingPost.category === 'BOOKS') return <BookStudioEditor post={editingPost} onSave={onSave} onClose={() => setEditingPost(null)} mediaFiles={mediaFiles} onUploadMedia={onUploadMedia} />;
     if (editingPost.category === 'ARTISTS') return <ArtistStudioEditor post={editingPost} onSave={onSave} onClose={() => setEditingPost(null)} mediaFiles={mediaFiles} onUploadMedia={onUploadMedia} allPosts={allPosts} />;
     if (editingPost.category === 'EVENTS') return <EventStudioEditor post={editingPost} onSave={onSave} onClose={() => setEditingPost(null)} mediaFiles={mediaFiles} onUploadMedia={onUploadMedia} allPosts={allPosts} />;
     if (editingPost.category === 'ARTWORKS') return <ArtworkStudioEditor post={editingPost} onSave={onSave} onClose={() => setEditingPost(null)} mediaFiles={mediaFiles} onUploadMedia={onUploadMedia} allPosts={allPosts} />;
     return <ArticleStudioEditor post={editingPost} onSave={onSave} onClose={() => setEditingPost(null)} mediaFiles={mediaFiles} onUploadMedia={onUploadMedia} />;
  }
  return (
    <div className="h-full bg-bgMain overflow-y-auto custom-scrollbar relative font-serif transition-colors duration-500 pb-32 lg:pb-0">
       <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10">
          <div className="text-center mb-12 md:mb-24 animate-fadeIn"><div className="w-16 h-16 md:w-20 md:h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 md:mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-bgMain animate-bounce-slow"><Plus size={24} className="text-bgMain md:w-10 md:h-10" /></div><h1 className="text-3xl md:text-8xl lg:text-9xl font-caslon text-textMain tracking-tighter uppercase mb-6 leading-[0.8] font-bold">Content Studio</h1><p className="text-textMuted text-base md:text-2xl font-serif italic border-b-2 border-accent/20 pb-6 inline-block px-10">Loyiha yo'nalishini tanlang</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
             {PILLARS.map((pillar, idx) => (
                <div key={pillar.id} className="space-y-8 md:space-y-12 animate-fadeIn" style={{ animationDelay: `${idx * 150}ms` }}>
                   <div className="border-b-2 border-accent/10 pb-6 flex items-end justify-between"><div><h3 className="text-accent text-[11px] md:text-xs font-black uppercase tracking-[0.5em] mb-2">{pillar.title}</h3><p className="text-textMuted text-[10px] md:text-xs font-serif italic opacity-70">{pillar.subtitle}</p></div><span className="text-3xl md:text-5xl font-caslon opacity-10 font-bold">0{idx + 1}</span></div>
                   <div className="space-y-4 md:space-y-6">
                      {pillar.items.map(item => (
                         <button key={item.id} onClick={() => handleCreate(pillar.id, item.id)} className="w-full group bg-cardBg border border-borderDark p-4 md:p-8 text-left hover:border-accent hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)] transition-all relative overflow-hidden flex items-center justify-between rounded-xl hover:-translate-y-2">
                            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 w-full"><div className="p-3 md:p-5 bg-bgSidebar border border-borderDark text-textMuted group-hover:text-accent group-hover:scale-110 transition-all duration-500 shrink-0 rounded-lg shadow-inner">{item.icon}</div><div className="min-w-0 flex-1"><h4 className="text-lg md:text-2xl font-bold font-caslon text-textMain group-hover:text-accent transition-colors leading-tight">{item.label}</h4><p className="text-[8px] md:text-[9px] text-textMuted font-sans uppercase tracking-[0.2em] mt-2 opacity-60 font-black leading-relaxed">{item.desc}</p></div></div>
                            <ArrowRight size={18} className="text-textMuted opacity-0 group-hover:opacity-100 -translate-x-6 group-hover:translate-x-0 transition-all shrink-0 hidden lg:block" />
                         </button>
                      ))}
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default CMSExploreView;