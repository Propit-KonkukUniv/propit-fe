import coin from '@assets/common/coin.svg';
import boomup from '@assets/common/boomup.svg';
import boomdown from '@assets/common/boomdown.svg';
import smile from '@assets/statistics/smile.svg';
import calender from '@assets/statistics/calender.svg';

const TotalResult = () => {
  return (
    <div className="flex flex-col gap-6 p-5">
      <div className="flex items-center gap-2">
        <img src={coin} alt="coin" />
        <span className="text-[16px] font-bold">전체 성과</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-[#F9FAFB] p-4">
          <p className="text-[12px] text-gray-500">총 거래 횟수</p>
          <p className="text-[16px] font-bold">152회</p>
        </div>
        <div className="rounded-lg bg-[#F9FAFB] p-4">
          <p className="text-[12px] text-gray-500">승률</p>
          <p className="text-[16px] font-bold">68%</p>
        </div>
        <div className="col-span-1 rounded-lg border border-[#667EEA] bg-[#667EEA]/5 p-4">
          <p className="text-[12px] font-medium text-[#667EEA]">오늘의 손익</p>
          <p className="text-[16px] font-bold text-[#667EEA]">+3,500,000원</p>
        </div>
        <div className="rounded-lg bg-[#F9FAFB] p-4">
          <p className="text-[12px] text-gray-500">평균 수익률</p>
          <p className="text-[16px] font-bold text-[#667EEA]">+24.5%</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-gray-100 pt-2">
        {[
          {
            icon: boomup,
            label: '최고의 거래',
            sub: 'SK하이닉스',
            val: '+5,200,000원 (+15.2%)',
            date: '2025.11.23',
            color: 'text-[#667EEA]',
          },
          {
            icon: boomdown,
            label: '최약의 거래',
            sub: '삼성전자',
            val: '-2,800,000원 (-18.0%)',
            date: '2025.10.30',
            color: 'text-red-500',
          },
          {
            icon: smile,
            label: '가장 많았던 감정',
            sub: '가장 많았던 감정',
            val: '😎 확신 (45회)',
            date: '',
            color: 'text-black',
          },
          {
            icon: calender,
            label: '평균 보유 기간',
            sub: '평균 보유 기간',
            val: '8.5일',
            date: '',
            color: 'text-black',
          },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[12px] text-gray-400">
              <div className="flex items-center gap-1.5">
                <img src={item.icon} alt="icon" className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
              <span>{item.date}</span>
            </div>
            <div className="flex items-center justify-between text-[14px] font-bold">
              <span>{item.sub}</span>
              <span className={item.color}>{item.val}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalResult;
