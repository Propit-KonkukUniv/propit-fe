import arrowRightIcon from '@assets/home/arrow-right.svg';
import trophyIcon from '@assets/home/trophy.svg';

interface BadgeCardProps {
  title: string;
  subtitle: string;
  onMore?: () => void;
}

const BadgeCard = ({ title, subtitle, onMore }: BadgeCardProps) => {
  return (
    <div className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={trophyIcon} alt="" className="h-5 w-5" aria-hidden="true" />
          <span className="text-[14px] font-bold text-black">획득한 트레이더 칭호</span>
        </div>
        <button className="text-gray-400 disabled:opacity-40" onClick={onMore} disabled={!onMore}>
          <img src={arrowRightIcon} alt="" className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex items-center gap-4 rounded-[12px] bg-[#F9FAFB] p-4">
        <div className="flex flex-col">
          <p className="text-[14px] font-bold text-black">{title}</p>
          <p className="mt-1 text-[12px] text-gray-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default BadgeCard;

