import { Progress } from "@/components/ui/progress";
import React from "react";
import WorkoutBlock from "./_components/WorkoutBlock/WorkoutBlock";
import SidebarSection from "./_components/SidebarSection/SidebarSection";
export type TProgram = {
  title: string;
  description: string;
  status: string;
  progress: number;
};

export type TWorkout = {
  exercise: string;
  sets: number;
  reps: string;
  rpe: string;
  rest: string;
  day: number;
};

export type TSidebarItem = {
  label: string;
  value: string;
};

const data = {
  program: {
    title: "Elite Squat Program",
    description:
      "Advanced strength building program designed to maximize your squat performance over 12 weeks",
    status: "In Progress",
    progress: 33,
  },
  workouts: [
    {
      exercise: "Back Squat",
      sets: 4,
      reps: "6-8",
      rpe: "9-B",
      rest: "3 min",
      day: 22,
    },
    {
      exercise: "Back Squat",
      sets: 4,
      reps: "6-8",
      rpe: "9-B",
      rest: "3 min",
      day: 22,
    },
    {
      exercise: "Back Squat",
      sets: 4,
      reps: "6-8",
      rpe: "9-B",
      rest: "3 min",
      day: 22,
    },
    {
      exercise: "Back Squat",
      sets: 4,
      reps: "6-8",
      rpe: "9-B",
      rest: "3 min",
      day: 22,
    },
  ],
  sidebar: [
    {
      title: "Progress Tracking",
      items: [
        { label: "Program Completion", value: "25%" },
        { label: "Compliance Score", value: "87%" },
        { label: "Training Completed", value: "22/66" },
      ],
    },
    {
      title: "Load Progression",
      items: [
        { label: "Program Completion", value: "50%" },
        { label: "Compliance Score", value: "87%" },
        { label: "Training Completed", value: "22/66" },
      ],
    },
    {
      title: "RPE Trends",
      items: [
        { label: "Program Completion", value: "33%" },
        { label: "Compliance Score", value: "87%" },
        { label: "Training Completed", value: "22/66" },
      ],
    },
  ],
};
const AssignedProgramsPage = () => {
  return (
    <div className="">
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Main Content Area */}
        <div className="w-full lg:w-2/3 mb-8 lg:mb-0">
          {/* Program Header */}
          <div className="mb-8 bg-primary-200 p-5">
            <h1 className="text-3xl font-bold mb-2">{data.program.title}</h1>
            <p className="text-gray-200 mb-4">{data.program.description}</p>
            <span className="mb-4 border border-secondary px-4 py-2">
              {data.program.status}
            </span>
            <div className="flex justify-between items-center text-sm mt-5 mb-3">
              <span className="text-sm text-gray-200">Program Progress</span>
              <span className="font-semibold text-gray-50">
                {data.program.progress}%
              </span>
            </div>
            <Progress value={data.program.progress} />
          </div>

          {/* Today's Workout */}
          <div className="mb-8 ">
            <div className="flex justify-between items-center mb-4 bg-primary-200 p-5">
              <h2 className="text-2xl font-bold">
                Today&apos;s Workout · Day {data.workouts[0].day}
              </h2>
              <span className="text-sm font-semibold text-gray-400">
                Lower Body Strength
              </span>
            </div>
            {data.workouts.map((workout, index) => (
              <WorkoutBlock key={index} workout={workout} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3">
          {data.sidebar.map((section, index) => (
            <SidebarSection
              key={index}
              title={section.title}
              items={section.items}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignedProgramsPage;
