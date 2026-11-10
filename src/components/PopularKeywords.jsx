import arrowIcon from '../assets/icons/more-24.svg'
import './PopularKeywords.css'

/*
 * PopularKeywords: 인기 검색어 펼침 상자 (Figma 「검색 추천」 204-3869, 통합자료검색 화면)
 * - 닫힘: [인기 검색어  폭풍의 언덕 삼국지 해리포터 ▼]
 * - 펼침: 인기 검색어 전체를 버튼으로 보여주고, 누르면 그 단어로 바로 검색
 *   (Figma에는 닫힌 모양만 있어서, 펼친 목록은 최소한으로만 꾸밈)
 * - 브라우저 기본 <details>를 써서 키보드 Enter·Space로 열고 닫힘
 * - 메인 화면의 PopularSearch(파란 띠, 자동으로 넘어감)와는 모양·동작이 달라 따로 만듦
 *
 * props
 * - keywords: 인기 검색어 배열 (src/data/popularKeywords.js)
 * - onSelect: 검색어를 눌렀을 때 실행할 함수, 고른 검색어를 넘겨줌
 */

// 닫혀 있을 때 미리 보여줄 검색어 개수 (Figma: 3개)
const PREVIEW_COUNT = 3

function PopularKeywords({ keywords, onSelect }) {
  return (
    <details className="popular-keywords">
      <summary className="popular-keywords__summary">
        <span className="popular-keywords__label">인기 검색어</span>
        <span className="popular-keywords__preview">{keywords.slice(0, PREVIEW_COUNT).join(' ')}</span>
        <img className="popular-keywords__icon" src={arrowIcon} alt="" width="24" height="24" />
      </summary>

      <ol className="popular-keywords__list" role="list">
        {keywords.map((keyword, index) => (
          <li key={keyword}>
            <button className="popular-keywords__button" type="button" onClick={() => onSelect(keyword)}>
              {index + 1}. {keyword}
            </button>
          </li>
        ))}
      </ol>
    </details>
  )
}

export default PopularKeywords
