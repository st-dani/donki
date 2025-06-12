import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { Role } from '@/generated/prisma';

// GET: 특정 관리자 조회 (필요 시 구현)

// PATCH: 관리자 정보 수정
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { email, password, name, role } = await req.json();

    let dataToUpdate: any = {};

    if (email) dataToUpdate.email = email;
    if (name) dataToUpdate.name = name;
    if (role) dataToUpdate.role = role as Role;

    if (password) {
      dataToUpdate.password = await hash(password, 10);
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json({ message: '관리자를 찾을 수 없습니다.' }, { status: 404 });
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data: dataToUpdate,
    });

    const { password: _, ...adminWithoutPassword } = updatedAdmin;

    return NextResponse.json(adminWithoutPassword);
  } catch (error) {
    console.error(`Error updating admin ${params.id}:`, error);
    return NextResponse.json({ message: '관리자 정보 수정 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// DELETE: 관리자 삭제
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await prisma.admin.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(`Error deleting admin ${params.id}:`, error);
    return NextResponse.json({ message: '관리자 삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
