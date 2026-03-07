import { useState, useEffect } from 'react';
import calender from '@assets/common/calender.svg';
import graph from '@assets/common/graph.svg';
import leftarrow from '@assets/write/leftarrow_circle.svg';
import rightarrow from '@assets/write/rightarrow_circle.svg';
import coin from '@assets/common/coin.svg';
import calendertimer from '@assets/write/calender.svg';
import pen from '@assets/write/pen.svg';
import emotiontag from '@assets/write/emotiontag.svg';

const WriteForm = () => {
  const [sellDate, setSellDate] = useState('');
  const [buyDate, setBuyDate] = useState('');
  const [priceBuy, setPriceBuy] = useState('');
  const [priceSell, setPriceSell] = useState('');
  const [quantity, setQuantity] = useState('');
  const [duration, setDuration] = useState('');
  const [dateError, setDateError] = useState('');

  // 금액 콤마 처리 함수
  const formatPrice = (value: string) => {
    const num = value.replace(/[^0-9]/g, '');
    return num ? Number(num).toLocaleString() : '';
  };

  // 날짜 차이 계산 로직
  useEffect(() => {
    if (buyDate && sellDate) {
      const start = new Date(buyDate);
      const end = new Date(sellDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        setDateError('구매일자가 판매일자보다 늦습니다.');
        setDuration('');
      } else {
        setDateError('');
        setDuration(`${diffDays}일`);
      }
    }
  }, [buyDate, sellDate]);

  return (
    <div className="flex flex-col gap-6 p-5">
      {/* 판매일 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img src={calender} alt="calender" className="w-5" />
          <span className="text-[14px] font-bold">판매일</span>
        </div>
        <input
          type="date"
          value={sellDate}
          onChange={(e) => setSellDate(e.target.value)}
          className="w-full rounded-lg border border-gray-200 p-3 text-[14px] outline-none focus:border-[#646BFA]"
        />
      </div>

      {/* 종목명 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img src={graph} alt="graph" className="w-5" />
          <span className="text-[14px] font-bold">종목명</span>
        </div>
        <input
          type="text"
          placeholder="예: 테슬라"
          className="w-full rounded-lg border border-gray-200 p-3 text-[14px] outline-none"
        />
      </div>

      {/* 가격 라인 */}
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-2">
            <img src={leftarrow} alt="buy" className="w-5" />
            <span className="text-[14px] font-bold">1주당 구매 가격</span>
          </div>
          <input
            type="text"
            value={priceBuy}
            onChange={(e) => setPriceBuy(formatPrice(e.target.value))}
            placeholder="0"
            className="w-full rounded-lg border border-gray-200 p-3 text-[14px]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-2">
            <img src={rightarrow} alt="sell" className="w-5" />
            <span className="text-[14px] font-bold">1주당 판매 가격</span>
          </div>
          <input
            type="text"
            value={priceSell}
            onChange={(e) => setPriceSell(formatPrice(e.target.value))}
            placeholder="0"
            className="w-full rounded-lg border border-gray-200 p-3 text-[14px]"
          />
        </div>
      </div>

      {/* 수량 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img src={coin} alt="coin" className="w-5" />
          <span className="text-[14px] font-bold">수량</span>
        </div>
        <div className="relative">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-3 text-[14px]"
          />
          {quantity && (
            <span className="absolute right-4 top-3.5 text-[14px] text-gray-500">주</span>
          )}
        </div>
      </div>

      {/* 보유 기간 (구매일 선택 포함) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img src={calendertimer} alt="timer" className="w-5" />
          <span className="text-[14px] font-bold">보유 기간</span>
        </div>
        <input
          type="date"
          onChange={(e) => setBuyDate(e.target.value)}
          className="mb-1 w-full rounded-lg border border-gray-200 p-3 text-[14px]"
        />
        <div className="min-h-[48px] w-full rounded-lg bg-gray-50 p-3 text-[14px] text-gray-700">
          {duration || '구매일자를 선택해주세요'}
        </div>
        {dateError && <p className="pl-1 text-[12px] font-medium text-red-500">{dateError}</p>}
      </div>

      {/* 판매 이유 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img src={pen} alt="pen" className="w-5" />
          <span className="text-[14px] font-bold">판매 이유</span>
        </div>
        <textarea
          placeholder="매매 근거를 작성해 주세요"
          className="min-h-[80px] w-full resize-none rounded-lg border border-gray-200 p-3 text-[14px]"
        />
      </div>

      {/* 감정 태그 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img src={emotiontag} alt="tag" className="w-5" />
          <span className="text-[14px] font-bold">감정 태그</span>
        </div>
        <input
          type="text"
          placeholder="#확신 #충동"
          className="w-full rounded-lg border border-gray-200 p-3 text-[14px] font-medium text-[#646BFA]"
        />
      </div>
    </div>
  );
};

export default WriteForm;
