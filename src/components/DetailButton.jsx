import { Link } from 'react-router'
import arrowIcon from '../assets/icons/detail-arrow.svg'
import arrowWhiteIcon from '../assets/icons/detail-arrow-white.svg'
import './DetailButton.css'

/*
 * DetailButton: 상세보기 버튼 (Figma 「전체도서관」 인스턴스, Property 1 = 기본 / 호버)
 * - 기본: 흰 배경 + 회색 ▶ / 호버: 진한 회색 배경 + 흰 글자 + 흰 ▶
 * - 누르면 도서 상세 화면으로 이동하므로 <a>(링크)로 만듦
 *
 * props
 * - href: 이동할 주소 (예: '/books/1', 아직 없으면 '#')
 * - label: 버튼 글자 (기본값 '상세보기')
 */
// Link: 새로고침 없이 화면만 바꾸는 링크 (새로고침하면 예약·관심도서 상태가 사라지므로 <a> 대신 사용)
function DetailButton({ href = '#', label = '상세보기' }) {
  return (
    <Link className="detail-button" to={href}>
      <span className="detail-button__label">{label}</span>
      {/* 기본·호버 화살표를 둘 다 넣고 CSS로 상태에 맞는 것만 보여줌 */}
      <span className="detail-button__icon-box" aria-hidden="true">
        <img className="detail-button__icon detail-button__icon--default" src={arrowIcon} alt="" />
        <img className="detail-button__icon detail-button__icon--hover" src={arrowWhiteIcon} alt="" />
      </span>
    </Link>
  )
}

export default DetailButton
