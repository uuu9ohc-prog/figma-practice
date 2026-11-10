import { useId } from 'react'
import arrowIcon from '../assets/icons/select-arrow.svg'
import './LibrarySelect.css'

/*
 * LibrarySelect: 도서관 검색 선택 상자 (Figma 「도서관 검색01」 603-1684)
 * - 왼쪽 '도서관' 글자 + 오른쪽 [전체도서관 ▼] 선택 상자
 * - 브라우저 기본 <select>를 쓰고 겉모양만 Figma처럼 꾸밈
 *   → 키보드(↑↓), 화면낭독기, 모바일 선택 화면이 저절로 잘 동작함
 * - <label>로 '도서관' 글자와 선택 상자를 연결 → 글자를 눌러도 선택 상자로 이동
 *
 * props
 * - options: 도서관 목록 배열 ({ value, label }) (src/data/libraries.js)
 * - value: 지금 고른 도서관의 value (예: 'all')
 * - onChange: 다른 도서관을 고르면 실행할 함수, 고른 value를 넘겨줌
 * - label: 왼쪽 글자 (기본값 '도서관')
 * - hideLabel: true면 글자를 화면에서 숨김 (화면낭독기는 계속 읽음, 통합자료검색 화면처럼 글자 없는 디자인용)
 */
function LibrarySelect({ options, value, onChange, label = '도서관', hideLabel = false }) {
  // label과 select를 연결할 고유 id
  const selectId = useId()

  return (
    <div className="library-select">
      <label className={hideLabel ? 'visually-hidden' : 'library-select__label'} htmlFor={selectId}>
        {label}
      </label>

      {/* 선택 상자 + ▼ 아이콘을 겹쳐 놓기 위한 상자 */}
      <div className="library-select__box">
        <select
          id={selectId}
          className="library-select__select"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* 장식용 ▼ (누르면 아래 select가 눌리도록 CSS에서 pointer-events: none) */}
        <img className="library-select__icon" src={arrowIcon} alt="" aria-hidden="true" />
      </div>
    </div>
  )
}

export default LibrarySelect
