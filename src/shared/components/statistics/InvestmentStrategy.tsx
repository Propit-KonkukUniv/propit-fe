import strategy from '@assets/statistics/strategy.svg';

const InvestmentStrategy = () => {
  const strategies = [
    {
      num: 1,
      title: '강점 활용하기',
      desc: '확신 있는 기술주 투자에서 탁월한 성과를 보이고 있습니다. 이 영역에 투자 비중을 늘리되, 한 종목당 포지션 크기는 전체 자산의 15%를 넘지 않도록 관리하세요.',
    },
    {
      num: 2,
      title: '감정 관리 시스템',
      desc: '불안감이 느껴질 때는 24시간 대기 규칙을 적용해보세요. 급한 결정보다 하루 뒤 재검토가 더 나은 결과를 만들어냅니다.',
    },
    {
      num: 3,
      title: '손실 최소화 전략',
      desc: '금융주에서 반복적인 손실이 발생하고 있습니다. 이 업종 투자 시에는 더 엄격한 손절 기준(-7%)을 설정하세요.',
    },
    {
      num: 4,
      title: '최적 보유 기간',
      desc: '데이터상 7-14일 보유 시 가장 높은 수익률을 기록했습니다. 단기 차익보다는 중기 트렌드에 집중하는 전략이 적합합니다.',
    },
  ];

  return (
    <div className="p-5">
      <div className="mb-5 flex items-center gap-2">
        <img src={strategy} alt="strategy" />
        <span className="text-[16px] font-bold">맞춤 투자 전략</span>
      </div>
      <div className="flex flex-col gap-6">
        {strategies.map((item) => (
          <div key={item.num} className="flex gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-bold text-[#667EEA]">
              {item.num}
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-[14px] font-bold leading-tight">{item.title}</p>
              <p className="text-[13px] leading-snug text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentStrategy;
