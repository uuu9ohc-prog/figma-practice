import sortIcon from '../assets/icons/sort01.svg'
import sortClickIcon from '../assets/icons/sort01-click.svg'
import './IconButton.css'

/*
 * SortIcon01: 목록형 보기 버튼 ≡ (Figma 「정렬01아이콘」 603-1626, Property 1 = 기본 / 클릭)
 * - 클릭 = 지금 선택된 보기 방식 → 회색 배경 그림으로 바뀜
 * - aria-pressed: 선택되어 있는지 화면낭독기에 알려줌 (색만으로 구분하지 않도록)
 *
 * props
 * - isSelected: 목록형 보기가 선택되어 있는지 여부
 * - onClick: 눌렀을 때 실행할 함수
 */
function SortIcon01({ isSelected = false, onClick }) {
  return (
    <button
      className="icon-button"
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      aria-label="목록형으로 보기"
    >
      <img className="icon-button__icon" src={isSelected ? sortClickIcon : sortIcon} alt="" />
    </button>
  )
}

export default SortIcon01
