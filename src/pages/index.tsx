import SearchableLayout from '@/layout/SearchableLayout';
import { ReactNode, useEffect } from 'react';
import style from '@/styles/onebite.module.css';
// import books from "@/mock/books.json";
import BookItem from '@/components/BookItem';
import {
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next';
import { fetchBooks, fetchRandomBooks } from '@/lib';

export const getStaticProps = async () => {
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

// 페이지별 레이아웃 설정
// 즉, 해당 페이지 파일에 적용하고 싶은 개별 레이아웃 파일을 적용한다.
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
