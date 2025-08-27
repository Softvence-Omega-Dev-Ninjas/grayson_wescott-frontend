interface ClientData {
  name: string;
  program: string;
  currentWeek: string;
  completion: number;
  compliance: number;
  workoutsCompleted: string;
  lastActive: string;
}

interface ClientPerformanceTableProps {
  clients: ClientData[];
}

export function ClientPerformanceTable({ clients }: ClientPerformanceTableProps) {
  return (
    <div className="bg-gray-900 border-gray-800 mb-8">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-white">Client Performance</h1>
        <button className="text-blue-400 hover:text-blue-300 text-sm">See More</button>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Client Name</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Program</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Current Week</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Completion</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Compliance</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Workouts Completed</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index} className="border-b border-gray-800/50">
                  <td className="py-3 px-4 text-white">{client.name}</td>
                  <td className="py-3 px-4 text-gray-300">{client.program}</td>
                  <td className="py-3 px-4 text-gray-300">{client.currentWeek}</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-900/30 text-green-400 border-green-800">{client.completion}%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-900/30 text-blue-400 border-blue-800">{client.compliance}%</span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{client.workoutsCompleted}</td>
                  <td className="py-3 px-4 text-gray-400">{client.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
