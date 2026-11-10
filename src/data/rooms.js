/*
 * 자료실 선택 목록 목업 데이터 (통합자료검색 화면의 「전체 자료실」 선택 상자)
 * - 첫 번째 '전체 자료실'은 Figma 기본값, 나머지는 검색 결과에 나온 자료실을 두 갈래로 묶은 목업 값
 * - value: 코드에서 쓰는 영어 값 / label: 화면에 보이는 이름
 */
const rooms = [
  { value: 'all', label: '전체 자료실' },
  { value: 'general', label: '일반자료실' },
  { value: 'children', label: '어린이·아동자료실' },
]

export default rooms
