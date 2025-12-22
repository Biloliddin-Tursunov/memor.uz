import React, { useState, useMemo } from 'react';
import { 
  X, User, ImageIcon, ChevronRight, Save, Camera, MapPin, Plus, Trash2, FileText, Film, BookOpen, Search, Check, Link2, Info,
  ArrowLeft, Calendar
} from 'lucide-react';
import { ContentPost, MediaFile, ArtistProject } from '../../../types';
import MediaLibraryView from '../../../pages/MediaLibraryView';
import { RichTextEditor } from '../../RichTextEditor';
import { useTheme } from '../../../contexts/ThemeContext';

interface ArtistStudioEditorProps {
  post: ContentPost;
  onSave: (post: ContentPost) => void;
  onClose: () => void;
  mediaFiles: MediaFile[];
  onUploadMedia: (file: MediaFile) => void;
  allPosts: ContentPost[];
}

const ArtistStudioEditor: React.FC<ArtistStudioEditorProps> = ({ 
  post, onSave, onClose, mediaFiles, onUploadMedia, allPosts 
}) => {
  const { theme, t } = useTheme();
  const [data, setData] = useState<ContentPost>(post);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectionTarget, setSelectionTarget] = useState<{type: 'portrait' | 'project', projectId?: string}>({type: 'portrait'});
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ArtistProject | null>(null);
  const [showContentPicker, setShowContentPicker] = useState<{open: boolean, type: 'ARTICLES' | 'VIDEOS' | 'BOOKS' | null}>({open: false, type: null});
  const [contentSearch, setContentSearch] = useState('');

  const linkedContent = useMemo(() => {
     const ids = data.artistMetadata?.linkedContentIds || [];
     const filtered = allPosts.filter(p => ids.includes(p.id));
     return {
        articles: filtered.filter(p => p.category === 'ARTICLES'),
        videos: filtered.filter(p => p.category === 'VIDEOS'),
        books: filtered.filter(p => p.category === 'BOOKS')
     };
  }, [allPosts, data.artistMetadata?.linkedContentIds]);

  const toggleContentLink = (postId: string) => {
      const currentIds = data.artistMetadata?.linkedContentIds || [];
      const newIds = currentIds.includes(postId) ? currentIds.filter(id => id !== postId) : [...currentIds, postId];
      setData({ ...data, artistMetadata: { ...data.artistMetadata!, linkedContentIds: newIds } });
  };

  const handleMediaSelect = (file: MediaFile) => {
    if (selectionTarget.type === 'portrait') setData({ ...data, coverImage: file.url || '' });
    else if (selectionTarget.type === 'project' && editingProject) setEditingProject({ ...editingProject, image: file.url || '' });
    setShowMediaModal(false);
  };

  const handleAddProject = () => {
    if (!editingProject) return;
    const newProj: ArtistProject = { ...editingProject, id: editingProject.id || Math.random().toString() };
    const projects = data.artistMetadata?.projects || [];
    const exists = projects.find(p => p.id === newProj.id);
    setData({ ...data, artistMetadata: { ...data.artistMetadata!, projects: exists ? projects.map(p => p.id === newProj.id ? newProj : p) : [...projects, newProj] } });
    setShowProjectForm(false);
    setEditingProject(null);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col overflow-hidden animate-fadeIn font-sans">
      <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white shrink-0 z-20 shadow-sm">
         <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><ArrowLeft size={20}/></button>
            <div className="flex flex-col">
               <h2 className="text-sm font-black uppercase tracking-widest text-[#1A1A1A]">ARTIST STUDIO</h2>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest opacity-60">Profil: {data.title || 'Nomsiz'}</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="flex bg-gray-50 border border-gray-200 rounded-full p-0.5">
               <button onClick={() => setActiveTab('editor')} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'editor' ? 'bg-[#176f6f] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Muharrir</button>
               <button onClick={() => setActiveTab('preview')} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'preview' ? 'bg-[#176f6f] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Preview</button>
            </div>
            <button onClick={() => onSave(data)} className="bg-[#176f6f] hover:bg-[#125757] text-white px-8 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg flex items-center gap-2">
               <Save size={14}/> {t('save').toUpperCase()}
            </button>
         </div>
      </div>
      <div className="flex-1 overflow-hidden flex">
         <div className={`flex-1 overflow-y-auto custom-scrollbar p-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] ${activeTab === 'preview' ? 'hidden' : 'block'}`}>
            <div className="max-w-4xl mx-auto space-y-12 pb-32">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Profil Rasmi (Portrait)</label>
                     <div 
                        onClick={() => { setSelectionTarget({type: 'portrait'}); setShowMediaModal(true); }}
                        className="aspect-[3/4] bg-white border-2 border-dashed border-gray-200 hover:border-[#176f6f] transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center text-center p-4 group shadow-sm"
                     >
                        {data.coverImage ? (
                           <img src={data.coverImage} className="absolute inset-0 w-full h-full object-cover filter sepia-[.1]" />
                        ) : (
                           <Camera size={40} className="text-gray-200" />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[9px] font-black uppercase tracking-widest">Rasm tanlang</div>
                     </div>
                  </div>
                  <div className="md:col-span-2 space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('full_name')}</label>
                        <input value={data.title} onChange={e => setData({...data, title: e.target.value, name: e.target.value})} placeholder="Ijodkor ism sharifi..." className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-4xl font-caslon font-bold text-[#1A1A1A] outline-none focus:border-[#176f6f] transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('professions')}</label>
                        <input value={data.artistMetadata?.professions.join(', ')} onChange={e => setData({...data, artistMetadata: {...data.artistMetadata!, professions: e.target.value.split(',').map(v => v.trim()).filter(v => !!v)}})} placeholder="Arxitektor, Dizayner, Hattot..." className="w-full bg-transparent border-b border-gray-200 py-2 text-sm font-bold text-[#176f6f] outline-none" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('birth_year')}</label>
                           <input value={data.artistMetadata?.birthYear} onChange={e => setData({...data, artistMetadata: {...data.artistMetadata!, birthYear: e.target.value}})} placeholder="19XX" className="w-full bg-transparent border-b border-gray-200 py-2 text-sm font-bold text-textMain outline-none" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('death_year')}</label>
                           <input value={data.artistMetadata?.deathYear} onChange={e => setData({...data, artistMetadata: {...data.artistMetadata!, deathYear: e.target.value}})} placeholder="20XX" className="w-full bg-transparent border-b border-gray-200 py-2 text-sm font-bold text-textMain outline-none" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('birth_place')}</label>
                        <input value={data.artistMetadata?.birthPlace} onChange={e => setData({...data, artistMetadata: {...data.artistMetadata!, birthPlace: e.target.value}})} placeholder="Shahar, Viloyat, Mamlakat" className="w-full bg-transparent border-b border-gray-200 py-2 text-sm font-bold text-textMain outline-none" />
                     </div>
                  </div>
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('bio')}</label>
                  <textarea value={data.artistMetadata?.bio} onChange={e => setData({...data, artistMetadata: {...data.artistMetadata!, bio: e.target.value}})} placeholder="Qisqa biografiya (1-2 gap)..." className="w-full bg-transparent border border-gray-200 p-4 text-lg font-serif italic text-gray-600 outline-none focus:border-[#176f6f] min-h-[100px] shadow-inner resize-none" />
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('about')}</label>
                  <RichTextEditor content={data.content || ''} onChange={c => setData({...data, content: c})} onRequestMedia={() => { setSelectionTarget({type: 'portrait'}); setShowMediaModal(true); }} />
               </div>
               <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('gallery_projects')}</label>
                     <button onClick={() => { setEditingProject({id: '', title: '', description: '', image: ''}); setShowProjectForm(true); }} className="flex items-center gap-1 text-[10px] font-black text-accent uppercase tracking-widest hover:underline"><Plus size={14}/> {t('add_work')}</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {data.artistMetadata?.projects.map(p => (
                        <div key={p.id} className="bg-white border border-gray-200 p-4 flex gap-4 group shadow-sm transition-all hover:border-accent">
                           <div className="w-20 h-20 bg-gray-50 border border-gray-100 shrink-0 overflow-hidden">{p.image && <img src={p.image} className="w-full h-full object-cover" />}</div>
                           <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-sm text-textMain truncate">{p.title}</h4>
                              <p className="text-[10px] text-gray-400 line-clamp-2 mt-1">{p.description}</p>
                              <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => { setEditingProject(p); setShowProjectForm(true); }} className="text-[9px] font-bold text-accent uppercase tracking-tighter">Edit</button><button onClick={() => setData({...data, artistMetadata: {...data.artistMetadata!, projects: data.artistMetadata!.projects.filter(x => x.id !== p.id)}})} className="text-[9px] font-bold text-red-500 uppercase tracking-tighter">Delete</button></div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="space-y-8 pt-10 border-t border-gray-100">
                  <div className="flex items-center justify-between"><label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Bog'langan Materiallar</label></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <LinkedContentSection title="Maqolalar" icon={<FileText size={16}/>} items={linkedContent.articles} onAdd={() => setShowContentPicker({open: true, type: 'ARTICLES'})} onRemove={toggleContentLink}/>
                     <LinkedContentSection title="Videolar" icon={<Film size={16}/>} items={linkedContent.videos} onAdd={() => setShowContentPicker({open: true, type: 'VIDEOS'})} onRemove={toggleContentLink}/>
                     <LinkedContentSection title="Kitoblar" icon={<BookOpen size={16}/>} items={linkedContent.books} onAdd={() => setShowContentPicker({open: true, type: 'BOOKS'})} onRemove={toggleContentLink}/>
                  </div>
               </div>
            </div>
         </div>
         <div className={`flex-1 bg-[#fcfbf7] overflow-y-auto custom-scrollbar ${activeTab === 'editor' ? 'hidden' : 'block'}`}>
            <div className="max-w-5xl mx-auto p-12 lg:p-24 space-y-24 font-serif animate-fadeIn">
               <section className="flex flex-col md:flex-row items-start gap-16"><div className="w-80 aspect-[3/4] bg-gray-100 shadow-2xl overflow-hidden shrink-0 filter sepia-[.1] border border-gray-200">{data.coverImage ? (<img src={data.coverImage} className="w-full h-full object-cover" />) : (<div className="w-full h-full flex items-center justify-center text-gray-300"><User size={100}/></div>)}</div><div className="flex-1 space-y-8"><div className="space-y-4"><div className="flex flex-wrap gap-2">{data.artistMetadata?.professions.map(p => (<span key={p} className="text-[11px] font-black uppercase tracking-[0.3em] text-[#176f6f] border-b border-[#176f6f]/20 pb-1">{p}</span>))}</div><h1 className="text-6xl lg:text-8xl font-caslon text-[#1A1A1A] leading-none tracking-tighter">{data.title || 'Ismsiz Ijodkor'}</h1><div className="flex items-center gap-6 text-xl font-serif text-gray-400 italic"><span>{data.artistMetadata?.birthYear} {data.artistMetadata?.deathYear ? `— ${data.artistMetadata?.deathYear}` : ''}</span><span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span><span className="flex items-center gap-2"><MapPin size={16}/> {data.artistMetadata?.birthPlace}</span></div></div><p className="text-2xl font-serif italic text-gray-500 max-w-2xl border-l-4 border-[#176f6f]/20 pl-8 py-2 bg-gray-50/50">{data.artistMetadata?.bio}</p></div></section>
               <section className="pt-20 border-t border-gray-100"><div className="grid grid-cols-1 lg:grid-cols-4 gap-16"><div className="lg:col-span-1"><h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-[#176f6f] mb-8">O'mrbayoni</h3><div className="space-y-6"><div className="flex items-center gap-3 text-textMain font-bold"><MapPin size={18} className="text-gray-300"/><span className="text-sm font-sans tracking-tight">{data.artistMetadata?.birthPlace}</span></div><div className="flex items-center gap-3 text-textMain font-bold"><Calendar size={18} className="text-gray-300"/><span className="text-sm font-sans tracking-tight">{data.artistMetadata?.birthYear} yilda tug'ilgan</span></div></div></div><div className="lg:col-span-3 prose-editor prose-xl !bg-transparent !p-0" dangerouslySetInnerHTML={{ __html: data.content || '' }} /></div></section>
            </div>
         </div>
      </div>
      {showProjectForm && (<div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-8"><div className="bg-white w-full max-w-xl border border-gray-200 shadow-2xl p-10 animate-slideDown font-serif"><div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4"><h3 className="text-xl font-caslon font-bold uppercase tracking-widest text-[#176f6f]">Loyiha Tafsilotlari</h3><button onClick={() => setShowProjectForm(false)} className="hover:text-red-500 transition-colors"><X size={24}/></button></div><div className="space-y-6"><div onClick={() => { setSelectionTarget({type: 'project'}); setShowMediaModal(true); }} className="aspect-video bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-accent transition-all group">{(editingProject?.image || '') ? (<img src={editingProject!.image} className="w-full h-full object-cover" />) : (<div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-accent"><ImageIcon size={32}/><span className="text-[10px] font-black uppercase tracking-widest">Loyiha rasmi</span></div>)}</div><div className="space-y-1"><label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Loyiha nomi</label><input value={editingProject?.title || ''} onChange={e => setEditingProject({...editingProject!, title: e.target.value} as any)} placeholder="Loyiha nomi..." className="w-full bg-transparent border-b border-gray-200 py-3 text-lg font-bold outline-none focus:border-accent font-sans" /></div><div className="space-y-1"><label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Qisqa tavsif</label><textarea value={editingProject?.description || ''} onChange={e => setEditingProject({...editingProject!, description: e.target.value} as any)} placeholder="Loyiha haqida qisqacha..." className="w-full bg-transparent border border-gray-200 p-4 text-sm outline-none focus:border-accent min-h-[100px] resize-none font-sans" /></div><button onClick={handleAddProject} className="w-full bg-[#176f6f] text-white py-4 font-black uppercase tracking-widest text-xs hover:bg-[#125757] transition-all shadow-md active:scale-[0.98]">Saqlash</button></div></div></div>)}
      {showContentPicker.open && (<div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-8"><div className="bg-white w-full max-w-2xl h-[80vh] border border-gray-200 shadow-2xl flex flex-col relative animate-slideDown overflow-hidden font-serif"><div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-gray-50/50"><h3 className="text-xl font-caslon font-bold uppercase tracking-widest text-[#176f6f]">{showContentPicker.type} Tanlash</h3><button onClick={() => setShowContentPicker({open: false, type: null})}><X size={24}/></button></div><div className="p-4 border-b border-gray-100"><div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={contentSearch} onChange={e => setContentSearch(e.target.value)} placeholder="Sarlavha bo'yicha qidirish..." className="w-full bg-gray-50 border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none focus:border-accent font-sans" /></div></div><div className="flex-1 overflow-y-auto custom-scrollbar p-2">{allPosts.filter(p => p.category === showContentPicker.type && (p.title || p.name || '').toLowerCase().includes(contentSearch.toLowerCase())).map(item => { const isLinked = (data.artistMetadata?.linkedContentIds || []).includes(item.id); return (<div key={item.id} onClick={() => toggleContentLink(item.id)} className={`flex items-center gap-4 p-3 border-b border-gray-50 cursor-pointer transition-colors ${isLinked ? 'bg-accent/5' : 'hover:bg-gray-50'}`}><div className="w-12 h-12 bg-gray-100 shrink-0 overflow-hidden">{item.coverImage && <img src={item.coverImage} className="w-full h-full object-cover" />}</div><div className="flex-1 min-w-0"><h4 className="font-bold text-sm text-textMain truncate">{item.title || item.name}</h4><p className="text-[10px] text-gray-400 font-sans">{item.deadline}</p></div><div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${isLinked ? 'bg-accent border-accent text-white' : 'border-gray-200 text-transparent'}`}><Check size={14} /></div></div>); })}</div><div className="p-4 border-t border-gray-100 bg-gray-50 text-center"><button onClick={() => setShowContentPicker({open: false, type: null})} className="bg-[#176f6f] text-white px-10 py-2 font-black uppercase tracking-widest text-[10px]">Tayyor</button></div></div></div>)}
      {showMediaModal && (<div className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-md flex items-center justify-center p-10"><div className="bg-white w-full max-w-5xl h-full border border-gray-200 shadow-2xl overflow-hidden relative"><button onClick={() => setShowMediaModal(false)} className="absolute top-4 right-4 z-50 p-2 bg-white rounded-full text-black shadow-xl hover:text-red-500 transition-all"><X size={24}/></button><MediaLibraryView files={mediaFiles} onUpload={onUploadMedia} isSelectMode={true} onSelect={handleMediaSelect} /></div></div>)}
    </div>
  );
};

const LinkedContentSection: React.FC<{ title: string, icon: React.ReactNode, items: ContentPost[], onAdd: () => void, onRemove: (id: string) => void }> = ({ title, icon, items, onAdd, onRemove }) => (
   <div className="bg-white border border-gray-200 p-6 shadow-sm flex flex-col min-h-[250px]"><div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-2"><div className="flex items-center gap-2 text-[#176f6f]">{icon}<span className="text-[11px] font-black uppercase tracking-widest">{title}</span></div><button onClick={onAdd} className="p-1 hover:bg-accent/10 rounded transition-colors text-accent"><Link2 size={16}/></button></div><div className="flex-1 space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar">{items.length > 0 ? items.map(item => (
      <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 group hover:bg-gray-100 transition-colors">
         <div className="w-8 h-8 shrink-0 bg-gray-200 overflow-hidden">{item.coverImage && <img src={item.coverImage} className="w-full h-full object-cover" />}</div>
         <span className="text-[11px] font-bold text-gray-700 truncate flex-1">{item.title || item.name}</span>
         <button onClick={() => onRemove(item.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
      </div>
   )) : (<div className="h-full flex flex-col items-center justify-center text-gray-300 opacity-60 italic text-[11px]"><Plus size={24} className="mb-2 opacity-20"/>Bog'lanmagan</div>)}</div></div>
);

export default ArtistStudioEditor;