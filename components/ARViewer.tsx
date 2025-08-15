// components/ARViewer.tsx
'use client';

import { useRef, useEffect } from 'react';

interface ARViewerProps {
  // lightSuggestions: LightSuggestion[];
  videoStream: MediaStream | null;
}

export default function ARViewer({ videoStream }: ARViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !videoStream) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const video = document.createElement('video');
    video.srcObject = videoStream;
    video.play();

    const renderFrame = () => {
      // Draw video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Overlay light suggestions
      // lightSuggestions.forEach(light => {
      //   drawLightMarker(ctx, light);
      // });
      
      requestAnimationFrame(renderFrame);
    };

    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      renderFrame();
    };

  }, [videoStream]);

  // const drawLightMarker = (ctx: CanvasRenderingContext2D, light: LightSuggestion) => {
  //   const colors = {
  //     string: '#FFD700',
  //     accent: '#FF6B6B',
  //     icicle: '#87CEEB'
  //   };

  //   ctx.fillStyle = colors[light.type];
  //   ctx.beginPath();
  //   ctx.arc(light.x, light.y, 8, 0, 2 * Math.PI);
  //   ctx.fill();
    
  //   // Add glow effect
  //   ctx.shadowColor = colors[light.type];
  //   ctx.shadowBlur = 10;
  //   ctx.fill();
  //   ctx.shadowBlur = 0;
  // };

  return (
    <div className="relative w-full h-full">
      <canvas 
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
        <h3 className="font-bold mb-2">Light Suggestions:</h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span>String Lights</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span>Accent Lights</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span>Icicle Lights</span>
          </div>
        </div>
      </div>
    </div>
  );
}