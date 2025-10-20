export function StatsCards({
  plannedExcercise,
  completedExcercise,
  adherenceRate,
}: {
  plannedExcercise?: number;
  completedExcercise?: number;
  adherenceRate?: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-[#2A2D33] rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{adherenceRate}%</div>
            <div className="text-slate-400 text-sm">{'Adherence Rate'}</div>
          </div>
          <div className="text-2xl">{'📊'}</div>
        </div>
      </div>
      <div className="bg-[#2A2D33] rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{plannedExcercise}</div>
            <div className="text-slate-400 text-sm">
              {'Total Planned Excercise'}
            </div>
          </div>
          <div className="text-2xl">{'🏋️'}</div>
        </div>
      </div>
      <div className="bg-[#2A2D33] rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{completedExcercise}</div>
            <div className="text-slate-400 text-sm">
              {'Total Completed Excercise'}
            </div>
          </div>
          <div className="text-2xl">{'🏆'}</div>
        </div>
      </div>
    </div>
  );
}
