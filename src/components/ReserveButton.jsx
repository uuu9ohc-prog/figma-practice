import './ReserveButton.css'

/*
 * ReserveButton: 예약버튼 (Figma 「예약버튼」, Property 1 = 기본 / 호버)
 * - 기본: 초록 배경 / 호버: 진한 회색 배경 → CSS로 표현
 * - 버튼 위계(REQ-ACT-001): '도서 예약'은 눈에 띄는 주(Primary) 버튼
 *
 * props
 * - onClick: 눌렀을 때 실행할 함수 (나중에 예약 확인 모달을 열 때 사용)
 * - label: 버튼 글자 (기본값 '도서예약신청')
 */
function ReserveButton({ onClick, label = '도서예약신청' }) {
  return (
    <button className="reserve-button" type="button" onClick={onClick}>
      {label}
    </button>
  )
}

export default ReserveButton
