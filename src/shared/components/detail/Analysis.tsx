import emotion from '../../../shared/assets/daily/emotion.svg';
import type { EmotionAnalysis } from '../../apis/report/reportApi';

interface AnalysisProps {
  emotionAnalysis: EmotionAnalysis[];
}

const Analysis = ({ emotionAnalysis }: AnalysisProps) => {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex items-center gap-2">
        <img src={emotion} alt="emotion" />
        <span className="text-[12px] font-[700]">감정 분석</span>
      </div>

      {emotionAnalysis.map((item) => (
        <div key={`${item.emotion}-${item.count}`} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-[700]">{item.emotion}</span>
            </div>
            <span className="text-[12px] font-[700] text-black">{item.count}회</span>
          </div>
          <p className="rounded-[12px] bg-[#F9FAFB] p-3 text-[12px] font-[400] leading-relaxed text-black">
            {item.analysis}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Analysis;
