import { useEffect, useState } from 'react';
import Box from '../../shared/components/box/Box';
import Header from '../../shared/components/header/Header';
import DeepAnalysis from '../../shared/components/statistics/DeepAnalysis';
import InvestmentStrategy from '../../shared/components/statistics/InvestmentStrategy';
import SectorPerformance from '../../shared/components/statistics/SectorPerformance';
import TotalResult from '../../shared/components/statistics/TotalResult';
import YieldTrend from '../../shared/components/statistics/YieldTrend';
import { getOverviewReport, type OverviewReportData } from '../../shared/apis/report/reportApi';

const NO_RECORD_MESSAGE = '작성기록이 없습니다.';

const DEFAULT_OVERVIEW_REPORT_DATA: OverviewReportData = {
  summary: {
    totalTradeCount: 0,
    winRate: 0,
    totalProfit: 0,
    avgProfitRate: 0,
    bestTrade: {
      stockName: NO_RECORD_MESSAGE,
      profit: 0,
      profitRate: 0,
      date: '',
    },
    worstTrade: {
      stockName: NO_RECORD_MESSAGE,
      profit: 0,
      profitRate: 0,
      date: '',
    },
    emotionSummary: {
      mostUsedEmotion: NO_RECORD_MESSAGE,
      count: 0,
    },
    averageHoldingDays: 0,
  },
  profitRateTrendSeries: [],
  aiAnalysis: {
    positive: {
      emotion: NO_RECORD_MESSAGE,
      description: NO_RECORD_MESSAGE,
      insight: NO_RECORD_MESSAGE,
    },
    negative: {
      emotion: NO_RECORD_MESSAGE,
      description: NO_RECORD_MESSAGE,
      insight: NO_RECORD_MESSAGE,
    },
  },
  sectorPerformance: [
    {
      sector: NO_RECORD_MESSAGE,
      rate: 0,
    },
  ],
  strategies: [
    {
      title: NO_RECORD_MESSAGE,
      description: NO_RECORD_MESSAGE,
    },
  ],
};

const getDisplayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

const normalizeOverviewReportData = (data?: OverviewReportData | null): OverviewReportData => {
  if (!data) {
    return DEFAULT_OVERVIEW_REPORT_DATA;
  }

  return {
    summary: {
      totalTradeCount: data.summary?.totalTradeCount ?? 0,
      winRate: data.summary?.winRate ?? 0,
      totalProfit: data.summary?.totalProfit ?? 0,
      avgProfitRate: data.summary?.avgProfitRate ?? 0,
      bestTrade: {
        stockName: data.summary?.bestTrade?.stockName || NO_RECORD_MESSAGE,
        profit: data.summary?.bestTrade?.profit ?? 0,
        profitRate: data.summary?.bestTrade?.profitRate ?? 0,
        date: data.summary?.bestTrade?.date || '',
      },
      worstTrade: {
        stockName: data.summary?.worstTrade?.stockName || NO_RECORD_MESSAGE,
        profit: data.summary?.worstTrade?.profit ?? 0,
        profitRate: data.summary?.worstTrade?.profitRate ?? 0,
        date: data.summary?.worstTrade?.date || '',
      },
      emotionSummary: {
        mostUsedEmotion: data.summary?.emotionSummary?.mostUsedEmotion || NO_RECORD_MESSAGE,
        count: data.summary?.emotionSummary?.count ?? 0,
      },
      averageHoldingDays: data.summary?.averageHoldingDays ?? 0,
    },
    profitRateTrendSeries: data.profitRateTrendSeries ?? [],
    aiAnalysis: {
      positive: {
        emotion: data.aiAnalysis?.positive?.emotion || NO_RECORD_MESSAGE,
        description: data.aiAnalysis?.positive?.description || NO_RECORD_MESSAGE,
        insight: data.aiAnalysis?.positive?.insight || NO_RECORD_MESSAGE,
      },
      negative: {
        emotion: data.aiAnalysis?.negative?.emotion || NO_RECORD_MESSAGE,
        description: data.aiAnalysis?.negative?.description || NO_RECORD_MESSAGE,
        insight: data.aiAnalysis?.negative?.insight || NO_RECORD_MESSAGE,
      },
    },
    sectorPerformance:
      data.sectorPerformance && data.sectorPerformance.length > 0
        ? data.sectorPerformance.map((item) => ({
            sector: item.sector || NO_RECORD_MESSAGE,
            rate: item.rate ?? 0,
          }))
        : DEFAULT_OVERVIEW_REPORT_DATA.sectorPerformance,
    strategies:
      data.strategies && data.strategies.length > 0
        ? data.strategies.map((item) => ({
            title: item.title || NO_RECORD_MESSAGE,
            description: item.description || NO_RECORD_MESSAGE,
          }))
        : DEFAULT_OVERVIEW_REPORT_DATA.strategies,
  };
};

const Statistics = () => {
  const [overviewReportData, setOverviewReportData] = useState<OverviewReportData>(
    DEFAULT_OVERVIEW_REPORT_DATA
  );
  const [displayDate] = useState(getDisplayDate);

  useEffect(() => {
    const fetchOverviewReport = async () => {
      try {
        const response = await getOverviewReport();

        if (!response.success) {
          setOverviewReportData(DEFAULT_OVERVIEW_REPORT_DATA);
          return;
        }

        setOverviewReportData(normalizeOverviewReportData(response.data));
      } catch (error) {
        console.error('누적 거래 리포트 조회에 실패했습니다.', error);
        setOverviewReportData(DEFAULT_OVERVIEW_REPORT_DATA);
      }
    };

    void fetchOverviewReport();
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] pb-10">
      <Header pageName="Statistics" />

      <div className="flex flex-col gap-5 px-5 pt-6">
        <section className="pl-[2px]">
          <p className="text-[12px] font-medium text-gray-500">{displayDate}</p>
          <h1 className="mt-1 text-[18px] font-bold">누적 거래 리포트</h1>
        </section>

        <Box>
          <TotalResult summary={overviewReportData.summary} />
        </Box>
        <Box>
          <YieldTrend profitRateTrendSeries={overviewReportData.profitRateTrendSeries} />
        </Box>
        <Box>
          <DeepAnalysis aiAnalysis={overviewReportData.aiAnalysis} />
        </Box>
        <Box>
          <SectorPerformance sectorPerformance={overviewReportData.sectorPerformance} />
        </Box>
        <Box>
          <InvestmentStrategy strategies={overviewReportData.strategies} />
        </Box>
      </div>
    </main>
  );
};

export default Statistics;
