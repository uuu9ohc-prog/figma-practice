import { Link } from 'react-router'
import './ReserveSet.css'

/*
 * ReserveSet: 예약세트 (Figma 「예약세트」 603-1700)
 * - status 값에 따라 두 가지 모양
 *   reserved (Figma 예약중): 회색 글자 "예약중" 버튼, 누르면 예약 취소
 *   confirm  (Figma 예약확인): 흰 배경 + 테두리 + 굵은 글자, 누르면 내 예약 확인으로 이동
 *                              → 예약을 마친 책에서 「도서예약신청」 버튼 자리에 들어감
 * - 호버(Figma 예약중호버·예약확인호버): 연한 회색 배경 → CSS로 표현
 *
 * props
 * - status: 'reserved'(예약중) 또는 'confirm'(예약확인)
 * - onCancel: 「예약중」을 눌렀을 때 실행할 함수 (예약 취소)
 * - href: 「예약확인」을 눌렀을 때 이동할 주소 (아직 없으면 '#')
 * - className: 놓이는 자리에 맞춰 바깥에서 추가할 클래스 (예: 버튼세트 안)
 * - ref: 부모가 이 버튼/링크로 키보드 포커스를 옮길 때 사용 (React 19에서는 ref를 일반 props처럼 받음)
 */
// Link: 새로고침 없이 화면만 바꾸는 링크 (새로고침하면 예약·관심도서 상태가 사라지므로 <a> 대신 사용)
function ReserveSet({ status, onCancel, href = '#', className = '', ref }) {
  if (status === 'confirm') {
    return (
      <Link ref={ref} className={`reserve-set reserve-set--confirm ${className}`} to={href}>
        예약확인
      </Link>
    )
  }

  return (
    <button
      ref={ref}
      className={`reserve-set reserve-set--reserved ${className}`}
      type="button"
      onClick={onCancel}
      // 화면에는 "예약중"만 보이므로, 누르면 무엇을 하는지 화면낭독기에 함께 알려줌
      // (보이는 글자 "예약중"을 앞에 넣어 음성 명령으로도 찾을 수 있게 함)
      aria-label="예약중, 누르면 예약 취소"
    >
      예약중
    </button>
  )
}

export default ReserveSet
