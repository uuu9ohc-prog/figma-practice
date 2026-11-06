import { useEffect, useRef, useState } from 'react'
import BookListItem from './BookListItem.jsx'
import ButtonSet from './ButtonSet.jsx'
import ReserveConfirmPopup from './ReserveConfirmPopup.jsx'
import './BookSet.css'

/*
 * BookSet: 책 정보 + 버튼세트 묶음 (Figma 「세트」 603-1595)
 * - 위: 책 정보(BookListItem) / 아래: 관심담기·도서예약신청·상세보기(ButtonSet)
 * - Figma 이름 「세트」는 공지사항 쪽(NoticeSet)과 같아서, 코드에서는 BookSet으로 구분
 *
 * 예약 흐름 (REQ-ACT)
 *   ① 「도서예약신청」 클릭 → ② 도서예약 확인 팝업 열림
 *   ③ 「확인」 → 예약 완료, 버튼 자리가 「예약확인」으로 바뀜 (키보드 포커스도 그쪽으로 이동)
 *      「취소」 또는 Esc → 팝업만 닫힘
 *   ※ 완료 안내 Toast는 아직 디자인이 없어 연결하지 않음
 *
 * props
 * - book: 도서 데이터 한 권 (src/data/books.js)
 */
function BookSet({ book }) {
  // 관심도서로 담았는지 여부 (로그인 없이 React state로만 관리)
  const [isInterested, setIsInterested] = useState(false)
  // 예약을 마쳤는지 여부
  const [isReserved, setIsReserved] = useState(false)
  // 예약 확인 팝업이 열려 있는지 여부
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // 예약 후 나타나는 「예약확인」을 가리키는 참조 (포커스를 옮기기 위해)
  const reserveSetRef = useRef(null)

  // 예약이 완료되면 「예약확인」으로 키보드 포커스를 옮김
  // (팝업을 연 「도서예약신청」 버튼이 사라져서 포커스가 길을 잃지 않게)
  useEffect(() => {
    if (isReserved && reserveSetRef.current) {
      reserveSetRef.current.focus()
    }
  }, [isReserved])

  // 팝업에서 「확인」: 예약 완료 처리 후 팝업 닫기
  function handleConfirm() {
    setIsReserved(true)
    setIsPopupOpen(false)
  }

  return (
    <article className="book-set">
      <BookListItem book={book} />
      <ButtonSet
        isInterested={isInterested}
        onToggleInterest={() => setIsInterested((prev) => !prev)}
        isReserved={isReserved}
        onReserve={() => setIsPopupOpen(true)}
        reserveSetRef={reserveSetRef}
        detailHref={`/books/${book.id}`}
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
