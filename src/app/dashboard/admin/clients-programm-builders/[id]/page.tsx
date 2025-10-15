import { getAllCategories } from '@/services/admin/category';
import { getProgrammsDetails } from '@/services/admin/programm';
import UpdateProgramForm from './components/UpdateProgramForm';

const UpdateProgramPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const program = await getProgrammsDetails(id);
  const categories = await getAllCategories();

  return (
    <div>
      <UpdateProgramForm
        program={program?.data}
        categories={categories?.data}
      />
    </div>
  );
};

export default UpdateProgramPage;
