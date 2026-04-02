import glasses from '@assets/statistics/glasses.svg';
import type { SectorPerformance as SectorPerformanceItem } from '../../apis/report/reportApi';

interface SectorPerformanceProps {
  sectorPerformance: SectorPerformanceItem[];
}

const formatRate = (value: number): string => {
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}${Math.abs(value)}%`;
};

const SectorPerformance = ({ sectorPerformance }: SectorPerformanceProps) => {
  return (
    <div className="p-5">
      <div className="mb-5 flex items-center gap-2">
        <img src={glasses} alt="glasses" />
        <span className="text-[16px] font-bold">업종별 성과</span>
      </div>
      <div className="flex flex-col gap-4">
        {sectorPerformance.map((item) => (
          <div key={`${item.sector}-${item.rate}`} className="flex justify-between text-[14px] font-medium">
            <span className="text-gray-700">{item.sector}</span>
            <span className={item.rate >= 0 ? 'text-[#667EEA]' : 'text-red-500'}>
              {formatRate(item.rate)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorPerformance;
