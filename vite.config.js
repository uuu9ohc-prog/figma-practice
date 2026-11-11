import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages는 https://<아이디>.github.io/<저장소이름>/ 주소로 열리므로
  // 파일 경로 앞에 저장소 이름을 붙여야 CSS·JS·이미지를 제대로 찾는다.
  base: '/figma-practice/',
})
