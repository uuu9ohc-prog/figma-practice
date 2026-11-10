import { useNavigate } from 'react-router'
import Banner from '../components/Banner.jsx'
import BookIntro from '../components/BookIntro.jsx'
import Calendar from '../components/Calendar.jsx'
import MainMenu from '../components/MainMenu.jsx'
import NoticeItem from '../components/NoticeItem.jsx'
import NoticeTitle from '../components/NoticeTitle.jsx'
import SearchSuggest from '../components/SearchSuggest.jsx'
import banners from '../data/banners.js'
import calendar from '../data/calendar.js'
import { culturePrograms, notices } from '../data/notices.js'
import recommendedBooks from '../data/recommendedBooks.js'
import searchSuggestions from '../data/searchSuggestions.js'
import './MainPage.css'

/*
 * MainPage: 메인 화면 (Figma 「모바일」 204-3717)
 * 위에서부터 Figma 묶음 순서 그대로
 *   묶음01: 통합검색창 + 메인메뉴 8개
 *   묶음02: 휴관일 달력 (회색 배경)
 *   묶음03: 팝업존 배너
 *   묶음04: 추천도서
 *   묶음05: 공지사항
 *   묶음06: 문화프로그램
 * (헤더·푸터는 모든 화면 공통이라 App.jsx에서 넣음)
 */

// 메인메뉴 8개 (Figma 「메뉴창」 204-3743 순서·글자 그대로, 주소는 아직 '#')
const MAIN_MENUS = [
  { number: '01', label: '이용안내' },
  { number: '02', label: '야간예약대출' },
  { number: '03', label: '도서대출조회' },
  { number: '04', label: '희망도서신청' },
  { number: '05', label: '전자책' },
  { number: '06', label: '오디오북' },
  { number: '07', label: '북스타트' },
  { number: '08', label: '책바다·책나래' },
]

function MainPage() {
  const navigate = useNavigate()

  // 검색하면 검색 결과 화면으로 이동 (검색어는 주소의 q 값으로 넘김)
  function handleSearch(keyword) {
    navigate(`/search?q=${encodeURIComponent(keyword)}`)
  }

  return (
    <div className="main-page">
      {/* 묶음01: 검색창 + 메인메뉴 */}
      <section className="main-page__section" aria-label="통합자료검색과 주요 메뉴">
        <div className="main-page__inner main-page__inner--search">
          <SearchSuggest suggestions={searchSuggestions} onSearch={handleSearch} variant="main" />

          <nav className="main-page__menu" aria-label="주요 메뉴">
            <ul className="main-page__menu-list" role="list">
              {MAIN_MENUS.map((menu) => (
                <li key={menu.number} className="main-page__menu-item">
                  <MainMenu number={menu.number} label={menu.label} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* 묶음02: 휴관일 달력 (배경은 화면 전체 너비 회색) */}
      <div className="main-page__section main-page__section--gray">
        <div className="main-page__inner main-page__inner--calendar">
          <Calendar {...calendar} />
        </div>
      </div>

      {/* 묶음03: 팝업존 */}
      <section className="main-page__section" aria-labelledby="popup-zone-title">
        <div className="main-page__inner main-page__inner--wide-gap">
          <NoticeTitle title="팝업존" variant="plus" titleId="popup-zone-title" />
          <Banner banners={banners} />
        </div>
      </section>

      {/* 묶음04: 추천도서 */}
      <section className="main-page__section" aria-labelledby="recommend-title">
        <div className="main-page__inner main-page__inner--book">
          <NoticeTitle title="추천도서" titleId="recommend-title" />
          <BookIntro books={recommendedBooks} />
        </div>
      </section>

      {/* 묶음05: 공지사항 */}
      <section className="main-page__section" aria-labelledby="notice-title">
        <div className="main-page__inner main-page__inner--list">
          <NoticeTitle title="공지사항" variant="list" titleId="notice-title" />
          <ul className="main-page__notice-list" role="list">
            {notices.map((notice) => (
              <li key={notice.id}>
                <NoticeItem tagNumber={notice.tagNumber} date={notice.date} title={notice.title} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 묶음06: 문화프로그램 */}
      <section className="main-page__section" aria-labelledby="culture-title">
        <div className="main-page__inner main-page__inner--list">
          <NoticeTitle title="문화프로그램" variant="list" titleId="culture-title" />
          <ul className="main-page__notice-list" role="list">
            {culturePrograms.map((program) => (
              <li key={program.id}>
                <NoticeItem tagNumber={program.tagNumber} date={program.date} title={program.title} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default MainPage
