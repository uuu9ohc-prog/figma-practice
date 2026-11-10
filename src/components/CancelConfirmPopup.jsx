import { useEffect, useId, useRef } from 'react'
import ConfirmCancelButton from './ConfirmCancelButton.jsx'
import './CancelConfirmPopup.css'

/*
 * CancelConfirmPopup: 취소 확인 팝업 (Figma 「예약취소 확인 팝업」 177-2629, 353-758)
 * - 질문(도서예약을 취소하시겠습니까?) → 책 제목 → 안내 2줄 → [취소] [확인]
 * - 예약 취소·관심도서 취소에 같은 모양이라 글자만 props로 바꿔 씀
 * - 버튼은 ConfirmCancelButton 재사용: 취소 = 흰 배경(보조), 확인 = 진한 배경(주) (REQ-ACT-002)
 * - 브라우저 기본 팝업 <dialog>: Esc로 닫히고, Tab 키 포커스가 팝업 안에 머묾
 *
 * props
 * - isOpen: 팝업을 열지 여부
 * - question: 맨 위 질문
 * - bookTitle: 취소할 책 제목
 * - message: 첫째 안내 (예: 취소를 확정하기 전까지 예약은 유지됩니다.)
 * - help: 둘째 안내 (버튼 설명)
 * - onConfirm: 「확인」(취소 확정)을 눌렀을 때 실행할 함수
 * - onCancel: 「취소」(유지)를 누르거나 Esc로 닫았을 때 실행할 함수
 */
function CancelConfirmPopup({ isOpen, question, bookTitle, message, help, onConfirm, onCancel }) {
  const dialogRef = useRef(null)
  const titleId = useId()

  // isOpen 값이 바뀌면 팝업을 열거나 닫음
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  // Esc로 닫힐 때: 부모에게 "취소"라고 알려서 isOpen도 false로 맞춤
  function handleCancel(event) {
    event.preventDefault()
    onCancel()
  }

  return (
    <dialog ref={dialogRef} className="cancel-confirm-popup" aria-labelledby={titleId} onCancel={handleCancel}>
      <h2 className="cancel-confirm-popup__question" id={titleId}>
        {question}
      </h2>

      <div className="cancel-confirm-popup__info">
        <p className="cancel-confirm-popup__book">{bookTitle}</p>
        <p className="cancel-confirm-popup__message">{message}</p>
        <p className="cancel-confirm-popup__help">{help}</p>
      </div>

      <div className="cancel-confirm-popup__buttons">
        <ConfirmCancelButton variant="cancel" onClick={onCancel} />
        <ConfirmCancelButton variant="confirm" onClick={onConfirm} />
      </div>
    </dialog>
  )
}

export default CancelConfirmPopup
