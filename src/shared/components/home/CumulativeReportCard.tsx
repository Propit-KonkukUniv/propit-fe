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
        <span className="text-[14px] font-bold text-black">누적 리포트</span>
        <button className="text-[12px] font-medium text-gray-400" onClick={onMore}>
          {'>'}
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

