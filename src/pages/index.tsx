import SearchableLayout from "@/layout/SearchableLayout";
import { ReactNode } from "react";
import style from "@/styles/onebite.module.css";
import books from "@/mock/books.json";
import BookItem from "@/components/BookItem";

export default function Home() {
  return (
    <div className={style.contents}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
      </section>
    </div>
  );
}

// 페이지별 레이아웃 설정
// 즉, 해당 페이지 파일에 적용하고 싶은 개별 레이아웃 파일을 적용한다.
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
