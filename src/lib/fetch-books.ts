import { Bookdata } from '@/types';

export const fetchBooks = async (q?: string): Promise<Bookdata[]> => {
  let url = `http://localhost:12345/book${q ? `/search?q=${q}` : ''}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error();
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default fetchBooks;
