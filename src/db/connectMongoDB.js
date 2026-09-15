import mongoose from 'mongoose';

import { getEnvVar } from '../utils/getEnvVar.js';

export const connectMongoDB = async () => {
  const mongoUrl = getEnvVar('MONGO_URL');

  try {
    await mongoose.connect(mongoUrl);

    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};