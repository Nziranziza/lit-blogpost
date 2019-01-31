import express from 'express';
import { celebrate } from 'celebrate';
import { auth } from '../controllers';
import { authValidator } from './validators';

const router = express.Router();

router.post(
  '/signup',
  celebrate({
    body: authValidator.signup
  }),
  auth.signup
);
router.post(
  '/login',
  celebrate({
    body: authValidator.login
  }),
  auth.login
);

export default router;
