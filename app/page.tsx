// app/ar-viewer/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import CameraCapture from "@/components/CameraCapture";
import ARViewer from "@/components/ARViewer";
// import { calculateLightPlacements } from '@/lib/lightAlgorithm';

export default function ARViewerPage() {
  // const [features, setFeatures] = useState<HouseFeature[]>([]);
  // const [lightSuggestions, setLightSuggestions] = useState<LightSuggestion[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  useEffect(() => {
    if (!stream) {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
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
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold text-white mb-8">
        AR Christmas Light Planner
      </h1>
      <div className="rounded-lg overflow-hidden">
        <ARViewer videoStream={stream} />
      </div>
    </div>
  );
}
