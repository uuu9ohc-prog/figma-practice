import './NoticeMenu.css'

/*
 * NoticeMenu: 공지메뉴 (Figma 「공지메뉴」 603-1383, Property 1 = 기본 / 호버)
 * - 공지사항을 도서관별로 고르는 메뉴 버튼 (예: 전체, 시립, 송화…)
 * - 기본: 회색 글자 / 호버: 빨간 글자 + 글자 위 빨간 점 → CSS로 표현
 * - 키보드로 포커스했을 때도 호버와 같은 모습
 *
 * props
 * - label: 메뉴 이름 (예: '전체')
 * - onClick: 눌렀을 때 실행할 함수
 */
function NoticeMenu({ label, onClick }) {
  return (
    <button className="notice-menu" type="button" onClick={onClick}>
      {/* 장식용 점이라 화면낭독기가 읽지 않게 aria-hidden */}
      <span className="notice-menu__dot" aria-hidden="true" />
      <span className="notice-menu__label">{label}</span>
    </button>
  )
}

export default NoticeMenu
