import express from 'express';
import { celebrate } from 'celebrate';
import { authController } from '../controllers';
import { authValidator } from './validators';

const router = express.Router();

router.post(
  '/signup',
  celebrate({
    body: authValidator.signup
  }),
  authController.signup
);

router.post(
  '/login',
  celebrate({
    body: authValidator.login
  }),
  authController.login
);

export default router;
