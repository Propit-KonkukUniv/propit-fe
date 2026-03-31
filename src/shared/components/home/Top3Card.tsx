import refreshIcon from '@assets/home/refresh.svg';

export interface Top3Item {
  name: string;
  pct: string;
  color: string;
}

interface Top3CardProps {
  iconSrc: string;
  items: Top3Item[];
  onRefresh?: () => void;
}

const Top3Card = ({ iconSrc, items, onRefresh }: Top3CardProps) => {
  return (
    <div className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={iconSrc} alt="graph" className="h-5 w-5" />
          <span className="text-[14px] font-bold text-black">실시간 거래량 TOP3</span>
        </div>
        <button
          className="text-gray-400 disabled:opacity-40"
          onClick={onRefresh}
          disabled={!onRefresh}
        >
          <img src={refreshIcon} alt="" className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="space-y-3 text-[13px]">
        {items.map((row, idx) => (
          <div key={row.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-4 text-[12px] font-bold text-gray-500">{idx + 1}</span>
              <span className="font-medium text-gray-800">{row.name}</span>
            </div>
            <span className={`font-bold ${row.color}`}>{row.pct}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top3Card;

