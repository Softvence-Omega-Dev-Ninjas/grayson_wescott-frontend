'use client';
import { WorkoutCard } from './_components/WorkoutCard/WorkoutCard';
import usePagination from '@/hooks/usePagination';
import { Pagination } from '@/components/shared/dashboard/Pagination/Pagination';
import { workoutData } from '@/constant/workoutData';

const AllExercisePage = () => {
  const { currentPage, handlePageChange } = usePagination();
  return (
    <div>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {workoutData.map((workout) => (
          <WorkoutCard key={workout.id} {...workout} />
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

export default AllExercisePage;
