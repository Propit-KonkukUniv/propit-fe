import emotion from '../../../shared/assets/daily/emotion.svg';
import confidence from '../../../shared/assets/common/emotionTags/confidence.svg';
import thinking from '../../../shared/assets/common/emotionTags/thinking.svg';

const Analysis = () => {
  const analysisData = [
    {
      id: 1,
      icon: confidence,
      title: '확신',
      count: '2회',
      desc: '확신을 가지고 진행한 거래에서 평균 +8.5%의 수익률을 기록했습니다. 자신감 있는 판단이 좋은 결과로 이어졌어요.',
    },
    {
      id: 2,
      icon: thinking,
      title: '고민',
      count: '1회',
      desc: '고민하며 진행한 거래는 +3.2%의 수익을 냈지만, 더 신중한 분석 후 결정하는 것이 도움될 수 있습니다.',
    },
  ];

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex items-center gap-2">
        <img src={emotion} alt="emotion" />
        <span className="text-[12px] font-[700]">감정 분석</span>
      </div>

      {analysisData.map((item) => (
        <div key={item.id} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={item.icon} alt={item.title} />
              <span className="text-[12px] font-[700]">{item.title}</span>
            </div>
            <span className="text-[12px] font-[700] text-black">{item.count}</span>
          </div>
          <p className="p-3 text-[12px] font-[400] text-black">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Analysis;
