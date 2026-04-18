// Resolvers are functions that return the data for a field.
//
// A resolver receives 4 arguments:
//   (parent, args, context, info)
//
//   parent  — the result of the PARENT field (for nested resolvers)
//   args    — arguments the client passed (e.g. { id: "1" })
//   context — shared per-request data (e.g. user, db) — Lesson 5
//   info    — AST info (rarely needed)

import { books } from './data.js';

export const resolvers = {
  Query: {
    // No args needed — just return everything.
    books: () => books,

    // Destructure `args` to pull out `id`.
    book: (_parent, { id }) => books.find((b) => b.id === id),

    booksByGenre: (_parent, { genre }) =>
      books.filter((b) => b.genre === genre),
  },
};
