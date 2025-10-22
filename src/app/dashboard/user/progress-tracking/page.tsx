import {
  getUserProgress,
  getWorkoutHistory,
} from '@/services/user/progress-tracking';
import { ExerciseProgress } from './_components/ExerciseProgress';
import MessagesPanel from './_components/MessagesPanel';
import { StatsCards } from './_components/StatsCards';
import { WorkoutHistory } from './_components/WorkoutHistory';

const UserProgress = async () => {
  const progressData = await getUserProgress();
  const workoutHistory = await getWorkoutHistory();
  console.log(workoutHistory);
  return (
    <div className=" bg-black text-white p-6">
      <div className="container mx-auto space-y-6">
        {/* Header Section */}
        {/* <ProgramHeader /> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Tracking */}
            <div>
              <h2 className="text-lg font-medium mb-4">Progress Tracking</h2>
              <StatsCards
                adherenceRate={progressData?.data?.adherenceRateUpToDate}
                completedExcercise={
                  progressData?.data?.trainingCompletedExercises
                }
                plannedExcercise={progressData?.data?.totalPlannedExercisesFull}
              />
            </div>

            {/* Exercise Progress */}
            <ExerciseProgress exerciseData={progressData?.data?.summary} />

            {/* Workout History */}
            <WorkoutHistory workoutHistory={workoutHistory?.data} />
          </div>

          {/* Messages Panel */}
          <div className="lg:col-span-1">
            <MessagesPanel />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProgress;
