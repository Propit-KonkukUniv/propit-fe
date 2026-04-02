import strategy from '@assets/statistics/strategy.svg';
import type { Strategy } from '../../apis/report/reportApi';

interface InvestmentStrategyProps {
  strategies: Strategy[];
}

const InvestmentStrategy = ({ strategies }: InvestmentStrategyProps) => {
  return (
    <div className="p-5">
      <div className="mb-5 flex items-center gap-2">
        <img src={strategy} alt="strategy" />
        <span className="text-[16px] font-bold">맞춤 투자 전략</span>
      </div>
      <div className="flex flex-col gap-6">
        {strategies.map((item, index) => (
          <div key={`${item.title}-${index}`} className="flex gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-bold text-[#667EEA]">
              {index + 1}
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-[14px] font-bold leading-tight">{item.title}</p>
              <p className="text-[13px] leading-snug text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentStrategy;
