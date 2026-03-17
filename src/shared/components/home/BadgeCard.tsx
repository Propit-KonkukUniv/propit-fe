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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-[#646BFA]"
            aria-hidden="true"
          >
            <path d="M13.0049 16.9409V19.0027H18.0049V21.0027H6.00488V19.0027H11.0049V16.9409C7.05857 16.4488 4.00488 13.0824 4.00488 9.00275V3.00275H20.0049V9.00275C20.0049 13.0824 16.9512 16.4488 13.0049 16.9409ZM1.00488 5.00275H3.00488V9.00275H1.00488V5.00275ZM21.0049 5.00275H23.0049V9.00275H21.0049V5.00275Z"></path>
          </svg>
          <span className="text-[14px] font-bold text-black">획득한 트레이더 칭호</span>
        </div>
        <button className="text-gray-400 disabled:opacity-40" onClick={onMore} disabled={!onMore}>
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

