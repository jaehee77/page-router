import { ReactNode, useEffect, useState } from 'react';
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
import { Bookdata } from '@/types';

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext,
// ) => {
//   const q = context.query.q;

//   const books = await fetchBooks(q as string);

//   return {
//     props: {
//       books,
//     },
//   };
// };

export default function Page() {
  const [books, setBooks] = useState<Bookdata[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

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
