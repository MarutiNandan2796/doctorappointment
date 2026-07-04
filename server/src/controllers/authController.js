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
    role: user.role,
    doctorId: user.doctorId
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
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const user = store.users.find((item) => item.email === normalizeEmail(email));
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  if (role && user.role !== role) {
    return res.status(403).json({ success: false, message: `Access denied. Not authorized as ${role}` });
  }

  return res.json({
    success: true,
    token: createToken(user),
    data: sanitizeUser(user)
  });
}

export function createDoctor(req, res) {
  // Admin privilege validation check
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    const requester = store.users.find((item) => item.id === payload.id);
    if (!requester || requester.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Admin privileges required.' });
    }
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }

  const { name, email, password, specialty, experience, location, fee, about } = req.body;
  if (!name || !email || !password || !specialty) {
    return res.status(400).json({ success: false, message: 'Name, email, password and specialty are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
  }

  const normalizedEmail = normalizeEmail(email);
  const existingUser = store.users.find((user) => user.email === normalizedEmail);
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'User/Doctor with this email already exists' });
  }

  // Generate IDs
  const newDoctorId = nextId(store.doctors);
  const newUserId = nextId(store.users);

  // Create doctor user account
  const user = {
    id: newUserId,
    name: name.trim(),
    email: normalizedEmail,
    password: bcrypt.hashSync(password, 10),
    role: 'doctor',
    doctorId: newDoctorId
  };

  // Create doctor profile
  const initials = name.trim().split(' ').filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const doctorProfile = {
    id: newDoctorId,
    name: name.trim(),
    specialty: specialty.trim(),
    experience: experience ? experience.trim() : '1 year',
    location: location ? location.trim() : 'N/A',
    fee: Number(fee) || 0,
    available: true,
    rating: 5.0,
    about: about ? about.trim() : '',
    initials: initials || 'DR'
  };

  store.users.push(user);
  store.doctors.push(doctorProfile);

  return res.status(201).json({
    success: true,
    message: 'Doctor created successfully',
    data: {
      user: sanitizeUser(user),
      profile: doctorProfile
    }
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
