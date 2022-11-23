import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { creatingTodo, deleteTodo, listTodo, updateTodo } from './controller';

const router = Router();

router
  .route('/')
  .get(auth, listTodo)
  .post(auth, creatingTodo);

router
  .route('/:_id')
  .patch(auth, updateTodo)
  .delete(auth, deleteTodo);

export {router as TodoRouter};
