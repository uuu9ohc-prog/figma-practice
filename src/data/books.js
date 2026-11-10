/*
 * 도서 목업 데이터 (Figma 「검색결과」 204-3931의 결과값 01 ~ 05, 「상세보기01」 204-4180 글을 그대로 옮김)
 * - 검색 결과·도서 상세·예약현황·관심도서 화면에서 함께 씀
 *
 * 화면별로 쓰는 값
 * - 검색 결과(BookListItem): thumbnail, title, author, publishInfo, location, reservation, loanStatus, loanDetail
 *   · loanStatus: 'available'(대출가능) 또는 'unavailable'(대출불가) (LoanBadge에 넘김)
 * - 검색 조건: libraryValue(src/data/libraries.js 값), roomValue(src/data/rooms.js 값), year(출판년도순 정렬)
 * - 예약현황·관심도서: libraryName, shelf, loanStatusText, returnDueDate, reservedCount(지금 예약한 사람 수)
 *   · Figma에는 1번 책 값만 있어서, 2~5번은 검색 결과에 적힌 소장 위치를 바탕으로 만든 목업 값
 * - 도서 상세: detail (Figma에는 1번 책만 있음 → 다른 책은 detail이 없고, 상세 화면에서 있는 정보만 보여줌)
 */
import bookThumb01 from '../assets/images/book-thumb-01.jpg'
import bookThumb02 from '../assets/images/book-thumb-02.jpg'
import bookThumb03 from '../assets/images/book-thumb-03.jpg'
import bookThumb04 from '../assets/images/book-thumb-04.jpg'
import bookThumb05 from '../assets/images/book-thumb-05.jpg'

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
    year: 2009,
    libraryValue: 'jungang',
    roomValue: 'general',
    libraryName: '경주시중앙도서관',
    shelf: '중앙-중앙자료실(1층)',
    loanStatusText: '대출 가능',
    returnDueDate: '2026.10.25',
    reservedCount: 0,
    detail: {
      summary: '에밀리 브론테 [지음]; 김종길 옮김 ㅣ 민음사 ㅣ 2009',
      materials: [
        { label: '· 자료유형', value: '도서' },
        { label: '· 형태사항', value: '572 p.; 23cm' },
        { label: '· 표준번호', value: 'ISBN 9788937461187: \\11000' },
        { label: '· 분류기호', value: '한국십진분류법: 808' },
        { label: '· 소장기관', value: '중앙도서관/ [중앙]자료실' },
      ],
      intro:
        "'문학동네 세계문학전집' 86권. 영국 요크셔의 황량한 벽촌에서 서른 해의 짧은 생을 살다간 에밀리 브론테가 세상을 떠나기 1년 전 남긴 그녀의 유일한 장편소설이다. '폭풍의 언덕'이라는 저택을 배경으로 캐서린과 히스클리프의 격정적인 사랑을 그린 이 작품은 서머싯 몸이 선정한 '세계 10대 소설' 중 하나이며, 셰익스피어의 <리어 왕>, 멜빌의 <모비 딕>과 더불어 영문학 3대 비극으로 꼽힌다.",
    },
  },
  {
    id: 2,
    thumbnail: bookThumb02,
    title: '폭풍의 언덕',
    author: '에밀리 브론테 지음; 이상교 엮음',
    publishInfo: '지경사 출판사 ㅣ 2010 ㅣ C 808-지14-3',
    location: '중앙도서관 ㅣ [중앙]자료실',
    reservation: '예약: 0명/ 3명',
    loanStatus: 'unavailable',
    loanDetail: '예약가능',
    year: 2010,
    libraryValue: 'jungang',
    roomValue: 'general',
    libraryName: '경주시중앙도서관',
    shelf: '중앙-중앙자료실(1층)',
    loanStatusText: '대출 중',
    returnDueDate: '2026.10.25',
    reservedCount: 0,
  },
  {
    id: 3,
    thumbnail: bookThumb03,
    title: '폭풍의 언덕',
    author: '에밀리 브론테 지음; 위수정 엮음',
    publishInfo: '지경사 출판사 ㅣ 2010 ㅣ C 808.9아68',
    location: '송화도서관 ㅣ [송화] 아동자료실',
    reservation: '예약: 0명/ 3명',
    loanStatus: 'available',
    loanDetail: '예약가능',
    year: 2010,
    libraryValue: 'songhwa',
    roomValue: 'children',
    libraryName: '송화도서관',
    shelf: '송화-아동자료실',
    loanStatusText: '대출 가능',
    returnDueDate: '2026.10.25',
    reservedCount: 0,
  },
  {
    id: 4,
    thumbnail: bookThumb04,
    title: '폭풍의 언덕',
    author: '에밀리 브론테 지음; 권영미 엮음',
    publishInfo: '삼성 출판사 ㅣ 2012ㅣ C 843브295ㅍㄱ',
    location: '경주시립도서관 ㅣ [시립](1층)어린이실',
    reservation: '예약: 0명/ 3명',
    loanStatus: 'available',
    loanDetail: '예약가능',
    year: 2012,
    libraryValue: 'sirip',
    roomValue: 'children',
    libraryName: '경주시립도서관',
    shelf: '시립-어린이실(1층)',
    loanStatusText: '대출 가능',
    returnDueDate: '2026.10.25',
    reservedCount: 0,
  },
  {
    id: 5,
    thumbnail: bookThumb05,
    title: '폭풍의 언덕',
    author: '에밀리 브론테 지음; 공경희 옮김',
    publishInfo: '푸른숲주니어 ㅣ 2006 ㅣ 808.9-푸29',
    location: '송화도서관 ㅣ [송화] 아동자료실',
    reservation: '예약: 2명/ 3명',
    loanStatus: 'unavailable',
    loanDetail: '예약불가',
    year: 2006,
    libraryValue: 'songhwa',
    roomValue: 'children',
    libraryName: '송화도서관',
    shelf: '송화-아동자료실',
    loanStatusText: '대출 중',
    returnDueDate: '2026.10.25',
    reservedCount: 2,
  },
]

export default books
