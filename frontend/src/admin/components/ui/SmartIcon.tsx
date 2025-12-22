import React from 'react';
import * as LucideIcons from 'lucide-react';

interface SmartIconProps {
  name?: string;
  size?: number;
  className?: string;
  color?: string;
  glow?: boolean;
}

export const SmartIcon: React.FC<SmartIconProps> = ({ 
  name = 'File', 
  size = 20, 
  className = "", 
  color,
  glow = true 
}) => {
  // @ts-ignore
  const IconComponent = LucideIcons[name] || LucideIcons.File;
  const iconColor = color || 'currentColor';

  return (
    <div 
      className={`inline-flex items-center justify-center shrink-0 transition-all duration-500 ease-out ${className}`} 
      style={{ 
        width: size, 
        height: size,
        color: iconColor,
        filter: glow 
          ? `drop-shadow(0 1px 2px rgba(0,0,0,0.15)) drop-shadow(0 0 6px ${iconColor}40)` 
          : 'none'
      }}
    >
      <IconComponent 
        size={size} 
        strokeWidth={2.2}
        className="text-inherit"
      />
    </div>
  );
};

export default SmartIcon;