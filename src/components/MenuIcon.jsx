import menuIcon from '../assets/icons/menu.svg'
import menuHoverIcon from '../assets/icons/menu-hover.svg'
import './IconButton.css'

/*
 * MenuIcon: 햄버거 메뉴 버튼 (Figma 「메뉴 아이콘」 603-1759, Property 1 = 기본 / 호버)
 * - 호버 그림(회색 배경 포함)을 따로 넣고 CSS로 바꿔 보여줌
 * - aria-expanded: 메뉴가 열려 있는지 화면낭독기에 알려줌
 *
 * props
 * - onClick: 눌렀을 때 실행할 함수 (메뉴 열기/닫기)
 * - isExpanded: 메뉴가 열려 있는지 여부
 */
function MenuIcon({ onClick, isExpanded = false }) {
  return (
    <button
      className="icon-button"
      type="button"
      onClick={onClick}
      aria-expanded={isExpanded}
      aria-label={isExpanded ? '전체 메뉴 닫기' : '전체 메뉴 열기'}
    >
      <img className="icon-button__icon icon-button__icon--default" src={menuIcon} alt="" />
      <img className="icon-button__icon icon-button__icon--hover" src={menuHoverIcon} alt="" />
    </button>
  )
}

export default MenuIcon
