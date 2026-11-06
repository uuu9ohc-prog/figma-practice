import './LogoGroup.css'

/*
 * LogoGroup: 로고 3개 묶음 (Figma 「로고세트」 안의 01 / 02 / 03)
 * - 로고 3개를 같은 칸 너비로 나란히 놓음
 *
 * props
 * - logos: 로고 3개 배열 ({ id, src, alt })
 * - hidden: 지금 화면에 안 보이는 묶음이면 true → 화면낭독기가 읽지 않게 함
 */
function LogoGroup({ logos, hidden = false }) {
  return (
    <ul className="logo-group" role="list" aria-hidden={hidden}>
      {logos.map((logo) => (
        <li key={logo.id} className="logo-group__item">
          <img className="logo-group__image" src={logo.src} alt={logo.alt} />
        </li>
      ))}
    </ul>
  )
}

export default LogoGroup
