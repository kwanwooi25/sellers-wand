import {
  Pagination as PaginationBase,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';
import { getPagesToDisplay } from './utils';

export default function Pagination({
  currentPage,
  onChange,
  firstPage = 1,
  lastPage,
  maxPagesToDisplay = 4,
}: Props) {
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);
  const pagesToDisplay = getPagesToDisplay({ pages, currentPage, maxPagesToDisplay });

  const moveToPage = (p: number) => onChange(p);
  const moveToPrevPage = () => {
    const prevPage = Math.max(currentPage - 1, firstPage);
    onChange(prevPage);
  };
  const moveToNextPage = () => {
    const nextPage = Math.max(currentPage + 1, lastPage);
    onChange(nextPage);
  };

  return (
    <PaginationBase>
      <PaginationContent>
        <PaginationItem onClick={moveToPrevPage}>
          <PaginationPrevious aria-disabled={currentPage === firstPage} />
        </PaginationItem>
        {!pagesToDisplay.includes(firstPage) && (
          <PaginationItem onClick={() => moveToPage(firstPage)}>
            <PaginationLink isActive={firstPage === currentPage}>{firstPage}</PaginationLink>
          </PaginationItem>
        )}
        {!pagesToDisplay.includes(firstPage) && !pagesToDisplay.includes(firstPage + 1) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pagesToDisplay.map((p) => (
          <PaginationItem key={p} onClick={() => moveToPage(p)}>
            <PaginationLink isActive={p === currentPage}>{p}</PaginationLink>
          </PaginationItem>
        ))}
        {!pagesToDisplay.includes(lastPage) && !pagesToDisplay.includes(lastPage - 1) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {!pagesToDisplay.includes(lastPage) && (
          <PaginationItem onClick={() => moveToPage(lastPage)}>
            <PaginationLink isActive={lastPage === currentPage}>{lastPage}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem onClick={moveToNextPage}>
          <PaginationNext aria-disabled={currentPage === lastPage} />
        </PaginationItem>
      </PaginationContent>
    </PaginationBase>
  );
}

type Props = {
  currentPage: number;
  onChange: (page: number) => void;
  firstPage?: number;
  lastPage: number;
  maxPagesToDisplay?: number;
};
