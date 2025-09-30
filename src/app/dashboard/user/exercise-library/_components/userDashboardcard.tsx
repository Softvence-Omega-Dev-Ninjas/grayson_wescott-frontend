import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import Image from 'next/image';
import bodyWeightIcon from '@/assets/dashboard/excercise-library/bodybuilderIcon.png';
import watchIcon from '@/assets/dashboard/excercise-library/watchIcon.png';
import Link from 'next/link';

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

export function UserWorkoutCard({
  title,
  description,
  duration,
  difficulty,
  thumbnail,
  views,
}: WorkoutCardProps) {
  return (
    <div className="bg-primary-200 border border-secondary p-2 overflow-hidden group ">
      <div className="relative aspect-video">
        <Image
          src={thumbnail}
          alt={title}
          width={200}
          height={300}
          className="w-full h-[250px] xs:h-[300px] object-cover"
        />
        {/* Duration badge */}
        <span className="absolute top-2 left-2 bg-secondary px-3 py-1.5 text-white border-none text-xs font-medium">
          {duration}
        </span>
        {/* Difficulty badge */}
        <span className="absolute top-2 right-2 bg-secondary px-3 py-1.5 text-white border-none text-xs font-medium">
          {difficulty}
        </span>
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-12 h-12 text-white" />
        </div>
      </div>

      <div className="p-1">
        <h3 className="font-semibold text-lg line-clamp-1 mt-2">{title}</h3>
        <p className=" text-sm line-clamp-2 mt-1.5">{description}</p>

        {/* Tags and views */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Image
              src={bodyWeightIcon}
              alt="Tags"
              width={8}
              height={8}
              className="shrink-0"
            />
            <span className="font-medium text-sm text-white mt-1">{views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src={watchIcon}
              alt="Tags"
              width={12}
              height={12}
              className="shrink-0"
            />
            <span className="font-medium text-sm text-white mt-0.5">
              {views}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <Link
            href={'/dashboard/user/exercise-library/view-details/1'}
            className="flex-1 w-full"
          >
            <Button
              variant={'outline'}
              size="sm"
              className="flex-1 cursor-pointer bg-transparent border-secondary rounded-none text-white hover:bg-gray-800 hover:text-white py-2 w-full"
            >
              View Details
            </Button>
          </Link>
          <Link
            href={'/dashboard/user/exercise-library/video/1'}
            className="flex-1 w-full"
          >
            <Button
              size="sm"
              className="w-full bg-secondary border-secondary rounded-none text-white hover:bg-gray-800 hover:text-white py-2 cursor-pointer"
            >
              Play Video
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
