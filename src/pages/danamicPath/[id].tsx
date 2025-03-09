import { useRouter } from 'next/router';

export default function Page() {
  // url 파라미터도 useRouter 에서 확인,설정가능
  const router = useRouter();
  // console.log(router);
  const { id } = router.query;
  return (
    <>
      <h1>동적경로 테스트 : 파라미터 아이디..{id}</h1>
      <h2>http://localhost:3000/danamicPath/1 </h2>
      <h3>http://localhost:3000/danamicPath 이렇게는 안됨..</h3>
      <h2>
        /danamic/213/34/q34q5r/q34434... 이와같은 경로를 설정하려면
        <br />
        파일명을 [...id].tsx 로 설정할 수 있다. <br />
        즉, 여러 개의 id를 잡아채겠다.. 란 의미로.. Catch All Segment(구간) 라고
        한다. <br />
        모든 구간에 해당하는 아이디를 잡겠다 !!
        <br />
      </h2>
      <h2>
        catch all segment로 설정된 경로에서 대괄호를 한번더 사용하면
        [[...id]].tsx <br />
        /danamicPath/index.tsx 파일이 없더라도 /danamic 경로에 대응할 수 있다.
        <br />
        완전 모든 경로에 대응하는 이러한 것을 optinal catch all segment라고
        한다.
      </h2>
    </>
  );
}
