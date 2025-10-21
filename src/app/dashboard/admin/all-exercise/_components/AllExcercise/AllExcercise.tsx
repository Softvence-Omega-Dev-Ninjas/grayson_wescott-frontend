/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Pagination } from '@/components/shared/dashboard/Pagination/Pagination';
import usePagination from '@/hooks/usePagination';
import { WorkoutCard } from '../WorkoutCard/WorkoutCard';

const AllExcercise = ({ allExcercise }: { allExcercise: any }) => {
  const { currentPage, handlePageChange } = usePagination();
  return (
    <div>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allExcercise?.data?.map((workout: any) => (
          <WorkoutCard key={workout.id} excercise={workout} />
        ))}
      </div>
      <div className="flex justify-center my-16">
        <Pagination
          activePage={currentPage}
          totalPages={7}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AllExcercise;
