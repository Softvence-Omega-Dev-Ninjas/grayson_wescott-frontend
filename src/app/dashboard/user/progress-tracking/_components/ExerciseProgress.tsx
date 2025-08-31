const exerciseData = [
  {
    name: "Bench Press",
    current: 205,
    target: 225,
    unit: "lbs",
  },
  {
    name: "Squat",
    current: 185,
    target: 205,
    unit: "lbs",
  },
  {
    name: "Deadlift",
    current: 185,
    target: 225,
    unit: "lbs",
  },
]

export function ExerciseProgress() {
  return (
    <div className="space-y-6">
      {exerciseData.map((exercise, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{exercise.name}</h3>
            <button className="text-blue-400 text-sm hover:text-blue-300">View Details</button>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>
              Current: {exercise.current} {exercise.unit}
            </span>
            <span>
              Target: {exercise.target} {exercise.unit}
            </span>
          </div>

          <div className="w-full bg-[#2A2D33] rounded-full h-2">
            <div
              className="bg-[#B9BDC6] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(exercise.current / exercise.target) * 100}%` }}
            />
          </div>

          <div className="text-xs text-slate-400">
            {exercise.current} {exercise.unit} — {exercise.target} {exercise.unit}
          </div>
        </div>
      ))}
    </div>
  )
}
