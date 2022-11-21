import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { creatingTodo, listTodo } from './controller';

const router = Router();

router
  .route('/')
  .get(auth, listTodo)
  .post(auth, creatingTodo);

export {router as TodoRouter};
