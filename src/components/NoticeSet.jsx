import NoticeTag from './NoticeTag.jsx'
import './NoticeSet.css'

/*
 * NoticeSet: 공지사항 한 줄 - 기간형 (Figma 「세트」 603-1390)
 * - [도서관 태그] 제목(길면 … 처리) 기간 순서
 * - 누르면 공지 상세로 이동하므로 <a>(링크)로 만듦
 *
 * props
 * - tagNumber: 도서관 태그 번호 '01' ~ '07' (NoticeTag에 넘김)
 * - title: 공지 제목
 * - period: 기간 (예: '2026.10.17~2026.10.17')
 * - href: 이동할 주소 (아직 없으면 '#')
 */
function NoticeSet({ tagNumber, title, period, href = '#' }) {
  return (
    <a className="notice-set" href={href}>
      <NoticeTag number={tagNumber} />
      <span className="notice-set__title">{title}</span>
      <span className="notice-set__period">{period}</span>
    </a>
  )
}

export default NoticeSet
