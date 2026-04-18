import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 }, // plain in, hashed by the hook
  },
  { timestamps: true },
);

// PRE-SAVE HOOK — runs automatically before a document is saved.
// We hash the password here so nobody forgets. `isModified` prevents
// re-hashing a hash on future updates.
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// INSTANCE METHOD — called like `user.comparePassword('abc')`.
userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

export const User = mongoose.model('User', userSchema);
