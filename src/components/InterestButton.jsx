import './InterestButton.css'

/*
 * InterestButton: 관심도서 담기 버튼 (Figma 「전체도서관」 603-1710, Property 1 = 기본 / 호버)
 * - Figma 이름은 「전체도서관」이지만 실제 글자는 '관심도서 담기'라서 코드 이름을 InterestButton으로 지음
 * - 버튼 위계(REQ-ACT-001): '관심도서 담기'는 보조(Secondary) 버튼 → 흰 배경 + 테두리
 * - 호버: 연한 회색 배경 → CSS로 표현
 *
 * props
 * - onClick: 눌렀을 때 실행할 함수 (관심도서 등록 → Toast 안내 예정)
 * - label: 버튼 글자 (기본값 '관심도서 담기')
 */
function InterestButton({ onClick, label = '관심도서 담기' }) {
  return (
    <button className="interest-button" type="button" onClick={onClick}>
      {label}
    </button>
  )
}

export default InterestButton
