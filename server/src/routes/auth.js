import express from 'express';
import { auth } from '../controllers';

const router = express.Router();

router.post('/signup', auth.signup);

export default router;
