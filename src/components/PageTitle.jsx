import breadcrumbIcon from '../assets/icons/breadcrumb.svg'
import plusIcon from '../assets/icons/title-plus.svg'
import './PageTitle.css'

/*
 * PageTitle: 화면 제목줄 (Figma 「메뉴창헤더」 204-3862, 통합자료검색·도서상세 화면)
 * - 위: 큰 제목(통합자료검색) + 오른쪽 ＋ 그림
 * - 아래: ☰ >자료검색>통합자료검색 (지금 위치를 알려주는 경로)
 * - ＋ 그림은 Figma에 눌렀을 때 동작이 정해져 있지 않아 장식으로만 넣음 (화면낭독기는 읽지 않음)
 *
 * props
 * - title: 제목 (기본값 '통합자료검색')
 * - path: 경로 글자 배열 (기본값 ['자료검색', '통합자료검색'])
 */
function PageTitle({ title = '통합자료검색', path = ['자료검색', '통합자료검색'] }) {
  return (
    <div className="page-title">
      <div className="page-title__top">
        <h1 className="page-title__text">{title}</h1>
        <img className="page-title__plus" src={plusIcon} alt="" width="34" height="28" />
      </div>

      {/* 경로: 화면낭독기에는 "현재 위치" 목록으로 알려줌 */}
      <nav className="page-title__path" aria-label="현재 위치">
        <img src={breadcrumbIcon} alt="" width="16.3333" height="13.3333" />
        <ol className="page-title__path-list" role="list">
          {path.map((name) => (
            <li key={name} className="page-title__path-item">
              {name}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

export default PageTitle
