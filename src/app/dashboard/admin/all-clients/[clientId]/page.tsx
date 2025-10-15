import { getClientsDetails } from '@/services/admin/client';
import ProgramTable from '../../progress-tracking/_components/ProgramTable/ProgramTable';
import CoachNotes from './_components/CoachNotes/CoachNotes';
import { DailyWorkoutLog } from './_components/DailyWorkoutLog/DailyWorkoutLog';
import { ProgramOverview } from './_components/ProgramOverview/ProgramOverview';
import { WeeklySummary } from './_components/WeeklySummary/WeeklySummary';

const ClientProfilePage = async ({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) => {
  const { clientId } = await params;
  const clientData = await getClientsDetails(clientId);
  console.log('++++++++', clientData);
  return (
    <div className="space-y-6">
      {/* Program Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgramOverview userInfo={clientData?.data?.user} />
        <WeeklySummary stats={clientData?.data?.weeklySummary} />
      </div>
      <ProgramTable program={clientData?.data?.programs?.data} />
      {/* Middle Section - Workout Log and Weekly Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailyWorkoutLog exercises={clientData?.data?.dailyExerciseLogs?.data} />
        <CoachNotes />
      </div>

      {/* Automations & Alerts */}
      {/* <AutomationsAlerts /> */}
    </div>
  );
};
export default ClientProfilePage;
