import AddInventoriesPage from '@/components/pages/AddInventories';
import { withAuth } from '@/lib/auth/hoc';

export default withAuth(async () => {
  return <AddInventoriesPage />;
});
