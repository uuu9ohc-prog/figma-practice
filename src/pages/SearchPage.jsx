import { useState } from 'react'
import { useSearchParams } from 'react-router'
import LibrarySelect from '../components/LibrarySelect.jsx'
import PageTitle from '../components/PageTitle.jsx'
import PopularKeywords from '../components/PopularKeywords.jsx'
import SearchResults from '../components/SearchResults.jsx'
import SearchSuggest from '../components/SearchSuggest.jsx'
import books from '../data/books.js'
import libraries from '../data/libraries.js'
import popularKeywords from '../data/popularKeywords.js'
import rooms from '../data/rooms.js'
import searchSuggestions from '../data/searchSuggestions.js'
import './SearchPage.css'

/*
 * SearchPage: 통합자료검색 + 검색 결과 (Figma 「검색」 204-3861, 「검색결과」 204-3894)
 * - 위: 제목줄(통합자료검색) → 회색 영역 [인기 검색어 ▼] [검색창] [전체 도서관▼] [전체 자료실▼] → [검색]
 * - 주소에 검색어(q)가 있으면 아래에 검색 결과를 보여줌 (예: /search?q=폭풍)
 *   → 결과 화면에서도 입력한 검색어가 검색창에 그대로 남아 있음 (REQ-SCH)
 * - 검색 조건(도서관 lib, 자료실 room)도 주소에 함께 넣어서, 뒤로가기·새로고침해도 같은 결과가 나옴
 *
 * props (App에서 받는 예약·관심도서 상태)
 * - reservedIds / interestIds: 예약한 책 id 배열 / 관심도서 책 id 배열
 * - onReserve / onToggleInterest: 예약 / 관심담기 때 실행할 함수 (책 id를 넘겨줌)
 */

// 검색창 form과 아래쪽 [검색] 버튼을 연결하는 id
const SEARCH_FORM_ID = 'search-page-form'

function SearchPage({ reservedIds, interestIds, onReserve, onToggleInterest }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('q') ?? ''
  const appliedLibrary = searchParams.get('lib') ?? 'all'
  const appliedRoom = searchParams.get('room') ?? 'all'

  // 선택 상자에서 고른 도서관·자료실 (검색을 눌러야 적용)
  const [library, setLibrary] = useState(appliedLibrary)
  const [room, setRoom] = useState(appliedRoom)

  // 검색: 주소의 q·lib·room 값을 바꿈 → 화면이 그 값으로 다시 그려짐
  function handleSearch(word) {
    setSearchParams({ q: word, lib: library, room })
  }

  // 검색어가 제목·지은이·출판 정보에 들어 있고, 도서관·자료실 조건에 맞는 책만 고름
  const results = books.filter((book) => {
    const text = `${book.title} ${book.author} ${book.publishInfo}`
    const matchKeyword = text.includes(keyword.trim())
    const matchLibrary = appliedLibrary === 'all' || book.libraryValue === appliedLibrary
    const matchRoom = appliedRoom === 'all' || book.roomValue === appliedRoom
    return matchKeyword && matchLibrary && matchRoom
  })

  return (
    <div className="search-page">
      <PageTitle />

      {/* 회색 검색 영역 */}
      <div className="search-page__form-area">
        <div className="search-page__inner">
          <div className="search-page__fields">
            <PopularKeywords keywords={popularKeywords} onSelect={handleSearch} />
            {/* key={keyword}: 주소의 검색어가 바뀌면(인기 검색어 클릭 등) 검색창 글자도 새로 맞춤 */}
            <SearchSuggest
              key={keyword}
              suggestions={searchSuggestions}
              defaultValue={keyword}
              onSearch={handleSearch}
              formId={SEARCH_FORM_ID}
            />
          </div>
        </div>
      </div>

      {/* 도서관별 검색 (Figma: 회색 영역 아래쪽, 아래 구분선) */}
      <div className="search-page__filters">
        <LibrarySelect label="도서관" hideLabel options={libraries} value={library} onChange={setLibrary} />
        <LibrarySelect label="자료실" hideLabel options={rooms} value={room} onChange={setRoom} />
      </div>

      {/* form 속성: 이 버튼이 위쪽 검색창 form을 제출 (Enter·돋보기와 같은 검색) */}
      <div className="search-page__submit-area">
        <button className="search-page__submit" type="submit" form={SEARCH_FORM_ID}>
          검색
        </button>
      </div>

      {/* 검색어가 있을 때만 결과 표시. key: 검색 조건이 바뀌면 정렬·페이지를 처음으로 */}
      {keyword !== '' && (
        <div className="search-page__results">
          <SearchResults
            key={searchParams.toString()}
            keyword={keyword}
            books={results}
            alternatives={popularKeywords.slice(0, 5)}
            onSearch={handleSearch}
            reservedIds={reservedIds}
            interestIds={interestIds}
            onReserve={onReserve}
            onToggleInterest={onToggleInterest}
          />
        </div>
      )}
    </div>
  )
}

export default SearchPage
