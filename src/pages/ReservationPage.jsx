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
 * ReservationPage: 도서예약현황 (Figma 「도서예약02」 204-4241, 「도서예약 취소 확인」 177-2546, 「도서예약 취소 완료」 177-2826)
 * - 예약 확정 후 이 화면으로 오면: "도서예약신청을 완료하였습니다." + 예약 목록
 * - 「예약취소」 → 취소 확인 팝업 → 「확인」 → "도서예약이 취소되었습니다." (목록이 비면 '도서 검색하기' 안내)
 * - 어떤 안내를 보여줄지는 이동할 때 넘겨받은 값(location.state.notice)으로 정함
 *
 * props (App에서 받는 예약 상태)
 * - reservations: 예약 목록 ({ bookId, date, order })
 * - onCancel: 예약을 취소할 때 실행할 함수 (책 id를 넘겨줌)
 */

// 안내 종류 → 큰 글자 안내 문장
const NOTICE_TITLES = {
  reserved: '도서예약신청을 완료하였습니다.',
  canceled: '도서예약이 취소되었습니다.',
}

function ReservationPage({ reservations, onCancel }) {
  const location = useLocation()
  // 지금 보여줄 안내 (다른 화면에서 넘겨받은 값으로 시작, 없으면 기본 제목)
  const [notice, setNotice] = useState(location.state?.notice ?? null)
  // 취소 확인 팝업에 띄운 책 (없으면 null → 팝업 닫힘)
  const [cancelTarget, setCancelTarget] = useState(null)

  function handleConfirmCancel() {
    onCancel(cancelTarget.id)
    setCancelTarget(null)
    setNotice('canceled')
  }

  return (
    <div className="my-books-page">
      <StatusMessage
        title={NOTICE_TITLES[notice] ?? '도서예약현황'}
        countText={`예약현황 건수: 총 ${reservations.length}건`}
      />

      {reservations.length === 0 ? (
        <EmptyNotice message="예약 중인 도서가 없습니다." />
      ) : (
        <>
          <ul className="my-books-page__list" role="list">
            {reservations.map((reservation, index) => {
              const book = books.find((item) => item.id === reservation.bookId)
              return (
                <li key={reservation.bookId}>
                  <MyBookItem
                    number={index + 1}
                    title={book.title}
                    infos={[
                      { label: '도서관', value: book.libraryName },
                      { label: '위치', value: book.shelf },
                      { label: '예약일', value: reservation.date },
                      { label: '예약순번', value: `${reservation.order}번째 (${reservation.order}명예약)` },
                      { label: '도서현황', value: book.loanStatusText },
                      { label: '반납예정일', value: book.returnDueDate },
                    ]}
                    statusText="예약중"
                    actionText="예약취소"
                    onAction={() => setCancelTarget(book)}
                  />
                </li>
              )
            })}
          </ul>

          {/* 예약은 한 페이지에 모두 보여줘서 페이지는 1개 (Figma 「숫자박스」) */}
          <div className="my-books-page__pagination">
            <Pagination currentPage={1} totalPages={1} onChange={() => {}} />
          </div>
        </>
      )}

      <CancelConfirmPopup
        isOpen={cancelTarget !== null}
        question="도서예약을 취소하시겠습니까?"
        bookTitle={cancelTarget?.title ?? ''}
        message="취소를 확정하기 전까지 예약은 유지됩니다."
        help="예약을 유지하려면 ‘취소’, 예약을 취소하려면 ‘확인’을 선택해 주세요."
        onConfirm={handleConfirmCancel}
        onCancel={() => setCancelTarget(null)}
      />
    </div>
  )
}

export default ReservationPage
