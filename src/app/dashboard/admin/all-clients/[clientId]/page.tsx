import { AutomationsAlerts } from "./_components/AutomationsAlerts/AutomationsAlerts";
import { DailyWorkoutLog } from "./_components/DailyWorkoutLog/DailyWorkoutLog";
import { ProgramOverview } from "./_components/ProgramOverview/ProgramOverview";
import { WeeklySummary } from "./_components/WeeklySummary/WeeklySummary";

const ClientProfilePage = () => {
  return (
    <div className="space-y-6">
      {/* Program Overview */}
      <ProgramOverview />

      {/* Middle Section - Workout Log and Weekly Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailyWorkoutLog />
        <WeeklySummary />
      </div>

      {/* Automations & Alerts */}
      <AutomationsAlerts />
    </div>
  );
};
export default ClientProfilePage;
