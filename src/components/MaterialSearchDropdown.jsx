import arrowIcon from '../assets/icons/dropdown-arrow.svg'
import arrowBlueIcon from '../assets/icons/dropdown-arrow-blue.svg'
import './MaterialSearchDropdown.css'

/*
 * MaterialSearchDropdown: 자료검색 펼침 버튼 (Figma 「자료검색」 603-1667, Property 1 = 기본 / 호버 / 클릭)
 * - "통합자료검색 ▼" 모양, 눌러서 하위 목록을 펼치고 접는 버튼
 * - 기본: 회색 글자 + 회색 ▼
 *   호버: 진한 파랑 글자 + 파랑 ▼ + 글자 아래 진한 파랑 선 → CSS로 표현
 *   클릭(펼쳐진 상태): 호버 모양 + 연한 회색 배경 → isExpanded 값으로 표현
 * - Figma에서 같은 이름의 링크(603-1662)와 구분하려고 코드 이름을 다르게 지음
 * - aria-expanded: 펼쳐졌는지 화면낭독기에 알려줌
 *
 * props
 * - text: 버튼 글자 (기본값 '통합자료검색')
 * - isExpanded: 펼쳐진 상태인지 여부 (Figma 「클릭」)
 * - onClick: 눌렀을 때 실행할 함수 (펼치기/접기)
 * - controlsId: 펼쳐지는 목록의 id (화면낭독기 연결용, 선택)
 */
function MaterialSearchDropdown({ text = '통합자료검색', isExpanded = false, onClick, controlsId }) {
  return (
    <button
      className="material-search-dropdown"
      type="button"
      onClick={onClick}
      aria-expanded={isExpanded}
      aria-controls={controlsId}
    >
      <span className="material-search-dropdown__text">{text}</span>
      {/* 기본·파랑 화살표를 둘 다 넣고 CSS로 상태에 맞는 것만 보여줌 */}
      <span className="material-search-dropdown__icon-box" aria-hidden="true">
        <img className="material-search-dropdown__icon material-search-dropdown__icon--default" src={arrowIcon} alt="" />
        <img className="material-search-dropdown__icon material-search-dropdown__icon--active" src={arrowBlueIcon} alt="" />
      </span>
    </button>
  )
}

export default MaterialSearchDropdown
