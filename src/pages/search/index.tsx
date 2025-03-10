import { ReactNode } from "react";
import SearchableLayout from "@/layout/SearchableLayout";
import { useRouter } from "next/router";
import books from "@/mock/books.json";
import BookItem from "@/components/BookItem";

export default function Page() {
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
