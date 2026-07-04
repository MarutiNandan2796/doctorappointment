import { Router } from 'express';
import { createDoctor, login, me, register } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/create-doctor', createDoctor);
router.get('/me', me);

export default router;
