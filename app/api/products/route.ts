import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { FailedResponse, SuccessResponse } from '@/types/api';
import { Prisma, Product } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json<FailedResponse>(
      { result: 'FAILED', data: null, message: 'Not authorized' },
      { status: 403 },
    );
  }

  try {
    const { products }: { products: Prisma.ProductCreateManyUserInput[] } = await request.json();
    const productsToCreate = products?.map((product) => ({ ...product, userId }));
    const res = await prisma.product.createMany({ data: productsToCreate, skipDuplicates: true });
    return NextResponse.json<SuccessResponse<number>>({ result: 'SUCCESS', data: res.count });
  } catch (error) {
    return NextResponse.json<FailedResponse>(
      { result: 'FAILED', data: null, message: (error as any).message ?? 'Internal server error' },
      { status: (error as any).status ?? 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json<FailedResponse>(
      { result: 'FAILED', data: null, message: 'Not authorized' },
      { status: 403 },
    );
  }

  try {
    const { product }: { product: Product } = await request.json();
    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: product,
    });
    return NextResponse.json<SuccessResponse<Product>>({ result: 'SUCCESS', data: updatedProduct });
  } catch (error) {
    return NextResponse.json<FailedResponse>(
      { result: 'FAILED', data: null, message: (error as any).message ?? 'Internal server error' },
      { status: (error as any).status ?? 500 },
    );
  }
}
