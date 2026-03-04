import glasses from '@assets/statistics/glasses.svg';

const SectorPerformance = () => {
  const sectors = [
    { name: 'IT', val: '+28.5%', color: 'text-[#667EEA]' },
    { name: '헬스케어', val: '+15.2%', color: 'text-[#667EEA]' },
    { name: '금융', val: '-5.8%', color: 'text-red-500' },
  ];

  return (
    <div className="p-5">
      <div className="mb-5 flex items-center gap-2">
        <img src={glasses} alt="glasses" />
        <span className="text-[16px] font-bold">업종별 성과</span>
      </div>
      <div className="flex flex-col gap-4">
        {sectors.map((item, idx) => (
          <div key={idx} className="flex justify-between text-[14px] font-medium">
            <span className="text-gray-700">{item.name}</span>
            <span className={item.color}>{item.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorPerformance;
