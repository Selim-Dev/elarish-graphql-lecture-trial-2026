import { authors, books } from './data.js';

// KEY CONCEPT:
// Resolvers can be defined on ANY type, not just Query.
// When GraphQL sees `book.author`, it looks for `Book.author`
// in the resolvers map.
//
// The 1st argument (`parent`) is the Book object — so we use
// `parent.authorId` to find the author.

export const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
  },

  Book: {
    // Called once per Book when the client asks for `author`.
    author: (book) => authors.find((a) => a.id === book.authorId),
  },

  Author: {
    // Called once per Author when the client asks for `books`.
    books: (author) => books.filter((b) => b.authorId === author.id),
  },
};
