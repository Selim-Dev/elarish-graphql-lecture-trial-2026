import { books, generateId } from './data.js';

export const resolvers = {
  Query: {
    books: () => books,
    book: (_p, { id }) => books.find((b) => b.id === id),
  },

  Mutation: {
    // CREATE — returns the newly created book.
    addBook: (_p, { input }) => {
      const book = { id: generateId(), ...input };
      books.push(book);
      return book;
    },

    // UPDATE — returns the updated book, or null if not found.
    updateBook: (_p, { id, input }) => {
      const book = books.find((b) => b.id === id);
      if (!book) return null;
      Object.assign(book, input); // only overwrites provided fields
      return book;
    },

    // DELETE — returns true/false to tell the client what happened.
    deleteBook: (_p, { id }) => {
      const index = books.findIndex((b) => b.id === id);
      if (index === -1) return false;
      books.splice(index, 1);
      return true;
    },
  },
};
