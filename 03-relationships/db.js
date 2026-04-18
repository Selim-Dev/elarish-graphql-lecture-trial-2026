// Connects to MongoDB and seeds some demo data on first run.
// In a real app, seeding lives in a separate script.

import mongoose from 'mongoose';
import { Author } from './models/Author.js';
import { Book } from './models/Book.js';

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Mongo connected');
  await seedIfEmpty();
};

const seedIfEmpty = async () => {
  const count = await Author.countDocuments();
  if (count > 0) return; // already seeded

  const [andy, uncleBob, frank] = await Author.create([
    { name: 'Andy Hunt' },
    { name: 'Robert C. Martin' },
    { name: 'Frank Herbert' },
  ]);

  await Book.create([
    { title: 'The Pragmatic Programmer', author: andy._id },
    { title: 'Clean Code',               author: uncleBob._id },
    { title: 'Clean Architecture',       author: uncleBob._id },
    { title: 'Dune',                     author: frank._id },
  ]);

  console.log('🌱 Seeded authors + books');
};
