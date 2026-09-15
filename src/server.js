import cors from 'cors';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';

import { getEnvVar } from './utils/getEnvVar.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRouter from './routes/authRoutes.js';
import notesRouter from './routes/notesRoutes.js';

dotenv.config();

const app = express();
const port = Number(getEnvVar('PORT', '3000'));

app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(authRouter);
app.use(notesRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

const bootstrap = async () => {
  await connectMongoDB();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

bootstrap();