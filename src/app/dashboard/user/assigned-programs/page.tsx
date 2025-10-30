/* eslint-disable @typescript-eslint/no-explicit-any */
import dumbellIcon from '@/assets/dashboard/excercise-library/dumbellIcon.png';
import Pagination from '@/components/shared/dashboard/Pagination/Pagination';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getAllUserProgram } from '@/services/user/assigned-program';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};
const AssignedProgramsPage = async ({ searchParams }: Props) => {
  const pageParam =
    typeof searchParams?.page === 'string'
      ? parseInt(searchParams?.page as string, 10)
      : undefined;
  const page = Number.isNaN(pageParam) || !pageParam ? 1 : pageParam;

  // server fetch — uses your existing server function
  const res = await getAllUserProgram({
    page,
    limit: 10,
    status: undefined,
  });
  console.log(res);
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold mb-8">Assigned Programs</h1>
      <div className="space-y-2">
        {res?.data?.length === 0 && (
          <div className="py-20 text-center text-gray-300">
            No assigned programs found.
          </div>
        )}

        {res?.data?.length > 0 &&
          res?.data?.map((program: any) => {
            const currentWeek = program?.currentWeekAsPerUser ?? 0;
            const totalWeeks = program?.programDurationWeeks ?? 1;
            const progressPercentage = Math.round(
              (currentWeek / Math.max(1, totalWeeks)) * 100,
            );

            return (
              <div
                key={program?.id}
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
                      {program?.programName}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {totalWeeks} weeks • {program?.status.replace('_', ' ')}
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
      {res?.data?.length > 0 && (
        <div className="mt-10 flex justify-center">
          <Pagination
            activePage={res?.metadata?.page || 1}
            totalPages={res?.metadata?.totalPage || 1}
          />
        </div>
      )}
    </div>
  );
};

export default AssignedProgramsPage;
