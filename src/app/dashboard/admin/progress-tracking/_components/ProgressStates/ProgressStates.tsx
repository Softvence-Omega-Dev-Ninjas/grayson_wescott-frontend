interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  // changeType: "positive" | "negative";
}

function MetricCard({ title, value, change }: MetricCardProps) {
  return (
    <div className="border border-secondary">
      <div className="p-6">
        <div className="space-y-2">
          <p className="text-sm text-white font-medium">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          <p className={`text-sm text-[#B9BDC6]`}>{change}</p>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 bg-primary-200 p-5">
      {metricsData.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
        />
      ))}
    </div>
  );
}
