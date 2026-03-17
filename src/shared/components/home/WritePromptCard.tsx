interface WritePromptCardProps {
  todayLabel: string;
  calendarIconSrc: string;
  onWrite: () => void;
}

const WritePromptCard = ({ todayLabel, calendarIconSrc, onWrite }: WritePromptCardProps) => {
  return (
    <div className="flex items-center justify-between gap-4 p-5">
      <div className="flex items-center gap-3">
        <img src={calendarIconSrc} alt="calender" className="h-6 w-6" />
        <div className="flex flex-col gap-1">
          <p className="text-[14px] font-bold text-black">{todayLabel}</p>
          <p className="text-[12px] text-gray-500">오늘의 매매를 기록하지 않았어요!</p>
        </div>
      </div>

      <button
        onClick={onWrite}
        className="h-[36px] shrink-0 rounded-full bg-[#646BFA] px-4 text-[12px] font-bold text-white shadow-sm transition active:scale-[0.98]"
      >
        매매 기록하기
      </button>
    </div>
  );
};

export default WritePromptCard;

