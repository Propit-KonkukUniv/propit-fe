import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
import Greeting from '@shared/components/home/Greeting';

import historyIcon from '@assets/home/history.svg';
import { getHomeApi, type HomePayload } from '@shared/apis/home/homeApi';
import { userMeApi } from '@shared/apis/user/userApi';

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

const HISTORY_LEFT_ICON = <img src={historyIcon} alt="" className="h-5 w-5" aria-hidden="true" />;

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const d = new Date();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const todayLabel = `${d.getMonth() + 1}월 ${d.getDate()}일 ${weekdays[d.getDay()]}요일`;

  const [homeData, setHomeData] = useState<HomePayload | null>(null);
  const [homeError, setHomeError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHome = async () => {
      const rawToken = localStorage.getItem('accessToken');
      if (!rawToken) {
        setHomeError('로그인이 필요합니다.');
        window.location.href = '/login';
        return;
      }

      try {
        const data = await getHomeApi();
        setHomeData(data);
        setHomeError(null);
      } catch (err) {
        if (err instanceof Error && err.message === 'TOKEN_EXPIRED') {
          window.location.href = '/login';
          return;
        }
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          if (status === 401) {
            // 토큰이 유효하지 않은 경우에만 로그인으로 유도
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return;
          }
          if (status === 403) {
            // 토큰은 있는데 /home만 403이면, 백엔드 권한(ROLE/스코프) 설정 문제일 수 있음
            try {
              const me = await userMeApi();
              // /users/me가 성공하면 토큰은 유효 → /home 권한 이슈 가능성이 큼
              if (me) {
                setHomeError('접근 권한이 없습니다. (/home 권한 설정을 백엔드에서 확인해주세요)');
                return;
              }
            } catch {
              // /users/me도 실패하면 토큰 자체가 유효하지 않을 가능성이 큼 → 재로그인 유도
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              window.location.href = '/login';
              return;
            }

            setHomeError('접근 권한이 없습니다.');
            return;
          }
        }

        setHomeError('홈 데이터 조회에 실패했습니다.');
        console.error('홈 데이터 조회 실패:', err);
      }
    };
    fetchHome();

    // 기록 직후 DB 반영이 약간 지연되는 경우를 대비해 한 번 더 짧게 재조회합니다.
    const state = location.state as { fromWrite?: boolean } | null | undefined;
    if (state?.fromWrite) {
      const t = window.setTimeout(() => {
        fetchHome();
      }, 800);
      return () => window.clearTimeout(t);
    }
  }, [location.state]);

  // 1. 누적 리포트 데이터 처리 (응답 2번째 케이스 대응)
  const cumulativeFromApi: [CumulativeStatItem, CumulativeStatItem, CumulativeStatItem, CumulativeStatItem] =
    homeData?.cumulativeReport.exists && homeData.cumulativeReport.data
      ? [
          { label: '총 거래 횟수', value: `${homeData.cumulativeReport.data.totalTradeCount}회` },
          { label: '승률', value: `${homeData.cumulativeReport.data.winRate}%` },
          {
            label: '누적 손익',
            value: `${homeData.cumulativeReport.data.totalProfit.toLocaleString()}원`,
            variant: 'primary',
          },
          { label: '평균 수익률', value: `${homeData.cumulativeReport.data.avgReturnRate}%` },
        ]
      : CUMULATIVE; // 데이터 없을 때 보여줄 기본값 (또는 빈 값 처리 가능)

  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] pb-10">
      <Header pageName="Home" />

      <div className="flex flex-col gap-5 px-5 pt-6">
        <Greeting />

        {homeError ? (
          <div className="rounded-xl bg-white p-4 text-sm text-gray-600">
            {homeError}
          </div>
        ) : null}

        {/* 2. 오늘 기록 여부에 따른 카드 표시 (응답 1, 3번째 케이스 대응) */}
        <Box>
          <WritePromptCard
            todayLabel={todayLabel}
            calendarIconSrc={calenderIcon}
            onWrite={() => navigate('/write')}
            message={
              homeData?.todayMood.exists
                ? `오늘의 기분 '${homeData.todayMood.mood ?? ''}'`
                : (homeData?.todayMood.message ?? undefined)
            }
          />
        </Box>

        <Box>
          <RoutineCard iconSrc={aiIcon} items={ROUTINE_ITEMS} />
        </Box>

        <Box>
          <Top3Card iconSrc={graphIcon} items={TOP3} />
        </Box>

        <Box>
          <BadgeCard title="탐험가" subtitle="20개 이상 종목 보유" />
        </Box>

        {/* 3. 누적 데이터 존재 여부에 따라 카드 렌더링 결정 */}
        {homeData?.cumulativeReport.exists ? (
          <Box>
            <CumulativeReportCard items={cumulativeFromApi} onMore={() => navigate('/statistics')} />
          </Box>
        ) : (
          /* 누적 데이터가 아예 없을 때(응답 3번째 상황 등) 숨기거나 대체 UI를 보여줄 수 있습니다 */
          <div className="text-center text-gray-400 py-4 text-sm">아직 누적 리포트 데이터가 없습니다.</div>
        )}

        <Box className="cursor-pointer">
          <button
            className="flex w-full items-center justify-between p-5 text-left"
            onClick={() => navigate('/daily')}
          >
            <LinkCard label="이전 매매 보러가기" leftIcon={HISTORY_LEFT_ICON} />
          </button>
        </Box>
      </div>
    </main>
  );
};

export default Home;
