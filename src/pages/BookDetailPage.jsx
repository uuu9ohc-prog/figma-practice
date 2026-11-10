import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import InterestButton from '../components/InterestButton.jsx'
import MaterialBundle from '../components/MaterialBundle.jsx'
import PageTitle from '../components/PageTitle.jsx'
import ReserveButton from '../components/ReserveButton.jsx'
import ReserveConfirmPopup from '../components/ReserveConfirmPopup.jsx'
import ReserveSet from '../components/ReserveSet.jsx'
import books from '../data/books.js'
import './BookDetailPage.css'

/*
 * BookDetailPage: 도서 상세 (Figma 「상세보기01」 204-4180) (REQ-DET)
 * - 제목줄 → 표지 → [도서예약신청] [관심도서 담기] → 구분선 → 제목·서지 정보 → 책 소개
 * - Figma에는 「관심도서 담기」만 있지만, 요구사항(REQ-ACT-001)에 따라 주 버튼 「도서예약신청」을 함께 둠
 *   (버튼 위계: 도서예약신청 = 초록 Primary / 관심도서 담기 = 흰 Secondary)
 * - 「관심도서 담기」 → 관심도서에 추가하고 관심도서 화면(추가 완료 안내)으로 이동
 * - 「도서예약신청」 → 확인 팝업 → 「확인」 → 예약하고 예약현황 화면(예약 완료 안내)으로 이동
 * - Figma에 상세 정보가 있는 책은 1번뿐이라, 다른 책은 있는 정보(지은이·출판·소장 위치)만 보여줌
 *
 * props (App에서 받는 예약·관심도서 상태)
 * - reservedIds: 예약한 책 id 배열
 * - onReserve / onAddInterest: 예약 / 관심도서 담기 때 실행할 함수 (책 id를 넘겨줌)
 */
function BookDetailPage({ reservedIds, onReserve, onAddInterest }) {
  const { id } = useParams()
  const navigate = useNavigate()
  // 예약 확인 팝업이 열려 있는지 여부
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // 주소의 id(글자)와 같은 번호의 책을 찾음
  const book = books.find((item) => item.id === Number(id))

  // 없는 책 번호로 들어온 경우
  if (!book) {
    return (
      <div className="book-detail-page">
        <PageTitle />
        <div className="book-detail-page__inner book-detail-page__not-found">
          <p>찾으시는 도서 정보가 없습니다.</p>
          <Link to="/search">통합자료검색으로 가기</Link>
        </div>
      </div>
    )
  }

  const isReserved = reservedIds.includes(book.id)
  const detail = book.detail

  // 서지 정보 줄: 상세 정보가 있으면 Figma 값, 없으면 검색 결과에 있는 값으로
  const materials = detail
    ? detail.materials
    : [
        { label: '· 자료유형', value: '도서' },
        { label: '· 소장기관', value: book.location },
      ]

  function handleConfirmReserve() {
    setIsPopupOpen(false)
    onReserve(book.id)
    navigate('/reservations', { state: { notice: 'reserved' } })
  }

  function handleAddInterest() {
    onAddInterest(book.id)
    navigate('/interests', { state: { notice: 'added' } })
  }

  return (
    <div className="book-detail-page">
      <PageTitle />

      <div className="book-detail-page__inner">
        {/* 묶음00: 표지 + 버튼 */}
        <div className="book-detail-page__cover-area">
          <img className="book-detail-page__cover" src={book.thumbnail} alt={`${book.title} 표지`} />

          <div className="book-detail-page__actions">
            {/* 이미 예약했으면 예약현황으로 가는 「예약확인」 링크 */}
            {isReserved ? (
              <ReserveSet status="confirm" href="/reservations" className="book-detail-page__reserve-set" />
            ) : (
              <ReserveButton onClick={() => setIsPopupOpen(true)} />
            )}
            <InterestButton onClick={handleAddInterest} />
          </div>
        </div>

        {/* 책 정보 묶음 */}
        <section className="book-detail-page__info" aria-labelledby="book-detail-title">
          <h2 className="book-detail-page__title" id="book-detail-title">
            {book.title}
          </h2>
          <p className="book-detail-page__summary">{detail ? detail.summary : `${book.author} ㅣ ${book.publishInfo}`}</p>
          <div className="book-detail-page__materials">
            {materials.map((item) => (
              <MaterialBundle key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
          {/* 대출 상태 (REQ-DET: 대출 가능 여부·예약 대기 인원) */}
          <div className="book-detail-page__materials">
            <MaterialBundle label="· 대출상태" value={book.loanDetail} />
            <MaterialBundle label="· 예약현황" value={book.reservation.replace('예약: ', '')} />
          </div>
        </section>

        {/* 책 소개 (Figma에 글이 있는 책만) */}
        {detail && (
          <section className="book-detail-page__intro" aria-labelledby="book-intro-title">
            <h2 className="book-detail-page__title" id="book-intro-title">
              책 소개
            </h2>
            <p className="book-detail-page__intro-text">{detail.intro}</p>
          </section>
        )}
      </div>

      <ReserveConfirmPopup
        isOpen={isPopupOpen}
        book={book}
        onConfirm={handleConfirmReserve}
        onCancel={() => setIsPopupOpen(false)}
      />
    </div>
  )
}

export default BookDetailPage
