import { ExerciseProgress } from './_components/ExerciseProgress';
import { MessagesPanel } from './_components/MessagesPanel';
import { ProgramHeader } from './_components/ProgramHeader';
import { StatsCards } from './_components/StatsCards';
import { WorkoutHistory } from './_components/WorkoutHistory';

export default function UserProgress() {
  return (
    <div className=" bg-black text-white p-6">
      <div className="container mx-auto space-y-6">
        {/* Header Section */}
        <ProgramHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Tracking */}
            <div>
              <h2 className="text-lg font-medium mb-4">Progress Tracking</h2>
              <StatsCards />
            </div>

            {/* Exercise Progress */}
            <ExerciseProgress />

            {/* Workout History */}
            <WorkoutHistory />
          </div>

          {/* Messages Panel */}
          <div className="lg:col-span-1">
            <MessagesPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
