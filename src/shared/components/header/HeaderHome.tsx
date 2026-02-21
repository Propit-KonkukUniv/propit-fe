import menuIcon from '../../assets/common/menuIcon.svg';
const Header = () => {
  return (
    <div className="flex flex-row">
      <img src={menuIcon} alt="menu icon" />
      <span className="text-[16px] font-[700]">Propit</span>
    </div>
  );
};

export default Header;
