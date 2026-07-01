import bcrypt from 'bcryptjs';
import { doctors } from './doctors.js';

const hashedPassword = bcrypt.hashSync('password123', 10);

export const store = {
  users: [
    {
      id: 1,
      name: 'Clinic Admin',
      email: 'admin@doctorappoints.dev',
      password: hashedPassword,
      role: 'admin'
    }
  ],
  doctors: [...doctors],
  appointments: [
    {
      id: 1,
      userId: 1,
      doctorId: 1,
      slot: '10:00 AM',
      date: '2026-07-10',
      status: 'confirmed'
    }
  ]
};

export function nextId(collection) {
  return collection.length ? Math.max(...collection.map((item) => item.id)) + 1 : 1;
}
