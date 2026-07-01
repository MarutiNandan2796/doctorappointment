import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { nextId, store } from '../data/store.js';

function createToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: '7d'
  });
}

export function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email and password are required' });
  }

  const existingUser = store.users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'User already exists' });
  }

  const user = {
    id: nextId(store.users),
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    role: 'patient'
  };

  store.users.push(user);

  return res.status(201).json({
    success: true,
    token: createToken(user),
    data: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
}

export function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const user = store.users.find((item) => item.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  return res.json({
    success: true,
    token: createToken(user),
    data: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
}
