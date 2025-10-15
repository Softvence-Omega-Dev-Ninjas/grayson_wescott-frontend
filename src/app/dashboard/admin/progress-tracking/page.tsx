import { Button } from '@/components/ui/button';
import { getProgressTracking } from '@/services/admin/progress-tracking';
import { Download, FileText, Mail } from 'lucide-react';
import ClientPerformanceTable from './_components/ClientPerformanceTable/ClientPerformanceTable';
import { ConsistencyChart } from './_components/ConsistencyChart/ConsistencyChart';
import { LoadProgressionChart } from './_components/LoadProgressionChart/LoadProgressionChart';
import { ProgressStates } from './_components/ProgressStates/ProgressStates';
import { RPETrendsChart } from './_components/RPETrendsChart/RPETrendsChart';

const ProgressTrackingPage = async () => {
  const res = await getProgressTracking();
  console.log(res);
  return (
    <div className="">
      <div className="space-y-8">
        <ProgressStates states={res?.data?.stats} />

        {/* Client Performance Table */}
        <ClientPerformanceTable />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <LoadProgressionChart
            data={res?.data?.graph?.loadProgression?.chartData}
          />
          <RPETrendsChart data={res?.data?.graph?.rpeTrends} />
          <ConsistencyChart data={res?.data?.graph?.consistency} />
        </div>

        {/* Reports & Export */}
        <div className=" flex items-center justify-between flex-wrap gap-4 mb-20">
          <h3 className="text-white text-lg font-semibold mb-4">
            Reports & Export
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="secondary"
              className="bg-secondary hover:bg-secondary/75 cursor-pointer text-white border-gray-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button
              variant="secondary"
              className="bg-secondary hover:bg-secondary/75 cursor-pointer text-white border-gray-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button
              variant="secondary"
              className="bg-secondary hover:bg-secondary/75 cursor-pointer text-white border-gray-700"
            >
              <Mail className="w-4 h-4 mr-2" />
              Weekly Summary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProgressTrackingPage;
