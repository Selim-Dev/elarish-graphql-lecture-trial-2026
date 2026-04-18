// Resolvers are now ASYNC because Mongo calls are async.
//
// Notice: Mongoose documents have `_id`, but GraphQL asks for `id`.
// Mongoose exposes a virtual `id` getter (string version of `_id`),
// so `doc.id` Just Works™.

import { Author } from './models/Author.js';
import { Book } from './models/Book.js';

export const resolvers = {
  Query: {
    books:   () => Book.find(),
    authors: () => Author.find(),
  },

  Book: {
    // parent = a Book document; `parent.author` is an ObjectId.
    author: (book) => Author.findById(book.author),
  },

  Author: {
    // Find every book whose `author` field points at this author's id.
    books: (author) => Book.find({ author: author._id }),
  },
};
