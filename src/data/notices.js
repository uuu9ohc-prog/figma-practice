/*
 * 메인 화면 공지사항·문화프로그램 목업 데이터 (Figma 「묶음05」 204-3778, 「묶음06」 204-3786 글 그대로)
 * - tagNumber: NoticeTag 번호 ('01' = 시립). Figma에서 모두 '시립' 태그
 * - 문화프로그램 제목은 Figma에 '...'로 잘린 글자가 들어 있어서, '...'만 빼고 넣음
 *   (화면에서는 CSS가 너비에 맞춰 … 으로 자름)
 */
export const notices = [
  { id: 1, tagNumber: '01', date: '10.08', title: "[라한호텔 경주산책] 10월_로컬 북토크 : 이경희 작가와 함께 '마음 둘 곳' 찾기" },
  { id: 2, tagNumber: '01', date: '10.07', title: '[라한호텔 경주산책] 10월_로컬북토크' },
  { id: 3, tagNumber: '01', date: '10.07', title: '(10/8)내남스마트도서관 이용중지' },
  { id: 4, tagNumber: '01', date: '10.17', title: '2026 하반기 북스타트 양육자교육특강' },
  { id: 5, tagNumber: '01', date: '10.31', title: '꿈마루작은도서관 10월 행사안내' },
]

export const culturePrograms = [
  { id: 1, tagNumber: '01', date: '10.17', title: '[시립] 2026 하반기 양육자교육-' },
  { id: 2, tagNumber: '01', date: '10.20', title: '[칠평] 안강의 일상을 그리다' },
  { id: 3, tagNumber: '01', date: '10.16', title: '[칠평] 일상을 찍고, 마음을 기록' },
  { id: 4, tagNumber: '01', date: '10.17', title: '[칠평] 창의융합 독서놀이터-감성' },
  { id: 5, tagNumber: '01', date: '10.31', title: '(경주책인축제)도전!어린이독서골든벨' },
]
