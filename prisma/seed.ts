import { PrismaClient } from '@prisma/client'
import * as crypto from 'crypto';

const prisma = new PrismaClient()

// 비밀번호 해싱 함수
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  console.log(`🌱 데이터베이스 시드 작업을 시작합니다.`)

  // 기존 관리자 확인
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: 'admin@donki.com' }
  })
  
  if (!existingAdmin) {
    // 관리자 계정 생성
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@donki.com',
        password: hashPassword('admin1234!'),
        name: '관리자',
        role: 'ADMIN'
      },
    })
    console.log(`✅ 관리자 계정 생성 완료: ${admin.email}`)
  } else {
    console.log(`⚠️ 관리자 계정이 이미 존재합니다: ${existingAdmin.email}`)
  }
  
  console.log(`✨ 시드 작업 완료`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
