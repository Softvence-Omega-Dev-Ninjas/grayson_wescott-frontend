// components/AssignedPrograms.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import dumbellIcon from "@/assets/dashboard/excercise-library/dumbellIcon.png";
import Image from "next/image";

// This is the new data structure for the programs
const assignedPrograms = [
  {
    id: "1",
    name: "Squat",
    level: "Advanced Level",
    duration: "12 weeks",
    progress: 3,
    totalWeeks: 12,
  },
  {
    id: "2",
    name: "Hinge",
    level: "Advanced Level",
    duration: "12 weeks",
    progress: 3,
    totalWeeks: 12,
  },
  {
    id: "3",
    name: "Push",
    level: "Advanced Level",
    duration: "12 weeks",
    progress: 10,
    totalWeeks: 12,
  },
  {
    id: "4",
    name: "Pull",
    level: "Advanced Level",
    duration: "12 weeks",
    progress: 8,
    totalWeeks: 12,
  },
  {
    id: "5",
    name: "Core",
    level: "Advanced Level",
    duration: "12 weeks",
    progress: 3,
    totalWeeks: 12,
  },
];

export function AssignedProgramTable() {
  return (
    <div className="mt-10 rounded-lg overflow-hidden bg-primary-200 text-white p-5">
      {/* Header */}
      <div className="flex justify-between items-center py-3">
        <h1 className="text-lg font-semibold">Assigned Programs</h1>
        <p className="text-sm text-gray-200 font-medium">2 Active Programs</p>
      </div>

      {/* Program List */}
      <div className="space-y-2">
        {assignedPrograms.map((program) => {
          // const progressPercentage = (program.progress / program.totalWeeks) * 100;
          return (
            <div
              key={program.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border border-secondary transition-colors duration-200"
            >
              {/* Program Info (Left Side) */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Placeholder for the icon */}
                <div className="w-10 h-10 flex items-center justify-center bg-secondary">
                  <Image src={dumbellIcon} alt="dumbell Icon" width={20} height={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold">{program.name}</h3>
                  <p className="text-sm text-gray-400">
                    {program.duration} • {program.level}
                  </p>
                </div>
              </div>

              {/* Progress Bar & Button (Right Side) */}
              <div className="flex flex-col md:flex-row items-end md:items-center gap-4 w-full max-w-xl">
                {/* Progress Bar */}
                <div className="flex-1 w-full">
                  <p className="text-sm mb-1 text-right md:text-left">
                    Week {program.progress} of {program.totalWeeks}
                  </p>
                  {/* <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                  </div> */}
                  <Progress value={program.progress} />
                </div>

                {/* View Details Button */}
                <Button variant="outline" className="w-full md:w-auto text-white border-none bg-[#0B1A2A] cursor-pointer">
                  View Details
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
