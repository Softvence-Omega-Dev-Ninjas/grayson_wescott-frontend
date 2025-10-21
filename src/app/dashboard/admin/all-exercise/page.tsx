import { getAllExcercise } from '@/services/admin/excercise-library';
import AllExcercise from './_components/AllExcercise/AllExcercise';

const AllExercisePage = async () => {
  const res = await getAllExcercise();
  console.log(res?.data);
  return (
    <div>
      <AllExcercise allExcercise={res} />
    </div>
  );
};

export default AllExercisePage;
