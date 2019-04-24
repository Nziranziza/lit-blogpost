import express from 'express';
import { celebrate } from 'celebrate';
import { authController } from '../controllers';
import { authValidator } from './validators';
import { asyncHandler } from '../helpers';

const router = express.Router();

router.post(
  '/signup',
  celebrate({
    body: authValidator.signup
  }),
  asyncHandler(authController.signup)
);

router.post(
  '/login',
  celebrate({
    body: authValidator.login
  }),
  asyncHandler(authController.login)
);

export default router;
