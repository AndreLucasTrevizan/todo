import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose, { Schema } from 'mongoose';
import { config } from 'dotenv';
import router from './router';

config();

const {
  MONGO_DB
} = process.env;

declare module 'express-serve-static-core' {
  interface Request {
    user: {
      _id: Schema.Types.ObjectId,
      name: string,
      email: string,
      createdAt: string;
      updatedAt: string;
    };
  }
}

mongoose.connect(String(MONGO_DB)).then(() => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));

  app.use(router);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log(`Error: ${err.message}`);
});
