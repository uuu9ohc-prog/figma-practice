import './MyBookItem.css'

/*
 * MyBookItem: 예약·관심도서 목록의 한 권 (Figma 「세트」 204-4265 + 「예약안내세트」 204-4270)
 * - #1 → 책 제목 → 정보 줄(도서관: 경주시중앙도서관 …) → 상태 글자(예약중) → [예약취소] 버튼
 * - 정보 줄은 "이름: 값" 짝이라 <dl>(설명 목록)로 만들어 화면낭독기가 짝을 맞춰 읽게 함
 *
 * props
 * - number: 목록 순번 (1부터)
 * - title: 책 제목
 * - infos: 정보 줄 배열 ({ label, value })
 * - statusText: 상태 글자 (예: '예약중', '관심도서')
 * - actionText: 버튼 글자 (예: '예약취소', '관심도서 취소')
 * - onAction: 버튼을 눌렀을 때 실행할 함수
 */
function MyBookItem({ number, title, infos, statusText, actionText, onAction }) {
  return (
    <article className="my-book-item">
      {/* 책 정보: 제목 바로 아래 정보 줄 (Figma: 사이 간격 없음) */}
      <div className="my-book-item__book">
        <h2 className="my-book-item__title">
          <span className="my-book-item__number">#{number}</span>
          {title}
        </h2>

        <dl className="my-book-item__infos">
          {infos.map((info) => (
            <div key={info.label} className="my-book-item__info">
              <dt className="my-book-item__label">{info.label}:</dt>
              <dd className="my-book-item__value">{info.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="my-book-item__actions">
        <p className="my-book-item__status">{statusText}</p>
        {/* 버튼 글자만으로는 어떤 책인지 알기 어려워, 화면낭독기에는 책 제목도 함께 알려줌 */}
        <button
          className="my-book-item__button"
          type="button"
          onClick={onAction}
          aria-label={`${title} ${actionText}`}
        >
          {actionText}
        </button>
      </div>
    </article>
  )
}

export default MyBookItem
