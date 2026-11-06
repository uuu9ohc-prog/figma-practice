/*
 * 로고 목업 데이터 (Figma 「로고모음」 603-2245의 로고 9개, 묶음 01~03 순서 그대로)
 * - 3개씩 한 묶음. Figma 묶음 04는 01과 같아서(끊김 없는 반복용) 데이터에는 넣지 않음
 * - alt: 로고 이미지 안의 글자를 그대로 옮김
 */
import logo01 from '../assets/images/logo-01.jpg'
import logo02 from '../assets/images/logo-02.png'
import logo03 from '../assets/images/logo-03.png'
import logo04 from '../assets/images/logo-04.png'
import logo05 from '../assets/images/logo-05.jpg'
import logo06 from '../assets/images/logo-06.png'
import logo07 from '../assets/images/logo-07.png'
import logo08 from '../assets/images/logo-08.jpg'
import logo09 from '../assets/images/logo-09.png'

const logoGroups = [
  // 묶음 01
  [
    { id: 1, src: logo01, alt: '경주시청 채용공고' },
    { id: 2, src: logo02, alt: '국회도서관' },
    { id: 3, src: logo03, alt: '사서에게 물어보세요' },
  ],
  // 묶음 02
  [
    { id: 4, src: logo04, alt: '국립중앙도서관' },
    { id: 5, src: logo05, alt: '경상북도 채용공고' },
    { id: 6, src: logo06, alt: '신라학' },
  ],
  // 묶음 03
  [
    { id: 7, src: logo07, alt: '경주시청' },
    { id: 8, src: logo08, alt: '경주공공서비스예약' },
    { id: 9, src: logo09, alt: '1365 자원봉사' },
  ],
]

export default logoGroups
