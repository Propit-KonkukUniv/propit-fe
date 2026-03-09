interface ConfirmModalProps {
  isOpen: boolean;
  title?: string; // 제목은 필요 없을 수도 있으니 선택적(optional)으로!
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    // 배경 Overlay
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm"
      onClick={onCancel} // 배경 클릭 시 닫힘
    >
      {/* 모달 창 (이벤트 전파 방지로 창 내부 클릭 시 안 닫히게 설정) */}
      <div
        className="flex w-full max-w-[320px] flex-col rounded-[16px] bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 텍스트 영역 */}
        <div className="mb-6 flex flex-col gap-2 text-center">
          {title && <h2 className="text-[18px] font-bold text-gray-900">{title}</h2>}
          <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-gray-600">{message}</p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-3">
          <button
            className="flex-1 rounded-[10px] bg-[#646BFA] py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#5259e8]"
            onClick={onConfirm}
          >
            예
          </button>
          <button
            className="flex-1 rounded-[10px] bg-gray-100 py-3 text-[15px] font-semibold text-gray-600 transition-colors hover:bg-gray-200"
            onClick={onCancel}
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
