import LoanBadge from './LoanBadge.jsx'
import './BookListItem.css'

/*
 * BookListItem: 검색 결과용 책 정보 (Figma 「책소개 세트」 86-1741, 가로형)
 * - 왼쪽: 책표지 + 오른쪽 위에 대출가능여부 배지 / 오른쪽: 제목·지은이·출판·소장·예약·대출 상태
 * - Figma에서 추천도서 쪽 「책소개 세트」와 이름이 같아서, 코드에서는 BookListItem / BookIntro로 구분
 *
 * props
 * - book: 도서 데이터 한 권 (src/data/books.js)
 */
function BookListItem({ book }) {
  return (
    <div className="book-list-item">
      {/* 책표지 (Figma: 책표지 슬롯) */}
      <div className="book-list-item__cover">
        <img className="book-list-item__image" src={book.thumbnail} alt={`${book.title} 표지`} />
        <span className="book-list-item__badge">
          <LoanBadge status={book.loanStatus} />
        </span>
      </div>

      {/* 도서소개 묶음 */}
      <div className="book-list-item__info">
        {/* 도서소개01: 책 제목 */}
        <h2 className="book-list-item__title">{book.title}</h2>

        {/* 도서소개02: 지은이 / 출판 / 소장 위치 / 예약 */}
        <div className="book-list-item__details">
          <p>{book.author}</p>
          <p>{book.publishInfo}</p>
          <p className="book-list-item__location">{book.location}</p>
          <p>{book.reservation}</p>
        </div>

        {/* 도서소개03: 대출 상태 */}
        <p className="book-list-item__status">{book.loanDetail}</p>
      </div>
    </div>
  )
}

export default BookListItem
