import { Router } from 'express';
import { login, register } from './controller';

const router = Router();

router.route('/login').post(login);

router
  .route('/users')
  .post(register);

export {router as AuthRouter};
