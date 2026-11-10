import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import books from './data/books.js'
import calendar from './data/calendar.js'
import BookDetailPage from './pages/BookDetailPage.jsx'
import InterestPage from './pages/InterestPage.jsx'
import MainPage from './pages/MainPage.jsx'
import ReservationPage from './pages/ReservationPage.jsx'
import SearchPage from './pages/SearchPage.jsx'

/*
 * App: 모든 화면 공통 틀 + 주소별 화면 연결 (react-router) + 예약·관심도서 상태
 * - 헤더·푸터는 어느 화면에서나 같은 자리에 보이도록 여기에서 한 번만 넣음 (REQ-NAV-002)
 * - <main id="main">: 헤더의 '본문 바로가기' 링크가 이동하는 곳 (REQ-NAV-003)
 *   tabIndex={-1}: 링크로 이동했을 때 키보드 포커스도 본문으로 옮겨지게 함
 * - 예약·관심도서는 검색결과·상세·예약현황·관심도서 화면이 함께 보므로 여기(App)에서 관리하고 props로 내려줌
 *   (로그인·서버가 없어서 새로고침하면 처음 상태로 돌아감)
 *
 * 화면 주소
 *   /               메인
 *   /search?q=…     통합자료검색 + 검색 결과
 *   /books/:id      도서 상세
 *   /reservations   도서예약현황 (예약 완료·취소 안내)
 *   /interests      관심도서 (추가·취소 안내)
 */

// 예약일: 목업 달력의 '오늘'(2026.10.13, Figma 예약일과 같음)
const TODAY = `${calendar.year}.${String(calendar.month).padStart(2, '0')}.${calendar.today}`

function App() {
  // 예약 목록: { bookId, date(예약일), order(예약순번) }
  const [reservations, setReservations] = useState([])
  // 관심도서 책 id 목록
  const [interestIds, setInterestIds] = useState([])

  const reservedIds = reservations.map((reservation) => reservation.bookId)

  // 예약하기 (이미 예약한 책이면 그대로 둠)
  function reserve(bookId) {
    if (reservedIds.includes(bookId)) return
    const book = books.find((item) => item.id === bookId)
    // 예약순번 = 이미 예약한 사람 수 + 1
    setReservations((prev) => [...prev, { bookId, date: TODAY, order: book.reservedCount + 1 }])
  }

  // 예약 취소
  function cancelReservation(bookId) {
    setReservations((prev) => prev.filter((reservation) => reservation.bookId !== bookId))
  }

  // 관심도서 담기 (이미 있으면 그대로)
  function addInterest(bookId) {
    setInterestIds((prev) => (prev.includes(bookId) ? prev : [...prev, bookId]))
  }

  // 관심도서 빼기
  function removeInterest(bookId) {
    setInterestIds((prev) => prev.filter((id) => id !== bookId))
  }

  // 관심담기 체크박스: 있으면 빼고, 없으면 담기
  function toggleInterest(bookId) {
    if (interestIds.includes(bookId)) removeInterest(bookId)
    else addInterest(bookId)
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/search"
            element={
              <SearchPage
                reservedIds={reservedIds}
                interestIds={interestIds}
                onReserve={reserve}
                onToggleInterest={toggleInterest}
              />
            }
          />
          <Route
            path="/books/:id"
            element={<BookDetailPage reservedIds={reservedIds} onReserve={reserve} onAddInterest={addInterest} />}
          />
          <Route
            path="/reservations"
            element={<ReservationPage reservations={reservations} onCancel={cancelReservation} />}
          />
          <Route path="/interests" element={<InterestPage interestIds={interestIds} onRemove={removeInterest} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
