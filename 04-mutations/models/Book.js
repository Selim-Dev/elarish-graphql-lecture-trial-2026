import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    pages: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export const Book = mongoose.model('Book', bookSchema);
