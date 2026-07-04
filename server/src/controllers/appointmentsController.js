import { nextId, store } from '../data/store.js';

export function listAppointments(req, res) {
  res.json({ success: true, data: store.appointments });
}

export function createAppointment(req, res) {
  const { userId, doctorId, slot, date } = req.body;
  if (!userId || !doctorId || !slot || !date) {
    return res.status(400).json({ success: false, message: 'userId, doctorId, slot and date are required' });
  }

  const appointment = {
    id: nextId(store.appointments),
    userId,
    doctorId,
    slot,
    date,
    status: 'confirmed'
  };

  store.appointments.push(appointment);
  return res.status(201).json({ success: true, data: appointment });
}

export function updateAppointmentStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const appointment = store.appointments.find((item) => String(item.id) === id);
  if (!appointment) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }

  appointment.status = status;
  return res.json({ success: true, data: appointment });
}
