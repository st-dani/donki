import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

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

// GET: 갤러리 항목 목록 조회
export async function GET() {
  try {
    const galleries = await prisma.serviceGallery.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json(galleries);
  } catch (error) {
    console.error('갤러리 항목 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '갤러리 항목을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// POST: 새 갤러리 항목 생성
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const orderStr = formData.get('order') as string;
    const order = parseInt(orderStr) || 0;
    const imageFile = formData.get('image') as File | null;

    // 필수 필드 검증
    if (!title || !description || !imageFile) {
      return NextResponse.json(
        { error: '제목, 설명, 이미지는 필수 항목입니다.' },
        { status: 400 }
      );
    }

    // 이미지 저장
    const imagePath = await saveImage(imageFile);

    // DB에 갤러리 항목 저장
    const gallery = await prisma.serviceGallery.create({
      data: {
        title,
        description,
        order,
        image: imagePath,
      }
    });

    return NextResponse.json(gallery, { status: 201 });
  } catch (error) {
    console.error('갤러리 항목 생성 중 오류 발생:', error);
    return NextResponse.json(
      { error: '갤러리 항목 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
}
