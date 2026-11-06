import './BannerImage.css'

// 배너 이미지 (Figma 섹션 「배너」 603-1308의 컴포넌트 01 ~ 05)
// Figma 06은 01과 똑같은 이미지라 넣지 않음
import banner01 from '../assets/images/banner-01.jpg'
import banner02 from '../assets/images/banner-02.jpg'
import banner03 from '../assets/images/banner-03.jpg'
import banner04 from '../assets/images/banner-04.jpg'
import banner05 from '../assets/images/banner-05.jpg'

// 번호(01~05)로 이미지를 찾을 수 있게 표로 정리
const BANNER_IMAGES = {
  '01': banner01,
  '02': banner02,
  '03': banner03,
  '04': banner04,
  '05': banner05,
}

/*
 * BannerImage: 배너 이미지 (348 × 227)
 *
 * props
 * - number: '01' ~ '05' (Figma 컴포넌트 이름과 같음)
 * - alt: 대체 텍스트 (이미지 속 글자를 대신할 설명)
 */
function BannerImage({ number, alt }) {
  return <img className="banner-image" src={BANNER_IMAGES[number]} alt={alt} />
}

export default BannerImage
