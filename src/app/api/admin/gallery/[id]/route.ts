import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

// 이미지 저장 함수
async function saveImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // uuid로 고유한 파일명 생성
  const filename = `${uuidv4()}_${file.name.replace(/\s+/g, '_')}`;
  
  // 저장 경로 
  const uploadsDir = path.join(process.cwd(), 'public', 'images', 'gallery');
  
  // 디렉토리가 없으면 생성
  try {
    await mkdir(uploadsDir, { recursive: true });
  } catch (error) {
    console.error('Failed to create directory', error);
  }

  const filepath = path.join(uploadsDir, filename);
  
  // 이미지 파일 저장
  await writeFile(filepath, buffer);
  
  // 클라이언트에서 접근 가능한 경로 반환
  return `/images/gallery/${filename}`;
}

// 기존 이미지 파일 삭제 함수
async function deleteImage(imagePath: string) {
  if (!imagePath) return;
  
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    // 파일이 존재하는지 확인
    if (fs.existsSync(fullPath)) {
      await unlink(fullPath);
    }
  } catch (error) {
    console.error('Failed to delete image file:', error);
  }
}

// GET: 특정 갤러리 항목 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const gallery = await prisma.serviceGallery.findUnique({
      where: { id }
    });

    if (!gallery) {
      return NextResponse.json(
        { error: '해당 갤러리 항목을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(gallery);
  } catch (error) {
    console.error('갤러리 항목 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '갤러리 항목을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// PATCH: 갤러리 항목 수정
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const formData = await request.formData();
    
    // 갤러리 항목 존재 여부 확인
    const existingGallery = await prisma.serviceGallery.findUnique({
      where: { id }
    });

    if (!existingGallery) {
      return NextResponse.json(
        { error: '해당 갤러리 항목을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 폼 데이터에서 필드 추출
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const orderStr = formData.get('order') as string;
    const order = parseInt(orderStr) || 0;
    const imageFile = formData.get('image') as File | null;

    // 기본 업데이트 데이터
    const updateData: any = {
      title,
      description,
      order,
    };

    // 새 이미지가 제공된 경우
    if (imageFile) {
      // 새 이미지 저장
      const newImagePath = await saveImage(imageFile);
      updateData.image = newImagePath;

      // 기존 이미지 삭제 (이미지 경로가 /images/gallery로 시작하는 경우에만)
      if (existingGallery.image && existingGallery.image.startsWith('/images/gallery/')) {
        await deleteImage(existingGallery.image);
      }
    }

    // DB에 갤러리 항목 업데이트
    const updatedGallery = await prisma.serviceGallery.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json(updatedGallery);
  } catch (error) {
    console.error('갤러리 항목 수정 중 오류 발생:', error);
    return NextResponse.json(
      { error: '갤러리 항목 수정에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE: 갤러리 항목 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 삭제할 갤러리 항목 조회
    const gallery = await prisma.serviceGallery.findUnique({
      where: { id }
    });

    if (!gallery) {
      return NextResponse.json(
        { error: '해당 갤러리 항목을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 갤러리 항목 삭제
    await prisma.serviceGallery.delete({
      where: { id }
    });

    // 이미지 파일 삭제 (이미지 경로가 /images/gallery로 시작하는 경우에만)
    if (gallery.image && gallery.image.startsWith('/images/gallery/')) {
      await deleteImage(gallery.image);
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('갤러리 항목 삭제 중 오류 발생:', error);
    return NextResponse.json(
      { error: '갤러리 항목 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}
