import { useRouter } from 'next/router';

export default function Page() {
  // 쿼리스트링 사용할 때 : search?q=김재희
  const router = useRouter();
  // console.log(router);
  return (
    <>
      <h1>http://localhost:3000/search/setting 경로 셋팅</h1>
      <h2>search/setting 폴더에 index.tsx 생성하여도 같은 결과임 </h2>
    </>
  );
}
