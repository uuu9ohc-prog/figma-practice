import './BookCover.css'

// 추천도서 표지 (Figma 섹션 「책표지」 116-1612의 컴포넌트 01 ~ 05)
import cover01 from '../assets/images/book-cover-01.jpg'
import cover02 from '../assets/images/book-cover-02.jpg'
import cover03 from '../assets/images/book-cover-03.jpg'
import cover04 from '../assets/images/book-cover-04.jpg'
import cover05 from '../assets/images/book-cover-05.jpg'

// 번호(01~05)로 표지를 찾을 수 있게 표로 정리
const COVERS = {
  '01': cover01,
  '02': cover02,
  '03': cover03,
  '04': cover04,
  '05': cover05,
}

/*
 * BookCover: 추천도서 책표지 (260 × 360)
 *
 * props
 * - number: '01' ~ '05' (Figma 컴포넌트 이름과 같음)
 * - alt: 대체 텍스트 (예: '나는 개다 표지')
 */
function BookCover({ number, alt }) {
  return <img className="book-cover" src={COVERS[number]} alt={alt} />
}

export default BookCover
