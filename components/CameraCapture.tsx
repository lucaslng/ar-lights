// components/CameraCapture.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { detectHouseFeatures } from '@/lib/roboflow';

export default function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [features, setFeatures] = useState<HouseFeature[]>([]);

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context?.drawImage(videoRef.current, 0, 0);
    
    // Convert to blob and send to Roboflow
    canvas.toBlob(async (blob) => {
      if (blob) {
        const detectedFeatures = await detectHouseFeatures(blob);
        setFeatures(detectedFeatures);
      }
    });
  };

  return (
    <div className="relative">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline
        className="w-full h-full object-cover"
      />
      <canvas 
        ref={canvasRef} 
        className="hidden"
        width={640} 
        height={480}
      />
      <button 
        onClick={captureAndAnalyze}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg"
      >
        Analyze House
      </button>
    </div>
  );
}