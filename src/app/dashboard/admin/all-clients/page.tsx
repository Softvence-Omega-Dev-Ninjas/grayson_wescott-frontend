import { getAllClients } from '@/services/admin/client';
import AllClients from './_components/AllClients/AllClients';

const AllClientsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string; search?: string }>;
}) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.search || '';
  const clients = await getAllClients(page, 12, search);
  console.log(clients);
  return (
    <div>
      <AllClients clients={clients} />
    </div>
  );
};

export default AllClientsPage;
