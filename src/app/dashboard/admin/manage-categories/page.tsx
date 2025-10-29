import Pagination from '@/components/shared/dashboard/Pagination/Pagination';
import { getAllCategories } from '@/services/admin/category';
import { CategoryTable } from './_components/CategoryTable/CategoryTable';
import CreateCategoryModal from './_components/CreateCategoryModal';

const ManageCategoriesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const { data, metadata } = await getAllCategories(page);
  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-4 pt-4 flex-wrap gap-5">
        <h1 className="text-white font-bold text-2xl">Manage Categories</h1>
        <CreateCategoryModal />
      </div>
      <CategoryTable categoryData={data} />
      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          activePage={metadata?.page || 1}
          totalPages={metadata?.totalPage || 1}
        />
      </div>
    </div>
  );
};

export default ManageCategoriesPage;
