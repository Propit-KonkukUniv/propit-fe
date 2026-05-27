import graph from '@assets/statistics/graph.svg';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ProfitRateTrend } from '../../apis/report/reportApi';

interface YieldTrendProps {
  profitRateTrendSeries: ProfitRateTrend[];
}

const YieldTrend = ({ profitRateTrendSeries }: YieldTrendProps) => {
  const hasData = profitRateTrendSeries.length > 0;

  return (
    <div className="p-5">
      <div className="mb-6 flex items-center gap-2">
        <img src={graph} alt="graph" />
        <span className="text-[16px] font-bold">수익률 추이</span>
      </div>
      <div className="h-[200px] w-full">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={profitRateTrendSeries}>
              <defs>
                <linearGradient id="colorProfitRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#667EEA" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#667EEA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
              <XAxis
                dataKey="month"
                tickFormatter={(value: number) => `${value}월`}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#9CA3AF' }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#9CA3AF' }}
                tickFormatter={(value: number) => `${value}%`}
                width={36}
              />
              <Tooltip
                formatter={(value) => [`${Number(value ?? 0).toFixed(2)}%`, '수익률']}
                labelFormatter={(label) => `${String(label)}월`}
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)',
                }}
              />
              <Area
                type="monotone"
                dataKey="profitRate"
                stroke="#667EEA"
                fill="url(#colorProfitRate)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-[16px] bg-[#F9FAFB] text-[13px] text-gray-500">
            작성기록이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default YieldTrend;
