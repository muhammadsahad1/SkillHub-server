import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoURL: string = process.env.MONGO_URL || '';

if (!mongoURL) {
  console.error('MongoDB URL is not defined. Check your .env file.');
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log(`DB connected successfully: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('DB connection error:', error);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
