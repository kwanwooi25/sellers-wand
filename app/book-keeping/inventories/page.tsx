import InventoriesPage from '@/components/pages/Inventories';
import { DEFAULT_PER } from '@/const/api';
import { PATHS } from '@/const/paths';
import { withAuth } from '@/lib/auth/hoc';
import { getUrl } from '@/lib/url';
import { getInventories } from '@/services/inventory/getInventories';
import { redirect } from 'next/navigation';

export default withAuth(async () => {
  const { searchParams } = getUrl();
  const page = +(searchParams.get('page') ?? 1);
  const per = +(searchParams.get('per') ?? DEFAULT_PER);
  const search = searchParams.get('search') ?? '';

  const res = await getInventories({ page, per, search });

  if (page > 1 && !res.inventories.length) {
    return redirect(PATHS.INVENTORIES_PAGE);
  }

  return <InventoriesPage {...res} />;
});
