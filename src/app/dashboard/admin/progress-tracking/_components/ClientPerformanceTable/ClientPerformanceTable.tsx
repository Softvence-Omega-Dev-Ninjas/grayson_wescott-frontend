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

export function ClientPerformanceTable({
  clients,
}: ClientPerformanceTableProps) {
  return (
    <div className="mb-8 border border-secondary">
      {/* Header */}
      <div className="flex flex-row items-center justify-between mb-4 px-5 pt-4">
        <h1 className="text-white font-bold text-2xl">Client Performance</h1>
        <button className="text-white cursor-pointer text-sm">See More</button>
      </div>

      {/* Desktop Table */}
      <div className=" overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-secondary text-white">
              <th className="text-left py-3 px-5  font-medium">Client Name</th>
              <th className="text-left py-3 px-5  font-medium">Program</th>
              <th className="text-left py-3 px-5  font-medium">Current Week</th>
              <th className="text-left py-3 px-5  font-medium">Completion</th>
              <th className="text-left py-3 px-5  font-medium">Compliance</th>
              <th className="text-left py-3 px-5  font-medium">
                Workouts Completed
              </th>
              <th className="text-left py-3 px-5  font-medium">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={index} className="border-b border-gray-800/50">
                <td className="py-4 px-5 text-white">{client.name}</td>
                <td className="py-4 px-5 text-gray-300">{client.program}</td>
                <td className="py-4 px-5 text-gray-300">
                  {client.currentWeek}
                </td>
                <td className="py-4 px-5">
                  <span className="bg-green-900/30 text-green-400 border border-green-800 px-2 py-1 rounded text-sm">
                    {client.completion}%
                  </span>
                </td>
                <td className="py-4 px-5">
                  <span className="bg-blue-900/30 text-blue-400 border border-blue-800 px-2 py-1 rounded text-sm">
                    {client.compliance}%
                  </span>
                </td>
                <td className="py-4 px-5 text-gray-300">
                  {client.workoutsCompleted}
                </td>
                <td className="py-4 px-5 text-gray-400">{client.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
