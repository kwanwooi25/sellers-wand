import { Prisma } from '@prisma/client';

export const DEFAULT_ITEM: Prisma.InventoryCreateManyUserInput = {
  grade: 'NEW',
  availableQuantity: 0,
  expectedRestockQuantity: 0,
  productOptionId: '',
};

export const LABEL_TO_KEY: Record<string, keyof typeof DEFAULT_ITEM> = {
  상품등급: 'grade',
  '판매가능재고 (실시간 기준)': 'availableQuantity',
  '입고예정재고(실시간 기준)': 'expectedRestockQuantity',
  옵션ID: 'productOptionId',
};
