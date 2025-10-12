import { getAllCategories } from '@/services/admin/category';
import { CategoryTable } from './_components/CategoryTable/CategoryTable';
import CreateCategoryModal from './_components/CreateCategoryModal';

const ManageCategoriesPage = async () => {
  // const [activePage, setActivePage] = useState(1);
  const res = await getAllCategories();
  console.log(res);
  // const { currentPage, handlePageChange } = usePagination();
  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-4 pt-4 flex-wrap gap-5">
        <h1 className="text-white font-bold text-2xl">Manage Categories</h1>
        <CreateCategoryModal />
      </div>
      <CategoryTable categoryData={res?.data} />
    </div>
  );
};

export default ManageCategoriesPage;
