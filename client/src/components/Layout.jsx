import { Link, NavLink, Outlet } from 'react-router-dom';
import { CalendarHeart, Menu, ShieldCheck, Stethoscope, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/doctors', label: 'All Doctors' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <Link to="/" className="brand">
            <span className="brand-mark">
              <Stethoscope size={18} />
            </span>
            <span>
              <strong>Doctor</strong> Appoints
            </span>
          </Link>

          <nav className={`nav-links ${open ? 'open' : ''}`}>
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <Link className="nav-admin" to="/dashboard" onClick={() => setOpen(false)}>
              <ShieldCheck size={16} />
              Admin Panel
            </Link>
          </nav>

          <div className="nav-actions desktop-only">
            <Link className="btn btn-ghost" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary" to="/register">
              Create account
            </Link>
          </div>

          <button className="menu-btn mobile-only" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <Link to="/" className="brand footer-brand">
              <span className="brand-mark">
                <CalendarHeart size={18} />
              </span>
              <span>
                <strong>Doctor</strong> Appoints
              </span>
            </Link>
            <p>
              Clean appointment booking experience for patients who want fast, trusted doctor discovery.
            </p>
          </div>
          <div>
            <h4>Company</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About us</Link>
            <Link to="/doctors">Doctors</Link>
            <Link to="/contact">Privacy policy</Link>
          </div>
          <div>
            <h4>Get in touch</h4>
            <p>+0-000-000-000</p>
            <p>hello@doctorappoints.dev</p>
          </div>
        </div>
        <div className="container footer-bottom">Copyright 2026 @ Doctor Appoints</div>
      </footer>
    </div>
  );
}
