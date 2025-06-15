import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 메뉴 이미지 정보를 일괄적으로 저장하는 API 핸들러
export async function POST(request: Request) {
  try {
    const { images } = await request.json();
    
    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: '유효한 이미지 데이터가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    // 기존 메뉴 이름들 가져오기 (중복 이미지 업데이트를 위해)
    const existingMenus = await prisma.menu.findMany({
      select: {
        id: true,
        name: true,
      }
    });

    type MenuWithId = {
      id: string;
      name: string;
    };

    const existingMenuMap = new Map(
      existingMenus.map((menu: MenuWithId) => [menu.name, menu.id])
    );

    // 각 이미지에 대한 처리 결과를 저장할 배열
    const results = [];
    let savedCount = 0;
    let updatedCount = 0;

    // 각 이미지마다 처리
    for (const image of images) {
      const { name, url } = image;
      
      // 파일명에서 메뉴 이름 추출 (확장자 제거)
      const menuName = name.split('.')[0].replace(/_/g, ' ');
      
      // 이미 해당 이름의 메뉴가 있는지 확인
      const existingMenuId = existingMenuMap.get(menuName);
      
      if (existingMenuId) {
        // 기존 메뉴가 있으면 이미지 URL 업데이트
        await prisma.menu.update({
          where: { id: existingMenuId },
          data: { image: url }
        });
        results.push({ name: menuName, url, action: 'updated' });
        updatedCount++;
      } else {
        // 기존 메뉴가 없으면 로그만 남기고 넘어감
        results.push({ name: menuName, url, action: 'skipped' });
      }
      
      savedCount++;
    }

    return NextResponse.json({
      success: true,
      savedCount,
      updatedCount,
      results
    }, { status: 200 });
  } catch (error) {
    console.error('이미지 일괄 저장 오류:', error);
    return NextResponse.json(
      { error: `이미지 저장 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}` },
      { status: 500 }
    );
  }
}
