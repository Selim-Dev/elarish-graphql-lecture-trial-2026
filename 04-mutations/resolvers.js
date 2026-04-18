// Mongoose CRUD cheat sheet used below:
//   Model.find()                      → all docs
//   Model.findById(id)                → one doc or null
//   Model.create(input)               → insert
//   Model.findByIdAndUpdate(id, patch, { new: true })
//                                     → returns the UPDATED doc
//   Model.findByIdAndDelete(id)       → returns the deleted doc (or null)

import { Book } from './models/Book.js';

export const resolvers = {
  Query: {
    books: () => Book.find(),
    book:  (_p, { id }) => Book.findById(id),
  },

  Mutation: {
    addBook: (_p, { input }) => Book.create(input),

    updateBook: (_p, { id, input }) =>
      Book.findByIdAndUpdate(id, input, {
        new: true,          // return the updated document, not the old one
        runValidators: true, // re-run schema validation on update
      }),

    deleteBook: async (_p, { id }) => {
      const deleted = await Book.findByIdAndDelete(id);
      return deleted !== null;
    },
  },
};
