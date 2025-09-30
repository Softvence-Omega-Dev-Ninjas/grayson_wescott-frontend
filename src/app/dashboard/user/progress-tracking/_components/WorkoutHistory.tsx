const workoutHistoryData = [
  {
    date: "Jan 15, 2024",
    workout: "Upper Body Push",
    details: "Chest, Shoulders, Triceps",
    status: "Completed",
    duration: "68 min",
    volume: "8,420 lbs",
    feedback: "Great session, felt strong",
  },
  {
    date: "Jan 13, 2024",
    workout: "Lower Body",
    details: "Squats, Deadlifts, Legs",
    status: "Completed",
    duration: "72 min",
    volume: "12,180 lbs",
    feedback: "Challenging but good",
  },
  {
    date: "Jan 11, 2024",
    workout: "Upper Body Pull",
    details: "Back, Biceps",
    status: "Skipped",
    duration: "-",
    volume: "-",
    feedback: "Work emergency",
  },
]

export function WorkoutHistory() {
  return (
    <div className="bg-[#151519] p-2">
      <h2 className="text-lg font-medium ml-4 mb-4">Workout History</h2>

      <div className="p-2 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#2A2D33]">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Date</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Workout</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Status</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Duration</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Volume</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {workoutHistoryData.map((workout, index) => (
                <tr key={index} className="border-t border-slate-700">
                  <td className="p-4 text-sm">{workout.date}</td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-sm">{workout.workout}</div>
                      <div className="text-xs text-slate-400">{workout.details}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                        workout.status === "Completed" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
                      }`}
                    >
                      {workout.status === "Completed" ? "✓" : "✗"} {workout.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{workout.duration}</td>
                  <td className="p-4 text-sm">{workout.volume}</td>
                  <td className="p-4 text-sm text-slate-400">{workout.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
