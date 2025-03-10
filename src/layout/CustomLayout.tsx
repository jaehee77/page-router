import { ReactNode } from "react";

interface CustomLayoutProps {
  children: ReactNode;
}

export default function CustomLayout({ children }: CustomLayoutProps) {
  return (
    <div className="custom-layout">
      {/* 여기에 완전히 다른 레이아웃 구조를 구현 */}
      {children}
    </div>
  );
}
