import { getAllClients } from '@/services/admin/client';
import AllClients from './_components/AllClients/AllClients';

const AllClientsPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; status?: string; search?: string };
}) => {
  const { page, search } = await searchParams;
  // const page = Number(searchParams?.page) || 1;
  // const search = searchParams?.search || '';
  // const status = searchParams?.status || '';
  // console.log('Parsed ===>', page, status);

  const clients = await getAllClients(Number(page), 12, search);

  return (
    <div>
      <AllClients clients={clients} />
    </div>
  );
};

export default AllClientsPage;
