import { useState } from 'react'
import BookListItem from './BookListItem.jsx'
import ButtonSet from './ButtonSet.jsx'
import ReserveConfirmPopup from './ReserveConfirmPopup.jsx'
import './BookSet.css'

/*
 * BookSet: 책 정보 + 버튼세트 묶음 (Figma 「세트」 603-1595)
 * - 위: 책 정보(BookListItem) / 아래: 관심담기·도서예약신청·상세보기(ButtonSet)
 * - Figma 이름 「세트」는 공지사항 쪽(NoticeSet)과 같아서, 코드에서는 BookSet으로 구분
 * - 관심·예약 상태는 여러 화면(검색결과·예약현황·관심도서)이 함께 보므로 App에서 관리하고 props로 받음
 *
 * 예약 흐름 (REQ-ACT)
 *   ① 「도서예약신청」 클릭 → ② 도서예약 확인 팝업 열림
 *   ③ 「확인」 → onReserve 실행 (App이 예약을 저장하고 예약 완료 화면으로 이동)
 *      「취소」 또는 Esc → 팝업만 닫힘
 *   ※ 이미 예약한 책은 버튼 자리가 「예약확인」(예약현황 화면으로 가는 링크)으로 바뀜
 *
 * props
 * - book: 도서 데이터 한 권 (src/data/books.js)
 * - isInterested: 관심도서로 담겼는지 여부
 * - onToggleInterest: 관심담기 체크박스를 눌렀을 때 실행할 함수
 * - isReserved: 이미 예약했는지 여부
 * - onReserve: 예약 팝업에서 「확인」을 눌렀을 때 실행할 함수
 */
function BookSet({ book, isInterested, onToggleInterest, isReserved, onReserve }) {
  // 예약 확인 팝업이 열려 있는지 여부 (이 책 안에서만 쓰는 상태)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // 팝업에서 「확인」: 팝업을 닫고 예약 처리
  function handleConfirm() {
    setIsPopupOpen(false)
    onReserve()
  }

  return (
    <article className="book-set">
      <BookListItem book={book} />
      <ButtonSet
        isInterested={isInterested}
        onToggleInterest={onToggleInterest}
        isReserved={isReserved}
        onReserve={() => setIsPopupOpen(true)}
        detailHref={`/books/${book.id}`}
        reserveHref="/reservations"
      />
      <ReserveConfirmPopup
        isOpen={isPopupOpen}
        book={book}
        onConfirm={handleConfirm}
        onCancel={() => setIsPopupOpen(false)}
      />
    </article>
  )
}

export default BookSet
