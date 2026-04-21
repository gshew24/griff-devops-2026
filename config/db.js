import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

export async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB with Mongoose');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}