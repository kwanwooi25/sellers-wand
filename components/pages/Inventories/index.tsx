'use client';

import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import SearchInput from '@/components/SearchInput';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { getInventories } from '@/services/inventory';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function InventoriesPage({ inventories, lastPage }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();
  const page = +(searchParams.get('page') || 1);

  const handlePageChange = (page: number) => {
    router.push(`${pathname}?${createQueryString('page', `${page}`)}`);
  };

  const handleSearch = (input: string) => {
    router.push(`${pathname}?${createQueryString('search', `${input}`)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 py-4">
      <PageHeader title="재고 목록">
        <Button onClick={() => router.push(PATHS.ADD_INVENTORIES_PAGE)}>재고 등록</Button>
      </PageHeader>
      {!inventories.length ? (
        <div className="flex flex-col items-center py-16 gap-4">
          <p>등록된 재고가 없습니다.</p>
          <p>
            <Button onClick={() => router.push(PATHS.ADD_INVENTORIES_PAGE)}>재고 등록</Button>{' '}
            버튼을 눌러 재고를 추가하세요.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <SearchInput onSearch={handleSearch} placeholder="상품명으로 검색" />
          {JSON.stringify(inventories)}
          <Pagination currentPage={page} onChange={handlePageChange} lastPage={lastPage} />
        </div>
      )}
    </div>
  );
}

type Props = Awaited<ReturnType<typeof getInventories>>;
