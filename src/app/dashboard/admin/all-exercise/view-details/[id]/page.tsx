import pic from "@/assets/dashboard/excercise-library/barbell-exercise-training.png";
import Image from "next/image";
import tagIcon from "@/assets/dashboard/excercise-library/tagIcon.png";
import levelIcon from "@/assets/dashboard/excercise-library/levelIcon.png";
import clockIcon from "@/assets/dashboard/excercise-library/clockIcon.png";
import dumbellIcon from "@/assets/dashboard/excercise-library/dumbellIcon.png";
import starIcon from "@/assets/dashboard/excercise-library/star.png";
import warningIcon from "@/assets/dashboard/excercise-library/warning.png";
import tickIcon from "@/assets/dashboard/excercise-library/tick.png";
import crossIcon from "@/assets/dashboard/excercise-library/cross.png";
import { ExerciseSteps } from "../../video/[id]/_components/ExcerciseSteps/ExcerciseSteps";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa6";
import Link from "next/link";

const sampleWorkout = {
  title: "Barbell Back Squat",
  description:
    "Master strength and depth with proper form in this comprehensive barbell back squat tutorial. This foundational compound movement targets multiple muscle groups for maximum effectiveness. This exercise involves placing a loaded barbell across your upper back and squatting down until your thighs are parallel to the floor, then driving back up to the starting position.",
  videoSrc: "/video.mp4",
  poster: pic.src,
};

const exerciseSteps = [
  {
    step: 1,
    title: "Setup under the barbell rack",
    description: "Position yourself under the bar with feet shoulder-width apart",
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

const benefits = [
  { id: 1, text: "Builds lower body strength" },
  { id: 2, text: "Glute, hamstring, and calf muscle development" },
  { id: 3, text: "Improves posture" },
  { id: 4, text: "Supports daily activities and athletic performance" },
];

const mistakes = [
  { id: 1, text: "Knee valgus (knees caving in)" },
  { id: 2, text: "Insufficient depth" },
  { id: 3, text: "Improper bar positioning" },
  { id: 4, text: "Not maintaining a neutral spine" },
];
const exerciseDetails = [
  { label: "Equipment", value: "Barbell, Rack" },
  { label: "Type", value: "Compound" },
  { label: "Primary Muscles", value: "Quads, Glutes, Hamstrings" },
  { label: "Secondary Muscles", value: "Core, Lower Back" },
  { label: "Calories Burn", value: "~120 / 10 min" },
];

const ViewExcerciseDetailsPage = () => {
  return (
    <div className="mb-20">
      {/* Video Info */}
      <div className="space-y-2 mb-5">
        <h1 className="text-2xl font-bold">{sampleWorkout.title}</h1>

        <div className="flex items-center justify-start flex-wrap gap-x-6 gap-y-2">
          <div className="flex items-center gap-1">
            <Image src={tagIcon} alt="Tags" width={12} height={12} className="shrink-0" />
            <span className="font-medium text-sm text-white">{"Legs, Strength, Compound"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Image src={levelIcon} alt="Tags" width={12} height={12} className="shrink-0" />
            <span className="font-medium text-sm text-white mt-0.5">{"Beginner"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Image src={clockIcon} alt="Tags" width={12} height={12} className="shrink-0" />
            <span className="font-medium text-sm text-white mt-0.5">{"1:15"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Image src={dumbellIcon} alt="Tags" width={12} height={12} className="shrink-0" />
            <span className="font-medium text-sm text-white mt-0.5">{"Barbell, Rack"}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="relative">
            <Image src={pic} alt="Upload Icon" className="w-full h-[500px] object-fill" />
            <Link href={"/dashboard/admin/all-exercise/video/1"} className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-1/2">
              <Button className="flex items-center justify-center gap-1.5 bg-[#7DA6FF]  py-4  px-10 cursor-pointer">
                <FaPlay />
                <span>Play Full Video</span>
              </Button>
            </Link>
          </div>

          {/* Description */}
          <div className="bg-primary-200 border border-secondary p-4">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-300 leading-relaxed">{sampleWorkout.description}</p>

            <div className="mt-4 space-y-2 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Image src={starIcon} alt="Upload Icon" className="w-5 h-4 shrink-0" />
                  <h1 className="font-semibold text-xl"> Key Benifits</h1>
                </div>

                {benefits.map((item) => (
                  <div key={item.id} className="flex items-center gap-1.5 mt-1">
                    <Image src={tickIcon} alt="Upload Icon" className="w-3 h-4 shrink-0" />
                    <span className="font-medium text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Image src={warningIcon} alt="Upload Icon" className="w-5 h-4 shrink-0" />
                  <h1 className="font-semibold text-xl">Common Mistakes</h1>
                </div>

                {mistakes.map((item) => (
                  <div key={item.id} className="flex items-center gap-1.5 mt-1">
                    <Image src={crossIcon} alt="Upload Icon" className="w-3 h-4 shrink-0" />
                    <span className="font-medium text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Exercise Steps */}
          <ExerciseSteps steps={exerciseSteps} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 bg-primary-200 border border-secondary h-fit p-5">
          <h1 className="text-xl font-bold">Excercise Details</h1>
          <div className="space-y-2 mt-6">
            {exerciseDetails.map((item, idx) => (
              <div key={idx} className="flex justify-between gap-3 flex-wrap pb-1">
                <span className="text-gray-400">{item.label}</span>
                <span className="text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExcerciseDetailsPage;
