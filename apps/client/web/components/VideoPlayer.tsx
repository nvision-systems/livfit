import React from 'react';

interface VideoPlayerProps {
  url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group">
      <video 
        src={url} 
        controls 
        className="w-full h-full object-contain"
        poster="/api/placeholder/800/450"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
