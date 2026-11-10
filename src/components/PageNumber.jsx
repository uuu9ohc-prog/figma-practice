import './PageNumber.css'

/*
 * PageNumber: 페이지 번호 버튼 (Figma 「체크박스 아이콘」 603-1695, Property 1 = 기본 / 클릭)
 * - Figma 이름은 「체크박스 아이콘」이지만 실제 모양은 검색 결과의 페이지 번호라서 코드 이름을 PageNumber로 지음
 * - 기본: 회색 숫자 / 클릭(지금 보고 있는 페이지): 흰 배경 + 테두리 + 주황 숫자
 * - aria-current="page": 지금 페이지라는 걸 색이 아닌 방법으로도 화면낭독기에 알려줌
 *
 * props
 * - number: 페이지 번호 (예: 1)
 * - isCurrent: 지금 보고 있는 페이지인지 여부 (Figma 「클릭」)
 * - onClick: 눌렀을 때 실행할 함수 (그 페이지로 이동)
 */
function PageNumber({ number, isCurrent = false, onClick }) {
  return (
    <button
      className="page-number"
      type="button"
      onClick={onClick}
      aria-current={isCurrent ? 'page' : undefined}
      aria-label={`${number}페이지`}
    >
      {number}
    </button>
  )
}

export default PageNumber
