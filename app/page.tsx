// app/ar-viewer/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import CameraCapture from '@/components/CameraCapture';
import ARViewer from '@/components/ARViewer';
// import { calculateLightPlacements } from '@/lib/lightAlgorithm';

export default function ARViewerPage() {
  const [features, setFeatures] = useState<HouseFeature[]>([]);
  const [lightSuggestions, setLightSuggestions] = useState<LightSuggestion[]>([]);
  const [mode, setMode] = useState<'capture' | 'ar'>('capture');
  const [stream, setStream] = useState<MediaStream | null>(null);
  useEffect(() => {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      }).then(mediaStream => {
        if (stream) {
          setStream(mediaStream);
        }
      });

    }, [])

  // const handleFeaturesDetected = (detectedFeatures: HouseFeature[]) => {
    // setFeatures(detectedFeatures);
    // const suggestions = calculateLightPlacements(detectedFeatures);
    // setLightSuggestions(suggestions);
    // setMode('ar');
  // };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">AR Christmas Light Planner</h1>
        
        {mode === 'capture' ? (
          <div className="bg-white rounded-lg overflow-hidden">
            <CameraCapture />
          </div>
        ) : (
          <div className="bg-white rounded-lg overflow-hidden">
            <ARViewer videoStream={stream} />
            <div className="p-4">
              <button 
                onClick={() => setMode('capture')}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg mr-4"
              >
                Capture New House
              </button>
              <span className="text-gray-600">
                {lightSuggestions.length} light positions suggested
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}