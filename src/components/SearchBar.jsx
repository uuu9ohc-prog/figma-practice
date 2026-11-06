import { useState } from 'react'
import searchIcon from '../assets/icons/search.svg'
import './SearchBar.css'

/*
 * 통합검색창 (Figma 노드 95-2172)
 * - Figma 상태 3개를 CSS로 표현
 *   기본검색: 빈 칸 + 회색 안내 문구 / 호버: 마우스를 올리면 회색 배경 / 검색: 입력한 글자를 굵게
 * - <form>으로 감싸서 Enter 키를 누르거나 돋보기 버튼을 누르면 검색됨
 *
 * props
 * - defaultValue: 처음에 보여줄 검색어 (검색 결과 화면에서 URL의 q 값을 넣을 때 사용)
 * - onSearch: 검색할 때 호출할 함수, 입력한 검색어를 넘겨줌
 */
function SearchBar({ defaultValue = '', onSearch }) {
  // 입력칸에 적힌 글자를 기억하는 state
  const [keyword, setKeyword] = useState(defaultValue)

  function handleSubmit(event) {
    // form 기본 동작(페이지 새로고침)을 막음
    event.preventDefault()

    // 앞뒤 공백을 지우고, 비어 있으면 검색하지 않음
    const trimmed = keyword.trim()
    if (trimmed === '') return

    if (onSearch) onSearch(trimmed)
  }

  return (
    // role="search": 화면낭독기에 "검색 영역"이라고 알려줌
    <form className="search-bar" role="search" onSubmit={handleSubmit}>
      <input
        className="search-bar__input"
        type="search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="검색어를 입력해주세요"
        // 안내 문구는 입력하면 사라지므로, 이름표(aria-label)를 따로 붙임
        aria-label="통합자료검색"
      />
      <button className="search-bar__button" type="submit" aria-label="검색">
        {/* 버튼에 aria-label이 있으므로 아이콘은 alt를 비워 중복으로 읽지 않게 함 */}
        <img className="search-bar__icon" src={searchIcon} alt="" />
      </button>
    </form>
  )
}

export default SearchBar
