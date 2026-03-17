import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@components/header/Header';
import Box from '@components/box/Box';

import calenderIcon from '@assets/common/calender.svg';
import graphIcon from '@assets/common/graph.svg';
import aiIcon from '@assets/common/ai.svg';

const Home = () => {
  const navigate = useNavigate();

  const todayLabel = useMemo(() => {
    const d = new Date();
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    return `${d.getMonth() + 1}월 ${d.getDate()}일 ${weekdays[d.getDay()]}요일`;
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] pb-10">
      <Header pageName="Home" />

      <div className="flex flex-col gap-5 px-5 pt-6">
        <section className="pl-[2px]">
          <p className="text-[16px] font-bold text-black">안녕하세요!</p>
          <p className="mt-1 text-[12px] font-medium text-gray-500">오늘도 현명한 투자 되세요</p>
        </section>

        <Box>
          <div className="flex items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-3">
              <img src={calenderIcon} alt="calender" className="h-6 w-6" />
              <div className="flex flex-col gap-1">
                <p className="text-[14px] font-bold text-black">{todayLabel}</p>
                <p className="text-[12px] text-gray-500">오늘의 매매를 기록하지 않았어요!</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/write')}
              className="h-[36px] shrink-0 rounded-full bg-[#646BFA] px-4 text-[12px] font-bold text-white shadow-sm transition active:scale-[0.98]"
            >
              매매 기록하기
            </button>
          </div>
        </Box>

        <Box>
          <div className="p-5">
            <div className="mb-4 flex items-center gap-2">
              <img src={aiIcon} alt="ai" className="h-5 w-5" />
              <span className="text-[14px] font-bold text-black">오늘의 루틴</span>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-[13px] text-gray-700">
              <li>“삽그초화”</li>
              <li>단타 절대 금지X</li>
              <li>분할매수하기!!</li>
            </ul>
          </div>
        </Box>

        <Box>
          <div className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={graphIcon} alt="graph" className="h-5 w-5" />
                <span className="text-[14px] font-bold text-black">실시간 거래량 TOP3</span>
              </div>
              <button className="text-[12px] font-medium text-gray-400">⟳</button>
            </div>

            <div className="space-y-3 text-[13px]">
              {[
                { name: '트레저 글로벌', pct: '+276.8%', color: 'text-[#E11D48]' },
                { name: 'SMX', pct: '+135.4%', color: 'text-[#E11D48]' },
                { name: '엔비디아', pct: '-0.5%', color: 'text-[#2563EB]' },
              ].map((row, idx) => (
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
        </Box>

        <Box>
          <div className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[14px] font-bold text-black">획득한 트레이더 칭호</span>
              <button className="text-[12px] font-medium text-gray-400">{'>'}</button>
            </div>

            <div className="flex items-center gap-4 rounded-[12px] bg-[#F9FAFB] p-4">
              <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[12px] bg-white shadow-sm">
                <span className="text-[22px]">🏷️</span>
              </div>
              <div className="flex flex-col">
                <p className="text-[14px] font-bold text-black">탐험가</p>
                <p className="mt-1 text-[12px] text-gray-500">20개 이상 종목 보유</p>
              </div>
            </div>
          </div>
        </Box>

        <Box>
          <div className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[14px] font-bold text-black">누적 리포트</span>
              <button
                className="text-[12px] font-medium text-gray-400"
                onClick={() => navigate('/statistics')}
              >
                {'>'}
              </button>
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
              <div className="rounded-lg border border-[#667EEA] bg-[#667EEA]/5 p-4">
                <p className="text-[12px] font-medium text-[#667EEA]">누적 손익</p>
                <p className="text-[16px] font-bold text-[#667EEA]">+3,500,000원</p>
              </div>
              <div className="rounded-lg bg-[#F9FAFB] p-4">
                <p className="text-[12px] text-gray-500">평균 수익률</p>
                <p className="text-[16px] font-bold text-[#667EEA]">+24.5%</p>
              </div>
            </div>
          </div>
        </Box>

        <Box className="cursor-pointer">
          <button
            className="flex w-full items-center justify-between p-5 text-left"
            onClick={() => navigate('/daily')}
          >
            <span className="text-[14px] font-bold text-black">이전 매매 보러가기</span>
            <span className="text-[12px] font-medium text-gray-400">{'>'}</span>
          </button>
        </Box>
      </div>
    </main>
  );
};

export default Home;
