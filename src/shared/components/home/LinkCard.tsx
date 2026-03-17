interface LinkCardProps {
  label: string;
}

const LinkCard = ({ label }: LinkCardProps) => {
  return (
    <div className="flex w-full items-center justify-between p-5 text-left">
      <span className="text-[14px] font-bold text-black">{label}</span>
      <span className="text-[12px] font-medium text-gray-400">{'>'}</span>
    </div>
  );
};

export default LinkCard;

