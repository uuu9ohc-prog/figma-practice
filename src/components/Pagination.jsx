import arrowIcon from '../assets/icons/detail-arrow.svg'
import PageNumber from './PageNumber.jsx'
import './Pagination.css'

/*
 * Pagination: 페이지 번호 묶음 (Figma 「숫자세트」 204-4002)
 * - [1] 2 3 4 5 [다음 ▶] [끝]
 * - 번호는 PageNumber 재사용, 한 번에 최대 5개까지 보여줌
 * - 더 갈 페이지가 없으면 다음·끝 버튼은 누를 수 없게(disabled) 함
 *
 * props
 * - currentPage: 지금 페이지 (1부터)
 * - totalPages: 전체 페이지 수
 * - onChange: 다른 페이지를 고르면 실행할 함수, 고른 페이지 번호를 넘겨줌
 */

// 한 번에 보여줄 페이지 번호 개수 (Figma: 1~5)
const PAGE_GROUP_SIZE = 5

function Pagination({ currentPage, totalPages, onChange }) {
  // 지금 페이지가 들어 있는 묶음의 첫 번호 (예: 7페이지면 6)
  const groupStart = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages)

  const pages = []
  for (let page = groupStart; page <= groupEnd; page++) pages.push(page)

  const isLast = currentPage >= totalPages

  return (
    <nav className="pagination" aria-label="페이지 이동">
      <ul className="pagination__numbers" role="list">
        {pages.map((page) => (
          <li key={page}>
            <PageNumber number={page} isCurrent={page === currentPage} onClick={() => onChange(page)} />
          </li>
        ))}
      </ul>

      <button
        className="pagination__button pagination__button--next"
        type="button"
        onClick={() => onChange(currentPage + 1)}
        disabled={isLast}
      >
        다음
        <img className="pagination__icon" src={arrowIcon} alt="" width="24" height="24" />
      </button>
      <button
        className="pagination__button"
        type="button"
        onClick={() => onChange(totalPages)}
        disabled={isLast}
        aria-label="끝 페이지"
      >
        끝
      </button>
    </nav>
  )
}

export default Pagination
