import boomdown from '@assets/common/boomdown.svg';
import boomup from '@assets/common/boomup.svg';
import coin from '@assets/common/coin.svg';
import calender from '@assets/statistics/calender.svg';
import smile from '@assets/statistics/smile.svg';
import type { OverviewSummary } from '../../apis/report/reportApi';

interface TotalResultProps {
  summary: OverviewSummary;
}

const formatCurrency = (value: number): string => {
  return `${value.toLocaleString()}원`;
};

const formatSignedCurrency = (value: number): string => {
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}${Math.abs(value).toLocaleString()}원`;
};

const formatSignedRate = (value: number): string => {
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}${Math.abs(value).toFixed(1)}`;
};

const formatRate = (value: number): string => {
  return `${Number(value).toFixed(1)}`;
};

const formatDate = (value: string): string => {
  if (!value) {
    return '';
  }

  return value.replaceAll('-', '.');
};

const TotalResult = ({ summary }: TotalResultProps) => {
  const detailItems = [
    {
      icon: boomup,
      label: '최고의 거래',
      sub: summary.bestTrade.stockName,
      val: `${formatSignedCurrency(summary.bestTrade.profit)} (${formatSignedRate(summary.bestTrade.profitRate)}%)`,
      date: formatDate(summary.bestTrade.date),
      color: summary.bestTrade.profit >= 0 ? 'text-[#667EEA]' : 'text-red-500',
    },
    {
      icon: boomdown,
      label: '최악의 거래',
      sub: summary.worstTrade.stockName,
      val: `${formatSignedCurrency(summary.worstTrade.profit)} (${formatSignedRate(summary.worstTrade.profitRate)}%)`,
      date: formatDate(summary.worstTrade.date),
      color: summary.worstTrade.profit >= 0 ? 'text-[#667EEA]' : 'text-red-500',
    },
    {
      icon: smile,
      label: '가장 많았던 감정',
      sub: '가장 많았던 감정',
      val: `${summary.emotionSummary.mostUsedEmotion} (${summary.emotionSummary.count}회)`,
      date: '',
      color: 'text-black',
    },
    {
      icon: calender,
      label: '평균 보유 기간',
      sub: '평균 보유 기간',
      val: `${Number(summary.averageHoldingDays).toFixed(0)}일`,
      date: '',
      color: 'text-black',
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-5">
      <div className="flex items-center gap-2">
        <img src={coin} alt="coin" />
        <span className="text-[16px] font-bold">전체 성과</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-[#F9FAFB] p-4">
          <p className="text-[12px] text-gray-500">총 거래 횟수</p>
          <p className="text-[16px] font-bold">{summary.totalTradeCount}회</p>
        </div>
        <div className="rounded-lg bg-[#F9FAFB] p-4">
          <p className="text-[12px] text-gray-500">수익실현 비율</p>
          <p className="text-[16px] font-bold">{formatRate(summary.winRate)}%</p>
        </div>
        <div className="col-span-1 rounded-lg border border-[#667EEA] bg-[#667EEA]/5 p-4">
          <p className="text-[12px] font-medium text-[#667EEA]">전체 수익</p>
          <p className="text-[16px] font-bold text-[#667EEA]">
            {formatCurrency(summary.totalProfit)}
          </p>
        </div>
        <div className="rounded-lg bg-[#F9FAFB] p-4">
          <p className="text-[12px] text-gray-500">평균 수익률</p>
          <p className="text-[16px] font-bold text-[#667EEA]">
            {formatSignedRate(summary.avgProfitRate)}%
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-gray-100 pt-2">
        {detailItems.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[12px] text-gray-400">
              <div className="flex items-center gap-1.5">
                <img src={item.icon} alt={item.label} className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
              <span>{item.date}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-[14px] font-bold">
              <span>{item.sub}</span>
              <span className={`text-right ${item.color}`}>{item.val}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalResult;
