import logoImage from '../assets/images/library-logo.png'
import './LibraryLogo.css'

/*
 * LibraryLogo: 경주시립도서관 로고 (Figma 「경주시립도서관 로고」 603-1752, Property 1 = 기본 / 호버)
 * - 로고 그림 + '경주시립도서관' 글자, 누르면 메인(/)으로 이동
 * - 호버: 연한 회색 배경 → CSS로 표현
 *
 * props
 * - href: 이동할 주소 (기본값 '/' 메인 화면)
 */
function LibraryLogo({ href = '/' }) {
  return (
    <a className="library-logo" href={href}>
      {/* 옆에 '경주시립도서관' 글자가 있으므로 그림은 alt를 비워 두 번 읽지 않게 함 */}
      <img className="library-logo__image" src={logoImage} alt="" />
      <span className="library-logo__text">경주시립도서관</span>
    </a>
  )
}

export default LibraryLogo
