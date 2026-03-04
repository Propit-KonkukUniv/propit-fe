import coin from '../../../shared/assets/common/coin.svg';

const TodayResult = () => {
  return (
    <div className="p-5">
      <div className="mb-4 flex items-center gap-2">
        <img src={coin} alt="coin" />
        <span className="text-[12px] font-[700]">오늘의 성과</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-[#F9FAFB] p-4">
          <p className="text-[10px] font-[400] text-black">거래 횟수</p>
          <p className="text-[12px] font-[700]">3회</p>
        </div>
        <div className="rounded-lg bg-[#F9FAFB] p-4">
          <p className="text-[10px] font-[400] text-black">승률</p>
          <p className="text-[12px] font-[700]">100%</p>
        </div>
        <div className="rounded-lg border border-[#667EEA] bg-[#667EEA]/5 p-4">
          <p className="text-[10px] font-[400] text-[#667EEA]">오늘의 손익</p>
          <p className="text-[12px] font-[700] text-[#667EEA]">+450,000원</p>
        </div>
        <div className="rounded-lg bg-[#F9FAFB] p-4">
          <p className="text-[10px] font-[400] text-black">평균 수익률</p>
          <p className="text-[12px] font-[700] text-black">+7.5%</p>
        </div>
      </div>
    </div>
  );
};

export default TodayResult;
