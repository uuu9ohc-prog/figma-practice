import './StatusMessage.css'

/*
 * StatusMessage: 완료 안내 제목 (Figma 「신청헤더」 204-4258, 「예약 취소 완료 안내」 177-2842)
 * - 큰 글자 안내(예: 도서예약신청을 완료하였습니다.) → 건수(예: 예약현황 건수: 총 1건) → 아래 구분선
 * - role="status": 화면이 바뀌거나 취소했을 때 화면낭독기가 안내 문장을 바로 읽어줌
 *
 * props
 * - title: 큰 글자 안내
 * - countText: 건수 글자
 */
function StatusMessage({ title, countText }) {
  return (
    <div className="status-message" role="status">
      <h1 className="status-message__title">{title}</h1>
      <p className="status-message__count">{countText}</p>
    </div>
  )
}

export default StatusMessage
