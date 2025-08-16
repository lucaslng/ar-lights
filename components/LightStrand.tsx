'use client';

import React, { useState } from 'react';
import Bulb from './Bulb';

interface LightStrandProps {
  id: string;
  x: number;
  y: number;
  length: number;
  spacing?: number;
  colors?: string[];
  size?: number;
  isOn?: boolean;
  pattern?: 'alternating' | 'rainbow' | 'custom';
  onDragStart?: (e: React.DragEvent, id: string) => void;
  onDragEnd?: (e: React.DragEvent, id: string) => void;
  onClick?: (id: string) => void;
  className?: string;
}

const LightStrand: React.FC<LightStrandProps> = ({
  id,
  x,
  y,
  length,
  spacing = 25,
  colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
  size = 18,
  isOn = true,
  pattern = 'alternating',
  onDragStart,
  onDragEnd,
  onClick,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getBulbColor = (index: number): string => {
    switch (pattern) {
      case 'alternating':
        return colors[index % 2];
      case 'rainbow':
        return colors[index % colors.length];
      case 'custom':
        return colors[index % colors.length];
      default:
        return colors[0];
    }
  };

  const strandStyle = {
    position: 'absolute' as const,
    left: x,
    top: y,
    cursor: 'grab',
    zIndex: 5,
  };

  const wireStyle = {
    position: 'absolute' as const,
    top: size / 2,
    left: 0,
    width: (length - 1) * spacing,
    height: 2,
    backgroundColor: '#333',
    borderRadius: '1px',
    zIndex: 1,
  };

  return (
    <div
      id={id}
      className={`light-strand ${className}`}
      style={strandStyle}
      draggable
      onDragStart={(e) => onDragStart?.(e, id)}
      onDragEnd={(e) => onDragEnd?.(e, id)}
      onClick={() => onClick?.(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wire connecting the bulbs */}
      <div
        className="strand-wire"
        style={{
          ...wireStyle,
          backgroundColor: isHovered ? '#555' : '#333',
          boxShadow: isHovered ? '0 0 5px rgba(255,255,255,0.3)' : 'none',
        }}
      />
      
      {/* Individual bulbs */}
      {Array.from({ length }, (_, index) => (
        <Bulb
          key={`${id}-bulb-${index}`}
          id={`${id}-bulb-${index}`}
          color={getBulbColor(index)}
          size={size}
          isOn={isOn}
          x={index * spacing}
          y={0}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onClick={onClick}
        />
      ))}
      
      {/* Strand connector */}
      <div
        className="strand-connector"
        style={{
          position: 'absolute',
          top: size / 2 - 3,
          left: -5,
          width: 10,
          height: 10,
          backgroundColor: '#666',
          borderRadius: '50%',
          border: '2px solid #444',
          zIndex: 15,
        }}
      />
    </div>
  );
};

export default LightStrand;
