const statsData = [
  {
    value: "24,580 lbs",
    label: "Training Completed",
    icon: "🏋️",
  },
  {
    value: "89%",
    label: "Adherence Rate",
    icon: "📊",
  },
  {
    value: "89%",
    label: "Personal Records",
    icon: "🏆",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statsData.map((stat, index) => (
        <div key={index} className="bg-[#2A2D33] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
            <div className="text-2xl">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
