import React from "react";
import DashboardBanner from "./_components/DashboardBanner/DashboardBanner";
import { FaRegCalendarCheck, FaRegCirclePlay } from "react-icons/fa6";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { StatesCard } from "../../admin/overview/_components/StatesCard/StatesCard";
import { Button } from "@/components/ui/button";
import { UserWorkoutCard } from "../exercise-library/_components/UserWorkoutCard/page";
import pic1 from "@/assets/dashboard/excercise-library/back-squat-form.png";
import pic2 from "@/assets/dashboard/excercise-library/barbell-back-squat-exercise.png";
import pic3 from "@/assets/dashboard/excercise-library/barbell-back-squat-workout.png";
import pic4 from "@/assets/dashboard/excercise-library/barbell-exercise-training.png";
import { AssignedProgramTable } from "./_components/AssignedProgramTable/AssignedProgramTable";
import { RecentMessages } from "./_components/RecentMessages/RecentMessages";

const statesData = [
  {
    title: "Total Clients",
    value: "247",
    icon: FaRegCirclePlay,
  },
  {
    title: "Active Clients",
    value: "189",
    icon: MdOutlineCalendarMonth,
  },
  {
    title: "Monthly Revenue",
    value: "$18,240",
    icon: FaRegCalendarCheck,
  },
];
export const workoutData = [
  {
    id: "1",
    title: "Barbell Back Squat",
    description: "Master strength and depth with proper form",
    duration: "1:15",
    difficulty: "Beginner",
    thumbnail: pic1.src,
    views: "6.2k views",
    tags: ["bodyweight"],
  },
  {
    id: "2",
    title: "Barbell Back Squat",
    description: "Master strength and depth with proper form",
    duration: "1:15",
    difficulty: "Beginner",
    thumbnail: pic2.src,
    views: "5.8k views",
    tags: ["bodyweight"],
  },
  {
    id: "3",
    title: "Barbell Back Squat",
    description: "Master strength and depth with proper form",
    duration: "1:10",
    difficulty: "Beginner",
    thumbnail: pic3.src,
    views: "7.1k views",
    tags: ["bodyweight"],
  },
  {
    id: "4",
    title: "Barbell Back Squat",
    description: "Master strength and depth with proper form",
    duration: "1:35",
    difficulty: "Beginner",
    thumbnail: pic4.src,
    views: "6.9k views",
    tags: ["bodyweight"],
  },
];
const UserOverview = () => {
  return (
    <div>
      <DashboardBanner />
      {/* States Cards  */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {statesData.map((metric, index) => (
          <StatesCard key={index} title={metric.title} value={metric.value} icon={metric.icon} />
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h1 className="text-xl font-bold">Exercise Library</h1>
          <Button className="bg-secondary border border-slate-400 cursor-pointer">View More</Button>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {workoutData.map((workout) => (
            <UserWorkoutCard key={workout.id} {...workout} />
          ))}
        </div>
      </div>
      <AssignedProgramTable />
      <RecentMessages />
    </div>
  );
};

export default UserOverview;
