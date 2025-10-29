/* eslint-disable @typescript-eslint/no-explicit-any */
import bodyWeightIcon from '@/assets/dashboard/excercise-library/bodybuilderIcon.png';
import watchIcon from '@/assets/dashboard/excercise-library/watchIcon.png';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function UserWorkoutCard({ excercise }: { excercise: any }) {
  return (
    <div className="bg-primary-200 border border-secondary p-2 overflow-hidden group ">
      <div className="relative aspect-video">
        <Image
          src={excercise?.thumbnailUrl}
          alt={'Workout Thumbnail'}
          width={200}
          height={300}
          className="w-full h-[250px] xs:h-[300px] object-cover"
        />
        {/* Duration badge */}
        {/* <span className="absolute top-2 left-2 bg-secondary px-3 py-1.5 text-white border-none text-xs font-medium">
          {excercise?.duration}
        </span> */}
        {/* Difficulty badge */}
        <span className="absolute top-2 right-2 bg-secondary px-3 py-1.5 text-white border-none text-xs font-medium">
          {excercise?.difficulty}
        </span>
        {/* Play overlay */}
        {/* <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-12 h-12 text-white" />
        </div> */}
      </div>

      <div className="p-1">
        <h3 className="font-semibold text-lg line-clamp-1 mt-2">
          {excercise?.title}
        </h3>
        <p className=" text-sm mt-1.5 line-clamp-1">{excercise?.description}</p>

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
            <span className="font-medium text-sm text-white mt-1">
              {excercise?.type}
            </span>
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
              {excercise?.views}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <Link
            href={`/dashboard/user/exercise-library/view-details/${excercise.id}`}
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
            href={`/dashboard/user/exercise-library/video/${excercise.id}`}
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
