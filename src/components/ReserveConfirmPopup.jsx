import { useEffect, useId, useRef } from 'react'
import PopupButton from './PopupButton.jsx'
import './ReserveConfirmPopup.css'

/*
 * ReserveConfirmPopup: 도서예약 확인 팝업 (Figma 「도서예약 확인 팝업」 603-1574)
 * - 예약 대상 도서정보(제목 + 서지정보) → 신청문구 → [취소] [확인]
 * - 브라우저 기본 팝업 <dialog>를 사용:
 *   showModal()로 열면 뒤 화면이 가려지고, Esc로 닫히고, Tab 키 포커스가 팝업 안에 머묾
 *
 * props
 * - isOpen: 팝업을 열지 여부
 * - book: 예약할 도서 데이터 (src/data/books.js 한 권)
 * - onConfirm: 「확인」을 눌렀을 때 실행할 함수 (예약 확정 → Toast 안내 예정)
 * - onCancel: 「취소」를 누르거나 Esc로 닫았을 때 실행할 함수
 */
function ReserveConfirmPopup({ isOpen, book, onConfirm, onCancel }) {
  // <dialog> 태그를 직접 열고 닫기 위해 참조(ref)를 만듦
  const dialogRef = useRef(null)
  // 제목 id: 검색 결과처럼 팝업이 여러 개 있어도 id가 겹치지 않게 고유 id를 만듦
  const titleId = useId()

  // isOpen 값이 바뀌면 팝업을 열거나 닫음
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  // Esc 키로 닫힐 때: 브라우저가 닫기 전에 부모에게 "취소"라고 알려서 isOpen도 false로 맞춤
  function handleCancel(event) {
    event.preventDefault()
    onCancel()
  }

  return (
    <dialog
      ref={dialogRef}
      className="reserve-confirm-popup"
      aria-labelledby={titleId}
      onCancel={handleCancel}
    >
      {/* 예약 확인 내용 */}
      <div className="reserve-confirm-popup__content">
        {/* 예약 대상 도서정보 */}
        <div className="reserve-confirm-popup__book">
          <h2 id={titleId} className="reserve-confirm-popup__title">
            {book.title}
          </h2>

          {/* 예약 대상 서지정보 */}
          <div className="reserve-confirm-popup__details">
            <p>{book.author}</p>
            <p>{book.publishInfo}</p>
            <p className="reserve-confirm-popup__location">{book.location}</p>
            <p>{book.reservation}</p>
          </div>
        </div>

        {/* 신청문구 */}
        <p className="reserve-confirm-popup__question">도서예약을 신청하시겠습니까?</p>
      </div>

      {/* 예약 확인 버튼 모음: 취소(보조) → 확인(주) */}
      <div className="reserve-confirm-popup__buttons">
        <PopupButton text="취소" onClick={onCancel} />
        <PopupButton text="확인" onClick={onConfirm} isPrimary />
      </div>
    </dialog>
  )
}

export default ReserveConfirmPopup
