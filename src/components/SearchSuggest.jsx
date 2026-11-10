import { useId, useState } from 'react'
import searchIcon from '../assets/icons/search.svg'
import searchWhiteIcon from '../assets/icons/search-white.svg'
import './SearchSuggest.css'

// 추천 검색어를 최대 몇 개까지 보여줄지
const MAX_SUGGESTIONS = 5

/*
 * SearchSuggest: 검색 추천 (Figma 「검색 추천」 603-1731, Property 1 = 기본검색 / 호버 / 검색)
 * - 검색창 모양은 SearchBar와 같고, 여기에 자동완성(연관 제안어) 목록이 추가됨 (REQ-SCH)
 * - 글자를 입력하면 그 글자가 들어간 추천 검색어가 아래에 뜸
 * - 키보드: ↓↑ 로 추천어 이동, Enter 로 선택/검색, Esc 로 목록 닫기
 * - 추천 목록 모양은 Figma에 없어서 기존 토큰으로 최소한만 꾸밈
 *
 * props
 * - suggestions: 추천 검색어 후보 배열 (src/data/searchSuggestions.js)
 * - defaultValue: 처음에 보여줄 검색어 (검색 결과 화면에서 URL의 q 값)
 * - onSearch: 검색할 때 호출할 함수, 검색어를 넘겨줌
 * - formId: 검색 form의 id (검색창 밖의 [검색] 버튼에 form={formId}를 주면 그 버튼으로도 검색됨, 선택)
 * - variant: 'default'(네모 회색 테두리) 또는 'main'(메인 화면 「검색창」 204-3737: 파란 둥근 테두리 + 파란 동그라미 버튼)
 */
function SearchSuggest({ suggestions, defaultValue = '', onSearch, variant = 'default', formId }) {
  // 입력칸에 적힌 글자
  const [keyword, setKeyword] = useState(defaultValue)
  // 추천 목록을 보여줄지 여부
  const [isOpen, setIsOpen] = useState(false)
  // 키보드로 고른 추천어 순서 (-1 = 아무것도 안 고름)
  const [activeIndex, setActiveIndex] = useState(-1)

  // 화면낭독기 연결용 고유 id (같은 컴포넌트를 여러 번 써도 겹치지 않게)
  const listId = useId()

  // 입력한 글자가 들어간 추천어만 골라냄 (중복 제거, 최대 5개)
  const trimmed = keyword.trim()
  const matched =
    trimmed === ''
      ? []
      : [...new Set(suggestions)].filter((word) => word.includes(trimmed)).slice(0, MAX_SUGGESTIONS)
  const showList = isOpen && matched.length > 0

  // 검색 실행: 목록을 닫고 부모에게 검색어를 넘김
  function search(word) {
    const value = word.trim()
    if (value === '') return

    setKeyword(value)
    setIsOpen(false)
    setActiveIndex(-1)
    if (onSearch) onSearch(value)
  }

  function handleChange(event) {
    setKeyword(event.target.value)
    setIsOpen(true)
    setActiveIndex(-1)
  }

  // 키보드 조작: ↓ ↑ Enter Esc
  function handleKeyDown(event) {
    if (event.key === 'ArrowDown' && matched.length > 0) {
      event.preventDefault() // 커서가 글자 끝으로 튀는 것 방지
      setIsOpen(true)
      setActiveIndex((prev) => (prev + 1) % matched.length)
    } else if (event.key === 'ArrowUp' && matched.length > 0) {
      event.preventDefault()
      setIsOpen(true)
      setActiveIndex((prev) => (prev <= 0 ? matched.length - 1 : prev - 1))
    } else if (event.key === 'Escape') {
      setIsOpen(false)
      setActiveIndex(-1)
    }
  }

  function handleSubmit(event) {
    // form 기본 동작(페이지 새로고침)을 막음
    event.preventDefault()
    // 키보드로 고른 추천어가 있으면 그걸로, 없으면 입력한 글자로 검색
    if (showList && activeIndex >= 0) {
      search(matched[activeIndex])
    } else {
      search(keyword)
    }
  }

  return (
    // role="search": 화면낭독기에 "검색 영역"이라고 알려줌
    <form id={formId} className={`search-suggest search-suggest--${variant}`} role="search" onSubmit={handleSubmit}>
      <div className="search-suggest__box">
        <input
          className="search-suggest__input"
          type="search"
          value={keyword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          // 다른 곳을 누르면 목록을 닫음
          onBlur={() => setIsOpen(false)}
          placeholder="검색어를 입력해주세요"
          aria-label="통합자료검색"
          // combobox: "입력칸 + 추천 목록" 묶음이라고 화면낭독기에 알려줌
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-controls={listId}
          aria-activedescendant={showList && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          autoComplete="off"
        />
        <button className="search-suggest__button" type="submit" aria-label="검색">
          {/* main 모양은 파란 버튼 위 흰 돋보기 */}
          <img className="search-suggest__icon" src={variant === 'main' ? searchWhiteIcon : searchIcon} alt="" />
        </button>
      </div>

      {/* 추천 검색어 목록 (보일 때만 그림) */}
      <ul className="search-suggest__list" id={listId} role="listbox" aria-label="추천 검색어" hidden={!showList}>
        {matched.map((word, index) => (
          <li
            key={word}
            id={`${listId}-${index}`}
            className={`search-suggest__option ${index === activeIndex ? 'search-suggest__option--active' : ''}`}
            role="option"
            aria-selected={index === activeIndex}
            // onMouseDown + preventDefault: 누르는 순간 입력칸이 포커스를 잃어 목록이 먼저 닫히는 것 방지
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => search(word)}
          >
            {word}
          </li>
        ))}
      </ul>
    </form>
  )
}

export default SearchSuggest
