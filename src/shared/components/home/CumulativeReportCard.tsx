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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-[#646BFA]"
            aria-hidden="true"
          >
            <path d="M20.7134 8.12811L20.4668 8.69379C20.2864 9.10792 19.7136 9.10792 19.5331 8.69379L19.2866 8.12811C18.8471 7.11947 18.0555 6.31641 17.0677 5.87708L16.308 5.53922C15.8973 5.35653 15.8973 4.75881 16.308 4.57612L17.0252 4.25714C18.0384 3.80651 18.8442 2.97373 19.2761 1.93083L19.5293 1.31953C19.7058 0.893489 20.2942 0.893489 20.4706 1.31953L20.7238 1.93083C21.1558 2.97373 21.9616 3.80651 22.9748 4.25714L23.6919 4.57612C24.1027 4.75881 24.1027 5.35653 23.6919 5.53922L22.9323 5.87708C21.9445 6.31641 21.1529 7.11947 20.7134 8.12811ZM22 20V10.6586C21.3744 10.8797 20.7013 11 20 11C18.9071 11 17.8825 10.7078 17 10.1973V17H15V10H16.6822C15.0655 8.92508 14 7.08697 14 5C14 4.29873 14.1203 3.62556 14.3414 3H3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20ZM7 13H9V17H7V13ZM11 7H13V17H11V7Z"></path>
          </svg>
          <span className="text-[14px] font-bold text-black">누적 리포트</span>
        </div>
        <button className="text-gray-400" onClick={onMore}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M15.6315 12L10.8838 3.03212L9.11622 3.9679L13.3685 12L9.11622 20.0321L10.8838 20.9679L15.6315 12Z"></path>
          </svg>
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

