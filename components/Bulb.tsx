'use client';

import React, { useState } from 'react';

interface BulbProps {
  id: string;
  color?: string;
  size?: number;
  isOn?: boolean;
  x: number;
  y: number;
  onDragStart?: (e: React.DragEvent, id: string) => void;
  onDragEnd?: (e: React.DragEvent, id: string) => void;
  onClick?: (id: string) => void;
  className?: string;
}

const Bulb: React.FC<BulbProps> = ({
  id,
  color = '#ff0000',
  size = 20,
  isOn = true,
  x,
  y,
  onDragStart,
  onDragEnd,
  onClick,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const bulbStyle = {
    position: 'absolute' as const,
    left: x,
    top: y,
    width: size,
    height: size,
    cursor: 'grab',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
  };

  const glowStyle = {
    filter: isOn ? `drop-shadow(0 0 ${size * 0.3}px ${color})` : 'none',
    transition: 'all 0.3s ease',
  };

  return (
    <div
      id={id}
      className={`bulb ${className}`}
      style={bulbStyle}
      draggable
      onDragStart={(e) => onDragStart?.(e, id)}
      onDragEnd={(e) => onDragEnd?.(e, id)}
      onClick={() => onClick?.(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Bulb body */}
      <div
        className="bulb-body"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: isOn ? color : '#666',
          borderRadius: '50%',
          border: `2px solid ${isHovered ? '#fff' : '#333'}`,
          boxShadow: isHovered ? '0 0 10px rgba(255,255,255,0.5)' : 'none',
          ...glowStyle,
        }}
      />
      
      {/* Bulb base */}
      <div
        className="bulb-base"
        style={{
          position: 'absolute',
          bottom: '-2px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: size * 0.4,
          height: size * 0.2,
          backgroundColor: '#333',
          borderRadius: '0 0 50% 50%',
          border: '1px solid #222',
        }}
      />
      
      {/* Bulb filament */}
      {isOn && (
        <div
          className="bulb-filament"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: size * 0.3,
            height: size * 0.3,
            border: `2px solid ${color === '#ffff00' ? '#ffaa00' : '#fff'}`,
            borderRadius: '50%',
            opacity: 0.8,
          }}
        />
      )}
    </div>
  );
};

export default Bulb;
