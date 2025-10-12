// components/AssignedProgramTable.tsx
'use client';

import dumbellIcon from '@/assets/dashboard/excercise-library/dumbellIcon.png';
import { Pagination } from '@/components/shared/dashboard/Pagination/Pagination';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import usePagination from '@/hooks/usePagination';
import Image from 'next/image';
import { useState } from 'react';

type ProgramStatus = 'IN_PROGRESS' | 'COMPLETED' | 'NOT_STARTED';

type UserProgram = {
  id: string;
  status: ProgramStatus;
  programId: string;
  startDate: string;
  endDate: string;
  programName: string;
  programDescription?: string;
  programDurationWeeks: number;
  currentDayAsPerUser: number;
  currentWeekAsPerUser: number;
  completionPercentage: number;
  adherencePercentage: number;
  compliancePercentage: number;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: UserProgram[];
  metadata?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
};

interface AssignedProgramTableProps {
  serverPrograms?: ApiResponse; // pass from parent
}

export function AssignedProgramTable({
  serverPrograms,
}: AssignedProgramTableProps) {
  const { currentPage, handlePageChange } = usePagination();
  const [programs, setPrograms] = useState<UserProgram[]>(
    serverPrograms?.data || [],
  );
  const totalPages = serverPrograms?.metadata?.totalPage ?? 1;

  return (
    <div className="mt-10 overflow-hidden bg-primary-200 text-white p-5">
      {/* Header */}
      <div className="flex justify-between items-center py-3">
        <h1 className="text-lg font-semibold">Assigned Programs</h1>
        <p className="text-sm text-gray-200 font-medium">
          {programs.length} Active Programs
        </p>
      </div>

      {/* Program List */}
      <div className="space-y-2">
        {programs.length === 0 && (
          <div className="py-6 text-center text-gray-300">
            No assigned programs found.
          </div>
        )}

        {programs.map((program) => {
          const currentWeek = program.currentWeekAsPerUser ?? 0;
          const totalWeeks = program.programDurationWeeks ?? 1;
          const progressPercentage = Math.round(
            (currentWeek / Math.max(1, totalWeeks)) * 100,
          );

          return (
            <div
              key={program.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border border-secondary transition-colors duration-200"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-10 h-10 flex items-center justify-center bg-secondary">
                  <Image
                    src={dumbellIcon}
                    alt="dumbell Icon"
                    width={20}
                    height={20}
                  />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold">
                    {program.programName}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {totalWeeks} weeks • {program.status.replace('_', ' ')}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-end md:items-center gap-4 w-full max-w-xl">
                <div className="flex-1 w-full">
                  <p className="text-sm mb-1 text-right md:text-left">
                    Week {currentWeek} of {totalWeeks}
                  </p>
                  <Progress value={progressPercentage} />
                </div>
                <Button
                  variant="outline"
                  className="w-full md:w-auto text-white border-none bg-[#0B1A2A] hover:bg-secondary hover:text-white cursor-pointer"
                >
                  View Details
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination (only works if you implement client-side page change + fetch) */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center">
          <Pagination
            activePage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default AssignedProgramTable;
