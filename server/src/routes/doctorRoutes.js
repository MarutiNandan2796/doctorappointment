import { Router } from 'express';
import { getDoctorById, listDoctors } from '../controllers/doctorsController.js';

const router = Router();

router.get('/', listDoctors);
router.get('/:id', getDoctorById);

export default router;
