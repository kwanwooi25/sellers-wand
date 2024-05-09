import { Product } from '@prisma/client';

export type ProductToCreate = Omit<Product, 'id' | 'userId'>;
