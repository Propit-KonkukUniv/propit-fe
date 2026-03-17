interface LinkCardProps {
  label: string;
  leftIcon?: React.ReactNode;
}

const LinkCard = ({ label, leftIcon }: LinkCardProps) => {
  return (
    <div className="flex w-full items-center justify-between p-5 text-left">
      <div className="flex items-center gap-2">
        {leftIcon}
        <span className="text-[14px] font-bold text-black">{label}</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5 text-gray-400"
        aria-hidden="true"
      >
        <path d="M15.6315 12L10.8838 3.03212L9.11622 3.9679L13.3685 12L9.11622 20.0321L10.8838 20.9679L15.6315 12Z"></path>
      </svg>
    </div>
  );
};

export default LinkCard;

