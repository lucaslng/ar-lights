"use client";

import { useEffect, useRef } from "react";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-4">
      <video ref={videoRef} autoPlay playsInline muted className="w-full" />
    </div>
  );
}
