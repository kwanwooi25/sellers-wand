import { InventoryGrade } from '@prisma/client';

export const STRING_TO_INVENTORY_GRADE: Record<string, InventoryGrade> = {
  NEW: 'NEW',
  '반품-미개봉': 'REFUND_UNOPENED',
  '반품-최상': 'REFUND_BEST',
  '반품-상': 'REFUND_BETTER',
  '반품-중': 'REFUND_GOOD',
};

export const INVENTORY_GRADE_TO_STRING: Record<InventoryGrade, string> = {
  NEW: 'NEW',
  REFUND_UNOPENED: '반품-미개봉',
  REFUND_BEST: '반품-최상',
  REFUND_BETTER: '반품-상',
  REFUND_GOOD: '반품-중',
};
