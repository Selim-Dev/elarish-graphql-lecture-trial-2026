// A Mongoose MODEL = a JS class that maps to a MongoDB collection.
// The SCHEMA describes the shape of each document.

import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }, // adds createdAt / updatedAt
);

// `mongoose.model('Author', ...)` creates the "authors" collection.
export const Author = mongoose.model('Author', authorSchema);
