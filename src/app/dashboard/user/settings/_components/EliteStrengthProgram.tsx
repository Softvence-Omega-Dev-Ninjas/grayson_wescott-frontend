import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function EliteStrengthProgram() {
  // Example workout data
  const workouts = [
    {
      day: "Day 1: Upper Body Power",
      week: "Week 3",
      details: [
        { label: "Sets", value: "4" },
        { label: "Reps", value: "6-8" },
        { label: "Tempo", value: "2-1-2" },
        { label: "RPE", value: "8" },
      ],
      rest: "90-120 seconds",
      video: "Watch Video",
    } 
    
  ]

  return (
    <Card className="bg-[#151519] border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white font-medium">Elite Strength Program</CardTitle>
        <p className="text-gray-400 text-sm">A most progressive strength training</p>
      </CardHeader>
      <CardContent>
        {workouts.map((workout, i) => (
          <div key={i} className="border border-gray-800 rounded-lg p-4 mb-4 ">
            <div className="flex items-center justify-between mb-3 ">
              <h3 className="text-white font-medium">{workout.day}</h3>
              <span className="text-gray-400 text-sm">{workout.week}</span>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm">
              {workout.details.map((d, index) => (
                <div key={index}>
                  <span className="text-gray-400">{d.label}</span>
                  <p className="text-white">{d.value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-3 text-sm">
              <span className="text-gray-400">Rest Time: {workout.rest}</span>
              <span className="text-blue-400 cursor-pointer">{workout.video}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
