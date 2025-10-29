'use client';

import dumbleIcon from '@/assets/dashboard/excercise-library/dumbellIcon.png';
import Pagination from '@/components/shared/dashboard/Pagination/Pagination';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import Link from 'next/link';

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
}: AssignedProgramTableProps) {
  const programs = serverPrograms?.data || [];
  // const totalPages = serverPrograms?.metadata?.totalPage ?? 1;
  // Pagination hook

  // Programs state
  // const [programs, setPrograms] = useState<UserProgram[]>(
  //   serverPrograms?.data || [],
  // );
  // const totalPages = serverPrograms?.metadata?.totalPage ?? 1;

  // Local status filter state
  // const [activeStatus, setActiveStatus] = useState<ProgramStatus | undefined>(
  //   initialStatus,
  // );

  // Status change
  // const handleStatusChange = (status?: ProgramStatus) => {
  //   setActiveStatus(status);
  // };

  // Compute filtered programs
  // const filteredPrograms = useMemo(
  //   () =>
  //     activeStatus
  //       ? programs.filter((p) => p.status === activeStatus)
  //       : programs,
  //   [programs, activeStatus],
  // );

  return (
    <div className="mt-10 overflow-hidden bg-primary-200 text-white p-5">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 py-3">
        <div>
          <h1 className="text-lg font-semibold">Assigned Programs</h1>
          {/* <p className="text-sm text-gray-200 font-medium">
            {filteredPrograms?.filter((p) => p.status === 'IN_PROGRESS').length}{' '}
            Active Programs
          </p> */}
        </div>

        {/* Status filter buttons */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300 mr-2">Status:</span>

          {/* {['All', 'IN_PROGRESS', 'PAUSED', 'COMPLETED'].map((status) => (
            <Button
              key={status}
              variant={
                (status === 'All' && !activeStatus) || activeStatus === status
                  ? 'default'
                  : 'ghost'
              }
              size="sm"
              className="text-white"
              onClick={() =>
                handleStatusChange(
                  status === 'All' ? undefined : (status as ProgramStatus),
                )
              }
            >
              {status === 'All' ? 'All' : status.replace('_', ' ')}
            </Button>
          ))} */}
        </div>
      </div>

      {/* Program List */}
      <div className="space-y-2">
        {programs?.length === 0 && (
          <div className="py-6 text-center text-gray-300">
            No assigned programs found.
          </div>
        )}

        {programs?.map((program) => {
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
                    src={dumbleIcon}
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
                <Link
                  href={`/dashboard/user/assigned-programs/${program.programId}`}
                >
                  <Button
                    variant="outline"
                    className="w-full md:w-auto text-white border-none bg-[#0B1A2A] hover:bg-secondary hover:text-white cursor-pointer"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {(serverPrograms?.metadata?.totalPage ?? 0) > 0 && (
        <div className="mt-4 flex justify-end">
          <Pagination
            activePage={serverPrograms?.metadata?.page ?? 1}
            totalPages={serverPrograms?.metadata?.totalPage ?? 1}
          />
        </div>
      )}
    </div>
  );
}

export default AssignedProgramTable;
