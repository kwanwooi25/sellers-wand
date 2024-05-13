// import ProductsPage from '@/components/pages/Products';
// import { DEFAULT_PER } from '@/const/api';
// import { PATHS } from '@/const/paths';
// import { withAuth } from '@/lib/auth/hoc';
// import { getUrl } from '@/lib/url';
// import { getProducts } from '@/services/product';
// import { redirect } from 'next/navigation';

import { withAuth } from '@/lib/auth/hoc';

// export default withAuth(async () => {
//   const { searchParams } = getUrl();
//   const page = +(searchParams.get('page') ?? 1);
//   const per = +(searchParams.get('per') ?? DEFAULT_PER);
//   const search = searchParams.get('search') ?? '';

//   const res = await getProducts({ page, per, search });

//   if (page > 1 && !res.products.length) {
//     return redirect(PATHS.PRODUCTS_PAGE);
//   }

//   return <ProductsPage {...res} />;
// });

export default withAuth(() => (
  <div>
    <h2>상품 관리 페이지</h2>
  </div>
));
