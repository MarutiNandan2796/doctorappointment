import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const demoCredentials = {
  email: 'admin@doctorappoints.dev',
  password: 'password123'
};

export default function Login() {
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
      await signIn({ ...formData, role: 'patient' });
      const nextPath = location.state?.from?.pathname || '/dashboard';
      navigate(nextPath, { replace: true });
    } catch (exception) {
      setError(exception.response?.data?.message || 'Unable to sign in as patient. Please make sure you are registered.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[80vh] relative overflow-hidden">
      {/* Floating Animated Radial Glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[450px] h-[450px] bg-teal-400/20 blur-[130px] rounded-full pointer-events-none animate-pulse-slow -z-10" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[450px] h-[450px] bg-indigo-400/15 blur-[130px] rounded-full pointer-events-none animate-pulse-slow -z-10" />

      {/* Copy Section */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 text-left animate-slide-up">
        <span className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-indigo-500/10 text-teal-850 border border-teal-500/20 font-bold text-xs uppercase tracking-wider animate-bounce-slow">
          <ShieldCheck className="text-teal-600 animate-pulse" size={16} />
          Secure Healthcare Portal
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-800">
          Simplify Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600">Health Consultations</span>
        </h1>
        <p className="text-lg text-slate-650 leading-relaxed max-w-xl">
          Access your unified patient hub to request clinical appointments, view test queues, and securely chat with registered medical specialists.
        </p>

        {/* Dynamic Feature Blocks */}
        <div className="flex flex-col gap-4 mt-2">
          {[
            { icon: <LockKeyhole size={18} />, title: 'HIPAA-grade Encryption', desc: 'Your medical reports and parameters are strictly private.' },
            { icon: <Sparkles size={18} />, title: 'Intelligent Slot Reservation', desc: 'Reserve real-time slots in just three clicks.' }
          ].map((feat, idx) => (
            <div key={idx} className="flex gap-4 p-4 bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg shadow-slate-100/50 hover:shadow-xl hover:shadow-teal-500/5 hover:-translate-y-1 transition-all duration-350 max-w-md group">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {feat.icon}
              </div>
              <div>
                <h3 className="font-extrabold text-slate-850 text-[0.95rem]">{feat.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Portal Shortcuts */}
        <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200/50 max-w-md text-sm">
          <Link to="/doctor/login" className="px-4 py-2 rounded-xl bg-white border border-slate-200/80 text-teal-700 font-bold hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5 transition-all">
            Doctor Portal &rarr;
          </Link>
          <Link to="/admin/login" className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all">
            Admin Console &rarr;
          </Link>
        </div>

        <p className="text-sm text-slate-500 mt-2">
          New patient? <Link to="/register" className="font-extrabold text-teal-600 hover:text-teal-700 underline underline-offset-4 decoration-2 transition-all">Create an account &rarr;</Link>
        </p>
      </div>

      {/* Glass Form Card Section */}
      <div className="w-full lg:w-[430px] relative animate-slide-up">
        {/* Subtle background glow effect behind the form */}
        <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-teal-500 to-indigo-600 opacity-20 blur-lg -z-10 group-hover:opacity-40 transition duration-1000" />
        
        <form onSubmit={handleSubmit} className="w-full bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[32px] p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden hover:shadow-teal-500/10 hover:shadow-[0_20px_50px_rgba(20,184,166,0.12)] transition-all duration-500 hover:-translate-y-1.5">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-teal-400 to-indigo-600" />
          
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">Patient Console</h2>
            <p className="text-xs text-slate-450 mt-1 leading-relaxed">Enter secure clinical credentials to view your charts.</p>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 text-rose-700 border border-rose-500/20 font-bold text-xs animate-shake">
              {error}
            </div>
          )}

          <label className="flex flex-col gap-1.5 text-left font-bold text-slate-700 text-sm">
            <span>Email Address</span>
            <input
              name="email"
              type="email"
              placeholder="e.g. steve@gmail.com"
              value={formData.email}
              onChange={updateField}
              autoComplete="email"
              required
              className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-200 bg-white/40 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-300 font-medium text-slate-800 text-sm hover:border-slate-350"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-left font-bold text-slate-700 text-sm">
            <span>Account Password</span>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={updateField}
                autoComplete="current-password"
                required
                className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-200 bg-white/40 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-300 font-medium text-slate-800 text-sm pr-12 hover:border-slate-350"
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

          <div className="flex items-center justify-between w-full mt-1">
            <label className="flex items-center gap-2.5 text-xs text-slate-500 font-bold cursor-pointer select-none">
              <input 
                name="rememberMe" 
                type="checkbox" 
                checked={formData.rememberMe} 
                onChange={updateField} 
                className="w-4.5 h-4.5 rounded-lg border-slate-300 text-teal-600 focus:ring-teal-500/20 cursor-pointer"
              />
              Remember session
            </label>

            <a className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors" href="mailto:hello@doctorappoints.dev">
              Forgot password?
            </a>
          </div>

          <button 
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-[0_4px_20px_rgba(20,184,166,0.2)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.3)] transition-all duration-300 transform active:scale-[0.97] cursor-pointer mt-2" 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Verifying profile...' : 'Sign In Securely'}
          </button>
        </form>
      </div>
    </section>
  );
}
