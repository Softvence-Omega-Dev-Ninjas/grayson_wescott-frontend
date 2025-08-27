interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative";
}

function MetricCard({ title, value, change, changeType }: MetricCardProps) {
  return (
    <div className="bg-gray-900 border-gray-800">
      <div className="p-6">
        <div className="space-y-2">
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className={`text-sm ${changeType === "positive" ? "text-green-400" : "text-red-400"}`}>{change}</p>
        </div>
      </div>
    </div>
  );
}

interface MetricData {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative";
}

export function ProgressStates() {
  const metricsData: MetricData[] = [
    {
      title: "Active Clients",
      value: 52,
      change: "+4 this week",
      changeType: "positive",
    },
    {
      title: "Avg Program Completion",
      value: "57%",
      change: "+5%",
      changeType: "positive",
    },
    {
      title: "Adherence Rate",
      value: "82%",
      change: "+2%",
      changeType: "positive",
    },
    {
      title: "Total Workouts Completed",
      value: "1,240",
      change: "+107 today",
      changeType: "positive",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricsData.map((metric, index) => (
        <MetricCard key={index} title={metric.title} value={metric.value} change={metric.change} changeType={metric.changeType} />
      ))}
    </div>
  );
}
