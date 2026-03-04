import ai from '@assets/common/ai.svg';
import smile from '@assets/statistics/smile.svg';
import sad from '@assets/statistics/sad.svg';

const DeepAnalysis = () => {
  return (
    <div className="flex flex-col gap-6 p-5">
      <div className="mb-2 flex items-center gap-2">
        <img src={ai} alt="ai" />
        <span className="text-[16px] font-bold">AI 심층 분석</span>
      </div>

      {/* 확신 패턴 */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <img src={smile} alt="smile" />
          <span className="text-[14px] font-bold">확신 감정 패턴</span>
        </div>
        <p className="text-[13px] leading-relaxed text-gray-600">
          확신을 갖고 거래한 45건 중 73%가 수익을 냈습니다. 특히 기술주 종목에서 높은 수익률을
          기록했어요.
        </p>
        <div className="flex items-start gap-2 rounded-lg bg-[#EEF2FF] p-3 text-[12px] text-[#4F46E5]">
          <span>💡</span>
          <p>확신 있는 판단 시 장기 보유(10일 이상)했을 때 수익률이 2배 이상 높았습니다.</p>
        </div>
      </div>

      {/* 불안 패턴 */}
      <div className="flex flex-col gap-3 border-t border-gray-50 pt-4">
        <div className="flex items-center gap-2">
          <img src={sad} alt="sad" />
          <span className="text-[14px] font-bold">불안 감정 패턴</span>
        </div>
        <p className="text-[13px] leading-relaxed text-gray-600">
          불안한 상태에서 거래한 18건 중 61%가 손실을 봤습니다. 평균 보유 기간도 2.3일로 매우
          짧았어요.
        </p>
        <div className="flex items-start gap-2 rounded-lg bg-[#FFFBEB] p-3 text-[12px] text-[#D97706]">
          <span>⚠️</span>
          <p>불안할 때는 거래를 하루 미루고 재검토하는 것이 도움될 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default DeepAnalysis;
