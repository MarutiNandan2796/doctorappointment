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
      await signIn(formData);
      const nextPath = location.state?.from?.pathname || '/dashboard';
      navigate(nextPath, { replace: true });
    } catch (exception) {
      setError(exception.response?.data?.message || 'Unable to sign in right now');
    } finally {
      setIsSubmitting(false);
    }
  }

  function fillDemoCredentials() {
    setFormData({
      email: demoCredentials.email,
      password: demoCredentials.password,
      rememberMe: true
    });
  }

  return (
    <section className="container page-block auth-page auth-split">
      <div className="auth-copy">
        <span className="hero-badge">
          <ShieldCheck size={16} />
          Secure patient access
        </span>
        <h1>Sign in to manage appointments, messages, and saved sessions.</h1>
        <p>
          Login now includes persistent session control, token verification, and a richer experience for returning patients and clinic staff.
        </p>

        <div className="auth-feature-list">
          <div>
            <LockKeyhole size={16} />
            JWT-backed session protection
          </div>
          <div>
            <Sparkles size={16} />
            Remember this device or keep it temporary
          </div>
          <div>
            <ShieldCheck size={16} />
            Protected dashboard access after login
          </div>
        </div>

        <button className="btn btn-ghost auth-demo-btn" type="button" onClick={fillDemoCredentials}>
          Use demo admin credentials
        </button>

        <p className="auth-help-text">
          New here? <Link to="/register">Create your account</Link> to start booking visits.
        </p>
      </div>

      <form className="auth-card auth-form" onSubmit={handleSubmit}>
        <div>
          <h1>Welcome back</h1>
          <p className="auth-subtitle">Sign in with your email address and password.</p>
        </div>

        {error ? <div className="auth-alert">{error}</div> : null}

        <label className="auth-field">
          <span>Email</span>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={updateField}
            autoComplete="email"
          />
        </label>

        <label className="auth-field">
          <span>Password</span>
          <div className="password-field">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Your password"
              value={formData.password}
              onChange={updateField}
              autoComplete="current-password"
            />
            <button
              className="password-toggle"
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>

        <div className="auth-row">
          <label className="remember-me">
            <input name="rememberMe" type="checkbox" checked={formData.rememberMe} onChange={updateField} />
            Remember me on this device
          </label>

          <a className="text-link" href="mailto:hello@doctorappoints.dev">
            Forgot password?
          </a>
        </div>

        <button className="btn btn-primary full-width" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Login securely'}
        </button>

        <p className="auth-footer-note">
          Demo admin: <strong>{demoCredentials.email}</strong>
        </p>
      </form>
    </section>
  );
}
