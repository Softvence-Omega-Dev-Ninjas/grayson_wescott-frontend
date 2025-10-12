'use client';

import dumbellIcon from '@/assets/dashboard/excercise-library/dumbellIcon.png';
import { Pagination } from '@/components/shared/dashboard/Pagination/Pagination';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import usePagination from '@/hooks/usePagination';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type ProgramStatus = 'IN_PROGRESS' | 'PAUSED' | 'COMPLETED';

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
  serverPrograms?: ApiResponse; // server-provided response
  initialPage?: number;
  initialStatus?: ProgramStatus | undefined;
}

export function AssignedProgramTable({
  serverPrograms,
  initialPage = 1,
  initialStatus,
}: AssignedProgramTableProps) {
  // pagination hook (we'll sync initial page)
  const { currentPage, handlePageChange, setCurrentPage } = usePagination();

  // local program state (comes from server)
  const [programs, setPrograms] = useState<UserProgram[]>(
    serverPrograms?.data || [],
  );
  const totalPages = serverPrograms?.metadata?.totalPage ?? 1;

  // router + search params
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // local status filter state (reflect server initial)
  const [activeStatus, setActiveStatus] = useState<ProgramStatus | undefined>(
    initialStatus,
  );

  // sync pagination hook with initial page on mount/prop change
  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage, setCurrentPage]);

  // sync local programs when serverPrograms prop changes (server re-render after navigation)
  useEffect(() => {
    setPrograms(serverPrograms?.data || []);
  }, [serverPrograms]);

  // helper to update search params and navigate (triggers server re-fetch)
  const updateSearchParams = (
    page: number,
    status?: ProgramStatus | undefined,
  ) => {
    const params = new URLSearchParams(
      Array.from(searchParams?.entries() || []),
    );

    // set page
    params.set('page', String(page));

    // set or delete status
    if (status) params.set('status', status);
    else params.delete('status');

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(url);
  };

  // called when pagination component requests a new page
  const handlePageClick = (page: number) => {
    // update client hook state
    handlePageChange(page);
    // update url -> server will fetch the new page
    updateSearchParams(page, activeStatus);
  };

  // called when user selects a status filter
  const handleStatusChange = (status?: ProgramStatus) => {
    setActiveStatus(status);
    // reset to page 1 when changing filter
    updateSearchParams(1, status);
  };

  return (
    <div className="mt-10 overflow-hidden bg-primary-200 text-white p-5">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 py-3">
        <div>
          <h1 className="text-lg font-semibold">Assigned Programs</h1>
          <p className="text-sm text-gray-200 font-medium">
            {(programs &&
              programs?.length > 0 &&
              programs?.filter((p) => p?.status === 'IN_PROGRESS').length) ||
              0}{' '}
            Active Programs
          </p>
        </div>

        {/* Status filter buttons */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300 mr-2">Status:</span>

          <Button
            variant={!activeStatus ? 'default' : 'ghost'}
            size="sm"
            className="text-white"
            onClick={() => handleStatusChange(undefined)}
          >
            All
          </Button>

          <Button
            variant={activeStatus === 'IN_PROGRESS' ? 'default' : 'ghost'}
            size="sm"
            className="text-white"
            onClick={() => handleStatusChange('IN_PROGRESS')}
          >
            In Progress
          </Button>

          <Button
            variant={activeStatus === 'PAUSED' ? 'default' : 'ghost'}
            size="sm"
            className="text-white"
            onClick={() => handleStatusChange('PAUSED')}
          >
            Paused
          </Button>

          <Button
            variant={activeStatus === 'COMPLETED' ? 'default' : 'ghost'}
            size="sm"
            className="text-white"
            onClick={() => handleStatusChange('COMPLETED')}
          >
            Completed
          </Button>
        </div>
      </div>

      {/* Program List */}
      <div className="space-y-2">
        {programs.length === 0 && (
          <div className="py-6 text-center text-gray-300">
            No assigned programs found.
          </div>
        )}

        {programs &&
          programs?.length > 0 &&
          programs.map((program) => {
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

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="mt-4 flex items-center justify-center">
          <Pagination
            activePage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageClick}
          />
        </div>
      )}
    </div>
  );
}

export default AssignedProgramTable;
