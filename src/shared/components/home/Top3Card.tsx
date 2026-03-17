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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path>
          </svg>
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

