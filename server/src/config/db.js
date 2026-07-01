import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    return false;
  }

  try {
    await mongoose.connect(uri);
    return true;
  } catch (error) {
    console.warn('MongoDB connection skipped:', error.message);
    return false;
  }
}
