/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { getAllUserProgram } from '@/services/user/assigned-program';
import { getAllExcerciseByUser } from '@/services/user/excercise-library';
import { getUserDashboardStates } from '@/services/user/overview';
import Link from 'next/link';
import { FaRegCalendarCheck, FaRegCirclePlay } from 'react-icons/fa6';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { UserWorkoutCard } from '../exercise-library/_components/UserWorkoutCard/UserWorkoutCard';
import { AssignedProgramTable } from './_components/AssignedProgramTable/AssignedProgramTable';
import DashboardBanner from './_components/DashboardBanner/DashboardBanner';

const UserOverview = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const dashboardStates = await getUserDashboardStates();

  const statesData = [
    {
      title: 'All Video',
      value: dashboardStates?.data?.totalExerciseLibraryVideos,
      icon: FaRegCirclePlay,
    },
    {
      title: 'Total Training',
      value: dashboardStates?.data?.totalAssignedTrainings,
      icon: MdOutlineCalendarMonth,
    },
    {
      title: 'Training Completed',
      value: dashboardStates?.data?.totalCompletedTrainings,
      icon: FaRegCalendarCheck,
    },
  ];

  // parse search params (page & status)
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  // server fetch — uses your existing server function
  const res = await getAllUserProgram({
    page,
    limit: 10,
  });

  const allExcercise = await getAllExcerciseByUser();
  return (
    <div>
      <DashboardBanner />
      {/* States Cards  */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {statesData.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className={'bg-primary-200 border border-[#a5a7ac]'}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white">
                      {metric?.title}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {metric?.value}
                    </p>
                    {/* <p
                    className={'text-sm text-white'}
                  >{`+${res?.activeClientThisMonth}% this month`}</p> */}
                  </div>

                  <div className="h-12 w-12 text-white bg-secondary p-2">
                    <Icon className="h-full w-full" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h1 className="text-xl font-bold">Exercise Library</h1>
          <Link href={'/dashboard/user/exercise-library'}>
            <Button className="bg-secondary border border-slate-400 cursor-pointer">
              View More
            </Button>
          </Link>
        </div>
        {allExcercise?.data?.length === 0 && (
          <div className="px-5 text-white py-20 text-center">
            No Excercise available!
          </div>
        )}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allExcercise?.data?.length > 0 &&
            allExcercise?.data
              ?.slice(0, 4)
              .map((workout: any) => (
                <UserWorkoutCard key={workout.id} excercise={workout} />
              ))}
        </div>
      </div>

      {/* Pass programs to AssignedProgramTable */}
      <AssignedProgramTable serverPrograms={res} />
      {/* <RecentMessages /> */}
    </div>
  );
};

export default UserOverview;
