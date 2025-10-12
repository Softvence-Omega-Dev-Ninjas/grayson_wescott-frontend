import { Button } from '@/components/ui/button';
import { workoutData } from '@/constant/workoutData';
import { getAllUserProgram } from '@/services/user/assigned-program';
import { FaRegCalendarCheck, FaRegCirclePlay } from 'react-icons/fa6';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { StatesCard } from '../../admin/overview/_components/StatesCard/StatesCard';
import { UserWorkoutCard } from '../exercise-library/_components/userDashboardcard';
import { AssignedProgramTable } from './_components/AssignedProgramTable/AssignedProgramTable';
import DashboardBanner from './_components/DashboardBanner/DashboardBanner';
import { RecentMessages } from './_components/RecentMessages/RecentMessages';

const statesData = [
  {
    title: 'All Video',
    value: '247',
    icon: FaRegCirclePlay,
  },
  {
    title: 'Total Training',
    value: '189',
    icon: MdOutlineCalendarMonth,
  },
  {
    title: 'Training Completed',
    value: '55',
    icon: FaRegCalendarCheck,
  },
];

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

const UserOverview = async ({ searchParams }: Props) => {
  // parse search params (page & status)
  const pageParam =
    typeof searchParams?.page === 'string'
      ? parseInt(searchParams.page, 10)
      : undefined;
  const page = Number.isNaN(pageParam) || !pageParam ? 1 : pageParam;

  // server fetch — uses your existing server function
  const res = await getAllUserProgram({
    page,
    limit: 10,
    status: undefined,
  });
  console.log('📦 User programs from server function:', res);

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
          <Button className="bg-secondary border border-slate-400 cursor-pointer">
            View More
          </Button>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {workoutData.map((workout) => (
            <UserWorkoutCard key={workout.id} {...workout} />
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
