'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination } from '@/components/shared/dashboard/Pagination/Pagination';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import usePagination from '@/hooks/usePagination';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { ClientCard } from '../ClientCard/ClientCard';

const AllClients = ({ clients }: { clients: any }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { currentPage, handlePageChange } = usePagination();

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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full  sm:w-[140px] border-gray-700 text-white">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="bg-primary-200 border-gray-700">
              <SelectItem value="all" className="text-white hover:bg-gray-800">
                All Status
              </SelectItem>
              <SelectItem
                value="active"
                className="text-white hover:bg-gray-800"
              >
                Active
              </SelectItem>
              <SelectItem
                value="inactive"
                className="text-white hover:bg-gray-800"
              >
                Inactive
              </SelectItem>
              <SelectItem
                value="on-hold"
                className="text-white hover:bg-gray-800"
              >
                On Hold
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Client Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients?.data?.map((client: any) => (
          <ClientCard key={client?.userInfo?.id} {...client} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-16">
        <Pagination
          activePage={currentPage}
          totalPages={100}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
export default AllClients;
