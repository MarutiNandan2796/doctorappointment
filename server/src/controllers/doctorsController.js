import { store } from '../data/store.js';

export function listDoctors(req, res) {
  res.json({ success: true, data: store.doctors });
}

export function getDoctorById(req, res) {
  const doctor = store.doctors.find((item) => String(item.id) === req.params.id);
  if (!doctor) {
    return res.status(404).json({ success: false, message: 'Doctor not found' });
  }
  return res.json({ success: true, data: doctor });
}
