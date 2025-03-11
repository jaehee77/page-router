import CustomLayout from '@/layout/CustomLayout';
import { ReactNode } from 'react';

export default function WithBothLayouts() {
  return (
    <div>
      <h1>두 레이아웃 모두 사용하는 페이지</h1>
      <p>
        이 페이지는 GlobalLayout과 CustomLayout을 모두 사용합니다.
      </p>
    </div>
  );
}

// getLayout만 정의하고 disableGlobalLayout은 설정하지 않음
WithBothLayouts.getLayout = function getLayout(page: ReactNode) {
  return <CustomLayout>{page}</CustomLayout>;
};
