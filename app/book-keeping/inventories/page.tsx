// import InventoriesPage from '@/components/pages/Inventories';
// import { DEFAULT_PER } from '@/const/api';
// import { PATHS } from '@/const/paths';
// import { withAuth } from '@/lib/auth/hoc';
// import { getUrl } from '@/lib/url';
// import { getInventories } from '@/services/inventory/getInventories';
// import { redirect } from 'next/navigation';

import { withAuth } from '@/lib/auth/hoc';

// export default withAuth(async () => {
//   const { searchParams } = getUrl();
//   const page = +(searchParams.get('page') ?? 1);
//   const per = +(searchParams.get('per') ?? DEFAULT_PER);
//   const search = searchParams.get('search') ?? '';

//   const res = await getInventories({ page, per, search });

//   if (page > 1 && !res.inventories.length) {
//     return redirect(PATHS.INVENTORIES_PAGE);
//   }

//   return <InventoriesPage {...res} />;
// });

export default withAuth(() => (
  <div>
    <h2>재고 관리 페이지</h2>
  </div>
));
