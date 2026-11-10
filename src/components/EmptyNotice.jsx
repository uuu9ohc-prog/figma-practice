import { Link } from 'react-router'
import './EmptyNotice.css'

/*
 * EmptyNotice: 빈 목록 안내 (Figma 「예약 목록 없음」 177-2851)
 * - 회색 안내 문장(예: 예약 중인 도서가 없습니다.) + 파란 [도서 검색하기] 버튼
 * - 버튼은 통합자료검색 화면으로 이동하는 링크 (Link: 새로고침 없이 이동 → 예약·관심도서 상태 유지)
 *
 * props
 * - message: 안내 문장
 */
function EmptyNotice({ message }) {
  return (
    <div className="empty-notice">
      <p className="empty-notice__message">{message}</p>
      <Link className="empty-notice__link" to="/search">
        도서 검색하기
      </Link>
    </div>
  )
}

export default EmptyNotice
