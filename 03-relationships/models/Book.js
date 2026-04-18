// A Book stores the AUTHOR'S id, not the author object.
// `ref: 'Author'` tells Mongoose what collection the id points at —
// this is what enables `.populate('author')` later.

import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
  },
  { timestamps: true },
);

export const Book = mongoose.model('Book', bookSchema);
