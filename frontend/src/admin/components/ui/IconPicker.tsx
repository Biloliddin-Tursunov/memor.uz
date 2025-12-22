import React, { useLayoutEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import SmartIcon from './SmartIcon';

interface IconPickerProps {
  onSelect: (iconName: string, color?: string) => void;
  onClose: () => void;
  anchorRect?: DOMRect;
  currentIcon?: string;
  currentColor?: string;
}

const BRAND_COLORS = [
  { name: 'Default', value: '#64748b' }, { name: 'Gray', value: '#9ca3af' }, { name: 'Brown', value: '#a16207' },
  { name: 'Orange', value: '#f97316' }, { name: 'Yellow', value: '#eab308' }, { name: 'Green', value: '#15803d' },
  { name: 'Blue', value: '#2563eb' }, { name: 'Purple', value: '#9333ea' }, { name: 'Pink', value: '#db2777' }, { name: 'Red', value: '#dc2626' },
];

const ICON_GROUPS = [
  { label: 'Architecture', icons: ['Building', 'Home', 'Layout', 'Layers', 'Box', 'Shapes', 'Compass', 'MapPin', 'Map', 'PencilRuler', 'Umbrella', 'Square'] },
  { label: 'Tech & Dev', icons: ['Cpu', 'Database', 'Code', 'Terminal', 'Monitor', 'Smartphone', 'Zap', 'Shield', 'Lock', 'Key', 'Server', 'Cloud', 'Wifi', 'HardDrive'] },
  { label: 'Marketing', icons: ['Megaphone', 'Target', 'TrendingUp', 'PieChart', 'Award', 'Flag', 'Rocket', 'Globe', 'Activity', 'Briefcase', 'CreditCard', 'Users'] },
  { label: 'Creative', icons: ['Palette', 'PenTool', 'ImageIcon', 'Camera', 'Video', 'Figma', 'Sparkles', 'Wand2', 'Sun', 'Moon', 'Ghost', 'Flame', 'Anchor', 'Scissors'] },
  { label: 'General', icons: ['File', 'Inbox', 'Calendar', 'Archive', 'Check', 'Clock', 'Filter', 'Search', 'MessageCircle', 'Phone', 'Music', 'Tag', 'Bookmark'] }
];

const IconPicker: React.FC<IconPickerProps> = ({ onSelect, onClose, anchorRect, currentIcon, currentColor }) => {
  const { theme, t } = useTheme();
  const [selectedColor, setSelectedColor] = useState(currentColor || '#64748b');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const pickerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!anchorRect) return;
    const GAP = 8, PADDING = 12, WIDTH = 280, HEIGHT = 400;
    const { bottom, top, left } = anchorRect;
    const screenH = window.innerHeight, screenW = window.innerWidth;
    let newTop = bottom + GAP, newLeft = left;
    if (screenH - newTop < HEIGHT && top - GAP > HEIGHT) newTop = top - HEIGHT - GAP;
    else if (screenH - newTop < HEIGHT) newTop = Math.max(PADDING, screenH - HEIGHT - PADDING);
    if (newLeft + WIDTH > screenW - PADDING) newLeft = screenW - WIDTH - PADDING;
    if (newLeft < PADDING) newLeft = PADDING;
    setPosition({ top: newTop, left: newLeft });
  }, [anchorRect]);

  const isDark = theme !== 'light';
  return (
    <div className="fixed inset-0 z-[10002]">
      <div className="absolute inset-0 bg-transparent" onClick={onClose}></div>
      <div ref={pickerRef} className={`fixed w-[280px] h-[400px] flex flex-col rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] border animate-in fade-in zoom-in-95 duration-100 ease-out ${isDark ? 'bg-[#1F1F1F] border-[#2F2F2F] text-[#E0E0E0]' : 'bg-white border-gray-200 text-[#37352f]'}`} style={{ top: `${position.top}px`, left: `${position.left}px` }}>
        <div className={`px-3 py-2 border-b flex items-center justify-between shrink-0 h-10 ${isDark ? 'border-[#2F2F2F]' : 'border-gray-100'}`}>
           <div className="flex items-center gap-2 text-xs font-medium opacity-60"><span className="uppercase tracking-wide text-[10px]">Icon Picker</span></div>
           <button onClick={onClose} className={`p-1 rounded hover:bg-opacity-10 transition-colors ${isDark ? 'hover:bg-white text-gray-400' : 'hover:bg-black text-gray-400'}`}><X size={14}/></button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
           {ICON_GROUPS.map((group) => (
             <div key={group.label} className="mb-2">
                <div className={`sticky top-0 z-10 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm ${isDark ? 'text-gray-500 bg-[#1F1F1F]/90' : 'text-gray-500 bg-white/90'}`}>{group.label}</div>
                <div className="grid grid-cols-6 gap-0.5 px-1">
                   {group.icons.map(icon => (
                      <button key={icon} onClick={() => onSelect(icon, selectedColor)} className={`group relative aspect-square flex items-center justify-center rounded-[4px] transition-all duration-75 ${currentIcon === icon ? (isDark ? 'bg-[#2F2F2F]' : 'bg-gray-100') : (isDark ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50')}`} title={icon}>
                          <SmartIcon name={icon} size={16} color={currentIcon === icon ? selectedColor : (isDark ? '#9CA3AF' : '#64748B')} className="transition-transform group-hover:scale-110" />
                          {currentIcon === icon && <span className="absolute bottom-1 w-1 h-1 rounded-full opacity-60" style={{ backgroundColor: selectedColor }} />}
                      </button>
                   ))}
                </div>
             </div>
           ))}
        </div>
        <div className={`p-3 border-t shrink-0 ${isDark ? 'border-[#2F2F2F] bg-[#252525]' : 'border-gray-100 bg-gray-50/50'}`}>
           <div className="flex items-center justify-between mb-2"><span className="text-[10px] uppercase font-semibold text-gray-500">Colors</span></div>
           <div className="flex justify-between items-center px-1">
              {BRAND_COLORS.map(color => (
                 <button key={color.value} onClick={() => setSelectedColor(color.value)} className={`w-4 h-4 rounded-full transition-all flex items-center justify-center hover:scale-110 ${selectedColor === color.value ? 'ring-2 ring-offset-1' : ''}`} style={{ backgroundColor: color.value, boxShadow: selectedColor === color.value ? `0 0 0 2px ${isDark ? '#1F1F1F' : '#fff'}` : 'none' } as React.CSSProperties} title={color.name} />
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default IconPicker;