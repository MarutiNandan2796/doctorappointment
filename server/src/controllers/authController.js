import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { nextId, store } from '../data/store.js';

function createToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: '7d'
  });
}

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

export function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
  }

  const normalizedEmail = normalizeEmail(email);
  const existingUser = store.users.find((user) => user.email === normalizedEmail);
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'User already exists' });
  }

  const user = {
    id: nextId(store.users),
    name: name.trim(),
    email: normalizedEmail,
    password: bcrypt.hashSync(password, 10),
    role: 'patient'
  };

  store.users.push(user);

  return res.status(201).json({
    success: true,
    token: createToken(user),
    data: sanitizeUser(user)
  });
}

export function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const user = store.users.find((item) => item.email === normalizeEmail(email));
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  return res.json({
    success: true,
    token: createToken(user),
    data: sanitizeUser(user)
  });
}

export function me(req, res) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication token is required' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    const user = store.users.find((item) => item.id === payload.id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid authentication token' });
    }

    return res.json({
      success: true,
      data: sanitizeUser(user)
    });
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}
