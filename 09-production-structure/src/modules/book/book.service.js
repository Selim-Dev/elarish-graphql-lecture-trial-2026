import { store } from '../../db/index.js';
import { notFound, forbidden } from '../../utils/errors.js';

export const bookService = {
  findAll:   () => store.books,
  findById:  (id) => store.books.find((b) => b.id === id) ?? null,

  add(userId, { title }) {
    const book = { id: String(store.books.length + 1), title, ownerId: userId };
    store.books.push(book);
    return book;
  },

  remove(user, id) {
    const book = store.books.find((b) => b.id === id);
    if (!book) throw notFound('Book not found');

    const canDelete = book.ownerId === user.id || user.role === 'ADMIN';
    if (!canDelete) throw forbidden('Not your book');

    store.books = store.books.filter((b) => b.id !== id);
    return true;
  },
};
