import moreIcon from '../assets/icons/more.svg'
import moreSmallIcon from '../assets/icons/more-24.svg'
import plusIcon from '../assets/icons/plus.svg'
import './NoticeTitle.css'

/*
 * NoticeTitle: 공지사항 제목줄 (Figma 「도서관 이름」 603-1399, 연한 파란 배경 둥근 줄)
 * - 왼쪽: 제목(공지사항) / 오른쪽: 더보기 버튼(▼ 아이콘)
 * - Figma에서 목록줄(603-1400)과 이름이 같아서, 코드에서는 NoticeTitle / NoticeItem으로 구분
 * - 메인 화면(204-3717)에는 같은 제목줄이 세 가지 모양으로 쓰여서 variant로 나눔
 *   card  : 연한 파란 배경 + ▼ 30px (기본, 추천도서)
 *   plus  : 연한 파란 배경 + ＋ 44px (팝업존)
 *   list  : 연한 회색 배경 + ▼ 24px (공지사항, 문화프로그램)
 *
 * props
 * - title: 제목 (기본값 '공지사항')
 * - moreHref: 더보기를 눌렀을 때 이동할 주소 (아직 없으면 '#')
 * - variant: 'card'(기본) / 'plus' / 'list'
 * - titleId: 제목(h2)에 붙일 id (바깥 <section>의 aria-labelledby와 연결해 영역 이름으로 쓰게 함, 선택)
 */

// variant마다 쓸 아이콘 그림
const ICONS = {
  card: moreIcon,
  plus: plusIcon,
  list: moreSmallIcon,
}

function NoticeTitle({ title = '공지사항', moreHref = '#', variant = 'card', titleId }) {
  return (
    <div className={`notice-title notice-title--${variant}`}>
      <h2 className="notice-title__text" id={titleId}>
        {title}
      </h2>
      {/* 아이콘만 있는 링크라서 aria-label로 이름을 붙임 */}
      <a className="notice-title__more" href={moreHref} aria-label={`${title} 더보기`}>
        <img className="notice-title__icon" src={ICONS[variant]} alt="" />
      </a>
    </div>
  )
}

export default NoticeTitle
