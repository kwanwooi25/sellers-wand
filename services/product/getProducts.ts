import { DEFAULT_PER } from '@/const/api';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function getProducts({
  page = 1,
  per = DEFAULT_PER,
}: {
  page?: number;
  per?: number;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      totalCount: 0,
      lastPage: 1,
      products: [],
    };
  }

  const [count, products] = await Promise.all([
    prisma.product.count({ where: { userId } }),
    prisma.product.findMany({
      where: { userId },
      skip: (page - 1) * per,
      take: per,
      orderBy: { optionId: 'asc' },
    }),
  ]);

  return {
    totalCount: count,
    lastPage: Math.ceil(count / per),
    products,
  };
}
