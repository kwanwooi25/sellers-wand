'use client';

import ExcelFileDropzone from '@/components/Dropzone/ExcelFileDropzone';
import InventoryTable from '@/components/InventoryTable';
import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { DEFAULT_PER } from '@/const/api';
import { STRING_TO_INVENTORY_GRADE } from '@/const/inventory';
import { getExcelFileReader } from '@/lib/excel';
import { InventoryGrade, Prisma } from '@prisma/client';
import chunk from 'lodash/chunk';
import { LucideExternalLink, LucideX } from 'lucide-react';
import Link from 'next/link';
import { ComponentProps, useMemo, useState } from 'react';
import { DEFAULT_ITEM, LABEL_TO_KEY } from './const';

export default function AddInventoriesPage() {
  const [fileName, setFileName] = useState('');
  const [inventoriesToSave, setInventoriesToSave] = useState<Prisma.InventoryCreateManyUserInput[]>(
    [],
  );
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

  const handleDrop: ComponentProps<typeof ExcelFileDropzone>['onDrop'] = async (acceptedFiles) => {
    if (!acceptedFiles.length) return;

    const file = acceptedFiles[0];
    const reader = getExcelFileReader({
      handler: (items) => {
        setInventoriesToSave(items);
        setFileName(file.name);
      },
      defaultItem: DEFAULT_ITEM,
      labelKeyMap: LABEL_TO_KEY,
      generateItemFn: ({ row, defaultItem = DEFAULT_ITEM, labelKeyMap = LABEL_TO_KEY }) => {
        return Object.entries(row).reduce((generatedRow, [key, value]) => {
          const newKey: keyof Prisma.InventoryCreateManyUserInput = labelKeyMap[key];

          if (!newKey) return generatedRow;

          if (newKey === 'grade') {
            return {
              ...generatedRow,
              [newKey]: STRING_TO_INVENTORY_GRADE[value as InventoryGrade],
            };
          }

          return { ...generatedRow, [newKey]: value };
        }, defaultItem);
      },
    });
    reader.readAsArrayBuffer(file);
  };

  const handleInventoryDelete = (inventory: Prisma.InventoryCreateManyUserInput) => {
    setInventoriesToSave((prev) =>
      prev.filter((i) => i.productOptionId !== inventory.productOptionId),
    );
  };

  const saveInventories = () => {};

  return (
    <PageBody className="max-w-7xl">
      {!fileName && !inventoriesToSave.length && (
        <>
          <PageHeader backButton />

          <div className="flex flex-col gap-2">
            <ExcelFileDropzone
              onDrop={handleDrop}
              fileTypeName={<b className="text-sm underline text-red-700">로켓그로스 재고 현황</b>}
            />
            <Link
              className="flex items-center text-sm transition-opacity opacity-70 hover:opacity-100 underline"
              href="https://wing.coupang.com/tenants/rfm-inventory/management/list"
              rel="noopener noreferrer"
              target="_blank"
            >
              <LucideExternalLink className="w-4 h-4 mr-1" />
              {'쿠팡 윙 > 로켓그로스 > 재고 현황 > 엑셀 다운로드 요청'}
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
          <Button onClick={saveInventories}>재고 목록 저장</Button>
        </PageHeader>
      )}

      {!!inventoriesToSave.length && (
        <>
          <InventoryTable
            inventories={chunkedInventories[page - 1]}
            onInventoryDelete={handleInventoryDelete}
          />
          <Pagination currentPage={page} onChange={setPage} lastPage={lastPage} />
        </>
      )}
    </PageBody>
  );
}
