export default function Dashboard() {
  return (
    <section className="container page-block">
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Appointments</h2>
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
