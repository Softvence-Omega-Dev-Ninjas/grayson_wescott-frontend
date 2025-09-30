import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import pic from "@/assets/dashboard/excercise-library/barbell-exercise-training.png";
import { VideoPlayer } from "./_components/VideoPlayer/VideoPlayer";
import { ExerciseSteps } from "./_components/ExcerciseSteps/ExcerciseSteps";
import { NotesTips } from "./_components/NotesTips/NotesTips";
import { RelatedVideos } from "./_components/RelatedVideos/RelatedVideos";
import Image from "next/image";
import tagIcon from "@/assets/dashboard/excercise-library/tagIcon.png";
import levelIcon from "@/assets/dashboard/excercise-library/levelIcon.png";
import clockIcon from "@/assets/dashboard/excercise-library/clockIcon.png";
import dumbellIcon from "@/assets/dashboard/excercise-library/dumbellIcon.png";
import watchIcon from "@/assets/dashboard/excercise-library/watchIcon.png";

const sampleWorkout = {
  title: "Barbell Back Squat",
  description:
    "Master strength and depth with proper form in this comprehensive barbell back squat tutorial. The fundamental compound movement targets multiple muscle groups for maximum effectiveness.",
  videoSrc: "/video.mp4",
  poster: pic.src,
};

const relatedVideos = [
  {
    id: "1",
    title: "How Squat Tutorial",
    thumbnail: pic.src,
    duration: "6:30",
    views: "2.1k",
    level: "Beginner",
  },
  {
    id: "2",
    title: "Barbell Back Squats",
    thumbnail: pic.src,
    duration: "4:15",
    views: "1.8k",
    level: "Beginner",
  },
  {
    id: "3",
    title: "Deadlift Squat",
    thumbnail: pic.src,
    duration: "7:22",
    views: "3.2k",
    level: "Intermediate",
  },
  {
    id: "4",
    title: "How Squat Tutorial",
    thumbnail: pic.src,
    duration: "5:45",
    views: "1.5k",
    level: "Beginner",
  },
];

const exerciseSteps = [
  {
    step: 1,
    title: "Setup under the barbell rack",
    description:
      "Position yourself under the bar with feet shoulder-width apart",
  },
  {
    step: 2,
    title: "Engage core, step back",
    description: "Brace your core and take a step back from the rack",
  },
  {
    step: 3,
    title: "Squat until thighs are parallel",
    description: "Lower down slowly maintaining proper knee tracking",
  },
  {
    step: 4,
    title: "Drive up keeping chest up",
    description: "Push through heels to return to starting position",
  },
];

const notesTips = [
  {
    id: "1",
    author: "Coach Mike",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Trainer",
    content:
      "Remember to keep your knees tracking over your toes throughout the movement. This prevents knee valgus and reduces injury risk.",
  },
  {
    id: "2",
    author: "Sarah J",
    avatar: "/placeholder.svg?height=32&width=32",
    content:
      "I found that the step-by-step breakdown really helped me understand the proper form. My squats have improved significantly.",
  },
];

const WorkoutPlayVideoPage = () => {
  return (
    <div className="mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <VideoPlayer
            src={sampleWorkout.videoSrc}
            poster={sampleWorkout.poster}
          />

          {/* Video Info */}
          <div className="space-y-2 mb-5">
            <h1 className="text-2xl font-bold">{sampleWorkout.title}</h1>

            <div className="flex items-center justify-start flex-wrap gap-x-6 gap-y-2">
              <div className="flex items-center gap-1">
                <Image
                  src={tagIcon}
                  alt="Tags"
                  width={12}
                  height={12}
                  className="shrink-0"
                />
                <span className="font-medium text-sm text-white">
                  {"Legs, Strength, Compound"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={levelIcon}
                  alt="Tags"
                  width={12}
                  height={12}
                  className="shrink-0"
                />
                <span className="font-medium text-sm text-white mt-0.5">
                  {"Beginner"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={clockIcon}
                  alt="Tags"
                  width={12}
                  height={12}
                  className="shrink-0"
                />
                <span className="font-medium text-sm text-white mt-0.5">
                  {"1:15"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={dumbellIcon}
                  alt="Tags"
                  width={12}
                  height={12}
                  className="shrink-0"
                />
                <span className="font-medium text-sm text-white mt-0.5">
                  {"Barbell, Rack"}
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
                  {"6.3k Views"}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-300 leading-relaxed">
              {sampleWorkout.description}
            </p>

            <div className="mt-4 space-y-2">
              <p className="text-gray-300">
                <strong>Benefits:</strong> Builds lower body strength, glute,
                hamstring, and calf muscle development, improves posture
                potential for daily activities and athletic performance.
              </p>
              <p className="text-gray-300">
                <strong>Common Mistakes to Avoid:</strong> Knee valgus (knees
                caving in), insufficient depth, and improper bar positioning.
                Focus on maintaining neutral spine throughout the exercise.
              </p>
            </div>
          </div>

          {/* Exercise Steps */}
          <ExerciseSteps steps={exerciseSteps} />

          {/* Downloadable Resources */}
          <div className=" mt-6">
            <h3 className="text-lg font-semibold mb-4">
              Downloadable Resources
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="border border-secondary bg-primary-200 cursor-pointer hover:bg-primary-100 border-none hover:text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                Form Guide
              </Button>
              <Button
                variant="outline"
                className="border border-secondary bg-primary-200 cursor-pointer hover:bg-primary-100 border-none hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Workout Tracker
              </Button>
            </div>
          </div>

          {/* Notes & Tips */}
          <NotesTips notes={notesTips} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <RelatedVideos videos={relatedVideos} />
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlayVideoPage;
