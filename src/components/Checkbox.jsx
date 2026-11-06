import checkedIcon from '../assets/icons/checkbox-checked.svg'
import emptyIcon from '../assets/icons/checkbox-empty.svg'
import './Checkbox.css'

/*
 * Checkbox: 체크박스 + 관심담기 (Figma 「체크박스」, 아이콘 Property 1 = 체크01(체크됨) / 체크02(빈칸))
 * - 누를 때마다 관심도서 담기 / 빼기가 바뀜
 * - aria-pressed: 화면낭독기에 "눌림(담김) / 안 눌림"을 알려줌
 *
 * props
 * - checked: 체크된 상태인지 여부
 * - onChange: 눌렀을 때 실행할 함수
 * - label: 옆에 보이는 글자 (기본값 '관심담기')
 */
function Checkbox({ checked, onChange, label = '관심담기' }) {
  return (
    <button className="checkbox" type="button" aria-pressed={checked} onClick={onChange}>
      {/* 글자(label)가 함께 있으므로 아이콘은 alt를 비움 */}
      <img className="checkbox__icon" src={checked ? checkedIcon : emptyIcon} alt="" />
      <span className="checkbox__label">{label}</span>
    </button>
  )
}

export default Checkbox
