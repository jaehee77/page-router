import { ReactNode } from 'react';
import SearchableLayout from '@/layout/SearchableLayout';
import { useRouter } from 'next/router';
// import books from "@/mock/books.json";
import BookItem from '@/components/BookItem';
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
// import { fetchBooks } from '@/lib/fetch-books';
import { fetchBooks } from '@/lib/';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const q = context.query.q;

  const books = await fetchBooks(q as string);

  return {
    props: {
      books,
    },
  };
};

export default function Page({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  // console.log(router);

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
