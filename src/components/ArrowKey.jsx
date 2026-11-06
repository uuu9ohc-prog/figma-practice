import arrowLeftIcon from '../assets/icons/arrow-left.svg'
import arrowRightIcon from '../assets/icons/arrow-right.svg'
import pauseIcon from '../assets/icons/pause.svg'
// 재생 아이콘은 Figma에 없어서 pause.svg와 같은 모양 규칙으로 직접 만듦
import playIcon from '../assets/icons/play.svg'
import './ArrowKey.css'

/*
 * ArrowKey: 배너 방향키 (Figma 「방향키」, 배너 컴포넌트 안에 들어 있음)
 * - [이전] 현재/전체 [정지] [다음] 순서
 * - 버튼마다 터치 영역 44px을 지키려고 Figma(133px)보다 조금 넓어짐
 *
 * props
 * - current: 지금 보이는 배너 번호 (1부터 시작)
 * - total: 전체 배너 개수
 * - isPlaying: 자동 넘김 중인지 여부
 * - onPrev / onNext: 이전 / 다음 버튼을 눌렀을 때 실행할 함수
 * - onTogglePlay: 정지/재생 버튼을 눌렀을 때 실행할 함수
 */
function ArrowKey({ current, total, isPlaying, onPrev, onNext, onTogglePlay }) {
  return (
    <div className="arrow-key">
      <button className="arrow-key__button" type="button" onClick={onPrev} aria-label="이전 배너">
        {/* 버튼에 aria-label이 있으므로 아이콘은 alt를 비움 */}
        <img className="arrow-key__icon" src={arrowLeftIcon} alt="" />
      </button>

      {/* 현재 몇 번째 배너인지 (예: 1/5) */}
      <p className="arrow-key__count">
        {current}/{total}
      </p>

      <button
        className="arrow-key__button"
        type="button"
        onClick={onTogglePlay}
        // 버튼 이름이 상태에 따라 바뀌므로, 화면낭독기는 "누르면 무엇을 하는지"를 읽어줌
        aria-label={isPlaying ? '자동 넘김 정지' : '자동 넘김 재생'}
      >
        {/* 재생 중이면 ❚❚(정지) 아이콘, 멈춰 있으면 ▶(재생) 아이콘 */}
        <img className="arrow-key__icon" src={isPlaying ? pauseIcon : playIcon} alt="" />
      </button>

      <button className="arrow-key__button" type="button" onClick={onNext} aria-label="다음 배너">
        {/* Figma에서도 왼쪽 화살표를 뒤집어 씀 → CSS로 좌우 반전 */}
        <img className="arrow-key__icon arrow-key__icon--flip" src={arrowRightIcon} alt="" />
      </button>
    </div>
  )
}

export default ArrowKey
