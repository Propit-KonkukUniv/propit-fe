import arrowRightIcon from '@assets/home/arrow-right.svg';
import reportIcon from '@assets/home/report.svg';

export interface CumulativeStatItem {
  label: string;
  value: string;
  variant?: 'default' | 'primary';
}

interface CumulativeReportCardProps {
  items: [CumulativeStatItem, CumulativeStatItem, CumulativeStatItem, CumulativeStatItem];
  onMore: () => void;
}

const CumulativeReportCard = ({ items, onMore }: CumulativeReportCardProps) => {
  return (
    <div className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={reportIcon} alt="" className="h-5 w-5" aria-hidden="true" />
          <span className="text-[14px] font-bold text-black">누적 리포트</span>
        </div>
        <button className="text-gray-400" onClick={onMore}>
          <img src={arrowRightIcon} alt="" className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => {
          const isPrimary = item.variant === 'primary';
          return (
            <div
              key={item.label}
              className={
                isPrimary
                  ? 'rounded-lg border border-[#667EEA] bg-[#667EEA]/5 p-4'
                  : 'rounded-lg bg-[#F9FAFB] p-4'
              }
            >
              <p
                className={
                  isPrimary
                    ? 'text-[12px] font-medium text-[#667EEA]'
                    : 'text-[12px] text-gray-500'
                }
              >
                {item.label}
              </p>
              <p className={isPrimary ? 'text-[16px] font-bold text-[#667EEA]' : 'text-[16px] font-bold'}>
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CumulativeReportCard;

