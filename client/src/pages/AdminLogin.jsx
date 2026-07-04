import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LockKeyhole, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const demoAdminCredentials = {
  email: 'admin@doctorappoints.dev',
  password: 'password123'
};

export default function AdminLogin() {
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function updateField(event) {
    const { name, type, checked, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) {
      setError('');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Email and password are required');
      return;
    }

    try {
      setIsSubmitting(true);
      await signIn({ ...formData, role: 'admin' });
      const nextPath = location.state?.from?.pathname || '/dashboard';
      navigate(nextPath, { replace: true });
    } catch (exception) {
      setError(exception.response?.data?.message || 'Invalid admin credentials.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function fillDemoAdmin() {
    setFormData({
      email: demoAdminCredentials.email,
      password: demoAdminCredentials.password,
      rememberMe: true
    });
  }

  return (
    <section className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[80vh] relative overflow-hidden">
      {/* Floating Animated Radial Glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[450px] h-[450px] bg-slate-500/10 blur-[130px] rounded-full pointer-events-none animate-pulse-slow -z-10" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[450px] h-[450px] bg-emerald-500/5 blur-[130px] rounded-full pointer-events-none animate-pulse-slow -z-10" />

      {/* Copy Section */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 text-left animate-slide-up">
        <span className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-800/10 to-emerald-800/10 text-slate-850 border border-slate-800/20 font-bold text-xs uppercase tracking-wider animate-bounce-slow">
          <ShieldAlert className="text-slate-800 animate-pulse" size={16} />
          Clinic Administrator Console
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-800">
          Global Clinical <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-700 via-slate-850 to-black">State Audit Control</span>
        </h1>
        <p className="text-lg text-slate-655 leading-relaxed max-w-xl">
          Welcome back, Admin. Use this panel to review registered user logs, edit global booking options, and dynamically register clinical doctors.
        </p>

        {/* Feature list */}
        <div className="flex flex-col gap-4 mt-2">
          {[
            { icon: <LockKeyhole size={18} />, title: 'Audit Session Control', desc: 'Secure admin tracking and permission audits.' },
            { icon: <ShieldCheck size={18} />, title: 'Credentials Provisioning', desc: 'Provision doctor credentials and profile database tables.' }
          ].map((feat, idx) => (
            <div key={idx} className="flex gap-4 p-4 bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg shadow-slate-100/50 hover:shadow-xl hover:shadow-slate-500/5 hover:-translate-y-1 transition-all duration-350 max-w-md group">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {feat.icon}
              </div>
              <div>
                <h3 className="font-extrabold text-slate-850 text-[0.95rem]">{feat.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="self-start px-5 py-2.5 rounded-xl border border-teal-500 text-teal-700 font-extrabold hover:bg-teal-50/50 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer text-xs"
          type="button" 
          onClick={fillDemoAdmin}
        >
          Fill Demo Admin Credentials
        </button>

        {/* Portal Shortcuts */}
        <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200/50 max-w-md text-sm">
          <Link to="/login" className="text-teal-600 hover:text-teal-700 font-bold underline transition-colors">Patient Login Portal &rarr;</Link>
          <span className="text-slate-300">|</span>
          <Link to="/doctor/login" className="text-blue-600 hover:text-blue-700 font-bold underline transition-colors">Doctor Login Console &rarr;</Link>
        </div>
      </div>

      {/* Glass Form Card Section */}
      <div className="w-full lg:w-[430px] relative animate-slide-up">
        {/* Subtle background glow effect behind the form */}
        <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-slate-700 to-emerald-800 opacity-20 blur-lg -z-10 group-hover:opacity-40 transition duration-1000" />
        
        <form onSubmit={handleSubmit} className="w-full bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[32px] p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden hover:shadow-slate-500/10 hover:shadow-[0_20px_50px_rgba(30,41,59,0.12)] transition-all duration-500 hover:-translate-y-1.5">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-slate-800 via-slate-700 to-emerald-850" />
          
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-850 tracking-tight">Admin Console</h2>
            <p className="text-xs text-slate-450 mt-1 leading-relaxed">Authorized credentials required.</p>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 text-rose-700 border border-rose-500/20 font-bold text-xs animate-shake">
              {error}
            </div>
          )}

          <label className="flex flex-col gap-1.5 text-left font-bold text-slate-700 text-sm">
            <span>Administrator Email</span>
            <input
              name="email"
              type="email"
              placeholder="admin@doctorappoints.dev"
              value={formData.email}
              onChange={updateField}
              autoComplete="email"
              required
              className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-200 bg-white/40 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-800/10 outline-none transition-all duration-300 font-medium text-slate-800 text-sm hover:border-slate-350"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-left font-bold text-slate-700 text-sm">
            <span>Security Key / Password</span>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={updateField}
                autoComplete="current-password"
                required
                className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-200 bg-white/40 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-800/10 outline-none transition-all duration-300 font-medium text-slate-800 text-sm pr-12 hover:border-slate-350"
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100/50 transition-all cursor-pointer"
                type="button"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <div className="flex items-center mt-1">
            <label className="flex items-center gap-2.5 text-xs text-slate-500 font-bold cursor-pointer select-none">
              <input 
                name="rememberMe" 
                type="checkbox" 
                checked={formData.rememberMe} 
                onChange={updateField} 
                className="w-4.5 h-4.5 rounded-lg border-slate-300 text-slate-700 focus:ring-slate-800/20 cursor-pointer"
              />
              Keep session active
            </label>
          </div>

          <button 
            className="w-full py-4 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white font-extrabold text-sm rounded-2xl shadow-[0_4px_20px_rgba(30,41,59,0.2)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-300 transform active:scale-[0.97] cursor-pointer mt-2" 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Authenticating...' : 'Login to Admin Dashboard'}
          </button>
        </form>
      </div>
    </section>
  );
}
