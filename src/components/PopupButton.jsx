import './PopupButton.css'

/*
 * PopupButton: 팝업 버튼 (Figma 「버튼」 89-2416, Property 1 = 기본 / 호버)
 * - Figma에서는 「예약 취소 버튼」「예약 확인 버튼」으로 쓰임
 * - 기본: 굵은 글자만 / 호버: 연한 회색 배경 → CSS로 표현
 * - isPrimary: 확정 버튼을 눈에 띄게 (REQ-ACT-002 확정/취소 위계 구분, 사용자와 정함)
 *   → 초록 배경 + 흰 글자 (예약버튼과 같은 색)
 *
 * props
 * - text: 버튼 글자 (예: '취소', '확인')
 * - onClick: 눌렀을 때 실행할 함수
 * - isPrimary: 주(확정) 버튼이면 true
 */
function PopupButton({ text, onClick, isPrimary = false }) {
  return (
    <button
      className={`popup-button ${isPrimary ? 'popup-button--primary' : ''}`}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default PopupButton
