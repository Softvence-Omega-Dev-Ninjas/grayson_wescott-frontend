import { Button } from "@/components/ui/button";
import { Play, Eye } from "lucide-react";
import Image from "next/image";

interface WorkoutCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  thumbnail: string;
  views: string;
  tags: string[];
}

export function WorkoutCard({ title, description, duration, difficulty, thumbnail, views, tags }: WorkoutCardProps) {
  return (
    <div className="bg-primary-200 border border-secondary p-2 overflow-hidden group ">
      <div className="relative aspect-video">
        <Image src={thumbnail} alt={title} width={200} height={300} className="w-full h-[250px] xs:h-[300px] object-cover" />
        {/* Duration badge */}
        <span className="absolute top-2 left-2 bg-black/70 text-white border-none text-xs">{duration}</span>
        {/* Difficulty badge */}
        <span className="absolute top-2 right-2 bg-orange-600 text-white border-none text-xs">{difficulty}</span>
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-12 h-12 text-white" />
        </div>
      </div>

      <div>
        <h3 className="font-semibold line-clamp-1 mt-2">{title}</h3>
        <p className=" text-xs line-clamp-2 mt-1.5">{description}</p>

        {/* Tags and views */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            {tags.map((tag, index) => (
              <span key={index}>#{tag}</span>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{views}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white text-xs h-8"
          >
            View Details
          </Button>
          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
            Play Video
          </Button>
        </div>
      </div>
    </div>
  );
}
