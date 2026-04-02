import ai from '@assets/common/ai.svg';
import sad from '@assets/statistics/sad.svg';
import smile from '@assets/statistics/smile.svg';
import type { AiAnalysis } from '../../apis/report/reportApi';

interface DeepAnalysisProps {
  aiAnalysis: AiAnalysis;
}

const DeepAnalysis = ({ aiAnalysis }: DeepAnalysisProps) => {
  const analysisItems = [
    {
      icon: smile,
      title: `${aiAnalysis.positive.emotion} 감정 패턴`,
      description: aiAnalysis.positive.description,
      insight: aiAnalysis.positive.insight,
      tone: 'bg-[#EEF2FF] text-[#4F46E5]',
      marker: '힌트',
    },
    {
      icon: sad,
      title: `${aiAnalysis.negative.emotion} 감정 패턴`,
      description: aiAnalysis.negative.description,
      insight: aiAnalysis.negative.insight,
      tone: 'bg-[#FFFBEB] text-[#D97706]',
      marker: '주의',
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-5">
      <div className="mb-2 flex items-center gap-2">
        <img src={ai} alt="ai" />
        <span className="text-[16px] font-bold">AI 심층 분석</span>
      </div>

      {analysisItems.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          className={
            index === 0 ? 'flex flex-col gap-3' : 'flex flex-col gap-3 border-t border-gray-50 pt-4'
          }
        >
          <div className="flex items-center gap-2">
            <img src={item.icon} alt={item.title} />
            <span className="text-[14px] font-bold">{item.title}</span>
          </div>
          <p className="text-[13px] leading-relaxed text-gray-600">{item.description}</p>
          <div className={`flex items-start gap-2 rounded-lg p-3 text-[12px] ${item.tone}`}>
            <span>{item.marker}</span>
            <p>{item.insight}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeepAnalysis;
