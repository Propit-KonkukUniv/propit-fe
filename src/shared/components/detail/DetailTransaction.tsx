import graph from '../../../shared/assets/common/graph.svg';
import rightArrow from '../../../shared/assets/common/rightArrow.svg'; // Header에서 쓰던 화살표 재사용

const DetailTransaction = () => {
  return (
    <div className="flex cursor-pointer items-center justify-between p-4 transition-colors active:bg-gray-50">
      <div className="flex items-center gap-2">
        <img src={graph} alt="graph" className="h-6 w-6" />
        <span className="text-[12px] font-[700] text-[#111827]">세부 거래</span>
      </div>
      <img src={rightArrow} alt="arrow" className="h-[24px] w-[24px] opacity-40" />
    </div>
  );
};

export default DetailTransaction;
