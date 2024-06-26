export const DEFAULT_ITEM = {
  biddingType: '',
  salesMethod: '',
  adType: '',
  campaignId: '',
  campaignName: '',
  adGroup: '',
  adProductName: '',
  adProductOptionId: '',
  adConversionProductName: '',
  adConversionProductOptionId: '',
  adExposureArea: '',
  keyword: '',
  exposedCount: 0,
  clickCount: 0,
  adExpense: 0,
  clickRate: 0,
  totalOrderCountForADay: 0,
  directOrderCountForADay: 0,
  indirectOrderCountForADay: 0,
  totalSalesCountForADay: 0,
  directSalesCountForADay: 0,
  indirectSalesCountForADay: 0,
  totalConversionSalesAmountForADay: 0,
  directConversionSalesAmountForADay: 0,
  indirectConversionSalesAmountForADay: 0,
  totalOrderCountFor14Days: 0,
  directOrderCountFor14Days: 0,
  indirectOrderCountFor14Days: 0,
  totalSalesCountFor14Days: 0,
  directSalesCountFor14Days: 0,
  indirectSalesCountFor14Days: 0,
  totalConversionSalesAmountFor14Days: 0,
  directConversionSalesAmountFor14Days: 0,
  indirectConversionSalesAmountFor14Days: 0,
  roasForADay: '',
  directRoasForADay: '',
  indirectRoasForADay: '',
  roasFor14Days: '',
  directRoasFor14Days: '',
  indirectRoasFor14Days: '',
  campaignStartDate: '',
  campaignEndDate: '',
  remarks: '',
};

export const LABEL_TO_KEY: Record<string, keyof typeof DEFAULT_ITEM> = {
  입찰유형: 'biddingType',
  판매방식: 'salesMethod',
  광고유형: 'adType',
  '캠페인 ID': 'campaignId',
  캠페인명: 'campaignName',
  광고그룹: 'adGroup',
  '광고집행 상품명': 'adProductName',
  '광고집행 옵션ID': 'adProductOptionId',
  '광고전환매출발생 상품명': 'adConversionProductName',
  '광고전환매출발생 옵션ID': 'adConversionProductOptionId',
  '광고 노출 지면': 'adExposureArea',
  키워드: 'keyword',
  노출수: 'exposedCount',
  클릭수: 'clickCount',
  광고비: 'adExpense',
  클릭률: 'clickRate',
  '총 주문수(1일)': 'totalOrderCountForADay',
  '직접 주문수(1일)': 'directOrderCountForADay',
  '간접 주문수(1일)': 'indirectOrderCountForADay',
  '총 판매수량(1일)': 'totalSalesCountForADay',
  '직접 판매수량(1일)': 'directSalesCountForADay',
  '간접 판매수량(1일)': 'indirectSalesCountForADay',
  '총 전환매출액(1일)': 'totalConversionSalesAmountForADay',
  '직접 전환매출액(1일)': 'directConversionSalesAmountForADay',
  '간접 전환매출액(1일)': 'indirectConversionSalesAmountForADay',
  '총 주문수(14일)': 'totalOrderCountFor14Days',
  '직접주문수(14일)': 'directOrderCountFor14Days',
  '간접 주문수(14일)': 'indirectOrderCountFor14Days',
  '총 판매수량(14일)': 'totalSalesCountFor14Days',
  '직접 판매수량(14일)': 'directSalesCountFor14Days',
  '간접 판매수량(14일)': 'indirectSalesCountFor14Days',
  '총 전환매출액(14일)': 'totalConversionSalesAmountFor14Days',
  '직접 전환매출액(14일)': 'directConversionSalesAmountFor14Days',
  '간접 전환매출액(14일)': 'indirectConversionSalesAmountFor14Days',
  '총광고수익률(1일)': 'roasForADay',
  '직접광고수익률(1일)': 'directRoasForADay',
  '간접광고수익률(1일)': 'indirectRoasForADay',
  '총광고수익률(14일)': 'roasFor14Days',
  '직접광고수익률(14일)': 'directRoasFor14Days',
  '간접광고수익률(14일)': 'indirectRoasFor14Days',
  '캠페인 시작일': 'campaignStartDate',
  '캠페인 종료일': 'campaignEndDate',
  비고: 'remarks',
};
