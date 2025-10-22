/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { getAllUserProgram } from '@/services/user/assigned-program';
import { getAllExcerciseByUser } from '@/services/user/excercise-library';
import { getUserDashboardStates } from '@/services/user/overview';
import Link from 'next/link';
import { FaRegCalendarCheck, FaRegCirclePlay } from 'react-icons/fa6';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { StatesCard } from '../../admin/overview/_components/StatesCard/StatesCard';
import { UserWorkoutCard } from '../exercise-library/_components/UserWorkoutCard/UserWorkoutCard';
import { AssignedProgramTable } from './_components/AssignedProgramTable/AssignedProgramTable';
import DashboardBanner from './_components/DashboardBanner/DashboardBanner';
import { RecentMessages } from './_components/RecentMessages/RecentMessages';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

const UserOverview = async ({ searchParams }: Props) => {
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
  const pageParam =
    typeof (await searchParams?.page) === 'string'
      ? parseInt((await searchParams?.page) as string, 10)
      : undefined;
  const page = Number.isNaN(pageParam) || !pageParam ? 1 : pageParam;

  // server fetch — uses your existing server function
  const res = await getAllUserProgram({
    page,
    limit: 10,
    status: undefined,
  });

  const allExcercise = await getAllExcerciseByUser();

  return (
    <div>
      <DashboardBanner />
      {/* States Cards  */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {statesData.map((metric, index) => (
          <StatesCard
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
          />
        ))}
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
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allExcercise?.data?.slice(0, 4).map((workout: any) => (
            <UserWorkoutCard key={workout.id} excercise={workout} />
          ))}
        </div>
      </div>

      {/* Pass programs to AssignedProgramTable */}
      <AssignedProgramTable serverPrograms={res} />
      <RecentMessages />
    </div>
  );
};

export default UserOverview;
