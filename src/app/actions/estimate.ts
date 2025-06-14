'use server';

import { z } from 'zod';
import { sendEmail } from '@/lib/email';

const estimateSchema = z.object({
  company: z.string().min(1, '회사명을 입력해주세요.'),
  name: z.string().min(1, '담당자명을 입력해주세요.'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요.'),
  phone: z.string().min(1, '연락처를 입력해주세요.'),
  service: z.string().min(1, '관심 서비스를 선택해주세요.'),
  budget: z.string().optional(),
  date: z.string().optional(),
  message: z.string().min(1, '문의 내용을 입력해주세요.'),
  privacy: z.boolean().refine((value: boolean) => value === true, '개인정보 수집 및 이용에 동의해주세요.')
});

export type EstimateFormData = z.infer<typeof estimateSchema>;

export async function submitEstimate(formData: EstimateFormData) {
  try {
    // 폼 데이터 검증
    const validatedData = estimateSchema.parse(formData);

    // 관리자에게 보내는 이메일
    const adminEmailResult = await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@donquixote.com',
      subject: `[견적문의] ${validatedData.company} - ${validatedData.service}`,
      html: `
        <h2>견적 문의가 접수되었습니다.</h2>
        <h3>기본 정보</h3>
        <ul>
          <li>회사명: ${validatedData.company}</li>
          <li>담당자: ${validatedData.name}</li>
          <li>이메일: ${validatedData.email}</li>
          <li>연락처: ${validatedData.phone}</li>
        </ul>
        <h3>서비스 정보</h3>
        <ul>
          <li>관심 서비스: ${validatedData.service}</li>
          <li>예상 예산: ${validatedData.budget || '미정'}</li>
          <li>희망 진행 시기: ${validatedData.date || '미정'}</li>
        </ul>
        <h3>문의 내용</h3>
        <p>${validatedData.message}</p>
      `
    });

    // 고객에게 보내는 자동 응답 이메일
    const customerEmailResult = await sendEmail({
      to: validatedData.email,
      subject: '[돈키호테 푸드트럭] 견적 문의가 접수되었습니다.',
      html: `
        <h2>${validatedData.name}님, 견적 문의가 접수되었습니다.</h2>
        <p>안녕하세요, 돈키호테 푸드트럭입니다.</p>
        <p>견적 문의가 정상적으로 접수되었습니다. 담당자 검토 후 1-2영업일 내에 연락드리겠습니다.</p>
        <h3>문의하신 내용</h3>
        <ul>
          <li>관심 서비스: ${validatedData.service}</li>
          <li>예상 예산: ${validatedData.budget || '미정'}</li>
          <li>희망 진행 시기: ${validatedData.date || '미정'}</li>
        </ul>
        <p>추가 문의사항이 있으시면 언제든 연락주세요.</p>
        <p>감사합니다.</p>
        <hr />
        <p style="color: #666; font-size: 12px;">
          본 메일은 자동 발송되었습니다.<br />
          돈키호테 푸드트럭 | 02-1234-5678 | help@donquixote.com
        </p>
      `
    });

    if (!adminEmailResult.success || !customerEmailResult.success) {
      throw new Error('이메일 발송 중 오류가 발생했습니다.');
    }

    // 성공 응답
    return {
      success: true,
      message: '견적 문의가 성공적으로 접수되었습니다.'
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Validation 에러 처리
      const errorMessages = error.errors.map((err: z.ZodIssue) => err.message);
      return {
        success: false,
        message: errorMessages.join('\n')
      };
    }

    // 기타 에러 처리
    return {
      success: false,
      message: '견적 문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
    };
  }
} 