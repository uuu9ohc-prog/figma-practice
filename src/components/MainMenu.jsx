import Images from './Images.jsx'
import './MainMenu.css'

/*
 * MainMenu: 메인메뉴 카드 (Figma 컴포넌트 「메인메뉴」, 노드 603-1366)
 * - Figma 상태 2개를 CSS로 표현
 *   기본: 흰 배경 + 파란 아이콘 + 회색 보통 글자
 *   호버: 파란 그라데이션 배경 + 흰 아이콘 + 흰 굵은 글자
 * - 누르면 해당 메뉴로 이동하므로 <a>(링크)로 만듦 → 키보드 Tab으로도 이동 가능
 * - 키보드로 포커스했을 때도 호버와 같은 모습이 되게 CSS에서 처리
 *
 * props
 * - label: 메뉴 이름 (예: '이용안내')
 * - number: 아이콘 번호 '01' ~ '08' (Images 컴포넌트에 그대로 넘김)
 * - href: 이동할 주소 (아직 정해지지 않았으면 '#')
 */
function MainMenu({ label, number, href = '#' }) {
  return (
    <a className="main-menu" href={href}>
      {/* 기본·호버 아이콘을 둘 다 넣고, CSS로 상태에 맞는 것만 보여줌
          (마우스를 올릴 때 이미지를 새로 불러오지 않아 깜빡임이 없음) */}
      <Images number={number} variant="default" className="main-menu__icon main-menu__icon--default" />
      <Images number={number} variant="hover" className="main-menu__icon main-menu__icon--hover" />
      <span className="main-menu__label">{label}</span>
    </a>
  )
}

export default MainMenu
