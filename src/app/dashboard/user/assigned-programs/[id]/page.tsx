/* eslint-disable @typescript-eslint/no-explicit-any */
import { Progress } from '@/components/ui/progress';
import { getAssignedProgramsDetails } from '@/services/user/assigned-program';
import SidebarBox from '../_components/SidebarBox/SidebarBox';
import WorkoutBlock from '../_components/WorkoutBlock/WorkoutBlock';
export type TProgram = {
  title: string;
  description: string;
  status: string;
  progress: number;
};

export type TWorkout = {
  exercise: string;
  sets: number;
  reps: string;
  rpe: string;
  rest: string;
  day: number;
};

export type TSidebarItem = {
  label: string;
  value: string;
};

const data = {
  program: {
    title: 'Elite Squat Program',
    description:
      'Advanced strength building program designed to maximize your squat performance over 12 weeks',
    status: 'In Progress',
    progress: 33,
  },
  workouts: [
    {
      exercise: 'Back Squat',
      sets: 4,
      reps: '6-8',
      rpe: '9-B',
      rest: '3 min',
      day: 22,
    },
    {
      exercise: 'Back Squat',
      sets: 4,
      reps: '6-8',
      rpe: '9-B',
      rest: '3 min',
      day: 22,
    },
    {
      exercise: 'Back Squat',
      sets: 4,
      reps: '6-8',
      rpe: '9-B',
      rest: '3 min',
      day: 22,
    },
    {
      exercise: 'Back Squat',
      sets: 4,
      reps: '6-8',
      rpe: '9-B',
      rest: '3 min',
      day: 22,
    },
  ],
  sidebar: [
    {
      title: 'Progress Tracking',
      items: [
        { label: 'Program Completion', value: '25%' },
        { label: 'Compliance Score', value: '87%' },
        { label: 'Training Completed', value: '22/66' },
      ],
    },
    {
      title: 'Load Progression',
      items: [
        { label: 'Program Completion', value: '50%' },
        { label: 'Compliance Score', value: '87%' },
        { label: 'Training Completed', value: '22/66' },
      ],
    },
    {
      title: 'RPE Trends',
      items: [
        { label: 'Program Completion', value: '33%' },
        { label: 'Compliance Score', value: '87%' },
        { label: 'Training Completed', value: '22/66' },
      ],
    },
  ],
};
const AssignedProgramsDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await getAssignedProgramsDetails(id);
  return (
    <div className="">
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Main Content Area */}
        <div className="w-full lg:w-2/3 mb-8 lg:mb-0">
          {/* Program Header */}
          <div className="mb-8 bg-primary-200 p-5">
            <h1 className="text-3xl font-bold mb-2">
              {res?.data?.program?.programName}
            </h1>
            <p className="text-gray-200 mb-4">{data.program.description}</p>
            <span className="mb-4 border border-secondary px-4 py-2">
              {res?.data?.status.replace('_', ' ')}
            </span>
            <div className="flex justify-between items-center text-sm mt-5 mb-3">
              <span className="text-sm text-gray-200">Program Progress</span>
              <span className="font-semibold text-gray-50">
                {res?.data?.programProgressPercent}%
              </span>
            </div>
            <Progress value={res?.data?.programProgressPercent} />
          </div>

          {/* Today's Workout */}
          <div className="mb-8 ">
            <div className="flex justify-between items-center mb-4 bg-primary-200 p-5">
              <h2 className="text-2xl font-bold">
                Today&apos;s Workout · Day {res?.data?.dayNumber}
              </h2>
              {/* <span className="text-sm font-semibold text-gray-400">
                Lower Body Strength
              </span> */}
            </div>
            {res?.data?.todaysExercises?.map((workout: any, index: number) => (
              <WorkoutBlock key={index} workout={workout} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3">
          {/* Progress Tracking  */}
          <div className="mb-4 border border-secondary">
            <div className="bg-secondary px-4 py-2">
              <h3 className="text-lg font-bold text-gray-100">
                Progress Tracking
              </h3>
            </div>
            <div>
              <div className="space-y-4">
                <SidebarBox
                  label="Program Completion"
                  value={`${res?.data?.analytics?.completionPercent}%`}
                />
                <SidebarBox
                  label="Compliance Score"
                  value={`${res?.data?.analytics?.complianceScore}%`}
                />
                <SidebarBox
                  label="Sessions Scheduled"
                  value={res?.data?.analytics?.scheduledToDate}
                />
              </div>
            </div>
          </div>
          {/* Excercise Tracking  */}
          <div className="mb-4 border border-secondary">
            <div className="bg-secondary px-4 py-2">
              <h3 className="text-lg font-bold text-gray-100">
                Excercise Tracking
              </h3>
            </div>
            <div>
              <div className="space-y-4">
                <SidebarBox
                  label="Completed Exercises"
                  value={res?.data?.analytics?.completedExercises}
                />
                <SidebarBox
                  label="Total Exercises"
                  value={res?.data?.analytics?.totalExercises}
                />
                <SidebarBox
                  label="Training Completed"
                  value={res?.data?.analytics?.trainingCompleted}
                />
              </div>
            </div>
          </div>
          {/* Load Tracking  */}
          <div className="mb-4 border border-secondary">
            <div className="bg-secondary px-4 py-2">
              <h3 className="text-lg font-bold text-gray-100">
                Load Progression
              </h3>
            </div>
            <div>
              <div className="space-y-4">
                <SidebarBox
                  label="Planned Load"
                  value={res?.data?.analytics?.plannedLoadToDate}
                />
                <SidebarBox
                  label="Completed Load"
                  value={res?.data?.analytics?.completedLoadToDate}
                />
                <SidebarBox
                  label="Load Completion Percent"
                  value={`${res?.data?.analytics?.loadCompletionPercent}%`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedProgramsDetailsPage;
