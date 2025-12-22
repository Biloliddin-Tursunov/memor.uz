import React, { useState } from 'react';
import { X, Save, ArrowLeft, Monitor, ImageIcon, BookOpen, FileText, Download, DollarSign } from 'lucide-react';
import { ContentPost, MediaFile } from '../../../types';
import MediaLibraryView from '../../../pages/MediaLibraryView';
import { RichTextEditor } from '../../RichTextEditor';
import { useTheme } from '../../../contexts/ThemeContext';

interface BookStudioEditorProps {
  post: ContentPost;
  onSave: (post: ContentPost) => void;
  onClose: () => void;
  mediaFiles: MediaFile[];
  onUploadMedia: (file: MediaFile) => void;
}

const BookStudioEditor: React.FC<BookStudioEditorProps> = ({ post, onSave, onClose, mediaFiles, onUploadMedia }) => {
  const { t } = useTheme();
  const [data, setData] = useState<ContentPost>(post);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectionTarget, setSelectionTarget] = useState<'thumbnail' | 'pdf' | 'editor'>('thumbnail');

  const openMediaPicker = (target: 'thumbnail' | 'pdf' | 'editor') => { setSelectionTarget(target); setShowMediaModal(true); };
  const handleMediaSelect = (file: MediaFile) => {
    if (selectionTarget === 'thumbnail') setData({ ...data, coverImage: file.url || '' });
    else if (selectionTarget === 'pdf') setData({ ...data, bookMetadata: { ...data.bookMetadata!, pdfUrl: file.url, pdfFileName: file.name } });
    setShowMediaModal(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col overflow-hidden animate-fadeIn font-sans">
      <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white shrink-0 z-20 shadow-sm">
         <div className="flex items-center gap-4"><button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><ArrowLeft size={20}/></button><div className="flex flex-col"><h2 className="text-sm font-black uppercase tracking-widest text-[#1A1A1A]">BOOK STUDIO</h2><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest opacity-60">Loyiha: {data.title || 'Nomsiz'}</p></div></div>
         <div className="flex items-center gap-4"><div className="flex bg-gray-50 border border-gray-200 rounded-full p-0.5"><button onClick={() => setActiveTab('editor')} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'editor' ? 'bg-[#176f6f] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Muharrir</button><button onClick={() => setActiveTab('preview')} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'preview' ? 'bg-[#176f6f] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Preview</button></div><button onClick={() => onSave(data)} className="bg-[#176f6f] hover:bg-[#125757] text-white px-8 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg flex items-center gap-2"><Save size={14}/> {t('save').toUpperCase()}</button></div>
      </div>
      <div className="flex-1 overflow-hidden flex">
         <div className={`flex-1 overflow-y-auto custom-scrollbar p-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] shadow-inner ${activeTab === 'preview' ? 'hidden' : 'block'}`}>
            <div className="max-w-4xl mx-auto space-y-12 pb-32">
               <section className="space-y-4"><label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('book_title')}</label><input value={data.title} onChange={e => setData({...data, title: e.target.value, name: e.target.value})} placeholder="Kitob nomi..." className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-4xl font-caslon font-bold text-[#1A1A1A] outline-none focus:border-[#176f6f]" /></section>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div className="space-y-4"><label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Kitob Muqovasi</label><div onClick={() => openMediaPicker('thumbnail')} className="aspect-[3/4] bg-white border-2 border-dashed border-gray-200 hover:border-[#176f6f] transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center p-4 group shadow-sm">{data.coverImage ? (<img src={data.coverImage} className="absolute inset-0 w-full h-full object-cover filter sepia-[.1]" />) : (<ImageIcon size={48} className="text-gray-200" />)}<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest">Almashtirish</div></div></div><div className="space-y-6"><div className="space-y-4"><label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('book_type')}</label><div className="flex gap-2"><button onClick={() => setData({...data, bookMetadata: {...data.bookMetadata!, bookType: 'Physical'}})} className={`flex-1 py-3 px-4 border text-[10px] font-black uppercase tracking-widest transition-all ${data.bookMetadata?.bookType === 'Physical' ? 'bg-[#176f6f] text-white border-[#176f6f]' : 'bg-white text-gray-400 border-gray-200'}`}>Physical</button><button onClick={() => setData({...data, bookMetadata: {...data.bookMetadata!, bookType: 'PDF'}})} className={`flex-1 py-3 px-4 border text-[10px] font-black uppercase tracking-widest transition-all ${data.bookMetadata?.bookType === 'PDF' ? 'bg-[#176f6f] text-white border-[#176f6f]' : 'bg-white text-gray-400 border-gray-200'}`}>PDF</button></div></div><div className="space-y-4"><label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('book_price')} (UZS)</label><input type="number" value={data.bookMetadata?.price} onChange={e => setData({...data, bookMetadata: {...data.bookMetadata!, price: e.target.value}})} className="w-full bg-white border border-gray-200 py-3 px-4 text-sm font-bold text-[#1A1A1A] outline-none focus:border-[#176f6f]" placeholder="0" /></div></div></div>
               <section className="space-y-4"><label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('th_desc')}</label><RichTextEditor content={data.content || ''} onChange={c => setData({...data, content: c})} onRequestMedia={(type) => openMediaPicker(type === 'file' ? 'editor' : 'thumbnail')} /></section>
            </div>
         </div>
         <div className={`flex-1 bg-gray-50 overflow-y-auto custom-scrollbar p-10 lg:p-16 ${activeTab === 'editor' ? 'hidden' : 'block'}`}><div className="max-w-6xl mx-auto"><div className="bg-white border border-gray-200 shadow-2xl overflow-hidden font-serif min-h-[1000px] flex flex-col md:flex-row transition-all animate-fadeIn"><div className="w-full md:w-96 bg-[#f7f7f5] border-r border-gray-100 p-10 flex flex-col items-center"><div className="w-full aspect-[3/4] bg-white shadow-2xl border border-gray-100 mb-10 relative overflow-hidden">{data.coverImage ? (<img src={data.coverImage} className="w-full h-full object-cover filter sepia-[.1]" />) : (<div className="w-full h-full flex items-center justify-center text-gray-200"><BookOpen size={64} /></div>)}</div><div className="bg-[#176f6f] text-white p-6 w-full text-center shadow-lg"><p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-70 mb-2">{t('book_price')}</p><p className="text-3xl font-bold font-caslon">{data.bookMetadata?.price || '0'} UZS</p></div></div><div className="flex-1 p-12 md:p-20 bg-white"><div className="max-w-2xl mx-auto space-y-10"><div><div className="text-[#176f6f] text-[12px] font-black uppercase tracking-[0.5em] mb-6">BOOKS / COLLECTION</div><h1 className="text-6xl font-caslon text-[#1A1A1A] leading-tight mb-6">{data.title || 'Sarlavhasiz kitob'}</h1></div><div className="h-px bg-gray-100 w-full"></div><div className="prose-editor prose-xl !bg-transparent !p-0" dangerouslySetInnerHTML={{ __html: data.content || '' }} /></div></div></div></div></div>
      </div>
      {showMediaModal && (<div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center p-10"><div className="bg-white w-full max-w-5xl h-full border border-gray-200 shadow-2xl overflow-hidden relative"><button onClick={() => setShowMediaModal(false)} className="absolute top-4 right-4 z-50 p-2 bg-white rounded-full text-black shadow-xl"><X size={24}/></button><MediaLibraryView files={mediaFiles} onUpload={onUploadMedia} isSelectMode={true} onSelect={handleMediaSelect} /></div></div>)}
    </div>
  );
};

export default BookStudioEditor;