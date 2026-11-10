/*
 * 전체메뉴 목업 데이터 (Figma 「팝업창」 204-3830)
 * - 1depth: 왼쪽 목록 8개 (Figma 순서·글자 그대로)
 * - 2depth: Figma에는 '자료검색'의 하위 메뉴만 있어서 그것만 넣음
 *   (다른 메뉴는 하위 메뉴가 정해지면 children에 추가)
 * - 3depth: '통합자료검색'을 펼치면 나오는 메뉴. Figma에는 펼친 모양이 없어서
 *   이미 만든 화면(통합자료검색·예약현황·관심도서)으로 가는 링크만 넣음
 * - to: 이동할 주소 (아직 화면이 없으면 '#')
 */
const menus = [
  {
    label: '자료검색',
    children: [
      {
        label: '통합자료검색',
        children: [
          { label: '통합자료검색', to: '/search' },
          { label: '도서예약현황', to: '/reservations' },
          { label: '관심도서', to: '/interests' },
        ],
      },
      { label: '신착자료검색', to: '#' },
      { label: '대출베스트', to: '#' },
      { label: '희망도서신청', to: '#' },
      { label: '야간예약대출', to: '#' },
      { label: '고서검색', to: '#' },
      { label: '이달의 추천도서', to: '#' },
    ],
  },
  { label: '이용안내', children: [] },
  { label: '신청/참여', children: [] },
  { label: '열린마당', children: [] },
  { label: '도서관소개', children: [] },
  { label: '나만의도서관', children: [] },
  { label: '회원서비스', children: [] },
  { label: '홈페이지 이용안내', children: [] },
]

export default menus
