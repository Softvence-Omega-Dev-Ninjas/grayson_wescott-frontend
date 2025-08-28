"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Edit, Users, FileText } from "lucide-react";

export function ProgramOverview() {
  return (
    <div className="bg-primary-200 border border-secondary p-5">
      <div>
        <h1 className="text-white font-semibold text-xl sm:text-2xl mb-8">Program Overview</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-6">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Sarah Johnson" />
            <AvatarFallback className="bg-gray-700 text-white">SJ</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-white font-semibold">Sarah Johnson</h3>
            <p className="text-white">Weight Loss Program</p>
            <p className="text-white text-sm">12 weeks • 4 days/week</p>
          </div>
        </div>

        {/* Program Details */}
        <div className="flex flex-row lg:flex-col gap-4 lg:items-start items-center justify-between lg:justify-center w-full pr-0 xl:pr-8 text-white font-medium text-base ">
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:justify-between w-full">
            <span>Start Date:</span>
            <span>Jun 15, 2025</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:justify-between w-full">
            <p>End Date:</p>
            <p>Apr 8, 2026</p>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:justify-between w-full">
            <p>Last Activity:</p>
            <p>2 hours ago</p>
          </div>
        </div>

        {/* Progress and Compliance */}
        <div className="flex flex-col gap-4 items-start w-full">
          <div className="w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium ">Progress</span>
              <span className="text-white font-medium ">65%</span>
            </div>
            <Progress value={65} className="h-2 bg-secondary" />
          </div>
          <div className="w-full ">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium ">Compliance</span>
              <span className="text-white font-medium ">85%</span>
            </div>
            <Progress value={85} className="h-2 bg-secondary" />
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button size="sm" className="bg-secondary cursor-pointer text-white hover:bg-gray-700">
          <Edit className="h-4 w-4 mr-2" />
          Edit Program
        </Button>
        <Button size="sm" className="bg-transparent cursor-pointer text-white hover:bg-gray-700 border border-secondary">
          <Users className="h-4 w-4 mr-2" />
          Reassign
        </Button>
        <Button size="sm" className="bg-transparent cursor-pointer text-white hover:bg-gray-700 border border-secondary">
          <FileText className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
      </div>
    </div>
  );
}
