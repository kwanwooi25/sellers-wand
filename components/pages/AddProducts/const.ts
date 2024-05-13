import { Prisma } from '@prisma/client';

export const DEFAULT_ITEM: Prisma.ProductCreateManyUserInput = {
  vendorProductId: '',
  productId: '',
  optionId: '',
  status: '',
  barcode: '',
  vendorProductCode: '',
  productName: '',
  vendorProductName: '',
  vendorOptionName: '',
  deliveryType: 'WING',
  salesFeeRate: 10.8,
  deliveryCost: 2500,
  couponPrice: 100,
  quantity: 1,
  leadtime: 3,
  isMain: false,
};

export const LABEL_TO_KEY: Record<string, keyof typeof DEFAULT_ITEM> = {
  '업체상품 ID': 'vendorProductId',
  'Product ID': 'productId',
  '옵션 ID': 'optionId',
  상품상태: 'status',
  바코드: 'barcode',
  업체상품코드: 'vendorProductCode',
  '쿠팡 노출 상품명': 'productName',
  '업체 등록 상품명': 'vendorProductName',
  '등록 옵션명': 'vendorOptionName',
};
