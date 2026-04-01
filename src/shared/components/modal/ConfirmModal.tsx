import { useEffect, useId, useRef } from 'react';

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
  const titleId = useId();
  const descriptionId = useId();
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    confirmButtonRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={descriptionId}
        className="flex w-full max-w-[320px] flex-col rounded-[16px] bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex flex-col gap-2 text-center">
          {title && (
            <h2 id={titleId} className="text-[18px] font-bold text-gray-900">
              {title}
            </h2>
          )}
          <p id={descriptionId} className="whitespace-pre-wrap text-[15px] leading-relaxed text-gray-600">
            {message}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            ref={confirmButtonRef}
            type="button"
            className="flex-1 rounded-[10px] bg-[#646BFA] py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#5259e8] focus:outline-none focus:ring-2 focus:ring-[#646BFA] focus:ring-offset-2"
            onClick={onConfirm}
          >
            예
          </button>
          <button
            type="button"
            className="flex-1 rounded-[10px] bg-gray-100 py-3 text-[15px] font-semibold text-gray-600 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
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
