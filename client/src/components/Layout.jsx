import { Link, NavLink, Outlet } from 'react-router-dom';
import { CalendarHeart, LogOut, Menu, ShieldCheck, Stethoscope, UserCircle2, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/doctors', label: 'All Doctors' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, signOut, user } = useAuth();

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
            {isAuthenticated ? (
              <div className="mobile-auth-links">
                <span className="mobile-auth-user">
                  <UserCircle2 size={16} />
                  {user?.name}
                </span>
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="mobile-auth-links">
                <Link className="btn btn-ghost" to="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Link className="btn btn-primary" to="/register" onClick={() => setOpen(false)}>
                  Create account
                </Link>
              </div>
            )}
          </nav>

          <div className="nav-actions desktop-only">
            {isAuthenticated ? (
              <>
                <div className="nav-user-badge">
                  <UserCircle2 size={16} />
                  <span>{user?.name}</span>
                </div>
                <button className="btn btn-ghost" type="button" onClick={signOut}>
                  <LogOut size={16} />
                  Logout
                </button>
                <Link className="btn btn-primary" to="/dashboard">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link className="btn btn-ghost" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary" to="/register">
                  Create account
                </Link>
              </>
            )}
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
