import './MaterialBundle.css'

/*
 * MaterialBundle: 자료묶음 (Figma 「자료묶음」 603-1709)
 * - "· 자료유형: 도서" 처럼 굵은 항목 이름 + 보통 굵기 값을 한 줄로 보여줌
 *
 * props
 * - label: 항목 이름 (예: '· 자료유형:')
 * - value: 값 (예: '도서')
 */
function MaterialBundle({ label, value }) {
  return (
    <p className="material-bundle">
      <strong className="material-bundle__label">{label}</strong> {value}
    </p>
  )
}

export default MaterialBundle
