import { getAllExcerciseByUser } from '@/services/user/excercise-library';
import UserExcerciseLibrary from './_components/UserExcerciseLibrary/UserExcerciseLibrary';

const ExcerciseLibraryPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const searchTerm = params?.search || '';
  const res = await getAllExcerciseByUser(page, 12, searchTerm);
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold">Exercise Library</h1>
      <p className="text-base font-medium mt-1">
        Explore our comprehensive collection of exercise videos
      </p>
      <UserExcerciseLibrary allExcercise={res} />
    </div>
  );
};

export default ExcerciseLibraryPage;
