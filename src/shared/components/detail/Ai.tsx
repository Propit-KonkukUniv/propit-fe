import ai from '../../../shared/assets/common/ai.svg';
import boomup from '../../../shared/assets/common/boomup.svg';
import caution from '../../../shared/assets/daily/caution.svg';
import point from '../../../shared/assets/daily/point.svg';
import type { AiInsight } from '../../apis/report/reportApi';

interface AiProps {
  aiInsight: AiInsight;
}

const Ai = ({ aiInsight }: AiProps) => {
  const insights = [
    {
      icon: boomup,
      title: '강점 패턴',
      content: aiInsight.strengthPattern,
    },
    {
      icon: point,
      title: '개선 포인트',
      content: aiInsight.improvementPoint,
    },
    {
      icon: caution,
      title: '주의 사항',
      content: aiInsight.cautionTime,
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-5">
      <div className="mb-2 flex items-center gap-2">
        <img src={ai} alt="ai" />
        <span className="text-[12px] font-[700]">AI 인사이트</span>
      </div>

      {insights.map((item) => (
        <div key={item.title} className="flex gap-3">
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
