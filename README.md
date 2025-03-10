## 사전 렌더링(pre-rendering)
- 브라우저의 요청에 사전에 렌더링이 완료된 HTML을 응답하는 렌더링 방식
- Client Side Rendering의 방식을 효율적으로 해결하는 기술

<br>

## _app.tsx (app 컴포넌트의 역할)

`export default function App({ Component, pageProps }: AppProps)`
```
Component : pages 폴더내에 있는 컴포넌트를 불러옴
즉, 페이지 역할을 할 컴포넌트를 받아옴
pageProps: 페이지 컴포넌트에 정의되어 있는 props를 받아옴
```
<br>

## _document.tsx(도큐먼트 컴포넌트의 역할)

모든 페이지에 공통적으로 적용되어야 하는 Next앱에 html코드를 설정하는 컴포넌트  
ex. react앱의 index.html 과 비슷한 역할을 한다.

- 폰트, 메타 태그를 불러오거나
- 구글 애널리틱스,캐릭터셋 등을 설정...
<br>
<br>
  
## 프리페칭(Pre-fetching)

프리페칭은 빠른 페이지 이동을 위해 제공되는 기능  
현재 사용자가 보고 있는 웹페이지 링크가 존재한다거나 버튼 등이 존재해서  
이동할 수 있는 가능성이 있는 페이지들 즉, 이동에 대한 필요한 데이터를  
미리 다 불러와 놓음으로써 페이지 이동을 매우 빠른 속도로 처리해주는 기능

```
사전 렌더링 과정에서 JS번들,자바스크립트 번들 파일을 전달할 때 모든 페이지에 필요한
자바스크립트 코드가 다 절단되는 것이 아니라 현재 페이지에 해당하는 자바스크립트 코드들만
전달되게 된다. 초기 접속 요청이 있을 때마다 모든 페이지에 해당하는 자바스크립트 코드들을
번들링해서 전달하게 되면 파일의 용량이 너무 커지게 되고 이로 인해 브라우저에 렌더링되어 있는
HTML과 연결하는 Hydration(수화) 과정도 오래 걸리게 되고 결론적으로 유저가 앱에
상호작용할 수 있게 되는 TTI(time to interactive)가 늦어지는 문제가 발생할 수 있다.
그래서 넥스트는 이 문제를 해결하기 위해서 좀더 경제적으로 사용자가 현재 접속을 요청한
페이제에 해당하는 자바스크립트 코드들만 보내주게 된다.
즉, 사전렌더링 작업이 끝난 후 추가적으로 프리페칭인 현재 페이지에서 이동에 필요한 데이터,
연결된 모든 페이지의 JS 번들을 불러옴으로써 페이지 이동을 빠르게 처리해주는 기능이다.
```

- npm run dev 개발 모드일 경우에는 프리패칭이 동작하지 않음
- Dev 모드에서는 네트워크탭에서 확인시 페이지 이동시마다 서버로부터 자바스크립트 코드를 매번 불러옴
- 프리페칭을 제대로 확인하려면 npm run build 해야 확인 가능하다.
- 즉, build 한 후에 npm run start 하여 확인 가능

넥스트 링크(`<Link>`)로 되어 있는 것은 프리페칭이 기본적으로 제공되지만  
프로그래메틱한 이동일 경우(조건에 따른 이동, 이벤트 핸들러..)는 프리페칭이 되지 않는다.  
이 경우에도 프리페칭을 하려면 `useEffect`에서 `router.prefetch('/test')`와 같이 작성하면  
프리페칭이 실행되게 된다.

기본적인 프리페칭을 하지 않으려면..

- `<Link herf={"/search"} prefetch={false}>search</Link>`

<br>
<br>

---

<br>
<br>

### API Routes

Next.js에서 API를 구축할 수 있게 해주는 기능  
이 기능을 이용하면 마치 백엔드 API 서버가 하는 일과 동일하게 간단한 API를 구축해서 클라이언트  
즉, 브라우저로부터 요청을 받아 데이터베이스에서 데이터를 꺼내온다던가 또 다른 서드파티에서 데이터를  
불러와서 전달을 해준다던지 하는 이러한 일련으 동작들을 직접 만들어 볼 수 있다.

- pages/api 폴더에 hello.ts 와 같은 파일을 만들면 /api/hello 경로를 가진 API를 만들 수 있음
- 즉, API를 응답하는 코드로써 동작하게 된다.

```
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ name: "John Doe" });
}
```
**localhost:3000/api/hello** 경로에서 데이터 확인 가능

<br>
<br>
  
---

<br>
<br>

### Next.js src 폴더 구조 참고용

```
📦src
┣ 📂components
┃ ┣ 📜KGInicis.tsx
┃ ┣ 📜KakaoPg.tsx
┣ 📂css
┃ ┣ 📂common
┃ ┃ ┗ 📜style.css
┃ ┣ 📂layout
┃ ┃ ┣ 📜DefaultLayout.module.css
┃ ┃ ┣ 📜EventLayout.module.css
┃ ┃ ┣ 📜MainLayout.module.css
┃ ┗ 📂pages
┃ ┃ ┣ 📂common
┃ ┃ ┃ ┗ 📜SearchGoods.module.css
┃ ┃ ┣ 📂cs
┃ ┃ ┃ ┣ 📜cashReceipt.module.css
┃ ┃ ┣ 📂mypage
┃ ┃ ┃ ┗ 📜myInfo.module.css
┃ ┃ ┗ 📂product
┃ ┃ ┃ ┣ 📜DetailPackage.module.css
┣ 📂layout
┃ ┣ 📜CsCenterPageLayout.tsx
┃ ┣ 📜DefaultLayout.tsx
┃ ┣ 📜EventLayout.tsx
┣ 📂middleware
┃ ┣ 📜withCommonLayout.tsx
┣ 📂pages
┃ ┣ 📂search
┃ ┃ ┗ 📂searchPdt
┃ ┃ ┃ ┗ 📜index.tsx
┃ ┣ 📂utility
┃ ┃ ┗ 📂bizTravel
┃ ┃ ┃ ┗ 📜index.tsx
┃ ┣ 📜404.tsx
┃ ┣ 📜500.tsx
┃ ┣ 📜_app.tsx
┃ ┣ 📜_document.tsx
┃ ┣ 📜index.tsx
┣ 📂provider
┃ ┣ 📜alert.provider.tsx
┗ 📜middleware.ts
```

<br>
<br>

---

### 🔥 페이지별 레이아웃 설정하기
페이지별 레이아웃이 적용되길 원하는 페이지에서 레이아웃을 추가한다.  
즉, Next.js에서는 getLayout 함수를 사용하여 페이지별 레이아웃을 지정할 수 있습니다.  
만약 페이지에서 getLayout을 정의하지 않았다면 기본적으로 설정된 기본 페이지 레이아웃이 적용된다.

<br>

*개별 레이아웃 적용하려는 페이지 파일*
```
// 페이지별 레이아웃 설정
// 즉, 해당 페이지 파일에 적용하고 싶은 개별 레이아웃 파일을 적용한다.
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
```

<br>

*루트 컴포넌트 파일인 _app.tsx 에 설정하기*
```
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: NextPageWithLayout }) {
  // 루트 컴포넌트에서 Component.getLayout 에 전달받아
  // 전달 받은 함수(getLayout)를 호출
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <>
      <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
    </>
  );
}
```

<br>
<br>

# Next.js의 사전 렌더링과 데이터 페칭

### React App의 데이터 페칭
- 컴포넌트 마운트(ex.useEfftect) 이후에 발생함
- 데이터 요청이 느려지게 되는 단점 발생

### Next App의 데이터 페칭
- 사전 렌더링중 발생함(당연히 컴포넌트 마운트 이후에도 발생 가능)
- 데이터 요청 시점이 매우 빨라지는 장점 있음 
- Next.js는 다양한 방식의 사전 렌더링을 제공해 주고 있음

### Next.js의 다양한 사전 렌더링 방식
1. 서버 사이드 렌더링(SSR)
- 가장 기본적인 사전 렌더링 방식
- 요청이 들어올 때마다 사전 렌더링을 진행함

2. 정적 사이트 생성(SSG)
- 초기 요청시 사전 렌더링중 데이터 페칭까지 완료하여 렌더링을 함
- 빌드 타임에 미리 페이지를 사전 렌더링 해둠

3. 증분 정적 재생성(ISR)
- ???

