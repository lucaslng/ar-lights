// components/ARViewer.tsx
"use client";

import { useRef, useEffect } from "react";

interface ARViewerProps {
  // lightSuggestions: LightSuggestion[];
  videoStream: MediaStream | null;
}

export default function ARViewer({ videoStream }: ARViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !videoStream) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const video = document.createElement("video");
    video.srcObject = videoStream;
    video.autoplay = true;
    video.playsInline = true; // Important for mobile
    video.muted = true; // Often required for autoplay to work
    video.play();

    const renderFrame = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Overlay light suggestions
      // lightSuggestions.forEach(light => {
      //   drawLightMarker(ctx, light);
      // });

      requestAnimationFrame(renderFrame);
    };

    video.onloadedmetadata = () => {
      console.log("loaded video");
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
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
    </div>
  );
}
