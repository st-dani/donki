import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Prisma Client 인스턴스 경로 확인 필요
import { EstimateStatus } from '@/generated/prisma'; // Prisma Client에서 생성된 Enum 타입

interface PatchRequestBody {
  status: EstimateStatus;
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const body = await request.json() as PatchRequestBody;
    const { status } = body;

    // 유효한 status 값인지 확인 (선택 사항이지만 권장)
    if (!Object.values(EstimateStatus).includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const updatedEstimate = await prisma.estimate.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(updatedEstimate);
  } catch (error) {
    console.error(`Error updating estimate ${id}:`, error);
    return NextResponse.json(
      { error: `Failed to update estimate ${id}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const deletedEstimate = await prisma.estimate.delete({
      where: { id },
    });
    return NextResponse.json(deletedEstimate);
  } catch (error) {
    console.error(`Error deleting estimate ${id}:`, error);
    return NextResponse.json(
      { error: `Failed to delete estimate ${id}` },
      { status: 500 }
    );
  }
}
