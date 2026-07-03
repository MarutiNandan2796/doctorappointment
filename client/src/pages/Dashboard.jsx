import { LogOut, ShieldCheck, UserCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { signOut, user } = useAuth();

  return (
    <section className="container page-block">
      <div className="dashboard-header">
        <div>
          <span className="hero-badge">
            <UserCircle2 size={16} />
            Signed in as {user?.name}
          </span>
          <h1>Protected dashboard</h1>
          <p>Authenticated access is now required before visiting this area.</p>
        </div>

        <button className="btn btn-ghost" type="button" onClick={signOut}>
          <LogOut size={16} />
          Logout
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>
            <ShieldCheck size={16} />
            Appointments
          </h2>
          <strong>18</strong>
          <p>Upcoming and completed visits tracked in one place.</p>
        </div>
        <div className="dashboard-card">
          <h2>Patients</h2>
          <strong>320</strong>
          <p>Admin-ready overview for patient records and scheduling.</p>
        </div>
        <div className="dashboard-card">
          <h2>Doctors</h2>
          <strong>24</strong>
          <p>Manage doctor availability, expertise, and booking status.</p>
        </div>
      </div>
    </section>
  );
}
