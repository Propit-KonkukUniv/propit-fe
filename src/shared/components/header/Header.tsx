import menuIcon from '../../assets/common/menuIcon.svg';
import rightArrow from '../../assets/common/rightArrow.svg';

interface HeaderProps {
  pageName: string;
}

const Header = ({ pageName }: HeaderProps) => {
  return (
    <header className="flex h-[56px] w-full flex-row items-center justify-between px-5">
      {/* 왼쪽 메뉴 아이콘 */}
      <button className="p-1">
        <img src={menuIcon} alt="menu icon" className="h-[24px] w-[24px]" />
      </button>

      {/* 중앙 로고 및 페이지 명 */}
      <div className="flex items-center gap-2">
        <span className="text-[18px] font-bold text-black">Propit</span>
        <img src={rightArrow} alt="right arrow" className="h-[24px] w-[24px]" />
        <span className="text-[18px] font-medium text-gray-800">{pageName}</span>
      </div>

      {/* 우측 밸런스용 빈 공간 (혹은 알림 아이콘 등 추가 가능) */}
      <div className="w-8" />
    </header>
  );
};

export default Header;
