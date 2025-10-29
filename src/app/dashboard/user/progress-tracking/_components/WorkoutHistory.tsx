import Pagination from '@/components/shared/dashboard/Pagination/Pagination';
import { formatISODate } from '@/lib/formatISODate';

/* eslint-disable @typescript-eslint/no-explicit-any */

export function WorkoutHistory({ workoutHistory }: { workoutHistory?: any }) {
  return (
    <div className="bg-[#151519] p-2">
      <h2 className="text-lg font-medium ml-4 mb-4">Workout History</h2>

      <div className="p-2 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#2A2D33]">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-slate-300">
                  Date
                </th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">
                  Workout
                </th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">
                  Duration
                </th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">
                  Volume
                </th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">
                  Feedback
                </th>
              </tr>
            </thead>
            <tbody>
              {workoutHistory?.data?.map((workout: any, index: number) => (
                <tr key={index} className="border-t border-slate-700">
                  <td className="p-4 text-sm">
                    {formatISODate(workout?.date)}
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-sm">
                        {workout?.workout?.title}
                      </div>
                      <div className="text-xs text-slate-400">
                        {workout.details}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-sm bg-secondary`}
                    >
                      {/* {workout.status === 'Completed' ? '✓' : '✗'}{' '} */}
                      {workout.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{workout?.duration}</td>
                  <td className="p-4 text-sm">
                    {workout?.volume ? workout?.volume : '-'}
                  </td>
                  <td className="p-4 text-sm text-slate-400">
                    {workout?.feedback ? workout?.feedback : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="my-8 flex justify-start">
        <Pagination
          activePage={workoutHistory?.metadata?.page || 1}
          totalPages={workoutHistory?.metadata?.totalPage || 1}
        />
      </div>
    </div>
  );
}
