import { Button } from "@/components/ui/button";
import { FileText, Download, Mail } from "lucide-react";
import { ProgressStates } from "./_components/ProgressStates/ProgressStates";
import { ClientPerformanceTable } from "./_components/ClientPerformanceTable/ClientPerformanceTable";
import { ConsistencyChart } from "./_components/ConsistencyChart/ConsistencyChart";
import { RPETrendsChart } from "./_components/RPETrendsChart/RPETrendsChart";
import { LoadProgressionChart } from "./_components/LoadProgressionChart/LoadProgressionChart";

const clientsData = [
  {
    name: "Sarah Johnson",
    program: "Strength Building",
    currentWeek: "Week 8/12",
    completion: 85,
    compliance: 92,
    workoutsCompleted: "24/28",
    lastActive: "6 hours ago",
  },
  {
    name: "Johnson",
    program: "Weight Loss",
    currentWeek: "Week 4/16",
    completion: 65,
    compliance: 88,
    workoutsCompleted: "24/28",
    lastActive: "3 hours ago",
  },
  {
    name: "Jhon Carway",
    program: "Bodybuilding",
    currentWeek: "Week 2/20",
    completion: 45,
    compliance: 75,
    workoutsCompleted: "24/28",
    lastActive: "5 hours ago",
  },
  {
    name: "Sojal Ahmed",
    program: "Flexibility Focus",
    currentWeek: "Week 6/8",
    completion: 85,
    compliance: 95,
    workoutsCompleted: "24/28",
    lastActive: "4 hours ago",
  },
  {
    name: "Aminul Islam",
    program: "Strength Building",
    currentWeek: "Week 9/12",
    completion: 85,
    compliance: 92,
    workoutsCompleted: "24/28",
    lastActive: "8 hours ago",
  },
  {
    name: "Robin Ahmed",
    program: "Flexibility Focus",
    currentWeek: "Week 6/8",
    completion: 85,
    compliance: 95,
    workoutsCompleted: "24/28",
    lastActive: "1 hours ago",
  },
  {
    name: "Aryan Khan",
    program: "Flexibility Focus",
    currentWeek: "Week 6/8",
    completion: 85,
    compliance: 95,
    workoutsCompleted: "24/28",
    lastActive: "3 hours ago",
  },
  {
    name: "Sarah Johnson",
    program: "Flexibility Focus",
    currentWeek: "Week 6/8",
    completion: 85,
    compliance: 95,
    workoutsCompleted: "24/28",
    lastActive: "2 hours ago",
  },
];

const loadProgressionData = [
  { week: "Week 1", load: 100 },
  { week: "Week 2", load: 120 },
  { week: "Week 3", load: 135 },
  { week: "Week 4", load: 150 },
  { week: "Week 5", load: 165 },
  { week: "Week 6", load: 180 },
];

const rpeTrendsData = [
  { day: "Mon", rpe: 6 },
  { day: "Tue", rpe: 7 },
  { day: "Wed", rpe: 5 },
  { day: "Thu", rpe: 8 },
  { day: "Fri", rpe: 6 },
  { day: "Sat", rpe: 7 },
  { day: "Sun", rpe: 5 },
];

const consistencyData = [
  { week: "W1", workouts: 4 },
  { week: "W2", workouts: 3 },
  { week: "W3", workouts: 5 },
  { week: "W4", workouts: 4 },
  { week: "W5", workouts: 6 },
  { week: "W6", workouts: 4 },
  { week: "W7", workouts: 5 },
  { week: "W8", workouts: 3 },
];

const ProgressTrackingPage = () => {
  return (
    <div className="">
      <div className="space-y-8">
        <ProgressStates />

        {/* Client Performance Table */}
        <ClientPerformanceTable clients={clientsData} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <LoadProgressionChart data={loadProgressionData} />
          <RPETrendsChart data={rpeTrendsData} />
          <ConsistencyChart data={consistencyData} />
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
