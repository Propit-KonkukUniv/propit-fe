interface GreetingProps {
  title?: string;
  subtitle?: string;
}

const Greeting = ({
  title = '안녕하세요!',
  subtitle = '오늘도 현명한 투자 되세요',
}: GreetingProps) => {
  return (
    <section className="pl-[2px]">
      <p className="text-[16px] font-bold text-black">{title}</p>
      <p className="mt-1 text-[12px] font-medium text-gray-500">{subtitle}</p>
    </section>
  );
};

export default Greeting;
