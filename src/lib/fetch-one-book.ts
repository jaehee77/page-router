import { Bookdata } from '@/types';

export const fetchOneBook = async (
  id: number,
): Promise<Bookdata | null> => {
  let url = `http://localhost:12345/book/${id}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Failed to fetch one Book');
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default fetchOneBook;
