import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@components/header/Header';
import Box from '@components/box/Box';

import calenderIcon from '@assets/common/calender.svg';
import graphIcon from '@assets/common/graph.svg';
import aiIcon from '@assets/common/ai.svg';

import WritePromptCard from '@shared/components/home/WritePromptCard';
import RoutineCard from '@shared/components/home/RoutineCard';
import Top3Card, { type Top3Item } from '@shared/components/home/Top3Card';
import BadgeCard from '@shared/components/home/BadgeCard';
import CumulativeReportCard, { type CumulativeStatItem } from '@shared/components/home/CumulativeReportCard';
import LinkCard from '@shared/components/home/LinkCard';

const ROUTINE_ITEMS = ['심사숙고', '단타 절대 금지X', '분할매수하기!!'];

const TOP3: Top3Item[] = [
  { name: '트레저 글로벌', pct: '+276.8%', color: 'text-[#E11D48]' },
  { name: 'SMX', pct: '+135.4%', color: 'text-[#E11D48]' },
  { name: '엔비디아', pct: '-0.5%', color: 'text-[#2563EB]' },
];

const CUMULATIVE: [CumulativeStatItem, CumulativeStatItem, CumulativeStatItem, CumulativeStatItem] = [
  { label: '총 거래 횟수', value: '152회' },
  { label: '승률', value: '68%' },
  { label: '누적 손익', value: '+3,500,000원', variant: 'primary' },
  { label: '평균 수익률', value: '+24.5%' },
];

const Home = () => {
  const navigate = useNavigate();

  const d = new Date();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const todayLabel = `${d.getMonth() + 1}월 ${d.getDate()}일 ${weekdays[d.getDay()]}요일`;

  const [top3, setTop3] = useState<Top3Item[]>(TOP3);

  const shuffledTop3 = useMemo(() => {
    return [...top3]
      .map((item) => ({ item, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map(({ item }) => item);
  }, [top3]);

  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] pb-10">
      <Header pageName="Home" />

      <div className="flex flex-col gap-5 px-5 pt-6">
        <section className="pl-[2px]">
          <p className="text-[16px] font-bold text-black">안녕하세요!</p>
          <p className="mt-1 text-[12px] font-medium text-gray-500">오늘도 현명한 투자 되세요</p>
        </section>

        <Box>
          <WritePromptCard
            todayLabel={todayLabel}
            calendarIconSrc={calenderIcon}
            onWrite={() => navigate('/write')}
          />
        </Box>

        <Box>
          <RoutineCard iconSrc={aiIcon} items={ROUTINE_ITEMS} />
        </Box>

        <Box>
          <Top3Card iconSrc={graphIcon} items={top3} onRefresh={() => setTop3(shuffledTop3)} />
        </Box>

        <Box>
          <BadgeCard title="탐험가" subtitle="20개 이상 종목 보유" onMore={() => {}} />
        </Box>

        <Box>
          <CumulativeReportCard items={CUMULATIVE} onMore={() => navigate('/statistics')} />
        </Box>

        <Box className="cursor-pointer">
          <button
            className="flex w-full items-center justify-between p-5 text-left"
            onClick={() => navigate('/daily')}
          >
            <LinkCard label="이전 매매 보러가기" />
          </button>
        </Box>
      </div>
    </main>
  );
};

export default Home;
