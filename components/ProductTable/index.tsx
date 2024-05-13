'use client';

import EditProductButton from '@/components/EditProductButton';
import { GNB_HEIGHT } from '@/const/layout';
import { Prisma, Product } from '@prisma/client';
import HeaderRow from './HeaderRow';
import Row from './Row';

export default function ProductTable<T extends Product | Prisma.ProductCreateManyUserInput>({
  products,
  onProductChange,
}: Props<T>) {
  return (
    <table className="w-full mb-4">
      <thead className="sticky backdrop-blur z-10" style={{ top: GNB_HEIGHT }}>
        <HeaderRow />
      </thead>
      <tbody>
        {products.map((product) => (
          <Row key={product.optionId} data={product}>
            <EditProductButton data={product} onChange={onProductChange} />
          </Row>
        ))}
      </tbody>
    </table>
  );
}

type Props<T> = {
  products: T[];
  onProductChange: (product: T) => void | Promise<void>;
};
