import React from 'react';

interface PaperHeaderProps {
  width: number;
  lineCount: number;
}

const PaperHeader: React.FC<PaperHeaderProps> = ({ width, lineCount }) => {
  // Dimensions for notes section
  const lineSpacing = 6;
  
  // Calculate total height to create the background rect
  // We need enough space for lines plus a little padding at the bottom
  const totalHeight = (lineCount * lineSpacing) + (lineSpacing / 2); 

  return (
    <g>
      {/* White background to mask the grid */}
      <rect 
        x="0" 
        y="0" 
        width={width} 
        height={totalHeight} 
        fill="white" 
      />

      {/* Notes Lines */}
       {Array.from({ length: lineCount }).map((_, i) => (
           <line 
              key={i}
              x1={0}
              y1={i * lineSpacing + lineSpacing}
              x2={width}
              y2={i * lineSpacing + lineSpacing}
              stroke="#d1d5db" // gray-300
              strokeWidth="0.3"
           />
       ))}
    </g>
  );
};

export default PaperHeader;