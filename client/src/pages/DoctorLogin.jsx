import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LockKeyhole, ShieldCheck, Stethoscope, Mail, Activity, Clock, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DoctorLogin() {
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
      await signIn({ ...formData, role: 'doctor' });
      const nextPath = location.state?.from?.pathname || '/dashboard';
      navigate(nextPath, { replace: true });
    } catch (exception) {
      setError(exception.response?.data?.message || 'Invalid credentials or you are not registered as a doctor.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 min-h-[85vh] relative overflow-hidden">
      {/* High-Tech Background Grid & Light Flares */}
      <div className="absolute inset-0 bg-grid-pattern-blue opacity-50 pointer-events-none -z-10" />
      <div className="absolute top-[-10%] left-[-15%] w-[500px] h-[500px] bg-blue-500/10 blur-[130px] rounded-full pointer-events-none animate-pulse-slow -z-10" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[500px] h-[500px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none animate-pulse-slow -z-10" />

      {/* Left Column: Workspace Info & Clinical Preview Dashboard */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 text-left animate-slide-up">
        <span className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-teal-500/10 text-blue-900 border border-blue-500/20 font-extrabold text-xs uppercase tracking-wider shadow-sm backdrop-blur-md">
          <Stethoscope className="text-blue-600 animate-pulse" size={16} />
          Practitioner Workspace
        </span>
        
        <h1 className="text-4xl sm:text-5xl lg:text-[3.85rem] font-extrabold tracking-tight leading-[1.1] text-slate-800">
          Your Unified <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-teal-600">Clinical Console</span>
        </h1>
        
        <p className="text-base text-slate-500 leading-relaxed max-w-xl">
          Log in to your secure workspace to manage patient queues, check upcoming consultations, update patient charts, and administer daily calendars.
        </p>

        {/* High-Fidelity Mockup clinical queue container */}
        <div className="relative w-full max-w-md mt-4 select-none">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/10 to-teal-500/10 blur-md -z-10" />
          
          <div className="w-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg rounded-2xl p-5 flex flex-col gap-4">
            {/* Top row */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                <Clock size={12} className="text-blue-500" />
                <span>Shift: 09:00 AM - 05:00 PM</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-blue-50 text-blue-700 border border-blue-100">
                <span className="w-1 h-1 rounded-full bg-blue-500 animate-ping"></span>
                Console Connected
              </span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/90 border border-slate-100 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Users size={15} />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">Queue</span>
                  <strong className="text-sm font-black text-slate-700 block">4 Patients Left</strong>
                </div>
              </div>
              <div className="p-3 bg-white/90 border border-slate-100 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                  <Activity size={15} />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">Completed</span>
                  <strong className="text-sm font-black text-slate-700 block">8 Consultations</strong>
                </div>
              </div>
            </div>

            {/* Active patient item */}
            <div className="p-3 bg-blue-50/40 border border-blue-100/60 rounded-xl flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[9px] font-extrabold text-blue-600 uppercase tracking-widest">Next Consultation</span>
                <strong className="text-xs font-bold text-slate-700 mt-0.5">Patient Profile #105 (Alice Smith)</strong>
                <span className="text-[10px] text-slate-450 mt-0.5">Time: 10:15 AM Slot</span>
              </div>
              <span className="inline-flex px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[9px] font-extrabold">Active</span>
            </div>
          </div>
        </div>

        {/* Portal Shortcuts */}
        <div className="flex flex-wrap gap-4 pt-6 mt-2 border-t border-slate-200/50 max-w-md text-sm">
          <Link to="/login" className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 hover:shadow-sm text-slate-700 font-extrabold transition-all">
            Patient Portal <ArrowRight size={14} className="text-slate-400" />
          </Link>
          <Link to="/admin/login" className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-slate-900 text-white font-extrabold hover:bg-black hover:shadow-md transition-all">
            Admin Console <ArrowRight size={14} className="text-slate-400" />
          </Link>
        </div>

        <p className="text-xs text-slate-400 max-w-md">
          * Practitioner Notice: Doctor profiles are generated by the system administrator. If you require credentials, contact the clinic IT support desk.
        </p>
      </div>

      {/* Right Column: Glass Form Card Section */}
      <div className="w-full lg:w-[440px] relative animate-slide-up">
        {/* Subtle background glow effect behind the form */}
        <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-blue-500 to-teal-500 opacity-20 blur-lg -z-10" />
        
        <form onSubmit={handleSubmit} className="w-full bg-white/75 backdrop-blur-2xl border border-white/60 shadow-[0_24px_50px_rgba(0,0,0,0.06)] rounded-[32px] p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1.5">
          {/* Top visual gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-blue-400 to-teal-650" />
          
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">Doctor Portal</h2>
            <p className="text-xs text-slate-450 mt-1.5 leading-relaxed">Enter credentials to authenticate your clinical session.</p>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 text-rose-700 border border-rose-500/20 font-bold text-xs animate-shake text-left">
              {error}
            </div>
          )}

          {/* Email Input Field */}
          <label className="flex flex-col gap-2 text-left font-bold text-slate-700 text-sm">
            <span>Doctor Email Address</span>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Mail size={16} />
              </div>
              <input
                name="email"
                type="email"
                placeholder="doctor@doctorappoints.dev"
                value={formData.email}
                onChange={updateField}
                autoComplete="email"
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white/40 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 font-medium text-slate-800 text-sm hover:border-slate-350 shadow-inner shadow-slate-50"
              />
            </div>
          </label>

          {/* Password Input Field */}
          <label className="flex flex-col gap-2 text-left font-bold text-slate-700 text-sm">
            <span>Security Password</span>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <LockKeyhole size={16} />
              </div>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={updateField}
                autoComplete="current-password"
                required
                className="w-full pl-11 pr-12 py-3.5 rounded-2xl border border-slate-200 bg-white/40 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 font-medium text-slate-800 text-sm hover:border-slate-350 shadow-inner shadow-slate-50"
              />
              <button
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-650 hover:bg-slate-100/60 transition-all cursor-pointer"
                type="button"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {/* Keep session active checkbox */}
          <div className="flex items-center mt-1">
            <label className="flex items-center gap-2.5 text-xs text-slate-500 font-bold cursor-pointer select-none">
              <input 
                name="rememberMe" 
                type="checkbox" 
                checked={formData.rememberMe} 
                onChange={updateField} 
                className="w-4.5 h-4.5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
              />
              Keep practitioner session active
            </label>
          </div>

          {/* Submit Button */}
          <button 
            className="w-full py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-teal-600 hover:from-blue-600 hover:to-teal-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform active:scale-[0.97] cursor-pointer mt-2 flex items-center justify-center gap-2" 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                <span>Authenticating Console...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={16} />
                <span>Login to Doctor Portal</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

// Doctor live queue stats console
