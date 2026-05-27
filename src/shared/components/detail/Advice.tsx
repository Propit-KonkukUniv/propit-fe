import advice from '../../../shared/assets/daily/advice.svg';

interface AdviceProps {
  todayAdvice: string[];
}

const Advice = ({ todayAdvice }: AdviceProps) => {
  return (
    <div className="p-5">
      <div className="mb-4 flex items-center gap-2">
        <img src={advice} alt="advice" />
        <span className="text-[12px] font-[700]">오늘의 조언</span>
      </div>
      <ul className="flex flex-col gap-3">
        {todayAdvice.map((text, index) => (
          <li
            key={`${text}-${index}`}
            className="flex items-start gap-2 text-[12px] font-[400] text-black"
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-black" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Advice;
