import mongoose from 'mongoose';

import { getEnvVar } from '../utils/getEnvVar.js';

export const connectMongoDB = async () => {
  const mongoUrl = getEnvVar('MONGO_URL');

  await mongoose.connect(mongoUrl);

  console.log('✅ MongoDB connection established successfully');
};