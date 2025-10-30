/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Pagination from '@/components/shared/dashboard/Pagination/Pagination';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserWorkoutCard } from '../UserWorkoutCard/UserWorkoutCard';

const UserExcerciseLibrary = ({ allExcercise }: { allExcercise: any }) => {
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
    <div>
      {/* Header */}
      <div className=" bg-primary-200 p-4 mt-3">
        {/* Search  */}
        <div className="flex flex-col sm:flex-row gap-4 sm:flex-1 w-full">
          {/* Search Input  */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search exercises, body parts, or equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border border-secondary text-white placeholder:text-gray-400 w-full rounded-none"
            />
          </div>
        </div>
        {/* Filter  */}
        {/* <div className="grid grid-cols-3 md:grid-cols-6 gap-5 mt-8">
          {categories.map((category) => {
            const isActive = category.name === activeCategory;
            return (
              <div
                key={category.name}
                className={`flex flex-col items-center justify-center p-4 border border-secondary  cursor-pointer transition-colors duration-200 ${
                  isActive ? 'bg-secondary' : 'border-2 border-secondary'
                }`}
                onClick={() => setActiveCategory(category.name)}
              >
                <Image
                  src={category.icon}
                  alt="category icon"
                  width={40}
                  height={40}
                  className="w-5 h-5"
                />
                <span className={`text-sm font-medium mt-3`}>
                  {category.name}
                </span>
              </div>
            );
          })}
        </div> */}
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allExcercise?.data?.map((workout: any) => (
            <UserWorkoutCard key={workout.id} excercise={workout} />
          ))}
        </div>
        {/* Pagination */}
        <div className="my-20 flex justify-center">
          <Pagination
            activePage={allExcercise?.metadata?.page || 1}
            totalPages={allExcercise?.metadata?.totalPage || 1}
          />
        </div>
      </div>
    </div>
  );
};

export default UserExcerciseLibrary;
