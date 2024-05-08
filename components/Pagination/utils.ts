export function getPagesToDisplay({
  pages,
  currentPage,
  maxPagesToDisplay,
}: {
  pages: number[];
  currentPage: number;
  maxPagesToDisplay: number;
}) {
  const lastPage = pages[pages.length - 1];

  if (currentPage < maxPagesToDisplay - 1) {
    return pages.slice(0, maxPagesToDisplay);
  }
  if (currentPage > lastPage - (maxPagesToDisplay - 1)) {
    return pages.slice(-maxPagesToDisplay);
  }
  return pages.slice(
    Math.max(currentPage - Math.ceil(maxPagesToDisplay / 2), 0),
    Math.min(currentPage + Math.floor(maxPagesToDisplay / 2), lastPage),
  );
}
