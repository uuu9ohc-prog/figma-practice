import { useNavigate } from 'react-router'
import { useState } from 'react'
import BookSet from './BookSet.jsx'
import LibrarySelect from './LibrarySelect.jsx'
import Pagination from './Pagination.jsx'
import './SearchResults.css'

/*
 * SearchResults: 검색 결과 (Figma 「검색결과」 204-3931)
 * - 위: 총 건수(REQ-SCH-003) + [정확도순▼] [내림차순▼] [5건▼] [확인]
 * - 가운데: 책 목록 (BookSet 재사용)
 * - 아래: 구분선 + 페이지 번호 (Pagination)
 * - 결과가 없으면: 안내 + 대안 검색어(인기 검색어) 버튼 (REQ-SCH-004)
 * - 정렬·개수는 선택만 하고 「확인」을 눌러야 적용됨 (Figma 버튼 구성 그대로)
 *
 * props
 * - keyword: 검색어
 * - books: 검색 조건에 맞는 책 배열
 * - alternatives: 결과가 없을 때 보여줄 대안 검색어 배열
 * - onSearch: 대안 검색어를 눌렀을 때 실행할 함수
 * - reservedIds / interestIds: 예약한 책 id 배열 / 관심도서 책 id 배열
 * - onReserve / onToggleInterest: 예약 / 관심담기 때 실행할 함수 (책 id를 넘겨줌)
 */

const SORT_OPTIONS = [
  { value: 'accuracy', label: '정확도순' },
  { value: 'year', label: '출판년도순' },
]

const ORDER_OPTIONS = [
  { value: 'desc', label: '내림차순' },
  { value: 'asc', label: '오름차순' },
]

const SIZE_OPTIONS = [
  { value: '5', label: '5건' },
  { value: '10', label: '10건' },
]

function SearchResults({
  keyword,
  books,
  alternatives,
  onSearch,
  reservedIds,
  interestIds,
  onReserve,
  onToggleInterest,
}) {
  const navigate = useNavigate()

  // 선택 상자에서 고른 값 (아직 적용 전)
  const [draft, setDraft] = useState({ sort: 'accuracy', order: 'desc', size: '5' })
  // 「확인」을 눌러 실제로 적용된 값
  const [applied, setApplied] = useState(draft)
  // 지금 보고 있는 페이지
  const [page, setPage] = useState(1)

  // 정렬: 정확도순은 원래 순서(내림차순), 출판년도순은 최신이 먼저(내림차순)
  const sorted = [...books]
  if (applied.sort === 'year') sorted.sort((a, b) => b.year - a.year)
  if (applied.order === 'asc') sorted.reverse()

  // 페이지 나누기
  const size = Number(applied.size)
  const totalPages = Math.max(1, Math.ceil(sorted.length / size))
  const pageBooks = sorted.slice((page - 1) * size, page * size)

  // 「확인」: 고른 정렬·개수를 적용하고 1페이지로
  function handleApply() {
    setApplied(draft)
    setPage(1)
  }

  // 예약 확정: 예약을 저장하고 예약 완료 화면으로 이동
  function handleReserve(bookId) {
    onReserve(bookId)
    navigate('/reservations', { state: { notice: 'reserved' } })
  }

  // ===== 결과가 없을 때 =====
  if (books.length === 0) {
    return (
      <section className="search-results search-results--empty" aria-labelledby="search-results-title">
        <h2 className="search-results__empty-title" id="search-results-title">
          ‘{keyword}’에 대한 검색 결과가 없습니다.
        </h2>
        <p className="search-results__empty-text">
          검색어의 철자를 확인하거나, 도서관·자료실을 ‘전체’로 바꿔 보세요. 이런 검색어는 어떠세요?
        </p>
        <ul className="search-results__alternatives" role="list">
          {alternatives.map((word) => (
            <li key={word}>
              <button className="search-results__alternative" type="button" onClick={() => onSearch(word)}>
                {word}
              </button>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  // ===== 결과가 있을 때 =====
  return (
    <section className="search-results" aria-labelledby="search-results-title">
      <div className="search-results__top">
        {/* 총 건수 (REQ-SCH-003). role="status": 검색할 때마다 화면낭독기가 건수를 읽어줌 */}
        <h2 className="search-results__count" id="search-results-title" role="status">
          ‘{keyword}’ 검색 결과 총 <strong>{books.length}</strong>건
        </h2>

        <div className="search-results__controls">
          <LibrarySelect
            label="정렬 기준"
            hideLabel
            options={SORT_OPTIONS}
            value={draft.sort}
            onChange={(value) => setDraft({ ...draft, sort: value })}
          />
          <LibrarySelect
            label="정렬 순서"
            hideLabel
            options={ORDER_OPTIONS}
            value={draft.order}
            onChange={(value) => setDraft({ ...draft, order: value })}
          />
          <LibrarySelect
            label="한 페이지에 보여줄 개수"
            hideLabel
            options={SIZE_OPTIONS}
            value={draft.size}
            onChange={(value) => setDraft({ ...draft, size: value })}
          />
          <button className="search-results__apply" type="button" onClick={handleApply}>
            확인
          </button>
        </div>
      </div>

      <ul className="search-results__list" role="list">
        {pageBooks.map((book) => (
          <li key={book.id}>
            <BookSet
              book={book}
              isInterested={interestIds.includes(book.id)}
              onToggleInterest={() => onToggleInterest(book.id)}
              isReserved={reservedIds.includes(book.id)}
              onReserve={() => handleReserve(book.id)}
            />
          </li>
        ))}
      </ul>

      <div className="search-results__pagination">
        <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </section>
  )
}

export default SearchResults
