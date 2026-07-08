import { Router } from 'express';
import { chatWithGemini, suggestPrescription } from '../controllers/aiController.js';

const router = Router();

router.post('/chat', chatWithGemini);
router.post('/suggest-prescription', suggestPrescription);

export default router;
