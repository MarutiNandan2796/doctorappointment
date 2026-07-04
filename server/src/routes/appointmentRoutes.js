import { Router } from 'express';
import { createAppointment, listAppointments, updateAppointmentStatus } from '../controllers/appointmentsController.js';

const router = Router();

router.get('/', listAppointments);
router.post('/', createAppointment);
router.patch('/:id/status', updateAppointmentStatus);

export default router;
