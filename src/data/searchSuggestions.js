/*
 * 자동완성(연관 제안어)용 목업 데이터
 * - 새로 지어내지 않고, 이미 있는 목업 데이터의 단어를 모아서 씀
 *   (인기 검색어 + 추천도서 제목 + 도서 목록 제목)
 */
import books from './books.js'
import popularKeywords from './popularKeywords.js'
import recommendedBooks from './recommendedBooks.js'

const searchSuggestions = [
  ...popularKeywords,
  ...recommendedBooks.map((book) => book.title),
  ...books.map((book) => book.title),
]

export default searchSuggestions
