import React, { useState } from 'react';
import { X, Save, ArrowLeft, Monitor, ImageIcon, Video, Play } from 'lucide-react';
import { ContentPost, MediaFile } from '../../../types';
import MediaLibraryView from '../../../pages/MediaLibraryView';
import { RichTextEditor } from '../../RichTextEditor';
import { useTheme } from '../../../contexts/ThemeContext';

interface VideoStudioEditorProps {
  post: ContentPost;
  onSave: (post: ContentPost) => void;
  onClose: () => void;
  mediaFiles: MediaFile[];
  onUploadMedia: (file: MediaFile) => void;
}

const VideoStudioEditor: React.FC<VideoStudioEditorProps> = ({ post, onSave, onClose, mediaFiles, onUploadMedia }) => {
  const { theme, t } = useTheme();
  const [data, setData] = useState<ContentPost>(post);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectionTarget, setSelectionTarget] = useState<'thumbnail' | 'video' | 'editor'>('thumbnail');

  const openMediaPicker = (target: 'thumbnail' | 'video' | 'editor') => { setSelectionTarget(target); setShowMediaModal(true); };
  const handleMediaSelect = (file: MediaFile) => {
    if (selectionTarget === 'thumbnail') setData({ ...data, coverImage: file.url || '' });
    else if (selectionTarget === 'video') setData({ ...data, videoMetadata: { ...data.videoMetadata!, videoUrl: file.url, fileName: file.name } });
    setShowMediaModal(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-bgMain flex flex-col overflow-hidden animate-fadeIn font-sans">
      <div className="h-16 border-b border-borderDark flex items-center justify-between px-6 bg-bgSidebar shrink-0 z-20 shadow-sm">
         <div className="flex items-center gap-4"><button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full text-textMuted"><ArrowLeft size={20}/></button><div className="flex flex-col"><h2 className="text-sm font-black uppercase tracking-widest text-textMain">VIDEO STUDIO</h2><p className="text-[10px] text-textMuted font-bold uppercase tracking-widest opacity-60">Loyiha: {data.title || 'Nomsiz'}</p></div></div>
         <div className="flex items-center gap-4"><div className="flex bg-cardBg border border-borderDark rounded-full p-0.5"><button onClick={() => setActiveTab('editor')} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'editor' ? 'bg-accent text-white shadow-md' : 'text-textMuted hover:text-textMain'}`}>Muharrir</button><button onClick={() => setActiveTab('preview')} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'preview' ? 'bg-accent text-white shadow-md' : 'text-textMuted hover:text-textMain'}`}>Preview</button></div><button onClick={() => onSave(data)} className="bg-accent hover:bg-accentHover text-white px-8 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg flex items-center gap-2"><Save size={14}/> Saqlash</button></div>
      </div>
      <div className="flex-1 overflow-hidden flex">
         <div className={`flex-1 overflow-y-auto custom-scrollbar p-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] shadow-inner ${activeTab === 'preview' ? 'hidden' : 'block'}`}>
            <div className="max-w-4xl mx-auto space-y-12 pb-32">
               <section className="space-y-4"><label className="text-[10px] font-black text-textMuted uppercase tracking-[0.2em]">Video Sarlavhasi</label><input value={data.title} onChange={e => setData({...data, title: e.target.value, name: e.target.value})} placeholder="Sarlavha..." className="w-full bg-transparent border-b-2 border-borderDark py-4 text-4xl font-caslon font-bold text-textMain outline-none focus:border-accent" /></section>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div className="space-y-4"><label className="text-[10px] font-black text-textMuted uppercase tracking-[0.2em]">Video Fayl</label><div onClick={() => openMediaPicker('video')} className="aspect-video bg-cardBg border-2 border-dashed border-borderDark hover:border-accent transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center p-4 group">{data.videoMetadata?.videoUrl ? (<video src={data.videoMetadata.videoUrl} className="absolute inset-0 w-full h-full object-cover opacity-50" />) : (<Video size={40} className="text-textMuted opacity-30" />)}<div className="relative z-10 text-[10px] font-bold uppercase tracking-widest">Video fayl tanlang</div></div></div><div className="space-y-4"><label className="text-[10px] font-black text-textMuted uppercase tracking-[0.2em]">Muqova</label><div onClick={() => openMediaPicker('thumbnail')} className="aspect-video bg-cardBg border-2 border-dashed border-borderDark hover:border-accent transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center p-4 group">{data.coverImage ? (<img src={data.coverImage} className="absolute inset-0 w-full h-full object-cover" />) : (<ImageIcon size={40} className="text-textMuted opacity-30" />)}<div className="relative z-10 text-[10px] font-bold uppercase tracking-widest">Rasm tanlang</div></div></div></div>
               <section className="space-y-4"><label className="text-[10px] font-black text-textMuted uppercase tracking-[0.2em]">Video Tavsifi</label><RichTextEditor content={data.content || ''} onChange={c => setData({...data, content: c})} onRequestMedia={() => openMediaPicker('editor')} /></section>
            </div>
         </div>
         <div className={`flex-1 bg-[#fcfbf7] overflow-y-auto custom-scrollbar p-10 lg:p-16 ${activeTab === 'editor' ? 'hidden' : 'block'}`}><div className="max-w-6xl mx-auto"><div className="bg-white border border-borderDark shadow-2xl overflow-hidden min-h-[900px] animate-fadeIn"><div className="bg-black aspect-video relative flex items-center justify-center">{data.videoMetadata?.videoUrl ? (<video src={data.videoMetadata.videoUrl} className="w-full h-full object-contain" poster={data.coverImage} controls />) : (<div className="text-center text-white/30"><Play size={80} fill="currentColor" className="mx-auto mb-4 opacity-20" /><p className="text-[11px] font-black uppercase tracking-widest">Video Player Ready</p></div>)}</div><div className="p-12 md:p-24"><div className="max-w-3xl mx-auto space-y-10"><h1 className="text-5xl md:text-7xl font-caslon text-gray-900 leading-tight">{data.title || 'Sarlavhasiz material'}</h1><div className="prose-editor prose-xl !bg-transparent !p-0" dangerouslySetInnerHTML={{ __html: data.content || '' }} /></div></div></div></div></div>
      </div>
      {showMediaModal && (<div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center p-10"><div className="bg-white w-full max-w-5xl h-full border border-borderDark shadow-2xl overflow-hidden relative"><button onClick={() => setShowMediaModal(false)} className="absolute top-4 right-4 z-50 p-2 bg-white rounded-full text-black shadow-xl"><X size={24}/></button><MediaLibraryView files={mediaFiles} onUpload={onUploadMedia} isSelectMode={true} onSelect={handleMediaSelect} /></div></div>)}
    </div>
  );
};

export default VideoStudioEditor;