'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import Pagination from '@/components/shared/dashboard/Pagination/Pagination';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ClientCard } from '../ClientCard/ClientCard';

export const clientStatusOptions = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Suspended', value: 'SUSPENDED' },
  { label: 'On Hold', value: 'ON_HOLD' },
  { label: 'Deactivated', value: 'DEACTIVATED' },
];

const AllClients = ({ clients }: { clients: any }) => {
  const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const router = useRouter();
  // ✅ Get initial params
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  // const [statusFilter, setStatusFilter] = useState(
  //   searchParams.get('status') || 'all',
  // );

  // ✅ Update URL when searchTerm or statusFilter changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm) params.set('search', searchTerm);
    else params.delete('search');

    if (statusFilter) params.set('status', statusFilter);
    else params.delete('status');

    // ✅ Use replace instead of push + enable shallow update
    // router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Add Client Button */}
      {/* <div className="flex justify-end">
        <Link href={'/dashboard/admin/all-clients/add-client'}>
          <Button
            onClick={handleAddClient}
            className="w-full sm:w-auto bg-secondary border border-primary-200 text-white cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Client
          </Button>
        </Link>
      </div> */}
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-primary-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:flex-1 w-full">
          {/* Search Input  */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border border-secondary text-white placeholder:text-gray-400 w-full rounded-none"
            />
          </div>
          {/* Filter by Status */}
          {/* value={statusFilter} onValueChange={setStatusFilter} */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
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
          </Select>
        </div>
      </div>

      {/* Client Card Grid */}
      {clients?.data?.length === 0 && (
        <div className=" min-h-96 my-auto flex items-center justify-center">
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

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          activePage={clients?.metadata?.page || 1}
          totalPages={clients?.metadata?.totalPage || 1}
        />
      </div>
    </div>
  );
};
export default AllClients;
