/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatISODate } from '@/lib/formatISODate';

const ProgramTable = async ({ program }: { program: any }) => {
  return (
    <div className="mb-8 bg-primary-200 border border-secondary p-5">
      {/* Header */}
      <div>
        <h1 className="text-white font-semibold text-xl sm:text-2xl mb-8">
          Program Overview
        </h1>
      </div>

      {/* Desktop Table */}
      <div className=" overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse border border-secondary">
          <thead>
            <tr className="border-b border-gray-800 bg-secondary text-white">
              <th className="text-left py-3 px-5  font-medium">Program Name</th>
              <th className="text-left py-3 px-5  font-medium">Current Week</th>
              <th className="text-left py-3 px-5  font-medium">Completion</th>
              <th className="text-left py-3 px-5  font-medium">Compliance</th>
              <th className="text-left py-3 px-5  font-medium">Status</th>
              <th className="text-left py-3 px-5  font-medium">Start Date</th>
              <th className="text-left py-3 px-5  font-medium">End Date</th>
            </tr>
          </thead>
          <tbody>
            {program?.map((item: any, index: number) => (
              <tr key={index} className="border-b border-secondary">
                <td className="py-4 px-5 text-white">{item?.programName}</td>
                <td className="py-4 px-5 text-gray-300">
                  {`Week ${item?.currentWeekAsPerUser}/${item?.programDurationWeeks}`}
                </td>

                <td className="py-4 px-5">
                  <span className="bg-green-900/30 text-green-400 border border-green-800 px-2 py-1 rounded text-sm">
                    {item?.completionPercentage}%
                  </span>
                </td>
                <td className="py-4 px-5">
                  <span className="bg-blue-900/30 text-blue-400 border border-blue-800 px-2 py-1 rounded text-sm">
                    {item?.compliancePercentage}%
                  </span>
                </td>
                <td className="py-4 px-5 text-gray-300 ">
                  <span className="bg-secondary px-3 py-1.5">
                    {item?.status}
                  </span>
                </td>
                <td className="py-4 px-5 text-gray-300">
                  {formatISODate(item?.startDate)}
                </td>
                <td className="py-4 px-5 text-gray-300">
                  {formatISODate(item?.endDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProgramTable;
