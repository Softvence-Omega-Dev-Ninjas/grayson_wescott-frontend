/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

export function WeeklySummary({ stats }: { stats: any }) {
  // const stats = [
  //   { label: 'Total Sets', value: '147' },
  //   { label: 'lbs Moved', value: '12,450' },
  //   { label: 'New PR (Squat)', value: '225' },
  //   { label: 'Missed Reps', value: '7' },
  // ];

  return (
    <div className="bg-primary-200 p-5 border border-secondary flex-2 min-h-full">
      <h1 className="text-white text-xl sm:text-2xl font-semibold mb-7">
        Weekly Summary
      </h1>

      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-secondary p-4 rounded-md">
            <p className="text-2xl font-bold text-white text-center">
              {stats?.totalSets}
            </p>
            <p className="text-white text-sm text-center mt-1">
              {'Total Sets'}
            </p>
          </div>
          <div className="bg-secondary p-4 rounded-md">
            <p className="text-2xl font-bold text-white text-center">
              {stats?.totalLbsMoved}
            </p>
            <p className="text-white text-sm text-center mt-1">{'Lbs Moved'}</p>
          </div>
          <div className="bg-secondary p-4 rounded-md">
            <p className="text-2xl font-bold text-white text-center">
              {stats?.newPRs}
            </p>
            <p className="text-white text-sm text-center mt-1">
              {'New PR (Squat)'}
            </p>
          </div>
          <div className="bg-secondary p-4 rounded-md">
            <p className="text-2xl font-bold text-white text-center">
              {stats?.missedReps}
            </p>
            <p className="text-white text-sm text-center mt-1">
              {'Missed Reps'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
