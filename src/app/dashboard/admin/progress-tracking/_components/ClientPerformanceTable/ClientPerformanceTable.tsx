/* eslint-disable @typescript-eslint/no-explicit-any */
import Pagination from '@/components/shared/dashboard/Pagination/Pagination';
import Image from 'next/image';

const ClientPerformanceTable = async ({ clients }: { clients: any }) => {
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
              <th className="text-left py-3 px-5  font-medium">Client</th>
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
            {clients?.data?.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 text-white py-20 text-center">
                  No clients available!
                </td>
              </tr>
            )}
            {clients?.data?.length > 0 &&
              clients?.data?.map((client: any, index: number) => (
                <tr key={index} className="border-b border-gray-800/50">
                  <td className="py-4 px-5 text-white">
                    <div className="flex items-center gap-2.5">
                      <div className="shrink-0">
                        <Image
                          src={client?.userInfo?.avatarUrl}
                          alt="avatar"
                          width={40}
                          height={40}
                          className="rounded-full shrink-0"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">
                          {client?.userInfo?.name}
                        </p>
                        <p>{client?.userInfo?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-gray-300">
                    {client?.latestAssignedProgram?.programName}
                  </td>
                  <td className="py-4 px-5 text-gray-300">
                    {`Week ${client?.latestAssignedProgram?.currentWeekAsPerUser}/${client?.latestAssignedProgram?.programDurationWeeks}`}
                  </td>
                  <td className="py-4 px-5">
                    <span className="bg-green-900/30 text-green-400 border border-green-800 px-2 py-1 rounded text-sm">
                      {client?.latestAssignedProgram?.completionPercentage}%
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="bg-blue-900/30 text-blue-400 border border-blue-800 px-2 py-1 rounded text-sm">
                      {client?.latestAssignedProgram?.compliancePercentage}%
                    </span>
                  </td>
                  <td className="py-4 px-5 text-gray-300">
                    {`${client?.latestAssignedProgram?.completedWorkouts}/${client?.latestAssignedProgram?.totalWorkouts}`}
                  </td>
                  <td className="py-4 px-5 text-gray-400">
                    {client?.userInfo?.name}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {clients?.data?.length > 0 && (
        <div className="my-10 flex justify-end">
          <Pagination
            activePage={clients?.metadata?.page || 1}
            totalPages={clients?.metadata?.totalPage || 1}
          />
        </div>
      )}
    </div>
  );
};
export default ClientPerformanceTable;
