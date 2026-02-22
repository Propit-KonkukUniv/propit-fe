import advice from '../../../shared/assets/daily/advice.svg';

const Advice = () => {
  return (
    <div className="p-5">
      <div className="mb-4 flex items-center gap-2">
        <img src={advice} alt="advice" />
        <span className="text-[12px] font-[700]">오늘의 조언</span>
      </div>
      <ul className="flex flex-col gap-3">
        {[
          '오늘의 장은 변동성이 많으니 신중한 거래를 하세요.',
          '테슬라의 거래량이 떨어지고 있으니 재매수는 삼가세요.',
          '오후 늦은 시간대 거래는 한 번 더 신중하게 검토하세요.',
        ].map((text, i) => (
          <li key={i} className="flex items-start gap-2 text-[12px] font-[400] text-black">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-black" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Advice;
