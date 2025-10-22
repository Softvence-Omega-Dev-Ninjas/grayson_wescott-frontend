import { getAllExcerciseByUser } from '@/services/user/excercise-library';
import UserExcerciseLibrary from './_components/UserExcerciseLibrary/UserExcerciseLibrary';

const ExcerciseLibraryPage = async () => {
  const res = await getAllExcerciseByUser();
  console.log(res?.data);
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
