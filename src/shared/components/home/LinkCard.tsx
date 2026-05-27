import arrowRightIcon from '@assets/home/arrow-right.svg';

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
      <img src={arrowRightIcon} alt="" className="h-5 w-5" aria-hidden="true" />
    </div>
  );
};

export default LinkCard;
