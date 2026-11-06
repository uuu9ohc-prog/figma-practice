import moreIcon from '../assets/icons/more.svg'
import './NoticeTitle.css'

/*
 * NoticeTitle: 공지사항 제목줄 (Figma 「도서관 이름」 603-1399, 연한 파란 배경 둥근 줄)
 * - 왼쪽: 제목(공지사항) / 오른쪽: 더보기 버튼(▼ 아이콘)
 * - Figma에서 목록줄(603-1400)과 이름이 같아서, 코드에서는 NoticeTitle / NoticeItem으로 구분
 *
 * props
 * - title: 제목 (기본값 '공지사항')
 * - moreHref: 더보기를 눌렀을 때 이동할 주소 (아직 없으면 '#')
 */
function NoticeTitle({ title = '공지사항', moreHref = '#' }) {
  return (
    <div className="notice-title">
      <h2 className="notice-title__text">{title}</h2>
      {/* 아이콘만 있는 링크라서 aria-label로 이름을 붙임 */}
      <a className="notice-title__more" href={moreHref} aria-label={`${title} 더보기`}>
        <img className="notice-title__icon" src={moreIcon} alt="" />
      </a>
    </div>
  )
}

export default NoticeTitle
