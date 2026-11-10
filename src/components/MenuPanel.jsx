import { useEffect, useId, useRef, useState } from 'react'
import menus from '../data/menus.js'
import ListItem from './ListItem.jsx'
import MaterialSearchDropdown from './MaterialSearchDropdown.jsx'
import MaterialSearchLink from './MaterialSearchLink.jsx'
import './MenuPanel.css'

/*
 * MenuPanel: 전체메뉴 팝업 (Figma 「팝업창」 204-3830) (REQ-NAV-001)
 * - 위: 진한 배경 + [로그인][회원가입][아이디찾기][비밀번호찾기]
 * - 아래 왼쪽: 1depth 목록 (ListItem 버튼) → 누르면 오른쪽 하위 메뉴가 바뀜
 * - 아래 오른쪽: 2depth 목록. 하위 메뉴가 더 있으면 ▼ 버튼(MaterialSearchDropdown)으로 3depth를 펼침
 * - 브라우저 기본 팝업 <dialog>를 사용: Esc로 닫히고, Tab 키 포커스가 메뉴 안에 머묾
 * - Figma에는 닫기 버튼이 없지만, 키보드·화면낭독기 사용자가 닫을 수 있도록 오른쪽 위에 '닫기'를 둠
 *
 * props
 * - isOpen: 메뉴를 열지 여부
 * - onClose: 닫을 때 실행할 함수 (닫기 버튼, Esc, 메뉴 링크를 눌렀을 때)
 */

// 위쪽 회원 메뉴 (로그인 기능이 없어서 주소는 '#')
const MEMBER_LINKS = [
  { label: '로그인', isPrimary: true },
  { label: '회원가입', isPrimary: true },
  { label: '아이디찾기', isPrimary: false },
  { label: '비밀번호찾기', isPrimary: false },
]

function MenuPanel({ isOpen, onClose }) {
  const dialogRef = useRef(null)
  // 지금 고른 1depth 메뉴 순서 (Figma처럼 처음엔 '자료검색')
  const [selectedIndex, setSelectedIndex] = useState(0)
  // 펼쳐 둔 3depth 메뉴 이름 (없으면 null)
  const [expandedLabel, setExpandedLabel] = useState(null)
  const subListId = useId()

  // isOpen 값이 바뀌면 팝업을 열거나 닫음
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  // Esc로 닫힐 때: 브라우저가 닫기 전에 부모에게 알려서 isOpen도 false로 맞춤
  function handleCancel(event) {
    event.preventDefault()
    onClose()
  }

  // 메뉴 안의 링크를 누르면 (다른 화면으로 이동하므로) 메뉴를 닫음
  function handleClick(event) {
    if (event.target.closest('a')) onClose()
  }

  const selectedMenu = menus[selectedIndex]

  return (
    <dialog ref={dialogRef} className="menu-panel" aria-label="전체 메뉴" onCancel={handleCancel} onClick={handleClick}>
      <div className="menu-panel__top">
        <ul className="menu-panel__member" role="list">
          {MEMBER_LINKS.map((link) => (
            <li key={link.label}>
              <a
                className={`menu-panel__member-link ${link.isPrimary ? 'menu-panel__member-link--primary' : ''}`}
                href="#"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="menu-panel__close" type="button" onClick={onClose}>
          닫기
        </button>
      </div>

      <nav className="menu-panel__body" aria-label="전체 메뉴 목록">
        {/* 1depth */}
        <ul className="menu-panel__depth1" role="list">
          {menus.map((menu, index) => (
            <li key={menu.label}>
              <ListItem
                text={menu.label}
                isSelected={index === selectedIndex}
                onClick={() => {
                  setSelectedIndex(index)
                  setExpandedLabel(null)
                }}
              />
            </li>
          ))}
        </ul>

        {/* 2depth (+ 3depth) */}
        <div className="menu-panel__depth2">
          {selectedMenu.children.length === 0 ? (
            // Figma에 하위 메뉴가 없는 메뉴
            <p className="menu-panel__empty">하위 메뉴를 준비하고 있습니다.</p>
          ) : (
            <ul className="menu-panel__depth2-list" role="list">
              {selectedMenu.children.map((child) => {
                // 하위 메뉴(3depth)가 없으면 바로 가는 링크
                if (!child.children) {
                  return (
                    <li key={child.label}>
                      <MaterialSearchLink text={child.label} href={child.to} />
                    </li>
                  )
                }

                // 하위 메뉴가 있으면 ▼ 버튼으로 펼치고 접음
                const isExpanded = expandedLabel === child.label
                return (
                  <li key={child.label}>
                    <MaterialSearchDropdown
                      text={child.label}
                      isExpanded={isExpanded}
                      controlsId={subListId}
                      onClick={() => setExpandedLabel(isExpanded ? null : child.label)}
                    />
                    <ul className="menu-panel__depth3" id={subListId} role="list" hidden={!isExpanded}>
                      {child.children.map((item) => (
                        <li key={item.label}>
                          <MaterialSearchLink text={item.label} href={item.to} />
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </nav>
    </dialog>
  )
}

export default MenuPanel
