/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface RelatedVideosProps {
  videos: any;
}

export function RelatedVideos({ videos }: RelatedVideosProps) {
  return (
    <div className="space-y-4 border border-secondary p-4">
      <h3 className="text-lg font-semibold text-white">Related Videos</h3>
      <div className="space-y-3">
        {videos.map((video: any) => (
          <div
            key={video.id}
            className="border border-secondary transition-colors cursor-pointer p-1.5"
          >
            <div className="flex gap-3">
              <div className="relative flex-shrink-0">
                <Image
                  src={video?.thumbnailUrl}
                  alt={video?.title}
                  width={100}
                  height={100}
                  className="w-24 h-16 object-cover rounded"
                />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                  {video?.duration}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white text-sm font-medium line-clamp-2 mb-1">
                  {video?.title}
                </h4>
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <span className="bg-primary-100 border border-secondary text-white px-2 py-0.5 text-xs">
                    {video?.difficulty}
                  </span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{video?.views}</span>
                  </div>
                </div>
                <Link
                  href={`/dashboard/user/exercise-library/video/${video.id}`}
                >
                  <span className="text-xs font-medium">Play Now</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
