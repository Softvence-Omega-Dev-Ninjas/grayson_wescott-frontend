/* eslint-disable @typescript-eslint/no-explicit-any */
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

export function ProgressStates({ states }: { states: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 bg-primary-200 p-5">
      <MetricCard
        title={'Total Clients'}
        value={states?.clients?.totalClients}
        change={states?.clients?.addedThisWeek}
      />
      <MetricCard
        title={'Avg Program Completion'}
        value={states?.programCompletion?.total?.overallCompletionRate}
        change={states?.programCompletion?.total?.completionRateThisWeek}
      />
      <MetricCard
        title={'Adherence Rate'}
        value={states?.programCompletion?.adherence?.overallAdherenceRate}
        change={states?.programCompletion?.adherence?.adherenceRateThisWeek}
      />
      <MetricCard
        title={'Total Workouts Completed'}
        value={states?.workouts?.planned?.total}
        change={states?.workouts?.planned?.thisWeek}
      />
    </div>
  );
}
