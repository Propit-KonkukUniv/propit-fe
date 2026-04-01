import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '../../shared/components/box/Box';
import Header from '../../shared/components/header/Header';
import ConfirmModal from '../../shared/components/modal/ConfirmModal';
import WriteForm from '../../shared/components/write/WriteForm';
import { createTradeLog, type TradeLogRequest } from '../../shared/apis/tradelog/tradelogApi';

const INITIAL_TRADE_LOG_REQUEST: TradeLogRequest = {
  sellDate: '',
  stockName: '',
  sectorName: '',
  buyPrice: 0,
  sellPrice: 0,
  quantity: 0,
  holdingDays: 0,
  reason: '',
  emotionTags: [],
};

const parseEmotionTags = (value: string): string[] => {
  return value
    .split(/\s+/)
    .map((tag) => tag.replace(/^#+/, '').trim())
    .filter((tag) => tag.length > 0);
};

const getHoldingDays = (buyDate: string, sellDate: string): number => {
  if (!buyDate || !sellDate) {
    return 0;
  }

  const startDate = new Date(buyDate);
  const endDate = new Date(sellDate);
  const diffTime = endDate.getTime() - startDate.getTime();

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const getDateError = (buyDate: string, sellDate: string): string => {
  if (!buyDate || !sellDate) {
    return '';
  }

  return getHoldingDays(buyDate, sellDate) < 0
    ? '매수일은 매도일보다 늦을 수 없습니다.'
    : '';
};

const Write = () => {
  const navigate = useNavigate();

  const [tradeLogRequest, setTradeLogRequest] = useState<TradeLogRequest>(INITIAL_TRADE_LOG_REQUEST);
  const [buyDate, setBuyDate] = useState('');
  const [emotionTagInput, setEmotionTagInput] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const holdingDays = Math.max(0, getHoldingDays(buyDate, tradeLogRequest.sellDate));
  const dateError = getDateError(buyDate, tradeLogRequest.sellDate);

  const handleTradeLogRequestChange = <K extends keyof TradeLogRequest>(
    field: K,
    value: TradeLogRequest[K]
  ) => {
    setTradeLogRequest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEmotionTagInputChange = (value: string) => {
    setEmotionTagInput(value);
    handleTradeLogRequestChange('emotionTags', parseEmotionTags(value));
  };

  const validateTradeLogRequest = (): boolean => {
    if (!tradeLogRequest.sellDate) {
      alert('매도일을 입력해 주세요.');
      return false;
    }

    if (!tradeLogRequest.stockName.trim()) {
      alert('종목명을 입력해 주세요.');
      return false;
    }

    if (!tradeLogRequest.sectorName.trim()) {
      alert('업종명을 입력해 주세요.');
      return false;
    }

    if (tradeLogRequest.buyPrice <= 0 || tradeLogRequest.sellPrice <= 0) {
      alert('매수가와 매도가는 0보다 크게 입력해 주세요.');
      return false;
    }

    if (tradeLogRequest.quantity <= 0) {
      alert('수량을 입력해 주세요.');
      return false;
    }

    if (!buyDate) {
      alert('매수일을 입력해 주세요.');
      return false;
    }

    if (dateError) {
      alert(dateError);
      return false;
    }

    if (!tradeLogRequest.reason.trim()) {
      alert('매매 이유를 입력해 주세요.');
      return false;
    }

    return true;
  };

  const handleSaveClick = () => {
    if (!validateTradeLogRequest()) {
      return;
    }

    setIsConfirmModalOpen(true);
  };

  const handleConfirmSave = async () => {
    setIsConfirmModalOpen(false);
    setIsSubmitting(true);

    try {
      const payload: TradeLogRequest = {
        ...tradeLogRequest,
        holdingDays,
      };

      const response = await createTradeLog(payload);

      if (!response.success) {
        alert(response.message || '매매 기록 저장에 실패했습니다.');
        return;
      }

      navigate('/daily');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { message?: string } | undefined)?.message ??
          '매매 기록 저장 중 오류가 발생했습니다.';
        alert(message);
      } else {
        alert('매매 기록 저장 중 오류가 발생했습니다.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="min-h-screen w-full bg-[#F8F9FA] pb-10">
        <Header pageName="Write" />
        <div className="flex flex-col gap-5 px-5 pt-6">
          <section className="pl-[2px]">
            <p className="text-[12px] font-medium text-gray-500">기록이 쌓일수록 판단이 선명해져요</p>
            <h1 className="mt-1 text-[18px] font-bold">매매 기록하기</h1>
          </section>

          <Box>
            <WriteForm
              tradeLogRequest={tradeLogRequest}
              buyDate={buyDate}
              holdingDays={holdingDays}
              dateError={dateError}
              emotionTagInput={emotionTagInput}
              onTradeLogRequestChange={handleTradeLogRequestChange}
              onBuyDateChange={setBuyDate}
              onEmotionTagInputChange={handleEmotionTagInputChange}
            />
          </Box>

          <button
            type="button"
            onClick={handleSaveClick}
            disabled={isSubmitting}
            className="mt-2 h-[60px] w-full rounded-[12px] bg-[#646BFA] text-[18px] font-bold text-white shadow-lg transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#B8BCFF] disabled:shadow-none"
          >
            {isSubmitting ? '저장 중...' : '저장하기'}
          </button>
        </div>
      </main>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title="매매일지 저장"
        message="저장하시겠습니까?"
        onConfirm={handleConfirmSave}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </>
  );
};

export default Write;
