import './ListItem.css'

/*
 * ListItem: 목록 (Figma 「목록」 603-1657, Property 1 = 기본 / 호버)
 * - 굵은 글자 메뉴 한 줄 (예: '자료검색'), 누르면 해당 메뉴로 이동
 * - 호버: 흰 배경 + 아래쪽 진한 파랑(Primary) 선 → CSS로 표현
 * - onClick을 넘기면 링크 대신 버튼이 됨 (전체메뉴에서 1depth를 골라 오른쪽 하위 메뉴를 바꿀 때)
 *   → 고른 메뉴(isSelected)는 호버와 같은 모습 + aria-pressed로 화면낭독기에 알림
 *
 * props
 * - text: 메뉴 이름 (예: '자료검색')
 * - href: 이동할 주소 (아직 없으면 '#')
 * - onClick: 버튼으로 쓸 때 눌렀을 때 실행할 함수 (선택)
 * - isSelected: 버튼으로 쓸 때 지금 고른 메뉴인지 여부
 */
function ListItem({ text, href = '#', onClick, isSelected = false }) {
  if (onClick) {
    return (
      <button className="list-item list-item--button" type="button" onClick={onClick} aria-pressed={isSelected}>
        {text}
      </button>
    )
  }

  return (
    <a className="list-item" href={href}>
      {text}
    </a>
  )
}

export default ListItem
