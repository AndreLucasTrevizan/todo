import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { creatingTodo, deleteTodo, listTodo, readyTodo, updateTodo } from './controller';

const router = Router();

router
  .route('/')
  .get(auth, listTodo)
  .post(auth, creatingTodo);

router
  .route('/:_id')
  .patch(auth, updateTodo)
  .delete(auth, deleteTodo);

router
  .route('/:_id/ready')
  .patch(auth, readyTodo);

export {router as TodoRouter};
