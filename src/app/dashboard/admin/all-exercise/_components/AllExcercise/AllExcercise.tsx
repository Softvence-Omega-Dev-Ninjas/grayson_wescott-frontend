/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Pagination from '@/components/shared/dashboard/Pagination/Pagination';
import { WorkoutCard } from '../WorkoutCard/WorkoutCard';

const AllExcercise = ({ allExcercise }: { allExcercise: any }) => {
  const { data, metadata } = allExcercise;
  return (
    <div>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.map((workout: any) => (
          <WorkoutCard key={workout.id} excercise={workout} />
        ))}
      </div>
      {/* Pagination */}
      <div className="mt-16 flex justify-center">
        <Pagination
          activePage={metadata?.page || 1}
          totalPages={metadata?.totalPage || 1}
        />
      </div>
    </div>
  );
};

export default AllExcercise;
