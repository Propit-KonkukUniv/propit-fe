import Header from '../../shared/components/header/Header';
import Box from '../../shared/components/box/Box';
import TodayResult from '../../shared/components/detail/TodayResult';
import DetailTransaction from '../../shared/components/detail/DetailTransaction';
import Analysis from '../../shared/components/detail/Analysis';
import Ai from '../../shared/components/detail/Ai';
import Advice from '../../shared/components/detail/Advice';

const Daily = () => {
  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] pb-10">
      <Header pageName="Daily" />
      <div className="flex flex-col gap-5 px-5 pt-6">
        <section className="pl-[21px]">
          <p className="text-[12px] font-[400] text-gray-500">2025년 12월 7일</p>
          <h1 className="mt-1 text-[14px] font-[700]">오늘의 거래 리포트</h1>
        </section>
        <Box>
          <TodayResult />
        </Box>
        <Box>
          <DetailTransaction />
        </Box>
        <Box>
          <Analysis />
        </Box>
        <Box>
          <Ai />
        </Box>
        <Box>
          <Advice />
        </Box>
      </div>
    </main>
  );
};

export default Daily;
