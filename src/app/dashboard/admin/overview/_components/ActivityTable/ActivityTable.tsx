/* eslint-disable @typescript-eslint/no-explicit-any */

import Pagination from '@/components/shared/dashboard/Pagination/Pagination';
import { getAllClients } from '@/services/admin/client';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ActivityTableProps {
  page?: number;
}

const ActivityTable = async ({ page = 1 }: ActivityTableProps) => {
  const { data, metadata } = await getAllClients(page);
  const totalPages = metadata?.totalPage || 1;

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-900/30 text-green-400 border border-green-800';
      case 'DEACTIVATED':
        return 'bg-yellow-900/30 text-yellow-400 border border-yellow-800';
      case 'SUSPENDED':
        return 'bg-red-900/30 text-red-400 border border-red-800';
      case 'ON_HOLD':
        return 'bg-gray-900/30 text-gray-400 border border-gray-800';
      default:
        return '';
    }
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex flex-row items-center justify-between mb-4 pt-4">
        <h1 className="text-white font-bold text-2xl">Recent Active Clients</h1>
        <Link href={'/dashboard/admin/all-clients'}>
          <button className="text-white cursor-pointer text-sm">
            See More
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-secondary">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-secondary text-white">
              <th className="text-left py-3 px-5 font-semibold">Client</th>
              <th className="text-left py-3 px-5 font-semibold">
                Latest Program
              </th>
              <th className="text-left py-3 px-5 font-semibold">Status</th>
              <th className="text-left py-3 px-5 font-semibold">
                Last Active At
              </th>
              <th className="text-left py-3 px-5 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((client: any, index: number) => (
              <tr key={index} className="border-b border-gray-800/50">
                <td className="py-4 px-5 text-white">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src={client?.userInfo?.avatarUrl}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-full shrink-0"
                    />
                    <div>
                      <p className="font-semibold">{client?.userInfo?.name}</p>
                      <p>{client?.userInfo?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-5 text-gray-300">
                  {client?.latestAssignedProgram?.programName}
                </td>
                <td className="py-4 px-5">
                  <span
                    className={`px-2 py-1 rounded text-sm ${getStatusClasses(
                      client?.userInfo?.status,
                    )}`}
                  >
                    {client?.userInfo?.status}
                  </span>
                </td>
                <td className="py-4 px-5 text-gray-300">
                  {client?.userInfo?.lastActiveAt || '-'}
                </td>
                <td className="py-4 px-5 text-gray-400">
                  <Link
                    href={`/dashboard/admin/all-clients/${client?.userInfo?.id}`}
                  >
                    <span className=" flex items-center gap-1 cursor-pointer">
                      View Details <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination activePage={metadata?.page || 1} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ActivityTable;
