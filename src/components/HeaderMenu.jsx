import './HeaderMenu.css'

/*
 * HeaderMenu: 헤더 메뉴 (Figma 「헤더 메뉴」 603-1646, Property 1 = 기본 / 호버)
 * - 위에서부터 점 → 메뉴 이름 → 밑줄
 * - 기본: 점·밑줄이 흰색(보이지 않음) + 진한 글자
 *   호버: 점·밑줄이 진한 파랑(Primary) + 파란 글자(Sub) → CSS로 표현
 * - 지금 보고 있는 메뉴(isCurrent)도 호버와 같은 모습으로 표시 (aria-current로 화면낭독기에도 알림)
 *
 * props
 * - label: 메뉴 이름 (예: '자료검색')
 * - href: 이동할 주소 (아직 없으면 '#')
 * - isCurrent: 지금 보고 있는 메뉴인지 여부
 */
function HeaderMenu({ label, href = '#', isCurrent = false }) {
  return (
    <a className="header-menu" href={href} aria-current={isCurrent ? 'page' : undefined}>
      {/* 점과 밑줄은 장식이라 화면낭독기가 읽지 않게 aria-hidden */}
      <span className="header-menu__dot" aria-hidden="true" />
      <span className="header-menu__label">{label}</span>
      <span className="header-menu__line" aria-hidden="true" />
    </a>
  )
}

export default HeaderMenu
