'use client';
import coreIcon from '@/assets/dashboard/excercise-library/coreIcon.png';
import hingeIcon from '@/assets/dashboard/excercise-library/hingeIcon.png';
import mobilityIcon from '@/assets/dashboard/excercise-library/mobilityIcon.png';
import pullIcon from '@/assets/dashboard/excercise-library/pullIcon.png';
import pushIcon from '@/assets/dashboard/excercise-library/pushIcon.png';
import squatIcon from '@/assets/dashboard/excercise-library/squatIcon.png';
import { Pagination } from '@/components/shared/dashboard/Pagination/Pagination';
import { Input } from '@/components/ui/input';
import { workoutData } from '@/constant/workoutData';
import usePagination from '@/hooks/usePagination';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { UserWorkoutCard } from './_components/userDashboardcard';

const categories = [
  { name: 'Squat', icon: squatIcon.src },
  { name: 'Push', icon: pushIcon.src },
  { name: 'Pull', icon: pullIcon.src },
  { name: 'Hinge', icon: hingeIcon.src },
  { name: 'Core', icon: coreIcon.src },
  { name: 'Mobility', icon: mobilityIcon.src },
];

const ExcerciseLibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Pull');
  const { currentPage, handlePageChange } = usePagination();
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold">Exercise Library</h1>
      <p className="text-base font-medium mt-1">
        Explore our comprehensive collection of exercise videos
      </p>
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
        <div className="grid grid-cols-3 md:grid-cols-6 gap-5 mt-8">
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
        </div>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {workoutData.map((workout) => (
            <UserWorkoutCard key={workout.id} {...workout} />
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
    </div>
  );
};

export default ExcerciseLibraryPage;
