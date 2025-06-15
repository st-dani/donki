const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

// 비밀번호 해싱 함수
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function createAdmin() {
  try {
    // 기존 관리자 확인
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: 'admin@donki.com' }
    });
    
    if (existingAdmin) {
      console.log('⚠️ 이미 관리자 계정이 존재합니다:', existingAdmin.email);
      return;
    }
    
    // 관리자 계정 생성
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@donki.com',
        password: hashPassword('admin1234!'),
        name: '관리자',
        role: 'ADMIN'
      }
    });
    
    console.log('✅ 관리자 계정이 성공적으로 생성되었습니다:', admin.email);
  } catch (error) {
    console.error('❌ 관리자 계정 생성 중 오류 발생:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
