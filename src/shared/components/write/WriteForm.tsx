import calender from '@assets/common/calender.svg';
import coin from '@assets/common/coin.svg';
import graph from '@assets/common/graph.svg';
import calendertimer from '@assets/write/calender.svg';
import emotiontag from '@assets/write/emotiontag.svg';
import leftarrow from '@assets/write/leftarrow_circle.svg';
import pen from '@assets/write/pen.svg';
import rightarrow from '@assets/write/rightarrow_circle.svg';
import type { TradeLogRequest } from '@shared/apis/tradelog/tradelogApi';

interface WriteFormProps {
  tradeLogRequest: TradeLogRequest;
  buyDate: string;
  holdingDays: number;
  dateError: string;
  emotionTagInput: string;
  onTradeLogRequestChange: <K extends keyof TradeLogRequest>(
    field: K,
    value: TradeLogRequest[K]
  ) => void;
  onBuyDateChange: (value: string) => void;
  onEmotionTagInputChange: (value: string) => void;
}

const formatPrice = (value: number): string => {
  if (value <= 0) {
    return '';
  }

  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
  });
};

const parsePrice = (value: string): number => {
  const normalizedValue = value.replace(/,/g, '').replace(/[^\d.]/g, '');
  const [integerPart = '', decimalPart = ''] = normalizedValue.split('.');
  const sanitizedValue = decimalPart.length > 0 ? `${integerPart}.${decimalPart}` : integerPart;

  return sanitizedValue ? Number(sanitizedValue) : 0;
};

const WriteForm = ({
  tradeLogRequest,
  buyDate,
  holdingDays,
  dateError,
  emotionTagInput,
  onTradeLogRequestChange,
  onBuyDateChange,
  onEmotionTagInputChange,
}: WriteFormProps) => {
  return (
    <div className="flex flex-col gap-6 p-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img src={calender} alt="calendar" className="w-5" />
          <span className="text-[14px] font-bold">매도일</span>
        </div>
        <input
          type="date"
          value={tradeLogRequest.sellDate}
          onChange={(event) => onTradeLogRequestChange('sellDate', event.target.value)}
          className="w-full rounded-lg border border-gray-200 p-3 text-[14px] outline-none focus:border-[#646BFA]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img src={graph} alt="graph" className="w-5" />
          <span className="text-[14px] font-bold">종목명</span>
        </div>
        <input
          type="text"
          value={tradeLogRequest.stockName}
          onChange={(event) => onTradeLogRequestChange('stockName', event.target.value)}
          placeholder="예: Tesla"
          className="w-full rounded-lg border border-gray-200 p-3 text-[14px] outline-none focus:border-[#646BFA]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img src={graph} alt="graph" className="w-5" />
          <span className="text-[14px] font-bold">업종명</span>
        </div>
        <input
          type="text"
          value={tradeLogRequest.sectorName}
          onChange={(event) => onTradeLogRequestChange('sectorName', event.target.value)}
          placeholder="예: IT"
          className="w-full rounded-lg border border-gray-200 p-3 text-[14px] outline-none focus:border-[#646BFA]"
        />
      </div>

      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-2">
            <img src={leftarrow} alt="buy" className="w-5" />
            <span className="text-[14px] font-bold">1주당 매수가</span>
          </div>
          <input
            type="text"
            value={formatPrice(tradeLogRequest.buyPrice)}
            onChange={(event) =>
              onTradeLogRequestChange('buyPrice', parsePrice(event.target.value))
            }
            placeholder="0"
            inputMode="decimal"
            className="w-full rounded-lg border border-gray-200 p-3 text-[14px] outline-none focus:border-[#646BFA]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-2">
            <img src={rightarrow} alt="sell" className="w-5" />
            <span className="text-[14px] font-bold">1주당 매도가</span>
          </div>
          <input
            type="text"
            value={formatPrice(tradeLogRequest.sellPrice)}
            onChange={(event) =>
              onTradeLogRequestChange('sellPrice', parsePrice(event.target.value))
            }
            placeholder="0"
            inputMode="decimal"
            className="w-full rounded-lg border border-gray-200 p-3 text-[14px] outline-none focus:border-[#646BFA]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img src={coin} alt="coin" className="w-5" />
          <span className="text-[14px] font-bold">수량</span>
        </div>
        <div className="relative">
          <input
            type="number"
            min="0"
            value={tradeLogRequest.quantity || ''}
            onChange={(event) =>
              onTradeLogRequestChange('quantity', Number(event.target.value) || 0)
            }
            className="w-full rounded-lg border border-gray-200 p-3 pr-12 text-[14px] outline-none focus:border-[#646BFA]"
          />
          {tradeLogRequest.quantity > 0 && (
            <span className="absolute right-4 top-3.5 text-[14px] text-gray-500">주</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img src={calendertimer} alt="holding period" className="w-5" />
          <span className="text-[14px] font-bold">보유 기간</span>
        </div>
        <input
          type="date"
          value={buyDate}
          onChange={(event) => onBuyDateChange(event.target.value)}
          className="w-full rounded-lg border border-gray-200 p-3 text-[14px] outline-none focus:border-[#646BFA]"
        />
        <div className="min-h-[48px] rounded-lg bg-gray-50 p-3 text-[14px] text-gray-700">
          {buyDate
            ? dateError || `${holdingDays}일 보유`
            : '매수일을 선택하면 보유 기간이 계산됩니다.'}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img src={pen} alt="pen" className="w-5" />
          <span className="text-[14px] font-bold">매매 이유</span>
        </div>
        <textarea
          value={tradeLogRequest.reason}
          onChange={(event) => onTradeLogRequestChange('reason', event.target.value)}
          placeholder="매매 근거를 작성해 주세요."
          className="min-h-[80px] w-full resize-none rounded-lg border border-gray-200 p-3 text-[14px] outline-none focus:border-[#646BFA]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img src={emotiontag} alt="emotion tag" className="w-5" />
          <span className="text-[14px] font-bold">감정 태그</span>
        </div>
        <input
          type="text"
          value={emotionTagInput}
          onChange={(event) => onEmotionTagInputChange(event.target.value)}
          placeholder="#확신 #충동"
          className="w-full rounded-lg border border-gray-200 p-3 text-[14px] font-medium text-[#646BFA] outline-none focus:border-[#646BFA]"
        />
      </div>
    </div>
  );
};

export default WriteForm;
