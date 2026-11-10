import { Link } from 'react-router'
import './MaterialSearchLink.css'

/*
 * MaterialSearchLink: 자료검색 링크 (Figma 「자료검색」 603-1662, Property 1 = 기본 / 호버)
 * - "통합자료검색" 글자 링크
 * - 기본: 회색 글자 / 호버: 진한 파랑 글자 + 밑줄 → CSS로 표현
 * - Figma에서 같은 이름의 펼침 버튼(603-1667)과 구분하려고 코드 이름을 다르게 지음
 *
 * props
 * - text: 링크 글자 (기본값 '통합자료검색')
 * - href: 이동할 주소 (아직 없으면 '#')
 */
// Link: 새로고침 없이 화면만 바꾸는 링크 (새로고침하면 예약·관심도서 상태가 사라지므로 <a> 대신 사용)
function MaterialSearchLink({ text = '통합자료검색', href = '#' }) {
  return (
    <Link className="material-search-link" to={href}>
      {text}
    </Link>
  )
}

export default MaterialSearchLink
