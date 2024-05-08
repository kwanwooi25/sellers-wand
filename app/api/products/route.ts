import { ProductToCreate } from '@/components/pages/Products/types';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { FailedResponse, SuccessResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json<FailedResponse>(
      { result: 'FAILED', message: 'Not authorized' },
      { status: 403 },
    );
  }

  try {
    const { products }: { products: ProductToCreate[] } = await request.json();
    const productsToCreate = products?.map((product) => ({ ...product, userId }));
    const res = await prisma.product.createMany({ data: productsToCreate, skipDuplicates: true });
    return NextResponse.json<SuccessResponse<number>>({ result: 'SUCCESS', data: res.count });
  } catch (error) {
    return NextResponse.json<FailedResponse>(
      { result: 'FAILED', message: (error as any).message ?? 'Internal server error' },
      { status: (error as any).status ?? 500 },
    );
  }
}
