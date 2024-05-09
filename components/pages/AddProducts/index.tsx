'use client';

import ExcelFileDropzone from '@/components/Dropzone/ExcelFileDropzone';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import ProductTable from '@/components/ProductTable';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { DEFAULT_PER } from '@/const/api';
import { PATHS } from '@/const/paths';
import { getNumberDisplay } from '@/lib/string';
import { SuccessResponse } from '@/types/api';
import axios from 'axios';
import chunk from 'lodash/chunk';
import { LucideExternalLink, LucideX } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { DEFAULT_ITEM, LABEL_TO_KEY } from './const';
import { ProductToCreate } from './types';

export default function AddProductsPage({ existingOptionIds = [] }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [fileName, setFileName] = useState('');
  const [productsToCreate, setProductsToCreate] = useState<ProductToCreate[]>([]);
  const [page, setPage] = useState(1);

  const { chunkedProducts, lastPage } = useMemo(
    () => ({
      chunkedProducts: chunk(productsToCreate, DEFAULT_PER),
      lastPage: Math.ceil(productsToCreate.length / DEFAULT_PER),
    }),
    [productsToCreate],
  );

  const reset = () => {
    setProductsToCreate([]);
    setFileName('');
  };

  const handleExcelLoad = (items: ProductToCreate[], fileName: string = '') => {
    const filteredItems = items.filter(({ optionId }) => !existingOptionIds.includes(optionId));

    if (!filteredItems.length) {
      toast({
        title: '신규로 등록할 상품이 없습니다.',
        variant: 'destructive',
      });
      return;
    }

    setProductsToCreate(
      filteredItems.map((item) => ({
        ...item,
        deliveryType: item.barcode ? 'GROWTH' : item.deliveryType,
      })),
    );
    setFileName(fileName);
  };

  const handleProductChange = (product: ProductToCreate) => {
    setProductsToCreate((prev) => prev.map((p) => (p.optionId === product.optionId ? product : p)));
  };

  const saveProducts = async () => {
    try {
      const { data } = await axios.post<SuccessResponse<number>>('/api/products', {
        products: productsToCreate,
      });
      toast({
        title: `${getNumberDisplay(data.data, { suffix: '개' })}의 상품이 신규 등록되었습니다.`,
        variant: 'success',
      });
      router.replace(PATHS.PRODUCTS_PAGE);
    } catch (error) {
      toast({
        title: '상품 목록 저장에 실패했습니다.',
        description: (error as any).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 py-4">
      {!fileName && !productsToCreate.length && (
        <>
          <PageHeader backButton />
          <div className="flex flex-col gap-2">
            <ExcelFileDropzone
              onChange={handleExcelLoad}
              defaultItem={DEFAULT_ITEM}
              labelKeyMap={LABEL_TO_KEY}
              dataRange={'A3:I99999'}
              fileTypeName={<b className="text-sm underline text-red-700">상품 목록</b>}
            />
            <Link
              className="flex items-center text-sm transition-opacity opacity-70 hover:opacity-100 underline"
              href="https://wing.coupang.com/vendor-inventory/list"
              rel="noopener noreferrer"
              target="_blank"
            >
              <LucideExternalLink className="w-4 h-4 mr-1" />
              {'쿠팡 윙 > 상품 관리 > 상품 조회/수정 > 엑셀 다운로드 요청'}
            </Link>
          </div>
        </>
      )}

      {!!fileName && (
        <PageHeader
          title={fileName}
          backButton={
            <Button onClick={reset} variant="ghost" size="icon">
              <LucideX size={28} />
            </Button>
          }
        >
          <Button onClick={saveProducts}>상품 목록 저장</Button>
        </PageHeader>
      )}

      {!!productsToCreate.length && (
        <>
          <ProductTable
            products={chunkedProducts[page - 1]}
            onProductChange={handleProductChange}
          />
          <Pagination currentPage={page} onChange={setPage} lastPage={lastPage} />
        </>
      )}
    </div>
  );
}

type Props = {
  existingOptionIds: string[];
};
