import CustomLayout from '@/layout/CustomLayout';
import { ReactNode } from 'react';

export default function CustomPage() {
  return (
    <div>
      <h1>커스텀 레이아웃이 적용된 페이지</h1>
      <p>이 페이지는 GlobalLayout을 사용하지 않습니다.</p>
    </div>
  );
}

// GlobalLayout을 비활성화하고 CustomLayout만 사용
CustomPage.getLayout = (page: ReactNode) => {
  return <CustomLayout>{page}</CustomLayout>;
};

// GlobalLayout 사용하지 않음
CustomPage.disableGlobalLayout = true;
