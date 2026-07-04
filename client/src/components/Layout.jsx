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
    <div className="app-shell min-h-screen flex flex-col bg-slate-50/20">
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-100/80 transition-all duration-300">
        <div className="container mx-auto px-4 min-h-[72px] flex items-center justify-between gap-6 relative">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-300">
              <Stethoscope size={18} />
            </span>
            <span className="text-slate-800 text-lg tracking-tight">
              <strong className="font-black text-slate-800">Doctor</strong> Appoints
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink 
                key={item.to} 
                to={item.to}
                className={({ isActive }) => 
                  isActive 
                    ? "text-teal-600 font-extrabold text-sm transition-colors" 
                    : "text-slate-500 hover:text-slate-800 font-bold text-sm transition-colors"
                }
              >
                {item.label}
              </NavLink>
            ))}
            {user?.role === 'admin' && (
              <Link className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-black transition-all" to="/dashboard">
                <ShieldCheck size={14} />
                Admin Panel
              </Link>
            )}
            {user?.role === 'doctor' && (
              <Link className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-105 font-bold text-xs hover:bg-blue-100 transition-all" to="/dashboard">
                <Stethoscope size={14} className="text-blue-600" />
                Doctor Panel
              </Link>
            )}
          </nav>

          {/* Action Buttons / User Status */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-slate-50 border border-slate-100 rounded-xl shadow-sm">
                  <UserCircle2 size={18} className="text-slate-400" />
                  <span className="flex flex-col text-left text-xs leading-tight">
                    <strong className="font-extrabold text-slate-700">{user?.name}</strong>
                    <span className="text-[10px] text-teal-600 font-bold uppercase tracking-wider mt-0.5">
                      {user?.role}
                    </span>
                  </span>
                </div>
                <button 
                  className="px-4 py-2 border border-slate-200 hover:border-red-100 rounded-xl text-slate-650 hover:text-red-750 hover:bg-red-50/50 font-bold transition-all text-xs cursor-pointer flex items-center gap-1.5" 
                  type="button" 
                  onClick={signOut}
                >
                  <LogOut size={13} />
                  Logout
                </button>
                <Link className="px-4.5 py-2 bg-gradient-to-r from-teal-500 to-indigo-650 hover:from-teal-600 hover:to-indigo-700 text-white font-extrabold rounded-xl shadow-md shadow-teal-500/15 hover:shadow-lg hover:shadow-teal-500/25 transition-all text-xs cursor-pointer" to="/dashboard">
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link className="px-4.5 py-2.5 rounded-xl text-slate-600 hover:text-slate-850 hover:bg-slate-50 font-bold transition-all text-xs cursor-pointer" to="/login">
                  Login
                </Link>
                <Link className="px-4.5 py-2.5 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-650 hover:to-indigo-700 text-white font-extrabold rounded-xl shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/35 transition-all transform active:scale-95 text-xs cursor-pointer" to="/register">
                  Create account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <button 
            className="p-2 rounded-xl text-slate-655 hover:bg-slate-100 md:hidden cursor-pointer transition-all" 
            onClick={() => setOpen((value) => !value)} 
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Mobile Drawer Overlay */}
          {open && (
            <div className="absolute top-[72px] left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-2xl p-6 flex flex-col gap-4 md:hidden animate-slide-up text-left z-50">
              {navItems.map((item) => (
                <NavLink 
                  key={item.to} 
                  to={item.to} 
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => 
                    isActive 
                      ? "text-teal-600 font-extrabold text-sm py-2 border-b border-slate-50 block" 
                      : "text-slate-500 hover:text-slate-800 font-bold text-sm py-2 border-b border-slate-55 block"
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              {user?.role === 'admin' && (
                <Link className="flex items-center gap-2 py-2 text-slate-700 font-bold text-sm" to="/dashboard" onClick={() => setOpen(false)}>
                  <ShieldCheck size={16} />
                  Admin Panel
                </Link>
              )}
              {user?.role === 'doctor' && (
                <Link className="flex items-center gap-2 py-2 text-slate-700 font-bold text-sm" to="/dashboard" onClick={() => setOpen(false)}>
                  <Stethoscope size={16} />
                  Doctor Panel
                </Link>
              )}
              
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2.5 px-3.5 py-2 bg-slate-50 border border-slate-100 rounded-xl">
                      <UserCircle2 size={18} className="text-slate-400" />
                      <span className="text-sm font-extrabold text-slate-700">{user?.name} ({user?.role})</span>
                    </div>
                    <button
                      className="w-full py-3 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-655 font-bold transition-all text-xs cursor-pointer flex items-center justify-center gap-1.5"
                      type="button"
                      onClick={() => {
                        signOut();
                        setOpen(false);
                      }}
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link className="w-full py-3 border border-slate-250 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl text-center block" to="/login" onClick={() => setOpen(false)}>
                      Login
                    </Link>
                    <Link className="w-full py-3 bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-extrabold text-xs rounded-xl text-center block" to="/register" onClick={() => setOpen(false)}>
                      Create account
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
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
