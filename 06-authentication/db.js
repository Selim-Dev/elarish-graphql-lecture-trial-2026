import mongoose from 'mongoose';
import { User } from './models/User.js';

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Mongo connected');

  if ((await User.countDocuments()) === 0) {
    // Note: .create triggers the pre-save hook → passwords get hashed.
    await User.create([
      { email: 'alice@demo.io', password: 'alice123' },
      { email: 'bob@demo.io',   password: 'bob123'   },
    ]);
    console.log('🌱 Seeded users (alice / bob)');
  }
};
