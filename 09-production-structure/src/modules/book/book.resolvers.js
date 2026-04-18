import { bookService } from './book.service.js';
import { userService } from '../user/user.service.js';

export const bookResolvers = {
  Query: {
    books: () => bookService.findAll(),
    book:  (_p, { id }) => bookService.findById(id),
  },

  Book: {
    // Cross-module join: we call the user service to hydrate owner.
    owner: (book) => userService.findById(book.ownerId),
  },

  Mutation: {
    addBook: (_p, { input }, ctx) => {
      const user = ctx.requireAuth();
      return bookService.add(user.id, input);
    },

    deleteBook: (_p, { id }, ctx) => {
      const user = ctx.requireAuth();
      return bookService.remove(user, id);
    },
  },
};
