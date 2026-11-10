import arrowIcon from '../assets/icons/more-24-light.svg'
import logoGroups from '../data/logos.js'
import LogoCollection from './LogoCollection.jsx'
import './Footer.css'

/*
 * Footer: 공통 푸터 (Figma 「푸터세트」 204-3794)
 * - 위: 회색 영역 안에 관련 기관 로고 넘김(LogoCollection 재사용)
 * - 아래: 진한 배경 안에 안내 링크 → 주소·연락처 → [관련사이트 ▼]
 * - 관련사이트: Figma에는 닫힌 모양만 있어서, 브라우저 기본 <details>로 펼침/접기를 만듦
 *   (키보드 Enter·Space로 열리고, 화면낭독기가 "펼침/접힘"을 알아서 읽어줌)
 */

const FOOTER_LINKS = ['도서관서비스현장', '개인정보처리방침', '이메일무단수집거부', '사이트맵']

// 주소·연락처 (Figma 글자 그대로, 한 줄씩)
const ADDRESS_LINES = [
  '[38088] 경상북도 경주시 원화로 431-12 (황성동 370)',
  '[전화]',
  '본관 사무실: 054)779-8891',
  '자료실: 054)779-8913',
  '어린이실: 054)779-8911',
  '[팩스]',
  '054)760-7436',
]

// 관련사이트 목록: 이미 있는 로고 데이터의 기관 이름을 그대로 씀 (주소는 목업이라 '#')
const RELATED_SITES = logoGroups.flat().map((logo) => logo.alt)

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logos">
        <div className="footer__inner">
          <LogoCollection groups={logoGroups} />
        </div>
      </div>

      <div className="footer__info">
        <div className="footer__inner footer__inner--info">
          <div className="footer__text">
            <ul className="footer__links" role="list">
              {FOOTER_LINKS.map((label) => (
                <li key={label} className="footer__link-item">
                  <a className="footer__link" href="#">
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <address className="footer__address">
              {ADDRESS_LINES.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p>Copyright © 2021 Gyeongju Municipal Library, All rights reserve.</p>
            </address>
          </div>

          <details className="footer__related">
            <summary className="footer__related-summary">
              관련사이트
              <img className="footer__related-icon" src={arrowIcon} alt="" width="24" height="24" />
            </summary>
            <ul className="footer__related-list" role="list">
              {RELATED_SITES.map((name) => (
                <li key={name}>
                  <a className="footer__related-link" href="#">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </footer>
  )
}

export default Footer
