import plusIcon from '../assets/icons/calendar-plus.svg'
import './Calendar.css'

/*
 * Calendar: 휴관일 달력 (Figma 「달력」 204-3753)
 * - 제목(휴관일) → 흰 카드 [<연.월.일> ＋] → 요일 → 날짜 → 안내(휴무일·행사일·오늘)
 * - 날짜 칸은 표(<table>)로 만들어 화면낭독기가 "목요일 1일"처럼 요일과 함께 읽게 함
 * - 동그라미 색만으로 구분하지 않도록, 날짜마다 '휴무일' 같은 글자를 숨겨서 함께 넣음
 *
 * props
 * - year, month: 보여줄 연도·달 (month는 1~12)
 * - holidays: 휴무일 날짜 배열 / today: 오늘 날짜 / plainDays: 표시 없는 날짜 배열
 * - moreHref: ＋ 버튼(휴관일 더보기)을 눌렀을 때 이동할 주소 (아직 없으면 '#')
 */

const WEEKDAYS = [
  { short: 'SUN', name: '일요일' },
  { short: 'MON', name: '월요일' },
  { short: 'TUE', name: '화요일' },
  { short: 'WED', name: '수요일' },
  { short: 'THU', name: '목요일' },
  { short: 'FRI', name: '금요일' },
  { short: 'SAT', name: '토요일' },
]

// 날짜 종류 → 화면낭독기용 글자
const TYPE_LABELS = {
  holiday: '휴무일',
  event: '행사일',
  today: '오늘',
}

// 1일이 무슨 요일인지, 그 달이 며칠까지인지 계산해서 7칸씩 끊은 주(week) 배열을 만듦
// 빈 칸은 null
function makeWeeks(year, month) {
  const firstWeekday = new Date(year, month - 1, 1).getDay() // 0 = 일요일
  const lastDate = new Date(year, month, 0).getDate() // 다음 달 0일 = 이번 달 마지막 날

  const cells = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let date = 1; date <= lastDate; date++) cells.push(date)
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

function Calendar({ year, month, holidays, today, plainDays, moreHref = '#' }) {
  const weeks = makeWeeks(year, month)

  // 날짜 하나가 어떤 종류인지 (표시 없는 날은 null)
  function getType(date) {
    if (date === today) return 'today'
    if (holidays.includes(date)) return 'holiday'
    if (plainDays.includes(date)) return null
    return 'event'
  }

  // 화면 위쪽에 보이는 날짜: Figma처럼 <2026.10.07> 모양 (오늘 날짜가 아니라 Figma 글자 그대로)
  const monthText = String(month).padStart(2, '0')

  return (
    <section className="calendar" aria-labelledby="calendar-title">
      <h2 className="calendar__title" id="calendar-title">
        휴관일
      </h2>

      <div className="calendar__card">
        <div className="calendar__top">
          <p className="calendar__month">
            {`<${year}.${monthText}.07>`}
          </p>
          <a className="calendar__more" href={moreHref} aria-label="휴관일 더보기">
            <img src={plusIcon} alt="" width="20.3542" height="20.3542" />
          </a>
        </div>

        <table className="calendar__table">
          <caption className="visually-hidden">
            {year}년 {month}월 휴관일 달력
          </caption>
          <thead>
            <tr className="calendar__weekdays">
              {WEEKDAYS.map((day) => (
                <th key={day.short} scope="col" abbr={day.name}>
                  {day.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((date, dayIndex) => {
                  if (date === null) return <td key={dayIndex} />

                  const type = getType(date)
                  return (
                    <td key={dayIndex}>
                      <span className={`calendar__day ${type ? `calendar__day--${type}` : ''}`}>
                        {date}
                        {type && <span className="visually-hidden"> {TYPE_LABELS[type]}</span>}
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* 안내: 색 점 + 글자 */}
        <ul className="calendar__legend" role="list">
          <li className="calendar__legend-item">
            <span className="calendar__dot calendar__dot--holiday" aria-hidden="true" />
            휴무일
          </li>
          <li className="calendar__legend-item">
            <span className="calendar__dot calendar__dot--event" aria-hidden="true" />
            행사일
          </li>
          <li className="calendar__legend-item">
            <span className="calendar__dot calendar__dot--today" aria-hidden="true" />
            오늘
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Calendar
