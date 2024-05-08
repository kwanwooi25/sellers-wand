'use client';

import Pagination from '@/components/Pagination';
import { GNB_HEIGHT } from '@/const/layout';
import { Product } from '@prisma/client';
import chunk from 'lodash/chunk';
import { useState } from 'react';
import { ProductToCreate } from '../types';
import HeaderRow from './HeaderRow';
import Row from './Row';

export default function ProductTable({ products, onChange }: Props) {
  const [page, setPage] = useState(1);
  const paginatedProducts = chunk(products, 10);
  const lastPage = paginatedProducts.length;

  const productsToDisplay = paginatedProducts[page];

  return (
    <>
      <table className="w-full mb-4">
        <thead className="sticky backdrop-blur z-10" style={{ top: GNB_HEIGHT }}>
          <HeaderRow />
        </thead>
        <tbody>
          {productsToDisplay.map((product) => (
            <Row
              key={product.optionId}
              data={product}
              onChange={(data) => {
                const newProducts = products.map((p) => {
                  if (data.optionId === p.optionId) return data;
                  return p;
                });
                onChange(newProducts);
              }}
            />
          ))}
        </tbody>
      </table>

      <Pagination currentPage={page} onChange={setPage} lastPage={lastPage} />
    </>
  );
}

type Props = {
  products: (Product | ProductToCreate)[];
  onChange: (data: Props['products']) => void;
};
