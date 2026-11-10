import Checkbox from './Checkbox.jsx'
import DetailButton from './DetailButton.jsx'
import ReserveButton from './ReserveButton.jsx'
import ReserveSet from './ReserveSet.jsx'
import './ButtonSet.css'

/*
 * ButtonSet: 버튼세트 (Figma 「버튼세트」 603-1597)
 * - [체크박스 관심담기] [도서예약신청 또는 예약확인] [상세보기] 를 한 줄에 양 끝 정렬
 * - 예약을 마치면 「도서예약신청」 자리에 「예약확인」(ReserveSet)이 들어감
 * - 좁은 화면(320px 등)에서는 다음 줄로 자연스럽게 넘어감 (가로 스크롤 방지)
 *
 * props
 * - isInterested: 관심도서로 담겼는지 여부 (체크박스 상태)
 * - onToggleInterest: 관심담기 체크박스를 눌렀을 때 실행할 함수
 * - isReserved: 예약을 마쳤는지 여부
 * - onReserve: 도서예약신청 버튼을 눌렀을 때 실행할 함수
 * - reserveSetRef: 예약 후 「예약확인」으로 키보드 포커스를 옮기기 위한 참조 (선택)
 * - reserveHref: 「예약확인」을 눌렀을 때 이동할 주소 (예약현황 화면)
 * - detailHref: 상세보기 링크 주소
 */
function ButtonSet({ isInterested, onToggleInterest, isReserved, onReserve, reserveSetRef, detailHref, reserveHref }) {
  return (
    <div className="button-set">
      <Checkbox checked={isInterested} onChange={onToggleInterest} />
      {isReserved ? (
        <ReserveSet ref={reserveSetRef} status="confirm" href={reserveHref} className="button-set__reserve-set" />
      ) : (
        <ReserveButton onClick={onReserve} />
      )}
      <DetailButton href={detailHref} />
    </div>
  )
}

export default ButtonSet
