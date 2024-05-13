export default function HeaderRow() {
  return (
    <tr className="grid grid-cols-[2fr_2fr_1fr_1fr_40px] items-center gap-4 border-y text-xs text-foreground/70 bg-foreground/5 py-2 px-4">
      <th>옵션ID</th>
      <th>상품등급</th>
      <th>판매가능재고</th>
      <th>입고예정재고</th>
      <th></th>
    </tr>
  );
}
