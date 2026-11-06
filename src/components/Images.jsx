import './Images.css'

// 아이콘 PNG 16개 (Figma 섹션 603-1347 「메인메뉴 아이콘」에서 내려받음)
// 기본 = 파란색 아이콘 (메인메뉴아이콘/기본, 노드 603-1357)
import default01 from '../assets/images/default-01.png'
import default02 from '../assets/images/default-02.png'
import default03 from '../assets/images/default-03.png'
import default04 from '../assets/images/default-04.png'
import default05 from '../assets/images/default-05.png'
import default06 from '../assets/images/default-06.png'
import default07 from '../assets/images/default-07.png'
import default08 from '../assets/images/default-08.png'
// 호버 = 흰색 아이콘 (메인메뉴아이콘/호버, 노드 603-1348)
import hover01 from '../assets/images/hover-01.png'
import hover02 from '../assets/images/hover-02.png'
import hover03 from '../assets/images/hover-03.png'
import hover04 from '../assets/images/hover-04.png'
import hover05 from '../assets/images/hover-05.png'
import hover06 from '../assets/images/hover-06.png'
import hover07 from '../assets/images/hover-07.png'
import hover08 from '../assets/images/hover-08.png'

// variant(default = Figma 기본 / hover = Figma 호버)와 번호(01~08)로 이미지를 찾을 수 있게 표로 정리
const IMAGES = {
  default: {
    '01': default01,
    '02': default02,
    '03': default03,
    '04': default04,
    '05': default05,
    '06': default06,
    '07': default07,
    '08': default08,
  },
  hover: {
    '01': hover01,
    '02': hover02,
    '03': hover03,
    '04': hover04,
    '05': hover05,
    '06': hover06,
    '07': hover07,
    '08': hover08,
  },
}

/*
 * Images: 메인메뉴 아이콘 이미지 (70 × 70)
 * - Figma 컴포넌트 이름 01 ~ 08, 기본(파란색)·호버(흰색) 두 벌
 *
 * props
 * - number: '01' ~ '08' 중 하나 (Figma 컴포넌트 이름과 같음)
 * - variant: 'default'(Figma 기본, 파란색) 또는 'hover'(Figma 호버, 흰색)
 * - alt: 대체 텍스트. 옆에 메뉴 이름 글자가 함께 있으면 비워 둠(화면낭독기가 두 번 읽지 않게)
 * - className: 바깥에서 추가할 클래스 (예: 메인메뉴에서 호버 때 보이기/숨기기)
 */
function Images({ number, variant = 'default', alt = '', className = '' }) {
  const src = IMAGES[variant][number]

  return <img className={`images ${className}`} src={src} alt={alt} />
}

export default Images
