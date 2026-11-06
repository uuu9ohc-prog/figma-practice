import './ListItem.css'

/*
 * ListItem: 목록 (Figma 「목록」 603-1657, Property 1 = 기본 / 호버)
 * - 굵은 글자 메뉴 한 줄 (예: '자료검색'), 누르면 해당 메뉴로 이동
 * - 호버: 흰 배경 + 아래쪽 진한 파랑(Primary) 선 → CSS로 표현
 *
 * props
 * - text: 메뉴 이름 (예: '자료검색')
 * - href: 이동할 주소 (아직 없으면 '#')
 */
function ListItem({ text, href = '#' }) {
  return (
    <a className="list-item" href={href}>
      {text}
    </a>
  )
}

export default ListItem
