import { useEffect, useState } from 'react'
import LogoGroup from './LogoGroup.jsx'
import './LogoCollection.css'

// 다음 묶음으로 넘어가는 간격 (3초)
const SLIDE_DELAY = 3000

/*
 * LogoCollection: 로고모음 (Figma 「로고모음」 603-2245, 로고01 ~ 로고04)
 * - 로고 3개 묶음이 3초마다 왼쪽으로 부드럽게 밀려나며 01 → 02 → 03 → 01 … 반복
 *   (Figma 로고01~04 = 띠가 한 묶음씩 밀려난 단계, 04는 01과 같은 복사본)
 * - 끊김 없이 반복하는 방법:
 *   맨 뒤에 01 복사본을 붙여 두고, 복사본까지 밀려나면 애니메이션 없이 진짜 01로 몰래 되돌림
 * - 접근성: 마우스를 올리거나 키보드 포커스하면 멈추고, 오른쪽 정지/재생 버튼으로 계속 멈출 수 있음
 *
 * props
 * - groups: 로고 묶음 배열 (src/data/logos.js)
 */
function LogoCollection({ groups }) {
  // 지금 보이는 묶음 순서 (0부터, groups.length는 01 복사본)
  const [index, setIndex] = useState(0)
  // 밀리는 애니메이션을 켤지 여부 (복사본 → 진짜 01로 되돌릴 때만 끔)
  const [isAnimated, setIsAnimated] = useState(true)
  // 정지 버튼으로 멈췄는지 / 마우스·포커스로 잠시 멈췄는지
  const [isStopped, setIsStopped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const total = groups.length
  const isMoving = !isStopped && !isHovered

  // 3초마다 다음 묶음으로
  useEffect(() => {
    if (!isMoving) return

    const timer = setInterval(() => {
      setIsAnimated(true)
      // 복사본 위치에 머물러 있으면(애니메이션을 끈 환경 등) 02로 바로 이어감
      setIndex((prev) => (prev >= total ? 1 : prev + 1))
    }, SLIDE_DELAY)

    return () => clearInterval(timer)
  }, [isMoving, total])

  // 밀리는 애니메이션이 끝났을 때: 복사본에 도착했으면 애니메이션 없이 진짜 01로 되돌림
  function handleTransitionEnd() {
    if (index === total) {
      setIsAnimated(false)
      setIndex(0)
    }
  }

  // 띠에 놓을 묶음: 01, 02, 03 + 끊김 없는 반복을 위한 01 복사본
  const slides = [...groups, groups[0]]
  // 지금 실제로 보이는 묶음 번호 (복사본이면 01과 같음)
  const visibleIndex = index % total

  return (
    <section
      className="logo-collection"
      aria-label="관련 기관"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div className="logo-collection__viewport">
        <div
          className={`logo-collection__track ${isAnimated ? 'logo-collection__track--animated' : ''}`}
          // 한 묶음 = 띠 너비 100% → index만큼 왼쪽으로 이동
          style={{ transform: `translateX(-${index * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((logos, i) => (
            <LogoGroup
              // 복사본은 진짜 01과 key가 겹치지 않게 따로 이름 붙임
              key={i === total ? 'copy' : i}
              logos={logos}
              // 지금 보이는 묶음만 화면낭독기가 읽음 (복사본은 항상 숨김)
              hidden={i === total || i !== visibleIndex}
            />
          ))}
        </div>
      </div>

      <button
        className="logo-collection__button"
        type="button"
        onClick={() => setIsStopped((prev) => !prev)}
        aria-label={isStopped ? '관련 기관 로고 넘김 재생' : '관련 기관 로고 넘김 정지'}
      >
        {/* 넘기는 중이면 ❚❚(정지), 멈춰 있으면 ▶(재생) - 아이콘 모양은 CSS mask로, 색은 토큰으로 */}
        <span
          className={`logo-collection__icon ${isStopped ? 'logo-collection__icon--play' : 'logo-collection__icon--pause'}`}
          aria-hidden="true"
        />
      </button>
    </section>
  )
}

export default LogoCollection
