import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { login, register, validateToken } from './controller';

const router = Router();

router.route('/login').post(login);

router
  .route('/users')
  .post(register);

router.route('/token').get(auth, validateToken);

export {router as AuthRouter};
