/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Pagination from '@/components/shared/dashboard/Pagination/Pagination';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ClientCard from '../ClientCard/ClientCard';

export const clientStatusOptions = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Suspended', value: 'SUSPENDED' },
  { label: 'On Hold', value: 'ON_HOLD' },
  { label: 'Deactivated', value: 'DEACTIVATED' },
];

const AllClients = ({ clients }: { clients: any }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || '',
  );
  // const [statusFilter, setStatusFilter] = useState(
  //   searchParams.get('status') || '',
  // );

  // ✅ debounce timer
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchTerm) params.set('search', searchTerm);
      else params.delete('search');

      // if (statusFilter) params.set('status', statusFilter);
      // else params.delete('status');

      // ✅ Reset page to 1 when searching/filtering
      params.set('page', '1');

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-primary-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:flex-1 w-full">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border border-secondary text-white placeholder:text-gray-400 w-full rounded-none"
            />
          </div>

          {/* Status Filter */}
          {/* <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[140px] border-gray-700 text-white">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent className="bg-primary-200 border-gray-700">
              {clientStatusOptions.map((status) => (
                <SelectItem
                  key={status.value}
                  value={status.value}
                  className="text-white hover:bg-gray-800"
                >
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
        </div>
      </div>

      {/* Client list */}
      {clients?.data?.length === 0 && (
        <div className="min-h-96 flex items-center justify-center">
          <p className="text-center text-gray-400">No clients found.</p>
        </div>
      )}

      {clients?.data?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients?.data?.map((client: any) => (
            <ClientCard key={client?.userInfo?.id} {...client} />
          ))}
        </div>
      )}

      {clients?.data?.length > 0 && (
        /* Pagination */
        <div className="mt-16 flex justify-center">
          <Pagination
            activePage={clients?.metadata?.page || 1}
            totalPages={clients?.metadata?.totalPage || 1}
          />
        </div>
      )}
    </div>
  );
};

export default AllClients;
