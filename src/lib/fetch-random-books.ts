import { Bookdata } from '@/types';

export const fetchRandomBooks = async (): Promise<Bookdata[]> => {
  const url = `http://localhost:12345/book/random`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Faild to fetch Books');
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default fetchRandomBooks;
