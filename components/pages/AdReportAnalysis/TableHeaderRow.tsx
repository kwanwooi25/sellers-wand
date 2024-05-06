export default function TableHeaderRow() {
  return (
    <tr className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4 border-y text-xs text-foreground/70 bg-foreground/5 py-2 px-4">
      <th></th>
      <th>노출수</th>
      <th>
        클릭수
        <br />
        (클릭률)
      </th>
      <th>
        주문수/14일
        <br />
        (전환률)
      </th>
      <th>
        광고비
        <br />
        (CPC)
      </th>
      <th>
        전환매출/14일
        <br />
        (전환당비용)
      </th>
      <th>광고수익률</th>
    </tr>
  );
}
