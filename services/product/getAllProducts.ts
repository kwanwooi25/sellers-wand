import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Product } from '@prisma/client';

export async function getAllProducts<T>(options?: { keys?: (keyof Product)[] }): Promise<T[]> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return [];
  }

  const { keys = [] } = options || {};

  if (keys.length) {
    const select = keys.reduce((acc, key) => ({ ...acc, [key]: true }), {});
    return (await prisma.product.findMany({ where: { userId }, select })) as T[];
  }

  return (await prisma.product.findMany({ where: { userId } })) as T[];
}
