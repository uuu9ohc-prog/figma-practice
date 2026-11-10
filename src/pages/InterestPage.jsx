import { useState } from 'react'
import { useLocation } from 'react-router'
import CancelConfirmPopup from '../components/CancelConfirmPopup.jsx'
import EmptyNotice from '../components/EmptyNotice.jsx'
import MyBookItem from '../components/MyBookItem.jsx'
import Pagination from '../components/Pagination.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import books from '../data/books.js'
import './MyBooksPage.css'

/*
 * InterestPage: 관심도서 (Figma 「상세보기02」 204-4314, 「상세보기03」 353-653, 「상세보기04」 338-2240)
 * - 상세 화면에서 「관심도서 담기」 후 이 화면으로 오면: "관심도서에 추가되었습니다." + 관심도서 목록
 * - 「관심도서 취소」 → 취소 확인 팝업 → 「확인」 → "관심도서가 취소되었습니다." (목록이 비면 '도서 검색하기' 안내)
 * - 예약현황 화면(ReservationPage)과 모양이 같고 글자만 다름
 *
 * props (App에서 받는 관심도서 상태)
 * - interestIds: 관심도서 책 id 배열
 * - onRemove: 관심도서를 취소할 때 실행할 함수 (책 id를 넘겨줌)
 */

// 안내 종류 → 큰 글자 안내 문장
const NOTICE_TITLES = {
  added: '관심도서에 추가되었습니다.',
  canceled: '관심도서가 취소되었습니다.',
}

function InterestPage({ interestIds, onRemove }) {
  const location = useLocation()
  const [notice, setNotice] = useState(location.state?.notice ?? null)
  const [cancelTarget, setCancelTarget] = useState(null)

  function handleConfirmCancel() {
    onRemove(cancelTarget.id)
    setCancelTarget(null)
    setNotice('canceled')
  }

  return (
    <div className="my-books-page">
      <StatusMessage
        title={NOTICE_TITLES[notice] ?? '관심도서 현황'}
        countText={`관심도서현황 건수: 총 ${interestIds.length}건`}
      />

      {interestIds.length === 0 ? (
        <EmptyNotice message="관심 도서 등록한 도서가 없습니다." />
      ) : (
        <>
          <ul className="my-books-page__list" role="list">
            {interestIds.map((bookId, index) => {
              const book = books.find((item) => item.id === bookId)
              return (
                <li key={bookId}>
                  <MyBookItem
                    number={index + 1}
                    title={book.title}
                    infos={[
                      { label: '도서관', value: book.libraryName },
                      { label: '위치', value: book.shelf },
                      { label: '도서현황', value: book.loanStatusText },
                      { label: '반납예정일', value: book.returnDueDate },
                    ]}
                    statusText="관심도서"
                    actionText="관심도서 취소"
                    onAction={() => setCancelTarget(book)}
                  />
                </li>
              )
            })}
          </ul>

          <div className="my-books-page__pagination">
            <Pagination currentPage={1} totalPages={1} onChange={() => {}} />
          </div>
        </>
      )}

      <CancelConfirmPopup
        isOpen={cancelTarget !== null}
        question="관심도서를 취소하시겠습니까?"
        bookTitle={cancelTarget?.title ?? ''}
        message="취소를 확정하기 전까지 관심도서는 유지됩니다."
        help="관심도서를 유지하려면 ‘취소’, 관심도서를 취소하려면 ‘확인’을 선택해 주세요."
        onConfirm={handleConfirmCancel}
        onCancel={() => setCancelTarget(null)}
      />
    </div>
  )
}

export default InterestPage
