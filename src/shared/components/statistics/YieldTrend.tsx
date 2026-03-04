import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import graph from '@assets/statistics/graph.svg';

const data = [
  { name: '7월', yield: -15 },
  { name: '8월', yield: 10 },
  { name: '9월', yield: -5 },
  { name: '현재', yield: 20 },
];

const YieldTrend = () => {
  return (
    <div className="p-5">
      <div className="mb-6 flex items-center gap-2">
        <img src={graph} alt="graph" />
        <span className="text-[16px] font-bold">수익률 추이</span>
      </div>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9CA3AF' }}
              dy={10}
            />
            <YAxis hide domain={[-30, 30]} />
            <Area
              type="monotone"
              dataKey="yield"
              stroke="#667EEA"
              fill="url(#colorYield)"
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#667EEA" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#667EEA" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default YieldTrend;
