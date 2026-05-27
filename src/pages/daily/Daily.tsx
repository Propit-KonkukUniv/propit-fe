import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getDailyReport,
  type DailyReportData,
  type DailyReportRequest,
} from '../../shared/apis/report/reportApi';
import Box from '../../shared/components/box/Box';
import Advice from '../../shared/components/detail/Advice';
import Ai from '../../shared/components/detail/Ai';
import Analysis from '../../shared/components/detail/Analysis';
//import DetailTransaction from '../../shared/components/detail/DetailTransaction';
import TodayResult from '../../shared/components/detail/TodayResult';
import Header from '../../shared/components/header/Header';

const NO_RECORD_MESSAGE = '작성기록이 없습니다.';

const DEFAULT_DAILY_REPORT_DATA: DailyReportData = {
  date: '',
  summary: {
    tradeCount: 0,
    winRate: 0,
    totalProfit: 0,
    averageProfitRate: 0,
  },
  emotionAnalysis: [
    {
      emotion: NO_RECORD_MESSAGE,
      count: 0,
      analysis: NO_RECORD_MESSAGE,
    },
  ],
  aiInsight: {
    strengthPattern: NO_RECORD_MESSAGE,
    improvementPoint: NO_RECORD_MESSAGE,
    cautionTime: NO_RECORD_MESSAGE,
  },
  todayAdvice: [NO_RECORD_MESSAGE],
};

interface DailyLocationState {
  prefetchedDailyReportData?: DailyReportData | null;
}

const getTodayDateParts = (): { apiDate: string; displayDate: string } => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return {
    apiDate: `${year}-${month}-${day}`,
    displayDate: `${year}년 ${Number(month)}월 ${Number(day)}일`,
  };
};

const normalizeDailyReportData = (data?: DailyReportData | null): DailyReportData => {
  if (!data) {
    return DEFAULT_DAILY_REPORT_DATA;
  }

  return {
    date: data.date || '',
    summary: {
      tradeCount: data.summary?.tradeCount ?? 0,
      winRate: data.summary?.winRate ?? 0,
      totalProfit: data.summary?.totalProfit ?? 0,
      averageProfitRate: data.summary?.averageProfitRate ?? 0,
    },
    emotionAnalysis:
      data.emotionAnalysis && data.emotionAnalysis.length > 0
        ? data.emotionAnalysis.map((item) => ({
            emotion: item.emotion || NO_RECORD_MESSAGE,
            count: item.count ?? 0,
            analysis: item.analysis || NO_RECORD_MESSAGE,
          }))
        : DEFAULT_DAILY_REPORT_DATA.emotionAnalysis,
    aiInsight: {
      strengthPattern: data.aiInsight?.strengthPattern || NO_RECORD_MESSAGE,
      improvementPoint: data.aiInsight?.improvementPoint || NO_RECORD_MESSAGE,
      cautionTime: data.aiInsight?.cautionTime || NO_RECORD_MESSAGE,
    },
    todayAdvice:
      data.todayAdvice && data.todayAdvice.length > 0
        ? data.todayAdvice.map((item) => item || NO_RECORD_MESSAGE)
        : DEFAULT_DAILY_REPORT_DATA.todayAdvice,
  };
};

const Daily = () => {
  const location = useLocation();
  const locationState = location.state as DailyLocationState | null;
  const [{ apiDate, displayDate }] = useState(getTodayDateParts);
  const [dailyReportData, setDailyReportData] = useState<DailyReportData>(() =>
    normalizeDailyReportData(locationState?.prefetchedDailyReportData)
  );

  useEffect(() => {
    const fetchDailyReport = async () => {
      try {
        const requestBody: DailyReportRequest = {
          date: apiDate,
        };

        const response = await getDailyReport(requestBody);

        if (!response.success) {
          if (!locationState?.prefetchedDailyReportData) {
            setDailyReportData(DEFAULT_DAILY_REPORT_DATA);
          }
          return;
        }

        setDailyReportData(normalizeDailyReportData(response.data));
      } catch (error) {
        console.error('데일리 리포트 조회에 실패했습니다.', error);

        if (!locationState?.prefetchedDailyReportData) {
          setDailyReportData(DEFAULT_DAILY_REPORT_DATA);
        }
      }
    };

    void fetchDailyReport();
  }, [apiDate, locationState?.prefetchedDailyReportData]);

  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] pb-10">
      <Header pageName="Daily" />
      <div className="flex flex-col gap-5 px-5 pt-6">
        <section className="pl-[21px]">
          <p className="text-[12px] font-[400] text-gray-500">{displayDate}</p>
          <h1 className="mt-1 text-[14px] font-[700]">오늘의 거래 리포트</h1>
        </section>
        <Box>
          <TodayResult {...dailyReportData.summary} />
        </Box>
        {/*
          <Box>
            <DetailTransaction />
          </Box>
        */}
        <Box>
          <Analysis emotionAnalysis={dailyReportData.emotionAnalysis} />
        </Box>
        <Box>
          <Ai aiInsight={dailyReportData.aiInsight} />
        </Box>
        <Box>
          <Advice todayAdvice={dailyReportData.todayAdvice} />
        </Box>
      </div>
    </main>
  );
};

export default Daily;
