import NoticeTag from './NoticeTag.jsx'
import './NoticeItem.css'

/*
 * NoticeItem: 공지사항 한 줄 - 날짜형 (Figma 「도서관 이름」 603-1400, 흰 배경 둥근 줄)
 * - [도서관 태그] 날짜 제목(길면 … 처리) 순서
 * - Figma에서 제목줄(603-1399)과 이름이 같아서, 코드에서는 NoticeItem / NoticeTitle로 구분
 * - 누르면 공지 상세로 이동하므로 <a>(링크)로 만듦
 *
 * props
 * - tagNumber: 도서관 태그 번호 '01' ~ '07' (NoticeTag에 넘김)
 * - date: 날짜 (예: '10.08')
 * - title: 공지 제목
 * - href: 이동할 주소 (아직 없으면 '#')
 */
function NoticeItem({ tagNumber, date, title, href = '#' }) {
  return (
    <a className="notice-item" href={href}>
      <NoticeTag number={tagNumber} />
      <span className="notice-item__date">{date}</span>
      <span className="notice-item__title">{title}</span>
    </a>
  )
}

export default NoticeItem
