import { useEffect, useState } from 'react'
import ArrowKey from './ArrowKey.jsx'
import BannerImage from './BannerImage.jsx'
import './Banner.css'

// 자동으로 다음 배너로 넘어가는 간격 (5초)
const AUTO_PLAY_DELAY = 5000

/*
 * Banner: 배너 (Figma 「배너」 컴포넌트, 노드 603-1316 등)
 * - 이미지 → 글(도서관 이름·제목·본문) → 방향키 순서로 세로 배치
 * - 한 번에 배너 하나만 보여주고, 방향키로 이전/다음 이동, 정지 버튼으로 자동 넘김을 멈춤
 *
 * props
 * - banners: 배너 데이터 배열 (src/data/banners.js)
 */
function Banner({ banners }) {
  // 지금 보이는 배너의 순서 (0부터 시작)
  const [index, setIndex] = useState(0)
  // 자동 넘김 중인지 여부
  const [isPlaying, setIsPlaying] = useState(true)

  const total = banners.length
  const banner = banners[index]

  // 이전: 첫 번째에서 누르면 마지막으로
  function goPrev() {
    setIndex((prev) => (prev - 1 + total) % total)
  }

  // 다음: 마지막에서 누르면 첫 번째로
  function goNext() {
    setIndex((prev) => (prev + 1) % total)
  }

  // 자동 넘김: 재생 중일 때만 5초마다 다음 배너로
  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total)
    }, AUTO_PLAY_DELAY)

    // 정지하거나 화면에서 사라지면 타이머를 지움
    return () => clearInterval(timer)
  }, [isPlaying, total])

  return (
    // aria-roledescription: 화면낭독기에 "슬라이드"라고 한국어로 알려줌
    <section className="banner" aria-roledescription="슬라이드" aria-label="도서관 소식 배너">
      {/* 자동 넘김 중에는 바뀔 때마다 읽지 않고(off), 직접 넘길 때만 읽어줌(polite) */}
      <div className="banner__slide" aria-live={isPlaying ? 'off' : 'polite'}>
        <BannerImage number={banner.imageNumber} alt={banner.title} />

        <div className="banner__text">
          <div className="banner__heading">
            <p className="banner__library">{banner.library}</p>
            <h2 className="banner__title">{banner.title}</h2>
          </div>

          <div className="banner__body">
            {banner.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      <ArrowKey
        current={index + 1}
        total={total}
        isPlaying={isPlaying}
        onPrev={goPrev}
        onNext={goNext}
        onTogglePlay={() => setIsPlaying((prev) => !prev)}
      />
    </section>
  )
}

export default Banner
