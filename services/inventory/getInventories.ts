import { DEFAULT_PER } from '@/const/api';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function getInventories({
  page = 1,
  per = DEFAULT_PER,
  search = '',
}: {
  page?: number;
  per?: number;
  search?: string;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      totalCount: 0,
      lastPage: 1,
      inventories: [],
    };
  }

  const where: Prisma.InventoryFindManyArgs['where'] = {
    userId,
    product: {
      productName: {
        contains: search,
      },
    },
  };

  const [count, inventories] = await Promise.all([
    prisma.inventory.count({ where }),
    prisma.inventory.findMany({
      where,
      include: {
        product: true,
      },
      skip: (page - 1) * per,
      take: per,
      orderBy: { productOptionId: 'asc' },
    }),
  ]);

  return {
    totalCount: count,
    lastPage: Math.ceil(count / per),
    inventories,
  };
}
