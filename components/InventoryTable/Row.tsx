import { INVENTORY_GRADE_TO_STRING } from '@/const/inventory';
import { getNumberDisplay } from '@/lib/string';
import { cn } from '@/lib/utils';
import { Inventory, Prisma } from '@prisma/client';
import { PropsWithChildren } from 'react';

export default function Row<T extends Inventory | Prisma.InventoryCreateManyUserInput>({
  className,
  data,
  children,
}: Props<T>) {
  const { productOptionId, grade, availableQuantity, expectedRestockQuantity } = data;

  return (
    <tr
      className={cn(
        'transition-colors border-b px-4 py-2 hover:bg-card-foreground/5 grid grid-cols-[2fr_2fr_1fr_1fr_40px] items-center gap-4',
        className,
      )}
    >
      <td className="flex flex-col items-center">{productOptionId}</td>
      <td className="flex flex-col items-center">{INVENTORY_GRADE_TO_STRING[grade]}</td>
      <td className="flex flex-col items-center">
        <span>{getNumberDisplay(availableQuantity)}</span>
      </td>
      <td className="flex flex-col items-center">
        <span>{getNumberDisplay(expectedRestockQuantity)}</span>
      </td>
      <td>{children}</td>
    </tr>
  );
}

type Props<T> = PropsWithChildren<{
  className?: string;
  data: T;
}>;
