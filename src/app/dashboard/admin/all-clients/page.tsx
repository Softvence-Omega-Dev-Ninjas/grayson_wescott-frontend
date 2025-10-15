import { getAllClients } from '@/services/admin/client';
import AllClients from './_components/AllClients/AllClients';

const AllClientsPage = async () => {
  const clients = await getAllClients();
  return (
    <div>
      <AllClients clients={clients} />
    </div>
  );
};

export default AllClientsPage;
