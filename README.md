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

# 🔥 Next.js의 사전 렌더링과 데이터 페칭

### React App의 데이터 페칭
- 컴포넌트 마운트(ex.useEfftect) 이후에 발생함
- 데이터 요청이 느려지게 되는 단점 발생

### Next App의 데이터 페칭
- 사전 렌더링중 발생함(당연히 컴포넌트 마운트 이후에도 발생 가능)
- 데이터 요청 시점이 매우 빨라지는 장점 있음 
- Next.js는 다양한 방식의 사전 렌더링을 제공해 주고 있음  
  
<br>

## Next.js의 다양한 사전 렌더링 방식
### ✅ 서버 사이드 렌더링(SSR: Server Side Rendering)
- 가장 기본적인 사전 렌더링 방식
- 요청이 들어올 때마다 사전 렌더링을 진행함

** `getServerSideProps` **   
> 요청 페이지에서 넥스트 서버가 사전 렌더링을 하게 될때 컴포넌트보다  
먼저 실행이 되서 요청 페이지 컴포넌트에 필요한 데이터를 백엔드서버 또는  
서드파티로부터 데이터를 불러오다던가 하는 그러한 기능을 하게 되는 함수  
즉, 페이지 역할을 하는 컴포넌트보다 먼저 실행이 되어서 해당 컴포넌트에  
필요한 데이터를 불러오는 함수이다.

> 사전렌더링이 되는 과정에서 딱 한 번만 실행  
즉, 서버측에서만 실행되는 함수이다.  

```
// 반환값은 반드시 props라는 객체 프로퍼티를 포함하는 단 하나의 객체이어야 함.  
export const getServerSideProps = () => {
  const data = "hello";

  return {
    props: {
      data,
    },
  };
};

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {

 // 브라우저측에서만 실행되도록 하게 하려면..
 useEffect(() => {
    console.log(window.location);
  }, []);

  return (
    <div className={style.contents}>
      <section>
        <h3>페이지 컴포넌트</h3>
      </section>
    </div>
  );
}
```

<br>

> 🔥 `getServerSideProps`가 정의되어 있으면 해당 요청 페이지 컴포넌트는  
서버측에서 한 번 먼저 실행이 되고나서 이후 브라우저에서 실행이 된다.  
즉, 조건없이 `window.location` 같은 코드를 작성하게 되면 서버에서 먼저  
실행하기 때문에 에러가 발생하게 된다.    

<br>

### ✅ 정적 사이트 생성(SSG: Static Site Generation)
- SSR의 단점을 해결하는 사전 렌더링 방식
- 초기 요청시 사전 렌더링중 데이터 페칭까지 완료하여 렌더링을 함
- 빌드 타임에 미리 페이지를 사전 렌더링 해둠

넥스트앱을 빌드할 때 빌드 타임에 미리 사전 렌더링을 진행해서 미리 페이지를 딱 한 번만  
생성을 해놓고 더이상 새롭게 페이지를 생성하지 않는다. 그래서 빌드가 완료된 이후에   
넥스트앱이 실제로 가동되었을 때 브라우저가 접속 요청을 보내게 되면 넥스트 서버는   
빌드 타임에 미리 만들어 두었던 렌더링된 HTML을 빠른 속도로 응답하게 된다.  

``즉, 사전 렌더링에 많은 시간이 소요되는 페이지더라도 빌드 타임에
렌더링을 해두기 때문에 사용자의 요청에는 매우 빠른 속도로 응답 가능``

<br>
하지만 빌드 타임 이후에는 다시는 페이지를 새롭게 사전 렌더링 하지 않기 때문에  
즉, 페이지를 새롭게 생성하지 않기 때문에 사용자가 언제 접속 요청을 보내게 되더라도  
매번 똑같은 페이지만 응답하게 된다. 
그렇게 때문에 최신 데이터를 반영하기는 어려운 단점이 있다.  

``이러한 단점 때문에 데이터가 자주 업데이트 되지 않는 정적인 페이지들에 적합한 사전 렌더링 방식이다``

<br>

** **`getStaticProps`** **  
`npm run build`로 터미널에서 확인 가능
```
export const getStaticProps = async () => {
  console.log("build 후 터미널에서 확인 !!")

  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};

export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={style.contents}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}
```

<br>

> **동적 경로 [id].tsx에 SSG 적용하기**
```
export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: 1 } },
      { params: { id: 2 } },
      { params: { id: 3 } },
    ],
    fallback: false,
  };
};
// fallback: false, 없는 페이지(id)라면 404로 리디렉션

export const getStaticProps = async (
  context: GetStaticPropsContext,
) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  return {
    props: {
      book,
    },
  };
};
```
<br>
<br>


### ✅ 증분 정적 재생성(ISR: Incremental Static Regeneration)
---
- 단순히 SSG 방식으로 생성된 정적 페이지를 일정 시간을 주기로 다시 생성하는 기술


