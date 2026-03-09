import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../modal/ConfirmModal';

interface NavProps {
  isOpen: boolean;
  onClose: () => void;
}

const Nav = ({ isOpen, onClose }: NavProps) => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // 로그아웃 모달 상태 관리

  // 네비게이션이 열렸을 때 뒷배경 스크롤 방지
  useEffect(() => {
    if (isOpen || isLogoutModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isLogoutModalOpen]);

  // 페이지 이동 함수 (경로만 입력하면 돼!)
  const handleNavigate = (path: string) => {
    // 여기에 react-router-dom의 useNavigate() 나 next/router 등을 사용해서 이동 처리
    navigate(path);
    onClose(); // 이동 후 네비게이션 닫기
  };

  // 로그아웃 실행 함수
  const handleLogoutConfirm = () => {
    console.log('로그아웃 완료'); // 임시 API 호출부
    setIsLogoutModalOpen(false); // 모달 닫기
    onClose(); // Nav 닫기
    navigate('/'); // 로그아웃 후 로그인 페이지로 튕겨내기
  };

  return (
    <>
      {/* 1. 배경 Overlay (어두워지고 블러 처리됨) */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={onClose}
      />

      {/* 2. 슬라이딩 사이드바 */}
      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-[260px] flex-col bg-white px-8 pt-20 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* 메뉴 리스트 */}
        <div className="flex flex-col gap-8 text-[15px] text-gray-800">
          {/* 기본 메뉴 */}
          <div className="flex flex-col gap-4">
            <button className="text-left font-medium transition-colors hover:text-[#646BFA]">
              홈
            </button>
            <button
              className="text-left font-medium transition-colors hover:text-[#646BFA]"
              onClick={() => handleNavigate('/write')}
            >
              매매 기록하기
            </button>
          </div>

          {/* AI 카테고리 */}
          <div className="flex flex-col gap-4">
            <span className="text-[18px] font-bold text-black">AI</span>
            <button
              className="text-left transition-colors hover:text-[#646BFA]"
              onClick={() => handleNavigate('/daily')}
            >
              데일리 리포트
            </button>
            <button
              className="text-left transition-colors hover:text-[#646BFA]"
              onClick={() => handleNavigate('/statistics')}
            >
              누적 리포트
            </button>
          </div>

          {/* MY 카테고리 */}
          <div className="flex flex-col gap-4">
            <span className="text-[18px] font-bold text-black">MY</span>
            <button className="text-left transition-colors hover:text-[#646BFA]">
              이전 일지 보기
            </button>
            <button className="text-left transition-colors hover:text-[#646BFA]">
              트레이더 칭호
            </button>
            <button className="text-left transition-colors hover:text-[#646BFA]">
              루틴 등록하기
            </button>
          </div>
        </div>

        {/* 로그아웃 (flex-col과 mt-auto를 써서 맨 아래로 밀어냄) */}
        <div className="mb-12 mt-auto">
          <button
            className="text-left font-medium text-gray-700 transition-colors hover:text-red-500"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            로그아웃
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title="로그아웃"
        message="정말 로그아웃 하시겠습니까?"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
};

export default Nav;
