import React from "react";
import { cn } from "../lib/utils";

interface YoutubePlayerProps {
  videoId: string;
  title?: string;
  className?: string;
  isVertical?: boolean;
}

/**
 * A professional YouTube embed component
 * Pre-configured to minimize branding and disable unrelated suggestions
 */
export function YoutubePlayer({ videoId, title, className, isVertical }: YoutubePlayerProps) {
  // rel=0: Show only related videos from the SAME channel
  // modestbranding=1: Hide the YouTube logo in the control bar
  // iv_load_policy=3: Hide video annotations
  // showinfo=0: Hide video title and uploader before playing
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&iv_load_policy=3&showinfo=0`;

  return (
    <div className={cn(
      "relative w-full overflow-hidden rounded-lg bg-slate-900 shadow-lg", 
      isVertical ? "aspect-[9/16] max-w-[350px] mx-auto" : "aspect-video",
      className
    )}>
      <iframe
        src={embedUrl}
        title={title || "LivFit Video Player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
