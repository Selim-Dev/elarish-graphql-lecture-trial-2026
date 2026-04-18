import mongoose from 'mongoose';
import { Book } from './models/Book.js';

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Mongo connected');

  if ((await Book.countDocuments()) === 0) {
    await Book.create([
      { title: 'The Pragmatic Programmer', pages: 352 },
      { title: 'Clean Code',               pages: 464 },
    ]);
    console.log('🌱 Seeded books');
  }
};
