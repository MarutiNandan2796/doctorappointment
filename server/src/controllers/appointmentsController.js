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
