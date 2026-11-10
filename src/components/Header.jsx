import { useState } from 'react'
import { useNavigate } from 'react-router'
import LibraryLogo from './LibraryLogo.jsx'
import MenuIcon from './MenuIcon.jsx'
import MenuPanel from './MenuPanel.jsx'
import SearchIcon from './SearchIcon.jsx'
import './Header.css'

/*
 * Header: 공통 헤더 (Figma 「헤더」 204-3718)
 * - 맨 위: 본문 바로가기(키보드 사용자용, 포커스하면 보임) (REQ-NAV-003)
 * - 최상단헤더: 로그인 | 회원가입 | 사이트 맵 (오른쪽 정렬)
 * - 상단 헤더: 왼쪽 로고 / 오른쪽 검색·전체메뉴 아이콘
 * - 모든 페이지에서 같은 헤더를 써서 메뉴 위치·순서가 바뀌지 않게 함 (REQ-NAV-002)
 * - 메뉴 아이콘(☰)을 누르면 전체메뉴 팝업(MenuPanel)이 열림
 */

// 최상단 링크 (로그인 기능은 없으므로 주소는 아직 '#')
const TOP_LINKS = ['로그인', '회원가입', '사이트 맵']

function Header() {
  const navigate = useNavigate()
  // 전체메뉴 팝업이 열려 있는지 여부
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="header">
      {/* 키보드 Tab을 처음 누르면 가장 먼저 보이는 링크 → <main id="main">으로 바로 이동 */}
      <a className="header__skip-link" href="#main">
        본문 바로가기
      </a>

      <div className="header__top">
        <ul className="header__top-list" role="list">
          {TOP_LINKS.map((label) => (
            <li key={label} className="header__top-item">
              <a className="header__top-link" href="#">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="header__main">
        <LibraryLogo />
        <div className="header__icons">
          {/* 검색 아이콘: 통합자료검색 화면으로 이동 */}
          <SearchIcon onClick={() => navigate('/search')} />
          <MenuIcon isExpanded={isMenuOpen} onClick={() => setIsMenuOpen(true)} />
        </div>
      </div>

      <MenuPanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}

export default Header
