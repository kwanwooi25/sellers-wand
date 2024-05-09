export default function HeaderRow() {
  return (
    <tr className="grid grid-cols-[4fr_2fr_2fr_1fr_1fr_1fr_40px] items-center gap-4 border-y text-xs text-foreground/70 bg-foreground/5 py-2 px-4">
      <th>쿠팡 노출 상품명</th>
      <th>
        업체상품ID
        <br />
        노출ID
        <br />
        옵션ID
      </th>
      <th>
        바코드
        <br />
        업체상품코드
      </th>
      <th>
        배송유형
        <br />
        구성수량
      </th>
      <th>
        판매수수료율
        <br />
        입출고 배송비
        <br />
        쿠폰 할인가
      </th>
      <th>입고 소요 기간</th>
      <th></th>
    </tr>
  );
}
