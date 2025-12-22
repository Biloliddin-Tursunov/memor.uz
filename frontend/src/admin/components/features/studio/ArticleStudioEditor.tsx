import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ImageIcon, Save, Plus
} from 'lucide-react';
import { ContentPost, MediaFile, Status } from '../../../types';
import { RichTextEditor } from '../../RichTextEditor';
import { useTheme } from '../../../contexts/ThemeContext';
import MediaLibraryView from '../../../pages/MediaLibraryView';

interface ArticleStudioEditorProps {
   post: ContentPost;
   onSave: (post: ContentPost) => void;
   onClose: () => void;
   mediaFiles: MediaFile[];
   onUploadMedia: (file: MediaFile) => void;
}

const ArticleStudioEditor: React.FC<ArticleStudioEditorProps> = ({ 
  post, onSave, onClose, mediaFiles, onUploadMedia 
}) => {
  const { t } = useTheme();
  const [editingPost, setEditingPost] = useState<ContentPost>(post);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [activeMode, setActiveMode] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
     setEditingPost(post);
  }, [post]);

  return (
    <div className="flex flex-col h-full bg-bgMain font-serif animate-fadeIn">
       <div className="min-h-[4rem] border-b border-borderDark flex flex-wrap items-center justify-between px-4 md:px-8 bg-cardBg shrink-0 z-40 py-2 gap-4">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
             <button onClick={onClose} className="p-2 hover:bg-bgSidebar rounded-full text-textMuted transition-all shrink-0"><ArrowLeft size={20} /></button>
             <div className="h-6 w-px bg-borderDark hidden md:block"></div>
             <div className="flex bg-bgSidebar border border-borderDark p-1 rounded-full shrink-0">
                <button 
                  onClick={() => setActiveMode('editor')}
                  className={`px-4 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeMode === 'editor' ? 'bg-accent text-bgMain shadow-md' : 'text-textMuted hover:text-textMain'}`}
                >
                   Editor
                </button>
                <button 
                  onClick={() => setActiveMode('preview')}
                  className={`px-4 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeMode === 'preview' ? 'bg-accent text-bgMain shadow-md' : 'text-textMuted hover:text-textMain'}`}
                >
                   Preview
                </button>
             </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
             <div className="hidden sm:flex items-center gap-2 bg-bgSidebar px-3 py-1.5 border border-borderDark rounded-md shadow-inner">
                <span className="text-[10px] font-black text-textMuted uppercase tracking-widest">Status:</span>
                <select 
                  value={editingPost.status}
                  onChange={e => setEditingPost({...editingPost, status: e.target.value as Status})}
                  className="bg-transparent text-[10px] font-black uppercase tracking-widest text-accent outline-none cursor-pointer"
                >
                   <option value="Draft">Draft</option>
                   <option value="Published">Publish</option>
                   <option value="Scheduled">Scheduled</option>
                </select>
             </div>
             
             <button onClick={() => { onSave(editingPost); onClose(); }} className="bg-accent text-bgMain px-6 md:px-10 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-accentHover transition-all flex items-center gap-2 rounded-sm active:scale-95">
                <Save size={14}/> Saqlash
             </button>
          </div>
       </div>

       {activeMode === 'editor' ? (
          <div className="flex-1 overflow-y-auto p-4 md:p-12 lg:p-20 bg-bgMain custom-scrollbar animate-fadeIn">
             <div className="max-w-4xl mx-auto space-y-10 md:space-y-16 pb-40">
                <div className="space-y-4">
                   <label className="text-[10px] font-black text-textMuted uppercase tracking-[0.3em] ml-1">Material Muqovasi</label>
                   <div 
                     onClick={() => setShowMediaModal(true)}
                     className="aspect-[21/9] bg-cardBg border-2 border-dashed border-borderDark hover:border-accent transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center group shadow-sm rounded-lg"
                   >
                      {editingPost.coverImage ? (
                         <img src={editingPost.coverImage} className="w-full h-full object-cover filter sepia-[.1] group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                         <div className="flex flex-col items-center gap-3 text-textMuted group-hover:text-accent transition-colors">
                            <ImageIcon size={48} className="opacity-20 md:w-16 md:h-16" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Muqova tanlang</span>
                         </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-[2px]">Almashtirish</div>
                   </div>
                </div>

                <div className="space-y-4">
                   <label className="text-[10px] font-black text-textMuted uppercase tracking-[0.3em] ml-1">Sarlavha</label>
                   <textarea 
                      value={editingPost.title}
                      onChange={e => {
                         e.target.style.height = 'auto';
                         e.target.style.height = e.target.scrollHeight + 'px';
                         setEditingPost({...editingPost, title: e.target.value, name: e.target.value});
                      }}
                      placeholder="Material sarlavhasi..."
                      className="w-full text-3xl md:text-5xl lg:text-7xl font-caslon font-bold bg-transparent outline-none resize-none overflow-hidden placeholder:text-textMuted/20 border-b-2 border-transparent focus:border-accent/10 pb-4 transition-all leading-tight text-textMain"
                      rows={1}
                   />
                </div>

                <div className="space-y-4">
                   <label className="text-[10px] font-black text-textMuted uppercase tracking-[0.3em] ml-1">Maqola matni</label>
                   <div className="min-h-[500px] md:min-h-[700px] bg-cardBg border border-borderDark shadow-2xl overflow-hidden rounded-lg">
                      <RichTextEditor 
                         content={editingPost.content || ''} 
                         onChange={c => setEditingPost({...editingPost, content: c})}
                         onRequestMedia={() => setShowMediaModal(true)} 
                      />
                   </div>
                </div>
             </div>
          </div>
       ) : (
          <div className="flex-1 bg-bgSidebar backdrop-blur-xl overflow-y-auto custom-scrollbar p-4 md:p-12 lg:p-24 animate-fadeIn">
             <div className="max-w-6xl mx-auto space-y-12 pb-32">
                <div className="bg-cardBg border border-borderDark shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden font-serif min-h-[700px] md:min-h-[1000px] rounded-sm">
                   <div className="h-60 md:h-[600px] relative overflow-hidden bg-bgSidebar">
                      {editingPost.coverImage ? (
                         <img src={editingPost.coverImage} className="w-full h-full object-cover filter sepia-[.1] brightness-90" />
                      ) : (
                         <div className="w-full h-full flex items-center justify-center text-textMuted opacity-10"><ImageIcon size={120}/></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute bottom-8 left-8 md:bottom-20 md:left-20 max-w-4xl pr-8">
                         <div className="flex items-center gap-3 text-accent font-sans text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                            <span>{editingPost.category} / {editingPost.domain}</span>
                         </div>
                         <h1 className="text-2xl md:text-6xl lg:text-8xl font-caslon text-white font-bold leading-[0.95] tracking-tighter uppercase">{editingPost.title || 'Sarlavhasiz material'}</h1>
                      </div>
                   </div>
                   <div className="p-8 md:p-24">
                      <div className="max-w-3xl mx-auto">
                         <div 
                           className="prose-editor text-base md:text-2xl !bg-transparent !p-0 text-textMain opacity-90 leading-relaxed" 
                           dangerouslySetInnerHTML={{ __html: editingPost.content || '<p class="text-textMuted italic text-center py-20">Matn hali kiritilmagan...</p>' }} 
                         />
                      </div>
                   </div>
                </div>
             </div>
          </div>
       )}

       {showMediaModal && (
          <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-12">
             <div className="bg-bgMain w-full max-w-6xl h-[85vh] md:h-[90vh] border border-borderDark shadow-2xl overflow-hidden relative rounded-xl">
                <button onClick={() => setShowMediaModal(false)} className="absolute top-4 right-4 z-50 p-2 bg-cardBg rounded-full text-textMain shadow-2xl hover:text-red-500 transition-all border border-borderDark"><Plus className="rotate-45" size={24}/></button>
                <MediaLibraryView 
                  files={mediaFiles} 
                  onUpload={onUploadMedia} 
                  isSelectMode={true} 
                  onSelect={(file) => { setEditingPost({...editingPost, coverImage: file.url || ''}); setShowMediaModal(false); }} 
                />
             </div>
          </div>
       )}
    </div>
  );
};

export default ArticleStudioEditor;