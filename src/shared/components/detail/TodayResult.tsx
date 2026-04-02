import coin from '../../../shared/assets/common/coin.svg';
import type { DailySummary } from '../../apis/report/reportApi';

type TodayResultProps = DailySummary;

const formatCurrency = (value: number): string => {
  return `${value.toLocaleString()}원`;
};

const formatRate = (value: number): string => {
  return `${value}%`;
};

const TodayResult = ({ tradeCount, winRate, totalProfit, averageProfitRate }: TodayResultProps) => {
  return (
    <div className="p-5">
      <div className="mb-4 flex items-center gap-2">
        <img src={coin} alt="coin" />
        <span className="text-[12px] font-[700]">오늘의 성과</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-[#F9FAFB] p-4">
          <p className="text-[10px] font-[400] text-black">거래 횟수</p>
          <p className="text-[12px] font-[700]">{tradeCount}회</p>
        </div>
        <div className="rounded-lg bg-[#F9FAFB] p-4">
          <p className="text-[10px] font-[400] text-black">승률</p>
          <p className="text-[12px] font-[700]">{formatRate(Math.round(winRate))}</p>
        </div>
        <div className="rounded-lg border border-[#667EEA] bg-[#667EEA]/5 p-4">
          <p className="text-[10px] font-[400] text-[#667EEA]">오늘의 수익</p>
          <p className="text-[12px] font-[700] text-[#667EEA]">
            {formatCurrency(Math.round(totalProfit))}
          </p>
        </div>
        <div className="rounded-lg bg-[#F9FAFB] p-4">
          <p className="text-[10px] font-[400] text-black">평균 수익률</p>
          <p className="text-[12px] font-[700] text-black">
            {formatRate(Math.round(averageProfitRate))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodayResult;
