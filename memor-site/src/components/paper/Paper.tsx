import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import A5Paper from './A5Paper';
import { Download, Palette, Grid3X3, MousePointer2, Upload, Trash2, Scaling, List } from 'lucide-react';

export type GridType = 'cross' | 'dot' | 'line' | 'line-dot' | 'line-cross';

const Paper: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  // -- Configuration State (Purely Visual Settings) --
  // ... (existing state)

  // Grid State
  const [gridType, setGridType] = useState<GridType>('cross');
  const [gridColor, setGridColor] = useState('#9ca3af'); // Tailwind gray-400
  const [gridOpacity, setGridOpacity] = useState(0.6);

  // Logo State (Default Logo, Size)
  const [logo, setLogo] = useState<string | null>('/favicon-light.svg');
  const [logoSize, setLogoSize] = useState(20);

  // Notes State (Width, Line Count)
  const [notesWidth, setNotesWidth] = useState(50);
  const [notesLineCount, setNotesLineCount] = useState(5);

  const handleDownloadSvg = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgRef.current);
    if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `memor-naqsh-a5-${gridType}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPdf = async () => {
    const element = document.querySelector('.print-container') as HTMLElement;
    if (!element) return;

    try {
      // Vaqtincha shadow va boshqa effektlarni o'chirish
      const originalBoxShadow = element.style.boxShadow;
      element.style.boxShadow = 'none';

      const canvas = await html2canvas(element, {
        scale: 2, // Yuqori sifat uchun
        useCORS: true, // Tashqi rasmlar (logo) uchun
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Elementni asl holiga qaytarish
      element.style.boxShadow = originalBoxShadow;

      const imgData = canvas.toDataURL('image/png');

      // A5 o'lchami: 148mm x 210mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a5'
      });

      pdf.addImage(imgData, 'PNG', 0, 0, 148, 210);
      pdf.save(`memor-paper-a5-${gridType}.pdf`);
    } catch (error) {
      console.error('PDF yaratishda xatolik:', error);
      alert('PDF yuklashda xatolik yuz berdi. Iltimos qayta urinib ko\'ring.');
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const gridOptions: { id: GridType; label: string; icon: React.ReactNode }[] = [
    { id: 'cross', label: 'Cross (+)', icon: <Grid3X3 size={14} /> },
    { id: 'dot', label: 'Dot (•)', icon: <MousePointer2 size={14} /> },
    { id: 'line', label: 'Line (#)', icon: <Grid3X3 size={14} /> },
    { id: 'line-dot', label: 'Line + Dot', icon: <Grid3X3 size={14} /> },
    { id: 'line-cross', label: 'Line + Cross', icon: <Grid3X3 size={14} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 text-gray-900 font-sans">
      <style>{`
        @media print {
          @page {
            size: A5;
            margin: 0;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          body > *:not(.min-h-screen) {
            display: none !important;
          }
          .min-h-screen {
            background: white !important;
            height: 100vh !important;
            overflow: hidden !important;
          }
          /* Hide Sidebar */
          .no-print, .w-full.md\\:w-80 {
            display: none !important;
          }
          /* Show Preview Area Fullscreen */
          .flex-1.bg-gray-200 {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
            display: block !important;
            overflow: visible !important;
          }
          .print-container {
            box-shadow: none !important;
            margin: 0 !important;
            width: 100% !important;
            height: 100% !important;
            transform: none !important;
          }
          /* Ensure SVGs print correctly */
          svg {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      `}</style>

      {/* Sidebar Controls (No Print) */}
      <div className="w-full md:w-80 bg-white border-r border-gray-200 p-6 flex flex-col gap-8 shadow-sm z-10 no-print overflow-y-auto h-screen sticky top-0">
        <div>
          <h1 className="text-xl font-bold text-gray-800 mb-1">Me'mor || Paper Generator</h1>
          <p className="text-xs text-gray-500">A5 Paper Generator</p>
        </div>

        {/* Logo Upload */}
        <div className="space-y-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Upload size={16} />
            <h2>Logo</h2>
          </div>

          <div className="space-y-2">
            <div className="flex gap-2">
              <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 text-xs text-gray-600 transition-colors">
                <Upload size={12} />
                {logo ? 'Change Logo' : 'Upload Logo'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </label>
              {logo && (
                <button
                  onClick={() => setLogo(null)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>

            {/* Logo Size Control */}
            {logo && (
              <div className="space-y-1 pt-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Scaling size={10} /> Size</span>
                  <span>{logoSize}mm</span>
                </div>
                <input
                  type="range" min="10" max="80" step="1"
                  value={logoSize}
                  onChange={(e) => setLogoSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}

            <p className="text-[10px] text-gray-400">
              {logo ? 'Drag the logo to move. Use slider to resize.' : 'Upload a logo to place it on the paper.'}
            </p>
          </div>
        </div>

        {/* Notes Controls */}
        <div className="space-y-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <List size={16} />
            <h2>Notes Area</h2>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1"><Scaling size={10} /> Width</span>
                <span>{notesWidth}mm</span>
              </div>
              <input
                type="range" min="20" max="120" step="1"
                value={notesWidth}
                onChange={(e) => setNotesWidth(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1"><List size={10} /> Lines</span>
                <span>{notesLineCount}</span>
              </div>
              <input
                type="range" min="1" max="15" step="1"
                value={notesLineCount}
                onChange={(e) => setNotesLineCount(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <p className="text-[10px] text-gray-400">
              Drag the notes area to move it.
            </p>
          </div>
        </div>

        {/* Grid Controls */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Grid3X3 size={16} />
            <h2>Grid Pattern</h2>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {gridOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setGridType(option.id)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md border transition-all ${gridType === option.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1"><Palette size={10} /> Color</span>
              </div>
              <input
                type="color"
                value={gridColor}
                onChange={(e) => setGridColor(e.target.value)}
                className="w-full h-8 cursor-pointer rounded-md border border-gray-200 p-1"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Opacity</span>
                <span>{Math.round(gridOpacity * 100)}%</span>
              </div>
              <input
                type="range" min="0.1" max="1" step="0.1"
                value={gridOpacity}
                onChange={(e) => setGridOpacity(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex-grow"></div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-auto">
          <button
            onClick={handleDownloadPdf}
            className="flex w-full justify-center items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-colors font-medium text-sm"
          >
            <Download size={16} />
            Download PDF
          </button>

          <button
            onClick={handleDownloadSvg}
            className="flex w-full justify-center items-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg shadow-lg hover:bg-black transition-colors font-medium text-sm"
          >
            <Download size={16} />
            Download SVG
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-gray-200 p-8 flex justify-center items-start overflow-auto">
        <div className="print-container shadow-2xl bg-white select-none">
          <div className="w-[148mm] h-[210mm] bg-white overflow-hidden relative">
            <A5Paper
              ref={svgRef}
              gridType={gridType}
              gridColor={gridColor}
              gridOpacity={gridOpacity}
              logo={logo}
              logoSize={logoSize}
              notesWidth={notesWidth}
              notesLineCount={notesLineCount}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Paper;