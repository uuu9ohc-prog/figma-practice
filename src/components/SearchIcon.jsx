import searchIcon from '../assets/icons/search-44.svg'
import searchHoverIcon from '../assets/icons/search-44-hover.svg'
import './IconButton.css'

/*
 * SearchIcon: 검색(돋보기) 버튼 (Figma 「서치아이콘」 603-1747, Property 1 = 기본 / 호버)
 * - 호버 그림(회색 배경 포함)을 따로 넣고 CSS로 바꿔 보여줌
 * - 기존 SearchBar의 돋보기(23px)와는 다른 44px 아이콘 버튼
 *
 * props
 * - onClick: 눌렀을 때 실행할 함수
 * - type: 버튼 종류 ('button' 기본, form 안에서 검색 실행용이면 'submit')
 */
function SearchIcon({ onClick, type = 'button' }) {
  return (
    <button className="icon-button" type={type} onClick={onClick} aria-label="검색">
      <img className="icon-button__icon icon-button__icon--default" src={searchIcon} alt="" />
      <img className="icon-button__icon icon-button__icon--hover" src={searchHoverIcon} alt="" />
    </button>
  )
}

export default SearchIcon
