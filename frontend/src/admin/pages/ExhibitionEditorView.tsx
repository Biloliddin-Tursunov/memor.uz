import React, { useState } from 'react';
import { ArrowLeft, Save, X, Image as ImageIcon, Trash2, Layers, MapPin, Monitor, Link2, Layout } from 'lucide-react';
import { ExhibitionItem, NavigationState, MediaFile } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import MediaLibraryView from './MediaLibraryView';

interface ExhibitionEditorViewProps {
  initialItem?: ExhibitionItem;
  onSave: (item: ExhibitionItem) => void;
  mediaFiles: MediaFile[];
  onUploadMedia: (file: MediaFile) => void;
  onNavigate: (state: NavigationState) => void;
}

const ExhibitionEditorView: React.FC<ExhibitionEditorViewProps> = ({ initialItem, onSave, mediaFiles, onUploadMedia, onNavigate }) => {
  const { t } = useTheme();
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectionTarget, setSelectionTarget] = useState<'main' | 'gallery'>('main');
  const [formData, setFormData] = useState<ExhibitionItem>(initialItem || { id: Math.random().toString(), studentName: '', projectTitle: '', image: '', gallery: [], year: new Date().getFullYear().toString(), category: 'Architecture', description: '', location: '', tools: [], });
  const [toolsInput, setToolsInput] = useState(formData.tools?.join(', ') || '');

  const handleMediaSelect = (file: MediaFile) => {
    if (!file.url) return;
    if (selectionTarget === 'main') setFormData({ ...formData, image: file.url });
    else setFormData({ ...formData, gallery: [...(formData.gallery || []), file.url] });
    setShowMediaModal(false);
  };

  const handleSave = () => {
    if (!formData.studentName || !formData.projectTitle || !formData.image) { alert("Please fill in basic details and main image."); return; }
    onSave({ ...formData, tools: toolsInput.split(',').map(t => t.trim()).filter(t => !!t) });
    onNavigate({ type: 'exhibition', title: t('exhibition') });
  };

  return (
    <div className="h-full flex flex-col bg-transparent animate-fadeIn font-serif">
      <div className="h-20 border-b border-borderDark flex items-center justify-between px-6 bg-bgSidebar backdrop-blur-md shrink-0"><div className="flex items-center gap-4"><button onClick={() => onNavigate({ type: 'exhibition', title: t('exhibition') })} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full text-textMuted transition-colors"><ArrowLeft size={24} /></button><div className="h-8 w-px bg-borderDark"></div><h1 className="text-xl font-bold font-caslon text-textMain uppercase tracking-widest">{initialItem ? 'Edit Project' : 'New Exhibition Work'}</h1></div><button onClick={handleSave} className="bg-accent hover:bg-accentHover text-bgMain px-8 py-2.5 font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2 shadow-xl transition-all active:scale-95 rounded-sm"><Save size={18} /> {t('save')}</button></div>
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12"><div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 pb-32"><div className="lg:col-span-2 space-y-10"><section className="bg-cardBg border border-borderDark p-10 shadow-xl relative overflow-hidden rounded-2xl backdrop-blur-md"><div className="absolute top-0 left-0 w-full h-1.5 bg-accent/20"></div><h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-8 border-b border-borderDark pb-4 opacity-70">General Information</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div className="space-y-2"><label className="block text-[9px] font-black text-textMuted uppercase tracking-widest ml-1 font-sans">{t('student_name')}</label><input required value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full bg-bgSidebar border border-borderDark p-4 text-base font-bold text-textMain outline-none focus:border-accent shadow-inner rounded-xl" placeholder="Full Name" /></div><div className="space-y-2"><label className="block text-[9px] font-black text-textMuted uppercase tracking-widest ml-1 font-sans">{t('project_title')}</label><input required value={formData.projectTitle} onChange={e => setFormData({...formData, projectTitle: e.target.value})} className="w-full bg-bgSidebar border border-borderDark p-4 text-base font-bold text-textMain outline-none focus:border-accent shadow-inner rounded-xl" placeholder="Project Title" /></div></div><div className="mt-8 space-y-2"><label className="block text-[9px] font-black text-textMuted uppercase tracking-widest ml-1 font-sans">{t('description_label')}</label><textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-bgSidebar border border-borderDark p-5 text-textMain outline-none focus:border-accent h-44 resize-none font-serif leading-relaxed shadow-inner rounded-xl" placeholder="Tell the story of this project..." /></div></section></div><div className="space-y-10"><section className="bg-cardBg border border-borderDark p-8 shadow-xl rounded-2xl backdrop-blur-md"><h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-6 opacity-70">Hero Image</h3><div onClick={() => { setSelectionTarget('main'); setShowMediaModal(true); }} className="aspect-[4/3] bg-bgSidebar border-2 border-dashed border-borderDark hover:border-accent group cursor-pointer relative overflow-hidden transition-all rounded-xl shadow-inner">{formData.image ? (<img src={formData.image} className="w-full h-full object-cover filter sepia-[.15] group-hover:scale-110 transition-transform duration-700" />) : (<div className="w-full h-full flex flex-col items-center justify-center text-textMuted group-hover:text-accent"><ImageIcon size={48} className="mb-4 opacity-20" /><span className="text-[10px] font-black uppercase tracking-widest">Select Main Image</span></div>)}</div></section></div></div></div>
      {showMediaModal && (<div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"><div className="bg-bgMain w-full max-w-6xl h-[85vh] md:h-[90vh] border border-borderDark shadow-2xl flex flex-col relative animate-slideDown overflow-hidden rounded-2xl"><button onClick={() => setShowMediaModal(false)} className="absolute top-4 right-4 z-[120] p-2 bg-cardBg rounded-full shadow-2xl text-textMain hover:text-red-500 transition-all border border-borderDark"><X size={24}/></button><div className="flex-1 overflow-hidden"><MediaLibraryView files={mediaFiles} onUpload={onUploadMedia} onSelect={handleMediaSelect} isSelectMode={true} /></div></div></div>)}
    </div>
  );
};

export default ExhibitionEditorView;