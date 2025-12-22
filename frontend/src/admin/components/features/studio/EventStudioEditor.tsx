import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Clock, ArrowLeft, Save, Monitor, ImageIcon, ExternalLink, User, Building, Plus } from 'lucide-react';
import { ContentPost, MediaFile } from '../../../types';
import MediaLibraryView from '../../../pages/MediaLibraryView';
import { RichTextEditor } from '../../RichTextEditor';
import { useTheme } from '../../../contexts/ThemeContext';

interface EventStudioEditorProps {
  post: ContentPost;
  onSave: (post: ContentPost) => void;
  onClose: () => void;
  mediaFiles: MediaFile[];
  onUploadMedia: (file: MediaFile) => void;
  allPosts: ContentPost[];
}

const EventStudioEditor: React.FC<EventStudioEditorProps> = ({ post, onSave, onClose, mediaFiles, onUploadMedia }) => {
  const { t } = useTheme();
  const [data, setData] = useState<ContentPost>(post);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({days: 0, hours: 0, minutes: 0});

  useEffect(() => {
    if (activeTab !== 'preview' || !data.eventMetadata?.startDateTime) return;
    const interval = setInterval(() => {
      const distance = new Date(data.eventMetadata!.startDateTime).getTime() - new Date().getTime();
      if (distance < 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0 }); clearInterval(interval); }
      else setTimeLeft({ days: Math.floor(distance / (1000 * 60 * 60 * 24)), hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab, data.eventMetadata?.startDateTime]);

  const handleMediaSelect = (file: MediaFile) => { setData({ ...data, coverImage: file.url || '' }); setShowMediaModal(false); };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col overflow-hidden animate-fadeIn font-sans">
      <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white shrink-0 z-20 shadow-sm">
         <div className="flex items-center gap-4"><button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><ArrowLeft size={20}/></button><div className="flex flex-col"><h2 className="text-sm font-black uppercase tracking-widest text-[#1A1A1A]">EVENT STUDIO</h2><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest opacity-60">Loyiha: {data.title || 'Nomsiz'}</p></div></div>
         <div className="flex items-center gap-4"><div className="flex bg-gray-50 border border-gray-200 rounded-full p-0.5"><button onClick={() => setActiveTab('editor')} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'editor' ? 'bg-[#176f6f] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Muharrir</button><button onClick={() => setActiveTab('preview')} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'preview' ? 'bg-[#176f6f] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Preview</button></div><button onClick={() => onSave(data)} className="bg-[#176f6f] hover:bg-[#125757] text-white px-8 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg flex items-center gap-2"><Save size={14}/> {t('save').toUpperCase()}</button></div>
      </div>
      <div className="flex-1 overflow-hidden flex">
         <div className={`flex-1 overflow-y-auto custom-scrollbar p-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] ${activeTab === 'preview' ? 'hidden' : 'block'}`}>
            <div className="max-w-4xl mx-auto space-y-12 pb-32">
               <div className="space-y-4"><label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Muqova</label><div onClick={() => setShowMediaModal(true)} className="aspect-[21/9] bg-white border-2 border-dashed border-gray-200 hover:border-[#176f6f] transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center p-4 group">{data.coverImage ? (<img src={data.coverImage} className="absolute inset-0 w-full h-full object-cover filter sepia-[.1]" />) : (<ImageIcon size={48} className="text-gray-200" />)}<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-black uppercase tracking-[0.3em]">Muqova yuklang</div></div></div>
               <div className="space-y-8"><div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('event_name')}</label><input value={data.title} onChange={e => setData({...data, title: e.target.value, name: e.target.value})} placeholder="Tadbir nomi..." className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-5xl font-caslon font-bold text-[#1A1A1A] outline-none focus:border-[#176f6f]" /></div></div>
               <div className="space-y-4"><label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('about')}</label><RichTextEditor content={data.content || ''} onChange={c => setData({...data, content: c})} onRequestMedia={() => setShowMediaModal(true)} /></div>
            </div>
         </div>
         <div className={`flex-1 bg-[#fcfbf7] overflow-y-auto custom-scrollbar ${activeTab === 'editor' ? 'hidden' : 'block'}`}><div className="animate-fadeIn"><div className="w-full h-[60vh] bg-gray-100 relative overflow-hidden filter sepia-[.1]">{data.coverImage ? (<img src={data.coverImage} className="w-full h-full object-cover" />) : (<div className="w-full h-full flex items-center justify-center text-gray-200"><ImageIcon size={120}/></div>)}</div><div className="max-w-5xl mx-auto px-6 py-20 font-serif"><h1 className="text-7xl lg:text-9xl font-caslon text-[#1A1A1A] leading-[0.9] tracking-tighter mb-10">{data.title || 'Sarlavhasiz Tadbir'}</h1><div className="prose-editor prose-2xl !bg-transparent !p-0" dangerouslySetInnerHTML={{ __html: data.content || '' }} /></div></div></div>
      </div>
      {showMediaModal && (<div className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-md flex items-center justify-center p-10"><div className="bg-white w-full max-w-5xl h-full border border-gray-200 shadow-2xl overflow-hidden relative"><button onClick={() => setShowMediaModal(false)} className="absolute top-4 right-4 z-50 p-2 bg-white rounded-full text-black shadow-xl"><X size={24}/></button><MediaLibraryView files={mediaFiles} onUpload={onUploadMedia} isSelectMode={true} onSelect={handleMediaSelect} /></div></div>)}
    </div>
  );
};

export default EventStudioEditor;