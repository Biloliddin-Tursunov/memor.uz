import React, { forwardRef, useState, useRef, useEffect, useImperativeHandle } from 'react';
import GridDefs from './GridDefs';
import PaperHeader from './PaperHeader';

export type GridType = 'cross' | 'dot' | 'line' | 'line-dot' | 'line-cross';

interface A5PaperProps {
  gridType: GridType;
  gridColor: string;
  gridOpacity: number;
  logo: string | null;
  logoSize: number;
  notesWidth: number;
  notesLineCount: number;
}

// Helper to ensure PDF export captures opacity correctly
export const hexToRgba = (hex: string, alpha: number) => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  return `rgba(${r},${g},${b},${alpha})`;
};

const A5Paper = forwardRef<SVGSVGElement, A5PaperProps>((props, ref) => {
  const { 
    gridType, 
    gridColor, 
    gridOpacity, 
    logo, 
    logoSize, 
    notesWidth,
    notesLineCount,
  } = props;

  // Internal State for Positions (Independent of App.tsx)
  const [logoPos, setLogoPos] = useState({ x: 10, y: 10 });
  const [notesPos, setNotesPos] = useState({ x: 88, y: 10 });
  
  // Dragging State
  const [dragTarget, setDragTarget] = useState<'logo' | 'notes' | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Internal Ref to access SVG methods (getScreenCTM)
  const internalSvgRef = useRef<SVGSVGElement>(null);

  // Expose the SVG element to the parent via the forwarded ref (for Download functionality)
  useImperativeHandle(ref, () => internalSvgRef.current as SVGSVGElement);

  // --- Drag Logic ---
  const handleDragStart = (e: React.MouseEvent, target: 'logo' | 'notes') => {
    if (!internalSvgRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const svg = internalSvgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    
    // Transform screen coordinates to SVG coordinates
    const globalPoint = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    const currentPos = target === 'logo' ? logoPos : notesPos;

    setDragOffset({
      x: globalPoint.x - currentPos.x,
      y: globalPoint.y - currentPos.y
    });
    setDragTarget(target);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragTarget || !internalSvgRef.current) return;
      e.preventDefault();

      const svg = internalSvgRef.current;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const globalPoint = pt.matrixTransform(svg.getScreenCTM()?.inverse());

      const newX = globalPoint.x - dragOffset.x;
      const newY = globalPoint.y - dragOffset.y;

      if (dragTarget === 'logo') {
        setLogoPos({ x: newX, y: newY });
      } else if (dragTarget === 'notes') {
        setNotesPos({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setDragTarget(null);
    };

    if (dragTarget) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragTarget, dragOffset]);

  // A5 Dimensions in mm
  const width = 148;
  const height = 210;
  const margin = 10; 
  const gridSize = 5; // 5mm grid

  // Prepare colors with opacity baked in
  const rgbaColor = hexToRgba(gridColor, gridOpacity);
  const rgbaColorHalf = hexToRgba(gridColor, gridOpacity * 0.5);

  return (
    <svg
      ref={internalSvgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      {/* Pattern Definitions */}
      <GridDefs 
        gridSize={gridSize} 
        rgbaColor={rgbaColor} 
        rgbaColorHalf={rgbaColorHalf} 
      />

      {/* Background (White paper) */}
      <rect x="0" y="0" width={width} height={height} fill="white" />

      {/* Main Grid Area */}
      <rect
        x={margin}
        y={margin}
        width={width - (margin * 2)}
        height={height - (margin * 2)}
        fill={`url(#grid-${gridType})`}
      />

      {/* Header Section (Notes Lines) - Draggable */}
      <g 
        transform={`translate(${notesPos.x}, ${notesPos.y})`}
        style={{ cursor: 'move' }}
        onMouseDown={(e) => handleDragStart(e, 'notes')}
      >
        <PaperHeader 
            width={notesWidth}
            lineCount={notesLineCount}
        />
      </g>

      {/* Draggable Logo */}
      {logo && (
        <image 
            href={logo} 
            x={logoPos.x} 
            y={logoPos.y} 
            height={logoSize} 
            style={{ cursor: 'move' }}
            onMouseDown={(e) => handleDragStart(e, 'logo')}
        />
      )}
    </svg>
  );
});

A5Paper.displayName = 'A5Paper';

export default A5Paper;