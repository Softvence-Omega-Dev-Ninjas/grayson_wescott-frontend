import { getAllExcercise } from '@/services/admin/excercise-library';
import AllExcercise from './_components/AllExcercise/AllExcercise';

const AllExercisePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const res = await getAllExcercise(page, 12);
  console.log(res?.data);
  return (
    <div>
      <AllExcercise allExcercise={res} />
    </div>
  );
};

export default AllExercisePage;
