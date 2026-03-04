import Header from '../../shared/components/header/Header';
import Box from '../../shared/components/box/Box';
import TotalResult from '../../shared/components/statistics/TotalResult';
import YieldTrend from '../../shared/components/statistics/YieldTrend';
import DeepAnalysis from '../../shared/components/statistics/DeepAnalysis';
import SectorPerformance from '../../shared/components/statistics/SectorPerformance';
import InvestmentStrategy from '../../shared/components/statistics/InvestmentStrategy';

const Statistics = () => {
  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] pb-10">
      <Header pageName="Statistics" />

      <div className="flex flex-col gap-5 px-5 pt-6">
        <section className="pl-[2px]">
          <p className="text-[12px] font-medium text-gray-500">2025년 10월 24일~</p>
          <h1 className="mt-1 text-[18px] font-bold">누적 거래 리포트</h1>
        </section>

        <Box>
          <TotalResult />
        </Box>
        <Box>
          <YieldTrend />
        </Box>
        <Box>
          <DeepAnalysis />
        </Box>
        <Box>
          <SectorPerformance />
        </Box>
        <Box>
          <InvestmentStrategy />
        </Box>
      </div>
    </main>
  );
};

export default Statistics;
