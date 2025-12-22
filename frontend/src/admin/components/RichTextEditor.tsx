
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, 
  Video, AlignLeft, AlignCenter, AlignRight, ChevronDown, 
  Quote, RemoveFormatting, Table, Trash2, 
  Type as TypeIcon, X, Check, Upload, Download, FileText, Code, 
  Plus, Minus, Highlighter, Palette, ExternalLink, Type, File
} from 'lucide-react';
import { MediaFile } from '../types';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  onRequestMedia?: (type: 'image' | 'video' | 'file') => void;
}

const FONT_SIZES = ['12px', '14px', '16px', '18px', '20px', '24px', '32px', '48px'];
const FONTS = ["'Libre Caslon Text', serif", "'Inter', sans-serif", "'Merriweather', serif", "monospace"];

const EDITOR_CSS = `
  .prose-editor { 
      font-family: 'Libre Caslon Text', serif; 
      color: #37352F; 
      line-height: 1.6; 
      min-height: 600px; 
      outline: none;
      padding-bottom: 200px;
      font-size: 16px;
      transition: all 0.2s ease;
  }
  .prose-editor p { margin: 0 0 1rem 0; }
  .prose-editor a { color: #176f6f; text-decoration: underline; cursor: pointer; }
  .prose-editor ul { list-style-type: disc; padding-left: 1.5rem; margin: 1rem 0; }
  .prose-editor ol { list-style-type: decimal; padding-left: 1.5rem; margin: 1rem 0; }
  .prose-editor blockquote { border-left: 4px solid #176f6f; padding: 0.5rem 1rem; margin: 1rem 0; background: #f9f9f9; font-style: italic; }
  
  /* Placeholder support */
  .prose-editor:empty:before {
    content: attr(placeholder);
    color: #a0a0a0;
    pointer-events: none;
    display: block;
  }

  /* Table Styles with Resize Support */
  .prose-editor table { border-collapse: collapse; width: 100%; margin: 1.5rem 0; table-layout: fixed; border: 1px solid #e0e0e0; }
  .prose-editor td, .prose-editor th { 
      border: 1px solid #e0e0e0; 
      padding: 12px; 
      min-width: 50px; 
      vertical-align: top; 
      position: relative; 
      overflow: auto;
      resize: horizontal; /* Ustun o'lchamini o'zgartirish (drag) */
  }
  .prose-editor th { background-color: #f7f7f5; font-weight: bold; text-align: left; }
  .prose-editor img, .prose-editor video { max-width: 100%; height: auto; border-radius: 4px; display: block; margin: 1.5rem 0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
  
  .prose-editor *:focus { background: rgba(23, 111, 111, 0.02); }
`;

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, placeholder, onRequestMedia }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [lastHtml, setLastHtml] = useState(content);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const [showFontSizeMenu, setShowFontSizeMenu] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [linkModal, setLinkModal] = useState({ open: false, url: '', text: '', blank: true });
  const [colorMenu, setColorMenu] = useState<{ type: 'text' | 'bg', open: boolean }>({ type: 'text', open: false });
  const [selectedTable, setSelectedTable] = useState<HTMLTableElement | null>(null);
  const savedRange = useRef<Range | null>(null);

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && editorRef.current?.contains(sel.anchorNode)) {
      savedRange.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (sel && savedRange.current) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      if (html !== lastHtml) {
        setLastHtml(html);
        onChange(html);
      }
      checkFormats();
    }
  };

  const exec = (command: string, value?: string) => {
    restoreSelection();
    document.execCommand('styleWithCSS', false, 'true');
    
    if (command === 'fontSize') {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const span = document.createElement('span');
            span.style.fontSize = value || '16px';
            const range = selection.getRangeAt(0);
            try {
                range.surroundContents(span);
            } catch (e) {
                // Agar selection bir nechta block elementlarni kessa, fallback:
                document.execCommand('fontSize', false, '3'); // standard size
            }
        }
    } else if (command === 'fontName') {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const span = document.createElement('span');
            span.style.fontFamily = value || 'inherit';
            const range = selection.getRangeAt(0);
            try {
                range.surroundContents(span);
            } catch (e) {
                document.execCommand('fontName', false, value);
            }
        }
    } else {
        document.execCommand(command, false, value);
    }
    
    editorRef.current?.focus();
    saveSelection();
    handleInput();
  };

  const checkFormats = () => {
    const formats = [];
    if (document.queryCommandState('bold')) formats.push('bold');
    if (document.queryCommandState('italic')) formats.push('italic');
    if (document.queryCommandState('underline')) formats.push('underline');
    setActiveFormats(formats);
  };

  const insertLink = () => {
    restoreSelection();
    const html = `<a href="${linkModal.url}" ${linkModal.blank ? 'target="_blank"' : ''}>${linkModal.text || linkModal.url}</a>`;
    exec('insertHTML', html);
    setLinkModal({ ...linkModal, open: false });
  };

  const insertTable = () => {
    const html = `<table><tbody><tr><th>Header 1</th><th>Header 2</th></tr><tr><td>Data 1</td><td>Data 2</td></tr></tbody></table><p><br/></p>`;
    exec('insertHTML', html);
  };

  const manipulateTable = (action: 'row+' | 'row-' | 'col+' | 'col-' | 'del') => {
    if (!selectedTable) return;
    const selection = window.getSelection();
    const activeCell = selection?.anchorNode?.parentElement?.closest('td, th') as HTMLTableCellElement;
    if (!activeCell) return;
    
    const row = activeCell.parentElement as HTMLTableRowElement;
    const rowIndex = row.rowIndex;
    const colIndex = activeCell.cellIndex;

    switch(action) {
      case 'del':
        selectedTable.remove();
        setSelectedTable(null);
        break;
      case 'row+':
        const newRow = selectedTable.insertRow(rowIndex + 1);
        for (let i = 0; i < selectedTable.rows[0].cells.length; i++) {
            newRow.insertCell().innerHTML = '<br>';
        }
        break;
      case 'row-':
        selectedTable.deleteRow(rowIndex);
        if (selectedTable.rows.length === 0) {
            selectedTable.remove();
            setSelectedTable(null);
        }
        break;
      case 'col+':
        Array.from(selectedTable.rows).forEach(r => {
            const newCell = r.insertCell(colIndex + 1);
            newCell.innerHTML = '<br>';
        });
        break;
      case 'col-':
        Array.from(selectedTable.rows).forEach(r => {
            if (r.cells.length > colIndex) r.deleteCell(colIndex);
        });
        if (selectedTable.rows[0]?.cells.length === 0) {
            selectedTable.remove();
            setSelectedTable(null);
        }
        break;
    }
    handleInput();
  };

  return (
    <div className="flex flex-col w-full bg-white text-[#37352F] border border-[#e0e0e0] rounded shadow-sm relative font-sans">
      <style>{EDITOR_CSS}</style>
      
      {/* NOTION-STYLE TOOLBAR (Screenshot bilan moslashtirilgan) */}
      <div className="bg-white border-b border-[#f1f1ef] p-1.5 flex flex-wrap gap-0.5 items-center z-30 sticky top-0 shadow-sm overflow-x-auto no-scrollbar">
        <ToolbarBtn icon={<Bold size={16}/>} active={activeFormats.includes('bold')} onClick={() => exec('bold')} />
        <ToolbarBtn icon={<Italic size={16}/>} active={activeFormats.includes('italic')} onClick={() => exec('italic')} />
        <ToolbarBtn icon={<Underline size={16}/>} active={activeFormats.includes('underline')} onClick={() => exec('underline')} />
        
        <div className="w-px h-4 bg-gray-200 mx-1"></div>
        
        {/* Font Picker */}
        <div className="relative">
            <button onClick={() => setShowFontMenu(!showFontMenu)} className="flex items-center gap-1 px-2 py-1.5 hover:bg-gray-100 rounded text-[11px] font-bold uppercase transition-all">
                FONT <ChevronDown size={10} />
            </button>
            {showFontMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-xl p-1 z-50 w-48 animate-popIn">
                    {FONTS.map(f => (
                        <button 
                            key={f} 
                            onClick={() => { exec('fontName', f); setShowFontMenu(false); }} 
                            className="w-full text-left px-3 py-2 text-xs hover:bg-[#176f6f] hover:text-white transition-colors" 
                            style={{ fontFamily: f }}
                        >
                            {f.replace(/'/g, '').split(',')[0]}
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Font Size Picker */}
        <div className="relative">
            <button onClick={() => setShowFontSizeMenu(!showFontSizeMenu)} className="flex items-center gap-1 px-2 py-1.5 hover:bg-gray-100 rounded text-[11px] font-bold transition-all">
                <Type size={16} /> <ChevronDown size={10} />
            </button>
            {showFontSizeMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-xl p-1 z-50 w-24 animate-popIn">
                    {FONT_SIZES.map(size => (
                        <button key={size} onClick={() => { exec('fontSize', size); setShowFontSizeMenu(false); }} className="w-full text-left px-3 py-2 text-xs hover:bg-[#176f6f] hover:text-white transition-colors font-bold">
                            {size}
                        </button>
                    ))}
                </div>
            )}
        </div>

        <div className="w-px h-4 bg-gray-200 mx-1"></div>
        
        <ToolbarBtn icon={<Palette size={16}/>} onClick={() => setColorMenu({ type: 'text', open: !colorMenu.open })} />
        <ToolbarBtn icon={<Highlighter size={16}/>} onClick={() => setColorMenu({ type: 'bg', open: !colorMenu.open })} />
        
        <div className="w-px h-4 bg-gray-200 mx-1"></div>
        
        <ToolbarBtn icon={<AlignLeft size={16}/>} onClick={() => exec('justifyLeft')} />
        <ToolbarBtn icon={<AlignCenter size={16}/>} onClick={() => exec('justifyCenter')} />
        <ToolbarBtn icon={<AlignRight size={16}/>} onClick={() => exec('justifyRight')} />
        
        <div className="w-px h-4 bg-gray-200 mx-1"></div>
        
        <ToolbarBtn icon={<List size={16}/>} onClick={() => exec('insertUnorderedList')} />
        <ToolbarBtn icon={<ListOrdered size={16}/>} onClick={() => exec('insertOrderedList')} />
        <ToolbarBtn icon={<Quote size={16}/>} onClick={() => exec('formatBlock', 'blockquote')} />
        
        <div className="w-px h-4 bg-gray-200 mx-1"></div>
        
        <ToolbarBtn icon={<LinkIcon size={16}/>} onClick={() => setLinkModal({ ...linkModal, open: true })} />
        <ToolbarBtn icon={<ImageIcon size={16}/>} onClick={() => onRequestMedia?.('image')} />
        <ToolbarBtn icon={<Video size={16}/>} onClick={() => onRequestMedia?.('video')} />
        <ToolbarBtn icon={<File size={16}/>} onClick={() => onRequestMedia?.('file')} />
        <ToolbarBtn icon={<Table size={16}/>} onClick={insertTable} />
        
        <div className="ml-auto flex items-center gap-1">
          <ToolbarBtn icon={<RemoveFormatting size={16}/>} onClick={() => exec('removeFormat')} />
        </div>
      </div>

      {/* CONTEXTUAL TABLE MENU */}
      {selectedTable && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white border border-[#176f6f] shadow-2xl rounded-full px-4 py-2 flex gap-4 items-center text-[10px] z-50 animate-popIn font-black uppercase tracking-widest">
           <div className="flex items-center gap-2 border-r border-gray-100 pr-3">
             <button onClick={() => manipulateTable('row+')} className="hover:text-[#176f6f] flex items-center gap-1">Qator <Plus size={12}/></button>
             <button onClick={() => manipulateTable('row-')} className="hover:text-red-500"><Minus size={12}/></button>
           </div>
           <div className="flex items-center gap-2 border-r border-gray-100 pr-3">
             <button onClick={() => manipulateTable('col+')} className="hover:text-[#176f6f] flex items-center gap-1">Ustun <Plus size={12}/></button>
             <button onClick={() => manipulateTable('col-')} className="hover:text-red-500"><Minus size={12}/></button>
           </div>
           <button onClick={() => manipulateTable('del')} className="text-red-500 hover:scale-110 transition-transform"><Trash2 size={16}/></button>
        </div>
      )}

      {/* COLOR PICKER */}
      {colorMenu.open && (
        <div className="absolute top-14 left-10 bg-white border border-gray-200 shadow-2xl p-4 z-50 animate-popIn w-64">
           <div className="flex items-center justify-between mb-3 border-b pb-2">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Rang tanlash</span>
              <button onClick={() => setColorMenu({ ...colorMenu, open: false })}><X size={14}/></button>
           </div>
           <div className="grid grid-cols-5 gap-2">
              {['#000000', '#D9730D', '#448361', '#337EA9', '#9065B0', '#C14C8A', '#D44C47', '#E0E0E0', '#FFFFFF'].map(c => (
                <button 
                  key={c} 
                  onClick={() => { exec(colorMenu.type === 'text' ? 'foreColor' : 'hiliteColor', c); setColorMenu({ ...colorMenu, open: false }); }}
                  className="w-8 h-8 rounded-sm border border-gray-100 hover:scale-110 transition-transform shadow-sm"
                  style={{ backgroundColor: c }}
                />
              ))}
           </div>
        </div>
      )}

      {/* EDITOR AREA */}
      <div className="flex-1 overflow-y-auto bg-transparent p-12 min-h-[600px] cursor-text" onClick={() => editorRef.current?.focus()}>
        <div 
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onMouseUp={() => { saveSelection(); checkFormats(); }}
          onKeyUp={saveSelection}
          onClick={(e) => {
            const table = (e.target as HTMLElement).closest('table');
            setSelectedTable(table as HTMLTableElement);
          }}
          className="prose-editor max-w-4xl mx-auto"
          // @ts-ignore
          placeholder={placeholder || "Matn yozishni boshlang..."}
        />
      </div>
    </div>
  );
};

const ToolbarBtn = ({ icon, onClick, active }: any) => (
  <button 
    onMouseDown={(e) => e.preventDefault()} 
    onClick={onClick} 
    className={`p-2 rounded transition-all flex items-center justify-center ${active ? 'bg-[#176f6f]/10 text-[#176f6f] font-bold' : 'text-[#787774] hover:bg-gray-100 hover:text-[#37352F]'}`}
  >
    {icon}
  </button>
);
