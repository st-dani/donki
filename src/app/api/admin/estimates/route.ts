import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { EstimateStatus } from '@/generated/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as EstimateStatus | null;

    const whereCondition = status ? { status } : {};

    const estimates = await prisma.estimate.findMany({
      where: whereCondition,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(estimates);
  } catch (error) {
    console.error('Error fetching estimates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch estimates' },
      { status: 500 }
    );
  }
}
