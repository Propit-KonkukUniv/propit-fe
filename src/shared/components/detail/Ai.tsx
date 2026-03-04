import ai from '../../../shared/assets/common/ai.svg';
import boomup from '../../../shared/assets/common/boomup.svg';
import point from '../../../shared/assets/daily/point.svg';
import caution from '../../../shared/assets/daily/caution.svg';

const Ai = () => {
  const insights = [
    {
      icon: boomup,
      title: '강점 패턴',
      content: '장기 보유(7일 이상) 종목의 수익률이 단기 거래 대비 15% 높습니다.',
    },
    {
      icon: point,
      title: '개선 포인트',
      content: "'불안' 감정 상태에서의 손절매 타이밍이 다소 늦은 경향이 있습니다.",
    },
    {
      icon: caution,
      title: '주의사항',
      content: '최근 3일간 오후 2-3시 사이 거래에서 손실이 많았습니다.',
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-5">
      <div className="mb-2 flex items-center gap-2">
        <img src={ai} alt="ai" />
        <span className="text-[12px] font-[700]">AI 인사이트</span>
      </div>

      {insights.map((item, idx) => (
        <div key={idx} className="flex gap-3">
          <img src={item.icon} alt={item.title} className="mt-0.5 h-5 w-5" />
          <div className="flex flex-col gap-1">
            <p className="text-[12px] font-[700]">{item.title}</p>
            <p className="text-[12px] font-[400] leading-snug text-black">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ai;
