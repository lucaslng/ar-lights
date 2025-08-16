'use client';

import React, { useState, useRef, useCallback } from 'react';
import Bulb from './Bulb';
import LightStrand from './LightStrand';
import LightPreview from './LightPreview';

interface LightElement {
  id: string;
  type: 'bulb' | 'strand';
  x: number;
  y: number;
  properties: any;
}

const LightDesigner: React.FC = () => {
  const [lights, setLights] = useState<LightElement[]>([]);
  const [selectedLight, setSelectedLight] = useState<string | null>(null);
  const [tool, setTool] = useState<'bulb' | 'strand' | 'select'>('select');
  const [bulbColor, setBulbColor] = useState('#ff0000');
  const [bulbSize, setBulbSize] = useState(20);
  const [strandLength, setStrandLength] = useState(5);
  const [strandPattern, setStrandPattern] = useState<'alternating' | 'rainbow' | 'custom'>('alternating');
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (tool === 'select' || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newLight: LightElement = {
      id: `${tool}-${Date.now()}`,
      type: tool,
      x,
      y,
      properties: tool === 'bulb' 
        ? { color: bulbColor, size: bulbSize }
        : { length: strandLength, pattern: strandPattern, colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'] }
    };

    setLights(prev => [...prev, newLight]);
  }, [tool, bulbColor, bulbSize, strandLength, strandPattern]);

  const handleDragStart = useCallback((e: React.DragEvent, id: string) => {
    if (tool !== 'select') return;
    
    setIsDragging(true);
    setSelectedLight(id);
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const light = lights.find(l => l.id === id);
      if (light) {
        setDragOffset({ x: x - light.x, y: y - light.y });
      }
    }
  }, [tool, lights]);

  const handleDragEnd = useCallback((e: React.DragEvent, id: string) => {
    if (!isDragging || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;

    setLights(prev => prev.map(light => 
      light.id === id ? { ...light, x, y } : light
    ));

    setIsDragging(false);
    setSelectedLight(null);
  }, [isDragging, dragOffset]);

  const handleLightClick = useCallback((id: string) => {
    if (tool === 'select') {
      setSelectedLight(selectedLight === id ? null : id);
    }
  }, [tool, selectedLight]);

  const deleteSelectedLight = useCallback(() => {
    if (selectedLight) {
      setLights(prev => prev.filter(light => light.id !== selectedLight));
      setSelectedLight(null);
    }
  }, [selectedLight]);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const clearAllLights = useCallback(() => {
    setLights([]);
    setSelectedLight(null);
  }, []);

  const renderLight = (light: LightElement) => {
    if (light.type === 'bulb') {
      return (
        <Bulb
          key={light.id}
          id={light.id}
          color={light.properties.color}
          size={light.properties.size}
          x={light.x}
          y={light.y}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onClick={handleLightClick}
          className={selectedLight === light.id ? 'ring-2 ring-blue-400' : ''}
        />
      );
    } else {
      return (
        <LightStrand
          key={light.id}
          id={light.id}
          x={light.x}
          y={light.y}
          length={light.properties.length}
          pattern={light.properties.pattern}
          colors={light.properties.colors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onClick={handleLightClick}
          className={selectedLight === light.id ? 'ring-2 ring-blue-400' : ''}
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Toolbar */}
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <h2 className="text-xl font-bold mb-4">Christmas Light Designer</h2>
        
        <div className="flex flex-wrap gap-4 items-center">
          {/* Tool Selection */}
          <div className="flex gap-2">
            <button
              onClick={() => setTool('select')}
              className={`px-4 py-2 rounded ${tool === 'select' ? 'bg-blue-600' : 'bg-gray-600'}`}
            >
              Select
            </button>
            <button
              onClick={() => setTool('bulb')}
              className={`px-4 py-2 rounded ${tool === 'bulb' ? 'bg-blue-600' : 'bg-gray-600'}`}
            >
              Add Bulb
            </button>
            <button
              onClick={() => setTool('strand')}
              className={`px-4 py-2 rounded ${tool === 'strand' ? 'bg-blue-600' : 'bg-gray-600'}`}
            >
              Add Strand
            </button>
          </div>

          {/* Bulb Settings */}
          {tool === 'bulb' && (
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2">
                Color:
                <input
                  type="color"
                  value={bulbColor}
                  onChange={(e) => setBulbColor(e.target.value)}
                  className="w-10 h-8 rounded border"
                />
              </label>
              <label className="flex items-center gap-2">
                Size:
                <input
                  type="range"
                  min="10"
                  max="40"
                  value={bulbSize}
                  onChange={(e) => setBulbSize(Number(e.target.value))}
                  className="w-20"
                />
                {bulbSize}px
              </label>
            </div>
          )}

          {/* Strand Settings */}
          {tool === 'strand' && (
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2">
                Length:
                <input
                  type="range"
                  min="3"
                  max="15"
                  value={strandLength}
                  onChange={(e) => setStrandLength(Number(e.target.value))}
                  className="w-20"
                />
                {strandLength}
              </label>
              <label className="flex items-center gap-2">
                Pattern:
                <select
                  value={strandPattern}
                  onChange={(e) => setStrandPattern(e.target.value as any)}
                  className="bg-gray-700 px-2 py-1 rounded"
                >
                  <option value="alternating">Alternating</option>
                  <option value="rainbow">Rainbow</option>
                  <option value="custom">Custom</option>
                </select>
              </label>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 ml-auto">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
            >
              Upload Image
            </button>
            <button
              onClick={clearAllLights}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
            >
              Clear All
            </button>
            {selectedLight && (
              <button
                onClick={deleteSelectedLight}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                Delete Selected
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div
          ref={canvasRef}
          className="relative w-full h-96 bg-gray-700 rounded border-2 border-dashed border-gray-600 overflow-hidden"
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onClick={handleCanvasClick}
        >
          {/* Instructions */}
          {lights.length === 0 && !backgroundImage && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="text-lg mb-2">Click to add Christmas lights!</p>
                <p className="text-sm">Upload an image first, then use the tools above to add lights</p>
              </div>
            </div>
          )}

          {/* Render all lights */}
          {lights.map(renderLight)}
        </div>
      </div>

      {/* Light Preview */}
      <LightPreview />

      {/* Info Panel */}
      <div className="bg-gray-800 rounded-lg p-4 mt-4">
        <h3 className="text-lg font-semibold mb-2">Instructions</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Use <strong>Select</strong> tool to move and select existing lights</li>
          <li>• Use <strong>Add Bulb</strong> tool to place individual bulbs</li>
          <li>• Use <strong>Add Strand</strong> tool to place strings of lights</li>
          <li>• Upload an image to design lights on your room</li>
          <li>• Click and drag lights to reposition them</li>
          <li>• Select a light and press Delete to remove it</li>
        </ul>
      </div>
    </div>
  );
};

export default LightDesigner;
