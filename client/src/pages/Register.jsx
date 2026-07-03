import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { signUp, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Name, email, and password are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsSubmitting(true);
      await signUp(formData);
      navigate('/dashboard', { replace: true });
    } catch (exception) {
      setError(exception.response?.data?.message || 'Unable to create your account right now');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="container page-block auth-page auth-split">
      <div className="auth-copy">
        <span className="hero-badge">
          <ShieldCheck size={16} />
          Fast account setup
        </span>
        <h1>Create your secure patient account in a minute.</h1>
        <p>
          Registering now gives you protected access, authenticated sessions, and a patient dashboard ready for future booking features.
        </p>

        <div className="auth-feature-list">
          <div>
            <ShieldCheck size={16} />
            Secure JWT sign-up flow
          </div>
          <div>
            <ShieldCheck size={16} />
            Automatic login after registration
          </div>
          <div>
            <ShieldCheck size={16} />
            Session persistence with remember me
          </div>
        </div>

        <p className="auth-help-text">
          Already have an account? <Link to="/login">Log in instead</Link>.
        </p>
      </div>

      <form className="auth-card auth-form" onSubmit={handleSubmit}>
        <div>
          <h1>Create account</h1>
          <p className="auth-subtitle">Set up your profile and secure sign-in details.</p>
        </div>

        {error ? <div className="auth-alert">{error}</div> : null}

        <label className="auth-field">
          <span>Full name</span>
          <input name="name" type="text" placeholder="Your full name" value={formData.name} onChange={updateField} autoComplete="name" />
        </label>

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
              placeholder="Create a password"
              value={formData.password}
              onChange={updateField}
              autoComplete="new-password"
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

        <label className="auth-field">
          <span>Confirm password</span>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={updateField}
            autoComplete="new-password"
          />
        </label>

        <label className="remember-me">
          <input name="rememberMe" type="checkbox" checked={formData.rememberMe} onChange={updateField} />
          Keep me signed in on this device
        </label>

        <button className="btn btn-primary full-width" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </section>
  );
}
