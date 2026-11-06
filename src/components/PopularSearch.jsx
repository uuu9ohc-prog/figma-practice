import { useEffect, useState } from 'react'
import pauseIcon from '../assets/icons/pause.svg'
import playIcon from '../assets/icons/play.svg'
import './PopularSearch.css'

// 맨 앞 검색어가 다음 것으로 바뀌는 간격 (3초)
const ROTATE_DELAY = 3000

/*
 * PopularSearch: 인기검색창 (Figma 「인기검색창」 603-2244)
 * - 파란 바 안에 인기 검색어를 한 줄로 보여주고, 3초마다 맨 앞 검색어가 한 칸씩 넘어감
 *   (Figma 프레임 11개 = 검색어 11개가 하나씩 앞으로 오는 단계)
 * - 접근성: 자동으로 움직이는 내용은 멈출 수 있어야 함
 *   → 마우스를 올리거나 키보드로 포커스하면 잠시 멈추고, 오른쪽 정지/재생 버튼으로 계속 멈출 수 있음
 * - 검색어는 보여주기만 함 (누를 수 없음)
 *
 * props
 * - keywords: 인기 검색어 배열 (src/data/popularKeywords.js)
 */
function PopularSearch({ keywords }) {
  // 지금 맨 앞에 보이는 검색어의 순서 (0부터 시작)
  const [startIndex, setStartIndex] = useState(0)
  // 정지 버튼으로 멈췄는지 여부
  const [isStopped, setIsStopped] = useState(false)
  // 마우스를 올렸거나 키보드 포커스가 들어와 있는지 여부
  const [isHovered, setIsHovered] = useState(false)

  const total = keywords.length
  const isMoving = !isStopped && !isHovered

  // 3초마다 맨 앞 검색어를 다음 것으로 (마지막 다음은 다시 처음)
  useEffect(() => {
    if (!isMoving) return

    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % total)
    }, ROTATE_DELAY)

    // 멈추거나 화면에서 사라지면 타이머를 지움
    return () => clearInterval(timer)
  }, [isMoving, total])

  // startIndex부터 시작해서 한 바퀴 돈 순서로 다시 정렬
  // 예) startIndex가 2면 [해리포터, 그리스로마신화, …, 흔한남매, 삼국지]
  const ordered = [...keywords.slice(startIndex), ...keywords.slice(0, startIndex)]

  return (
    <section
      className="popular-search"
      aria-label="인기 검색어"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* 순서가 있는 목록이라 ol 사용, 점·번호는 CSS로 숨김 */}
      <ol className="popular-search__list" role="list">
        {ordered.map((keyword) => (
          <li key={keyword} className="popular-search__item">
            {keyword}
          </li>
        ))}
      </ol>

      <button
        className="popular-search__button"
        type="button"
        onClick={() => setIsStopped((prev) => !prev)}
        aria-label={isStopped ? '인기 검색어 넘김 재생' : '인기 검색어 넘김 정지'}
      >
        {/* 넘기는 중이면 ❚❚(정지), 멈춰 있으면 ▶(재생) */}
        <img className="popular-search__icon" src={isStopped ? playIcon : pauseIcon} alt="" />
      </button>
    </section>
  )
}

export default PopularSearch
