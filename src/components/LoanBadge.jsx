import './LoanBadge.css'

// 코드 값(영어) → 화면에 보이는 글자(Figma 상태 이름)
const LABELS = {
  available: '대출가능',
  unavailable: '대출불가',
}

/*
 * LoanBadge: 대출가능여부 배지 (Figma 「대출가능여부」, Property 1 = 대출가능 / 대출불가)
 * - available(대출가능): 초록 배경 / unavailable(대출불가): 빨간 배경
 * - 색만이 아니라 글자(대출가능·대출불가)로도 상태를 알려줌 (접근성: 색만으로 구분 금지)
 *
 * props
 * - status: 'available'(대출가능) 또는 'unavailable'(대출불가)
 */
function LoanBadge({ status }) {
  // 상태 값을 그대로 CSS 클래스에 붙여서 배경색을 다르게 함
  return <span className={`loan-badge loan-badge--${status}`}>{LABELS[status]}</span>
}

export default LoanBadge
