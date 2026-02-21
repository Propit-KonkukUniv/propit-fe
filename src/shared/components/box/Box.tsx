import { type ReactNode } from 'react';

interface BoxProps {
  children: ReactNode;
  className?: string; // 추가적인 간격이나 레이아웃 조절용
}

const Box = ({ children, className }: BoxProps) => {
  return (
    <div
      className={`w-full rounded-[12px] bg-white shadow-[0_0_20px_0_rgba(102,126,234,0.05),0_1px_6px_0_rgba(195,197,214,0.50)] ${className} `}
    >
      {children}
    </div>
  );
};

export default Box;
