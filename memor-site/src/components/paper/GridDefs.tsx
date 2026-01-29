import React from 'react';

interface GridDefsProps {
  gridSize: number;
  rgbaColor: string;
  rgbaColorHalf: string;
}

const GridDefs: React.FC<GridDefsProps> = ({ gridSize, rgbaColor, rgbaColorHalf }) => {
  return (
    <defs>
      {/* Pattern: Cross Grid (+ symbols) - This is likely the "Grid 2" requested */}
      <pattern
        id="grid-cross"
        x="0"
        y="0"
        width={gridSize}
        height={gridSize}
        patternUnits="userSpaceOnUse"
      >
        <path
          d={`M ${gridSize / 2} ${(gridSize / 2) - 1} V ${(gridSize / 2) + 1} M ${(gridSize / 2) - 1} ${gridSize / 2} H ${(gridSize / 2) + 1}`}
          stroke={rgbaColor}
          strokeWidth="0.3"
          fill="none"
        />
      </pattern>

      {/* Pattern: Dot Grid (Circles) */}
      <pattern
        id="grid-dot"
        x="0"
        y="0"
        width={gridSize}
        height={gridSize}
        patternUnits="userSpaceOnUse"
      >
        <path
          d={`M ${gridSize / 2}, ${gridSize / 2} m -0.3, 0 a 0.3,0.3 0 1,0 0.6,0 a 0.3,0.3 0 1,0 -0.6,0`}
          fill={rgbaColor}
          stroke="none"
        />
      </pattern>

      {/* Pattern: Line Grid (Graph Paper) */}
      <pattern
        id="grid-line"
        x="0"
        y="0"
        width={gridSize}
        height={gridSize}
        patternUnits="userSpaceOnUse"
      >
        <path
          d={`M ${gridSize/2} 0 V ${gridSize} M 0 ${gridSize/2} H ${gridSize}`}
          stroke={rgbaColor}
          strokeWidth="0.15"
          fill="none"
        />
      </pattern>

      {/* Pattern: Line + Dot */}
      <pattern
        id="grid-line-dot"
        x="0"
        y="0"
        width={gridSize}
        height={gridSize}
        patternUnits="userSpaceOnUse"
      >
        <path
          d={`M ${gridSize/2} 0 V ${gridSize} M 0 ${gridSize/2} H ${gridSize}`}
          stroke={rgbaColorHalf}
          strokeWidth="0.15"
          fill="none"
        />
        <path
          d={`M ${gridSize / 2}, ${gridSize / 2} m -0.4, 0 a 0.4,0.4 0 1,0 0.8,0 a 0.4,0.4 0 1,0 -0.8,0`}
          fill={rgbaColor}
          stroke="none"
        />
      </pattern>

      {/* Pattern: Line + Cross */}
      <pattern
        id="grid-line-cross"
        x="0"
        y="0"
        width={gridSize}
        height={gridSize}
        patternUnits="userSpaceOnUse"
      >
        <path
          d={`M ${gridSize/2} 0 V ${gridSize} M 0 ${gridSize/2} H ${gridSize}`}
          stroke={rgbaColorHalf}
          strokeWidth="0.15"
          fill="none"
        />
        <path
          d={`M ${gridSize / 2} ${(gridSize / 2) - 1} V ${(gridSize / 2) + 1} M ${(gridSize / 2) - 1} ${gridSize / 2} H ${(gridSize / 2) + 1}`}
          stroke={rgbaColor}
          strokeWidth="0.4"
          fill="none"
        />
      </pattern>
    </defs>
  );
};

export default GridDefs;