/*
 * 휴관일 달력 목업 데이터 (Figma 「달력」 204-3753, 2026년 10월 화면 그대로)
 * - holidays: 빨간 동그라미 = 휴무일
 * - today: 진한 회색 동그라미 = 오늘
 * - plainDays: 아무 표시 없는 날 (Figma에서 2일·6일)
 * - 나머지 날짜는 모두 파란 동그라미 = 행사일
 */
const calendar = {
  year: 2026,
  month: 10, // 사람이 읽는 달 (1월 = 1)
  holidays: [3, 5, 9, 12, 19],
  today: 13,
  plainDays: [2, 6],
}

export default calendar
