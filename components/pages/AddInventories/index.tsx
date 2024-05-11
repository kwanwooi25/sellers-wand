'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { DEFAULT_PER } from '@/const/api';
import { Prisma } from '@prisma/client';
import chunk from 'lodash/chunk';
import { LucideExternalLink, LucideX } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function AddInventoriesPage() {
  const [fileName, setFileName] = useState('');
  const [inventoriesToSave, setInventoriesToSave] = useState<Prisma.InventoryCreateManyInput[]>([]);
  const [page, setPage] = useState(1);

  const { chunkedInventories, lastPage } = useMemo(
    () => ({
      chunkedInventories: chunk(inventoriesToSave, DEFAULT_PER),
      lastPage: Math.ceil(inventoriesToSave.length / DEFAULT_PER),
    }),
    [inventoriesToSave],
  );

  const reset = () => {
    setInventoriesToSave([]);
    setFileName('');
  };

  const saveInventories = () => {};

  return (
    <PageBody className="max-w-7xl">
      <PageHeader backButton />
      {/* Dropzone here */}
      <Link
        className="flex items-center text-sm transition-opacity opacity-70 hover:opacity-100 underline"
        href="https://wing.coupang.com/tenants/rfm-inventory/management/list"
        rel="noopener noreferrer"
        target="_blank"
      >
        <LucideExternalLink className="w-4 h-4 mr-1" />
        {'쿠팡 윙 > 로켓그로스 > 재고 현황 > 엑셀 다운로드 요청'}
      </Link>

      {!!fileName && (
        <PageHeader
          title={fileName}
          backButton={
            <Button onClick={reset} variant="ghost" size="icon">
              <LucideX size={28} />
            </Button>
          }
        >
          <Button onClick={saveInventories}>재고 목록 저장</Button>
        </PageHeader>
      )}

      {!!inventoriesToSave.length && (
        <>
          {JSON.stringify(chunkedInventories)}
          <Pagination currentPage={page} onChange={setPage} lastPage={lastPage} />
        </>
      )}
    </PageBody>
  );
}
