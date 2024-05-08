'use client';

import ExcelFileDropzone from '@/components/Dropzone/ExcelFileDropzone';
import FileNameDisplay from '@/components/FileNameDisplay';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getNumberDisplay } from '@/lib/string';
import { SuccessResponse } from '@/types/api';
import axios from 'axios';
import { LucideExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ProductTable from './ProductTable';
import { DEFAULT_ITEM, LABEL_TO_KEY } from './const';
import { ProductToCreate } from './types';

export default function ProductsPage() {
  const { toast } = useToast();
  const [fileName, setFileName] = useState('');
  const [productsToCreate, setProductsToCreate] = useState<ProductToCreate[]>([]);

  const reset = () => {
    setProductsToCreate([]);
    setFileName('');
  };

  const handleExcelLoad = (items: ProductToCreate[], fileName: string = '') => {
    setProductsToCreate(
      items.map((item) => ({ ...item, deliveryType: item.barcode ? 'GROWTH' : item.deliveryType })),
    );
    setFileName(fileName);
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
      reset();
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
      )}

      {!!fileName && <FileNameDisplay fileName={fileName} onRemove={reset} />}

      {!!productsToCreate.length && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-end gap-2">
            <Button onClick={saveProducts}>상품 목록 저장</Button>
          </div>
          <ProductTable products={productsToCreate} onChange={setProductsToCreate} />
        </div>
      )}
    </div>
  );
}
