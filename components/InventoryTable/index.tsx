'use client';

import { GNB_HEIGHT } from '@/const/layout';
import { Inventory, Prisma } from '@prisma/client';
import { LucideTrash2 } from 'lucide-react';
import { Button } from '../ui/button';
import HeaderRow from './HeaderRow';
import Row from './Row';

export default function InventoryTable<T extends Inventory | Prisma.InventoryCreateManyUserInput>({
  inventories,
  onInventoryDelete,
}: Props<T>) {
  return (
    <table className="w-full mb-4">
      <thead className="sticky backdrop-blur z-10" style={{ top: GNB_HEIGHT }}>
        <HeaderRow />
      </thead>
      <tbody>
        {inventories.map((inventory) => (
          <Row key={inventory.productOptionId} data={inventory}>
            <Button onClick={() => onInventoryDelete(inventory)} variant="ghost" size="icon">
              <LucideTrash2 />
            </Button>
          </Row>
        ))}
      </tbody>
    </table>
  );
}

type Props<T> = {
  inventories: T[];
  onInventoryDelete: (inventory: T) => void | Promise<void>;
};
