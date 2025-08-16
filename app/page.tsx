// app/ar-viewer/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import ARViewer from "@/components/ARViewer";
import LightDesigner from "@/components/LightDesigner";
// import { calculateLightPlacements } from '@/lib/lightAlgorithm';

export default function ARViewerPage() {
  // const [features, setFeatures] = useState<HouseFeature[]>([]);
  // const [lightSuggestions, setLightSuggestions] = useState<LightSuggestion[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [activeMode, setActiveMode] = useState<'designer' | 'ar'>('designer');

  useEffect(() => {
    if (!stream) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: 'environment'
          },
          audio: false,
        })
        .then((mediaStream) => {
          setStream(mediaStream);
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
    }
  }, [stream]);

  // const handleFeaturesDetected = (detectedFeatures: HouseFeature[]) => {
  // setFeatures(detectedFeatures);
  // const suggestions = calculateLightPlacements(detectedFeatures);
  // setLightSuggestions(suggestions);
  // setMode('ar');
  // };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto py-4 px-4">
          <h1 className="text-3xl font-bold text-white mb-2">
            🎄 Christmas Light Designer
          </h1>
          <p className="text-gray-300">
            Design your perfect Christmas light setup with our interactive tools
          </p>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveMode('designer')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeMode === 'designer'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              🎨 Light Designer
            </button>
            <button
              onClick={() => setActiveMode('ar')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeMode === 'ar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              📱 AR Viewer
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto py-6 px-4">
        {activeMode === 'designer' ? (
          <LightDesigner />
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              AR Christmas Light Planner
            </h2>
            <div className="rounded-lg overflow-hidden">
              <ARViewer videoStream={stream} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
