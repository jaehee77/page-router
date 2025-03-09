// # \_app.tsx (app 컴포넌트의 역할)

// ## export default function App({ Component, pageProps }: AppProps)

// ```
// Component : pages 폴더내에 있는 컴포넌트를 불러옴
// 즉, 페이지 역할을 할 컴포넌트를 받아옴
// pageProps: 페이지 컴포넌트에 정의되어 있는 props를 받아옴
// ```

// ==========================================================================

// # \_document.tsx(도큐먼트 컴포넌트의 역할)

// 모든 페이지에 공통적으로 적용되어야 하는 Next앱에 html코드를 설정하는 컴포넌트
// ex. react앱의 index.html 과 비슷한 역할을 한다.
// -> 폰트, 메타 태그를 불러오거나
// -> 구글 애널리틱스,캐릭터셋 등을 설정...
