import { useEffect, useState } from 'react'
import ArrowKey from './ArrowKey.jsx'
import BookCover from './BookCover.jsx'
import './BookIntro.css'

// 자동으로 다음 책으로 넘어가는 간격 (배너와 같은 5초)
const AUTO_PLAY_DELAY = 5000

/*
 * BookIntro: 추천도서 카드 (Figma 「책소개 세트」 603-1593, 「추천도서세트」 01 ~ 05)
 * - 표지(오른쪽 아래에 방향키) → 책 제목 → 지은이·출판사 → 소개글(4줄까지, 넘치면 …)
 * - 배너와 같은 방식: 한 번에 책 한 권, 방향키로 이전/다음, 정지/재생 버튼, 5초마다 자동 넘김
 * - Figma에서 검색 결과 목록 쪽 「책소개 세트」와 이름이 같아서, 코드에서는 BookIntro / BookListItem으로 구분
 *
 * props
 * - books: 추천도서 데이터 배열 (src/data/recommendedBooks.js)
 */
function BookIntro({ books }) {
  // 지금 보이는 책의 순서 (0부터 시작)
  const [index, setIndex] = useState(0)
  // 자동 넘김 중인지 여부
  const [isPlaying, setIsPlaying] = useState(true)

  const total = books.length
  const book = books[index]

  // 이전: 첫 번째에서 누르면 마지막으로
  function goPrev() {
    setIndex((prev) => (prev - 1 + total) % total)
  }

  // 다음: 마지막에서 누르면 첫 번째로
  function goNext() {
    setIndex((prev) => (prev + 1) % total)
  }

  // 자동 넘김: 재생 중일 때만 5초마다 다음 책으로
  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total)
    }, AUTO_PLAY_DELAY)

    // 정지하거나 화면에서 사라지면 타이머를 지움
    return () => clearInterval(timer)
  }, [isPlaying, total])

  return (
    // aria-roledescription: 화면낭독기에 "슬라이드"라고 한국어로 알려줌
    <section className="book-intro" aria-roledescription="슬라이드" aria-label="추천도서">
      {/* 표지 + 방향키: 방향키를 표지 오른쪽 아래에 겹쳐 놓기 위해 한 상자로 묶음 */}
      <div className="book-intro__cover">
        <BookCover number={book.coverNumber} alt={`${book.title} 표지`} />
        <div className="book-intro__arrow-key">
          <ArrowKey
            current={index + 1}
            total={total}
            isPlaying={isPlaying}
            onPrev={goPrev}
            onNext={goNext}
            onTogglePlay={() => setIsPlaying((prev) => !prev)}
          />
        </div>
      </div>

      {/* 자동 넘김 중에는 바뀔 때마다 읽지 않고(off), 직접 넘길 때만 읽어줌(polite) */}
      <div className="book-intro__info" aria-live={isPlaying ? 'off' : 'polite'}>
        <h2 className="book-intro__title">{book.title}</h2>
        <p className="book-intro__author">{book.authorPublisher}</p>
        <p className="book-intro__description">{book.description}</p>
      </div>
    </section>
  )
}

export default BookIntro
