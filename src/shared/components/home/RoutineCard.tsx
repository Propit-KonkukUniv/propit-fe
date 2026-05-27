interface RoutineCardProps {
  iconSrc: string;
  items: string[];
}

const RoutineCard = ({ iconSrc, items }: RoutineCardProps) => {
  return (
    <div className="p-5">
      <div className="mb-4 flex items-center gap-2">
        <img src={iconSrc} alt="ai" className="h-5 w-5" />
        <span className="text-[14px] font-bold text-black">투자 3대 조언</span>
      </div>
      <ul className="list-disc space-y-2 pl-5 text-[13px] text-gray-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoutineCard;
