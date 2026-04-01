interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="flex w-full max-w-[320px] flex-col rounded-[16px] bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex flex-col gap-2 text-center">
          {title && <h2 className="text-[18px] font-bold text-gray-900">{title}</h2>}
          <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-gray-600">{message}</p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 rounded-[10px] bg-[#646BFA] py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#5259e8]"
            onClick={onConfirm}
          >
            예
          </button>
          <button
            type="button"
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
