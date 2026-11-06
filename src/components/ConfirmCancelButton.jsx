import './ConfirmCancelButton.css'

// 코드 값(영어) → 화면에 보이는 글자(Figma 상태 이름)
const LABELS = {
  confirm: '확인',
  cancel: '취소',
}

/*
 * ConfirmCancelButton: 확인/취소 버튼 (Figma 「버튼」 603-1604, Property 1 = 확인 / 취소)
 * - Figma 이름이 「버튼」으로 PopupButton(603-1641)과 같아서, 코드에서는 이름을 구분함
 * - confirm(확인): 진한 배경 + 흰 글자 / cancel(취소): 흰 배경 + 진한 글자
 *   → 확정/취소 버튼 위계가 모양으로 구분됨 (REQ-ACT-002)
 *
 * props
 * - variant: 'confirm'(확인) 또는 'cancel'(취소)
 * - onClick: 눌렀을 때 실행할 함수
 */
function ConfirmCancelButton({ variant, onClick }) {
  return (
    <button className={`confirm-cancel-button confirm-cancel-button--${variant}`} type="button" onClick={onClick}>
      {LABELS[variant]}
    </button>
  )
}

export default ConfirmCancelButton
