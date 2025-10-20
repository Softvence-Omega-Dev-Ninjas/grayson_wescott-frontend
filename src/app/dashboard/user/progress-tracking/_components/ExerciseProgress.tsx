import { Progress } from '@/components/ui/progress';

/* eslint-disable @typescript-eslint/no-explicit-any */

export function ExerciseProgress({ exerciseData }: { exerciseData?: any }) {
  return (
    <div className="space-y-6">
      {exerciseData.map((exercise: any, index: number) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{exercise?.name}</h3>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>
              Current: {exercise?.completed} {exercise?.unit}
            </span>
            <span>
              Target:{' '}
              {exercise?.target || exercise?.scheduled || exercise?.planned}{' '}
              {exercise?.unit}
            </span>
          </div>

          <div className="w-full bg-[#2A2D33] rounded-full h-2">
            <Progress value={exercise?.percent} />
          </div>

          <div className="text-xs text-slate-400">{exercise?.label}</div>
        </div>
      ))}
    </div>
  );
}
