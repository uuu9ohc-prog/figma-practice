/*
 * 도서 목업 데이터 (Figma 「세트」 603-1595의 책소개 세트 내용을 그대로 옮김)
 * - 검색 결과·도서 상세 화면에서 쓸 도서 목록. 지금은 Figma에 있는 1권만 넣음
 * - loanStatus: 'available'(대출가능) 또는 'unavailable'(대출불가) (LoanBadge에 넘김)
 */
import bookThumb01 from '../assets/images/book-thumb-01.jpg'

const books = [
  {
    id: 1,
    thumbnail: bookThumb01,
    title: '폭풍의 언덕',
    author: '에밀리 브론테 지음; 김종길 옮김',
    publishInfo: '민음사 출판사 ㅣ 2009 ㅣ 808-세14-118',
    location: '중앙도서관 ㅣ [중앙]자료실',
    reservation: '예약: 0명/ 3명',
    loanStatus: 'available',
    loanDetail: '대출가능(비치중)',
  },
]

export default books
