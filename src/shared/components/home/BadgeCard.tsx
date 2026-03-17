interface BadgeCardProps {
  title: string;
  subtitle: string;
  onMore?: () => void;
}

const BadgeCard = ({ title, subtitle, onMore }: BadgeCardProps) => {
  return (
    <div className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[14px] font-bold text-black">획득한 트레이더 칭호</span>
        <button className="text-[12px] font-medium text-gray-400" onClick={onMore}>
          {'>'}
        </button>
      </div>

      <div className="flex items-center gap-4 rounded-[12px] bg-[#F9FAFB] p-4">
        <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[12px] bg-white shadow-sm">
          <span className="text-[22px]">🏷️</span>
        </div>
        <div className="flex flex-col">
          <p className="text-[14px] font-bold text-black">{title}</p>
          <p className="mt-1 text-[12px] text-gray-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default BadgeCard;

