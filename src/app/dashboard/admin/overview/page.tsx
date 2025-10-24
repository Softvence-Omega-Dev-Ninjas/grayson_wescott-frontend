import { getProgressTracking } from '@/services/admin/progress-tracking';
import ActivityTable from './_components/ActivityTable/ActivityTable';
import { StatesCard } from './_components/StatesCard/StatesCard';

const AdminOverviewPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const res = await getProgressTracking();
  return (
    <div>
      {/* States Cards  */}

      <StatesCard res={res?.data?.overViewStats} />

      <ActivityTable page={page} />
    </div>
  );
};

export default AdminOverviewPage;
