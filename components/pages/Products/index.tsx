'use client';

import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import ProductTable from '@/components/ProductTable';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { getProducts, updateProduct } from '@/services/product';
import { Product } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ProductsPage({ products, lastPage }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();
  const page = +(searchParams.get('page') || 1);

  const handlePageChange = (page: number) => {
    router.push(`${pathname}?${createQueryString('page', `${page}`)}`);
  };

  const handleProductChange = async (product: Product) => {
    try {
      const { data } = await updateProduct(product);
      toast({
        title: '상품 정보를 수정했습니다.',
        description: `${data.data?.productName}`,
        variant: 'success',
      });
      router.refresh();
    } catch (error) {
      toast({
        title: '상품 정보 수정에 실패했습니다.',
        description: (error as any).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 py-4">
      <PageHeader title="상품 목록">
        <Button onClick={() => router.push(PATHS.ADD_PRODUCTS_PAGE)}>상품 등록</Button>
      </PageHeader>
      {!products.length ? (
        <div className="flex flex-col items-center py-16 gap-4">
          <p>등록된 상품이 없습니다.</p>
          <p>
            <Button onClick={() => router.push(PATHS.ADD_PRODUCTS_PAGE)}>상품 등록</Button> 버튼을
            눌러 상품을 추가하세요.
          </p>
        </div>
      ) : (
        <>
          <ProductTable products={products} onProductChange={handleProductChange} />
          <Pagination currentPage={page} onChange={handlePageChange} lastPage={lastPage} />
        </>
      )}
    </div>
  );
}

type Props = Awaited<ReturnType<typeof getProducts>>;
