/*
 * 도서관 선택 목록 목업 데이터 (LibrarySelect에서 사용)
 * - 첫 번째 '전체도서관'은 Figma 「도서관 검색01」 기본값
 * - 나머지는 Figma 공지사항 태그(시립·송화·중앙·칠평·감포·단석·꿈마루)를 바탕으로 만든 목업 이름
 *   (경주시립도서관·중앙도서관·송화도서관·꿈마루작은도서관은 Figma 화면에 나온 이름 그대로)
 * - value: 코드에서 쓰는 영어 값 / label: 화면에 보이는 이름
 */
const libraries = [
  { value: 'all', label: '전체도서관' },
  { value: 'sirip', label: '경주시립도서관' },
  { value: 'jungang', label: '중앙도서관' },
  { value: 'songhwa', label: '송화도서관' },
  { value: 'chilpyeong', label: '칠평도서관' },
  { value: 'gampo', label: '감포도서관' },
  { value: 'danseok', label: '단석도서관' },
  { value: 'kkummaru', label: '꿈마루작은도서관' },
]

export default libraries
