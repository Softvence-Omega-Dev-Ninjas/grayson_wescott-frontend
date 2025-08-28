"use client";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  controls?: boolean;
  autoPlay?: boolean;
}

export function VideoPlayer({ src, poster, controls = true, autoPlay = false }: VideoPlayerProps) {
  return (
    <div className="relative bg-black overflow-hidden">
      <video
        src={src}
        poster={poster}
        className="w-full h-full aspect-video object-fill" // ✅ fills width + height
        controls={controls}
        autoPlay={autoPlay}
      >
        Sorry, your browser does not support embedded videos.
      </video>
    </div>
  );
}
