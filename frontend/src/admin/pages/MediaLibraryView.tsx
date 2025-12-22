
import React, { useState, useRef } from 'react';
import { 
   Upload, 
   Image as ImageIcon, 
   Film, 
   File as FileIcon, 
   Search, 
   Grid, 
   List, 
   Trash2,
   Download,
   X,
   Tag,
   Layers,
   Shapes,
   Box,
   Music,
   Edit3,
   Check,
   Save
} from 'lucide-react';
import { MediaType, MediaFile } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface PendingUpload {
    file: File;
    name: string;
    tags: string;
}

interface MediaLibraryViewProps {
   files: MediaFile[];
   onUpload: (file: MediaFile) => void;
   onDelete?: (id: string) => void;
   onEdit?: (id: string, updates: Partial<MediaFile>) => void;
   onSelect?: (file: MediaFile) => void;
   isSelectMode?: boolean;
}

const MediaLibraryView: React.FC<MediaLibraryViewProps> = ({ 
   files, onUpload, onDelete, onEdit, onSelect, isSelectMode = false 
}) => {
  const { t } = useTheme();
  const [filter, setFilter] = useState<'all' | MediaType>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingFile, setEditingFile] = useState<MediaFile | null>(null);
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [uploaderName, setUploaderName] = useState('Admin');

  const filteredFiles = files.filter(f => 
     (filter === 'all' || f.type === filter) &&
     (f.name.toLowerCase().includes(search.toLowerCase()) || f.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase())))
  );

  const getMediaType = (file: File): MediaType => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext || '')) return 'image';
      if (['mp4', 'mov', 'avi', 'mkv'].includes(ext || '')) return 'video';
      if (['pdf', 'docx', 'xlsx', 'txt', 'pptx'].includes(ext || '')) return 'doc';
      if (['svg', 'ai', 'eps', 'fig'].includes(ext || '')) return 'vector';
      if (['mp3', 'wav', 'ogg'].includes(ext || '')) return 'audio';
      return 'other';
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files || []) as File[];
      if (selected.length > 0) {
          const uploads = selected.map(file => ({
              file,
              name: file.name,
              tags: getMediaType(file).toUpperCase()
          }));
          setPendingUploads(uploads);
          setShowUploadModal(true);
      }
      if (e.target) e.target.value = '';
  };

  const handleUpdatePending = (index: number, updates: Partial<PendingUpload>) => {
      setPendingUploads(prev => prev.map((item, i) => i === index ? { ...item, ...updates } : item));
  };

  const handleUploadAll = () => {
     pendingUploads.forEach(item => {
        const type = getMediaType(item.file);
        const newFile: MediaFile = {
           id: Math.random().toString(36).substring(7),
           name: item.name,
           type: type,
           size: (item.file.size / (1024 * 1024)).toFixed(2) + ' MB',
           date: 'Bugun',
           url: URL.createObjectURL(item.file),
           uploader: uploaderName,
           tags: item.tags.split(',').map(t => t.trim()).filter(t => !!t)
        };
        onUpload(newFile);
     });
     setShowUploadModal(false);
     setPendingUploads([]);
  };

  const handleStartEdit = (file: MediaFile) => {
     setEditingFile(file);
     setShowEditModal(true);
  };

  const handleSaveEdit = () => {
      if (editingFile && onEdit) {
          onEdit(editingFile.id, { 
             name: editingFile.name, 
             tags: editingFile.tags 
          });
          setShowEditModal(false);
          setEditingFile(null);
      }
  };

  return (
    <div className="p-4 md:p-10 animate-fadeIn bg-bgMain font-serif relative z-10 pb-32">
       <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileSelect} />

       <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 border-b border-borderDark pb-10">
          <div className="text-center lg:text-left relative">
             <h1 className="text-3xl md:text-5xl font-caslon text-textMain flex items-center justify-center lg:justify-start gap-5 uppercase tracking-widest font-bold">
                {t('media_library')} 
                <span className="text-[11px] bg-accent px-4 py-1 text-bgMain font-sans font-black tracking-[0.2em] shadow-lg rounded-full">{files.length}</span>
             </h1>
             <p className="text-textMuted text-sm font-serif italic mt-3 opacity-70">Raqamli arxiv aktivlarini boshqarish markazi.</p>
          </div>
          <button 
             onClick={() => fileInputRef.current?.click()}
             className="flex items-center justify-center gap-3 bg-accent hover:bg-accentHover text-bgMain px-10 py-4 text-[11px] font-black shadow-2xl transition-all uppercase tracking-[0.2em] font-sans active:scale-95 rounded-sm"
          >
             <Upload size={18} /> {t('upload_multi')}
          </button>
       </div>

       <div className="flex flex-col gap-8 mb-12">
          <div className="relative group w-full max-w-5xl mx-auto lg:mx-0">
             <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-accent transition-colors" />
             <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-cardBg border border-borderDark py-5 pl-14 pr-8 text-base text-textMain outline-none focus:border-accent transition-all font-sans shadow-inner placeholder:text-textMuted/40 rounded-2xl"
                placeholder={t('search_placeholder')}
             />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
             <div className="flex items-center gap-2 bg-bgSidebar p-1.5 border border-borderDark w-full lg:w-fit overflow-x-auto custom-scrollbar no-scrollbar shadow-inner rounded-2xl scroll-smooth">
                <FilterTab active={filter === 'all'} onClick={() => setFilter('all')} label={t('all_files')} />
                <FilterTab active={filter === 'image'} onClick={() => setFilter('image')} label={t('images')} />
                <FilterTab active={filter === 'video'} onClick={() => setFilter('video')} label={t('videos')} />
                <FilterTab active={filter === 'doc'} onClick={() => setFilter('doc')} label={t('documents')} />
                <FilterTab active={filter === 'vector'} onClick={() => setFilter('vector')} label={t('filter_vector')} />
                <FilterTab active={filter === 'other'} onClick={() => setFilter('other')} label={t('filter_other')} />
             </div>

             <div className="flex bg-cardBg border border-borderDark p-1 shrink-0 gap-1 shadow-md self-stretch lg:self-auto justify-center rounded-2xl">
                <button onClick={() => setView('grid')} className={`p-3 transition-all rounded-xl ${view === 'grid' ? 'bg-accent text-bgMain shadow-lg' : 'text-textMuted hover:text-textMain'}`}><Grid size={22} /></button>
                <button onClick={() => setView('list')} className={`p-3 transition-all rounded-xl ${view === 'list' ? 'bg-accent text-bgMain shadow-lg' : 'text-textMuted hover:text-textMain'}`}><List size={22} /></button>
             </div>
          </div>
       </div>

       <div>
          {filteredFiles.length > 0 ? (
             <div className={`grid gap-6 md:gap-10 ${view === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8' : 'grid-cols-1'}`}>
                {filteredFiles.map(file => (
                   <MediaItem 
                     key={file.id} 
                     file={file} 
                     view={view} 
                     onSelect={onSelect} 
                     isSelectMode={isSelectMode} 
                     onDelete={() => onDelete?.(file.id)}
                     onEdit={() => handleStartEdit(file)}
                   />
                ))}
             </div>
          ) : (
             <div className="flex flex-col items-center justify-center min-h-[400px] text-textMuted border-4 border-dashed border-borderDark/20 bg-cardBg/10 opacity-30 rounded-3xl animate-pulse">
                <Search size={80} className="mb-8" />
                <p className="font-caslon text-4xl uppercase tracking-[0.2em] font-bold">{t('no_data')}</p>
             </div>
          )}
       </div>

       {showEditModal && editingFile && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-xl p-4">
             <div className="bg-bgMain w-full max-w-md border border-borderDark shadow-2xl p-10 relative animate-slideDown font-serif rounded-2xl">
                <button onClick={() => setShowEditModal(false)} className="absolute top-6 right-6 text-textMuted hover:text-red-500 transition-colors"><X size={24}/></button>
                <h2 className="text-2xl md:text-3xl font-caslon text-textMain uppercase tracking-widest mb-8 border-b border-borderDark pb-4 font-bold">Tahrirlash</h2>
                <div className="space-y-6 font-sans">
                   <div className="space-y-2">
                      <label className="block text-[9px] font-black text-textMuted uppercase tracking-widest ml-1">{t('file_name')}</label>
                      <input 
                         value={editingFile.name} 
                         onChange={e => setEditingFile({ ...editingFile, name: e.target.value })}
                         className="w-full bg-cardBg border border-borderDark p-3.5 text-sm text-textMain outline-none focus:border-accent font-bold rounded-xl shadow-inner" 
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="block text-[9px] font-black text-textMuted uppercase tracking-widest ml-1">{t('tags')}</label>
                      <input 
                         value={editingFile.tags?.join(', ')} 
                         onChange={e => setEditingFile({ ...editingFile, tags: e.target.value.split(',').map(t => t.trim()) })}
                         className="w-full bg-cardBg border border-borderDark p-3.5 text-sm text-textMain outline-none focus:border-accent rounded-xl shadow-inner" 
                      />
                   </div>
                   <button onClick={handleSaveEdit} className="w-full bg-accent text-bgMain py-4 font-black uppercase tracking-[0.3em] text-[10px] mt-6 hover:bg-accentHover shadow-2xl flex items-center justify-center gap-3 rounded-xl transition-all active:scale-95">
                      <Save size={18} /> {t('save').toUpperCase()}
                   </button>
                </div>
             </div>
          </div>
       )}

       {showUploadModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-2xl p-4">
             <div className="bg-bgMain w-full max-w-4xl border border-borderDark shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] p-6 md:p-10 relative animate-slideDown font-serif flex flex-col max-h-[90vh] rounded-3xl">
                <button onClick={() => setShowUploadModal(false)} className="absolute top-6 right-6 text-textMuted hover:text-red-500 transition-all p-2"><X size={28}/></button>
                
                <div className="mb-8 border-b border-borderDark pb-6">
                    <h2 className="text-3xl md:text-4xl font-caslon text-textMain uppercase tracking-tighter mb-2 font-bold">Fayllar tayyor</h2>
                    <p className="text-accent text-[10px] uppercase font-sans font-black tracking-[0.2em] opacity-80">{pendingUploads.length} ta yangi aktiv bazaga qo'shishga tayyor</p>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-3 mb-8 font-sans overscroll-contain">
                    {pendingUploads.map((item, i) => (
                       <div key={i} className="p-4 bg-bgSidebar border border-borderDark flex flex-col sm:flex-row gap-5 group transition-all hover:border-accent/40 items-center rounded-2xl shadow-sm">
                          <div className="w-14 h-14 bg-accent/5 flex items-center justify-center text-accent shrink-0 border border-accent/10 rounded-xl shadow-inner">
                             {getMediaType(item.file) === 'image' ? <ImageIcon size={28}/> : <FileIcon size={28}/>}
                          </div>
                          
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                              <div className="space-y-1">
                                  <label className="block text-[8px] font-black text-textMuted uppercase tracking-widest ml-1">{t('file_name')}</label>
                                  <input 
                                     value={item.name} 
                                     onChange={e => handleUpdatePending(i, { name: e.target.value })}
                                     className="w-full bg-cardBg border border-borderDark p-2 text-xs text-textMain outline-none focus:border-accent font-bold rounded-lg shadow-inner" 
                                  />
                              </div>
                              <div className="space-y-1">
                                  <label className="block text-[8px] font-black text-textMuted uppercase tracking-widest ml-1">{t('tags')}</label>
                                  <input 
                                     value={item.tags} 
                                     onChange={e => handleUpdatePending(i, { tags: e.target.value })}
                                     className="w-full bg-cardBg border border-borderDark p-2 text-xs text-textMain outline-none focus:border-accent rounded-lg shadow-inner" 
                                     placeholder="Render, 3D, Mockup..."
                                  />
                              </div>
                          </div>
                          
                          <button onClick={() => setPendingUploads(prev => prev.filter((_, idx) => idx !== i))} className="p-2 text-textMuted hover:text-red-500 transition-colors bg-cardBg border border-borderDark rounded-full shadow-sm"><Trash2 size={16}/></button>
                       </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 font-sans pt-6 border-t border-borderDark">
                    <div className="space-y-2">
                        <label className="block text-[9px] font-black text-textMuted uppercase tracking-[0.2em] ml-1">{t('uploader_label')}</label>
                        <input value={uploaderName} onChange={e => setUploaderName(e.target.value)} className="w-full bg-cardBg border border-borderDark p-3 text-sm text-textMain outline-none focus:border-accent font-bold rounded-xl shadow-inner" />
                    </div>
                </div>

                <button onClick={handleUploadAll} className="w-full bg-accent text-bgMain py-5 font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl hover:bg-accentHover transition-all active:scale-[0.99] rounded-xl">{t('confirm_upload').toUpperCase()}</button>
             </div>
          </div>
       )}
    </div>
  );
};

const FilterTab: React.FC<{ active: boolean, onClick: () => void, label: string }> = ({ active, onClick, label }) => (
   <button onClick={onClick} className={`px-6 py-3 text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap rounded-xl ${active ? 'bg-accent text-bgMain shadow-lg' : 'text-textMuted hover:text-textMain hover:bg-cardBg'}`}>
      {label}
   </button>
);

const MediaItem: React.FC<{ 
   file: MediaFile, view: 'grid' | 'list', onSelect?: (f: MediaFile) => void, isSelectMode: boolean, 
   onDelete: () => void, onEdit: () => void 
}> = ({ file, view, onSelect, isSelectMode, onDelete, onEdit }) => {
   const getIcon = () => {
      switch(file.type) {
         case 'image': return <ImageIcon size={22} className="text-accent" />;
         case 'video': return <Film size={22} className="text-accent" />;
         case 'doc': return <FileIcon size={22} className="text-textMuted" />;
         case 'vector': return <Shapes size={22} className="text-accent" />;
         case 'audio': return <Music size={22} className="text-accent" />;
         default: return <Box size={22} className="text-textMuted" />;
      }
   };

   const getBg = () => {
      return 'bg-bgSidebar backdrop-blur-md';
   };

   const tags = file.tags || [];

   if (view === 'list') {
      return (
         <div onClick={() => isSelectMode && onSelect?.(file)} className={`flex items-center gap-5 bg-cardBg border border-borderDark p-4 hover:border-accent transition-all group shadow-sm rounded-2xl ${isSelectMode ? 'cursor-pointer border-accent ring-2 ring-accent/10' : ''}`}>
            <div className={`w-14 h-14 border border-borderDark flex items-center justify-center shrink-0 shadow-inner rounded-xl overflow-hidden ${getBg()}`}>
               {file.type === 'image' && file.url ? <img src={file.url} className="w-full h-full object-cover transition-all duration-500" /> : getIcon()}
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-base font-bold text-textMain truncate font-caslon uppercase tracking-widest leading-none mb-1.5">{file.name}</p>
               <div className="flex flex-wrap gap-1.5 mt-2">
                  {tags.map((tag) => (
                    <span key={tag} className="text-[7px] bg-accent/5 text-accent px-2 py-0.5 font-black uppercase tracking-widest border border-accent/10 rounded-full">{tag}</span>
                  ))}
               </div>
            </div>
            <div className="text-right hidden xl:block px-8 border-l border-borderDark/20">
               <p className="text-[10px] text-textMain font-black uppercase tracking-widest leading-none mb-1">{file.uploader || 'Admin'}</p>
               <p className="text-[9px] text-textMuted opacity-50 font-mono font-bold">{file.date}</p>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
               <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="p-2.5 text-textMuted hover:text-accent hover:bg-accent/10 rounded-full transition-all border border-transparent hover:border-accent/10 shadow-inner"><Edit3 size={18}/></button>
               <button onClick={(e) => { e.stopPropagation(); if(confirm("O'chirish?")) onDelete(); }} className="p-2.5 text-textMuted hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-full transition-all border border-transparent hover:border-red-100 shadow-inner"><Trash2 size={18}/></button>
            </div>
         </div>
      );
   }

   return (
      <div onClick={() => isSelectMode && onSelect?.(file)} className={`bg-cardBg border border-borderDark p-3 group hover:border-accent transition-all relative shadow-lg rounded-2xl ${isSelectMode ? 'cursor-pointer border-accent border-2 ring-4 ring-accent/10' : ''}`}>
         <div className={`aspect-square mb-4 flex items-center justify-center relative overflow-hidden border border-borderDark shadow-inner rounded-xl ${getBg()}`}>
            {file.type === 'image' && file.url ? (
                <img src={file.url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125" />
            ) : (
                <div className="scale-150 opacity-80 transition-transform group-hover:scale-[2] duration-500">{getIcon()}</div>
            )}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
               {tags.slice(0, 1).map((tag) => (
                 <span key={tag} className="text-[6px] bg-black/80 text-white px-2 py-0.5 font-black uppercase tracking-widest backdrop-blur-md border border-white/10 rounded-full">{tag}</span>
               ))}
            </div>
            
            {!isSelectMode && (
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="p-3 bg-cardBg text-accent rounded-full shadow-2xl hover:scale-125 transition-transform border border-borderDark"><Edit3 size={18}/></button>
                  <button onClick={(e) => { e.stopPropagation(); if(confirm("O'chirish?")) onDelete(); }} className="p-3 bg-cardBg text-red-600 rounded-full shadow-2xl hover:scale-125 transition-transform border border-borderDark"><Trash2 size={18}/></button>
               </div>
            )}
         </div>
         <div className="min-w-0 px-1">
            <p className="text-[11px] font-bold text-textMain truncate mb-2 font-caslon uppercase tracking-widest leading-none">{file.name}</p>
            <div className="flex items-center justify-between text-[8px] text-textMuted font-sans font-black uppercase tracking-widest border-t border-borderDark/20 pt-3 opacity-60 italic">
               <span className="truncate max-w-[60%]">{file.uploader || 'Admin'}</span>
               <span className="font-mono bg-bgSidebar px-1.5 py-0.5 border border-borderDark rounded-md shadow-sm">{file.size}</span>
            </div>
         </div>
      </div>
   );
}

export default MediaLibraryView;
