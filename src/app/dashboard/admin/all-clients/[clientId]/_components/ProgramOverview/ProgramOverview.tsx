/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function ProgramOverview({ userInfo }: { userInfo: any }) {
  return (
    <div className="bg-primary-200 border border-secondary p-5 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* User Info */}
        <div className="flex flex-col md:flex-row items-start gap-4">
          <Avatar className="h-40 w-40 rounded-none ">
            <AvatarImage src={userInfo?.avatarUrl} alt="Sarah Johnson" />
            <AvatarFallback className="bg-gray-700 text-white">
              SJ
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex flex-col justify-between gap-2">
              <h3 className="text-white text-2xl font-semibold">
                {userInfo?.name}
              </h3>
              <p className="text-white flex items-center gap-2">
                <span className="font-semibold">Email: </span>
                <span>{userInfo?.email}</span>
              </p>
              <p className="text-white flex items-center gap-2">
                <span className="font-semibold">Phone: </span>
                <span>{userInfo?.phone ? userInfo?.phone : 'N/A'}</span>
              </p>
              <p className="text-white flex items-center gap-2">
                <span className="font-semibold">Last Active: </span>
                <span>{userInfo?.lastActiveAt}</span>
              </p>
              <p className="text-white flex items-center gap-2">
                <span className="font-semibold">Last Login: </span>
                <span>{userInfo?.lastLoginAt}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Program Details */}
        {/* <div className="flex flex-row lg:flex-col gap-4 lg:items-start items-center justify-between lg:justify-center w-full pr-0 xl:pr-8 text-white font-medium text-base ">
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
        </div> */}

        {/* Progress and Compliance */}
        {/* <div className="flex flex-col gap-4 items-start w-full">
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
        </div> */}
      </div>
      {/* Action Buttons */}
      {/* <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          className="bg-secondary cursor-pointer text-white hover:bg-gray-700"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Program
        </Button>
        <Button
          size="sm"
          className="bg-transparent cursor-pointer text-white hover:bg-gray-700 border border-secondary"
        >
          <Users className="h-4 w-4 mr-2" />
          Reassign
        </Button>
        <Button
          size="sm"
          className="bg-transparent cursor-pointer text-white hover:bg-gray-700 border border-secondary"
        >
          <FileText className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
      </div> */}
    </div>
  );
}
