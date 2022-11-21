import { Router } from 'express';
import { AuthRouter } from './modules/auth/router';
import { TodoRouter } from './modules/todo/router';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/todos', TodoRouter);

export default router;
