import { useEffect } from 'react'
import { useLocation } from 'react-router'

/*
 * ScrollToTop: 다른 화면으로 이동하면 맨 위로 올려줌
 * - react-router는 화면만 바꾸고 스크롤 위치는 그대로 두기 때문에,
 *   예) 검색 결과 아래쪽에서 상세보기를 누르면 상세 화면도 아래쪽부터 보이는 문제를 막음
 * - 화면에 아무것도 그리지 않음 (null)
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  // 주소(pathname)가 바뀔 때마다 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
