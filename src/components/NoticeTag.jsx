import './NoticeTag.css'

// 번호(Figma 컴포넌트 이름 공지사항01~07)별 도서관 이름
const LABELS = {
  '01': '시립',
  '02': '송화',
  '03': '중앙',
  '04': '칠평',
  '05': '감포',
  '06': '단석',
  '07': '꿈마루',
}

/*
 * NoticeTag: 공지사항 도서관 태그 (Figma 「공지사항 아이콘」 603-1391의 공지사항01 ~ 07)
 * - 도서관마다 테두리·글자 색이 다름 (색은 NoticeTag.css에서 번호별로 지정)
 * - 색만이 아니라 글자(시립, 송화…)로도 구분되므로 접근성 규칙(색만으로 구분 금지)을 지킴
 *
 * props
 * - number: '01' ~ '07' (Figma 컴포넌트 이름의 번호와 같음)
 */
function NoticeTag({ number }) {
  return <span className={`notice-tag notice-tag--${number}`}>{LABELS[number]}</span>
}

export default NoticeTag
