import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, Stethoscope, TimerReset } from 'lucide-react';
import { doctors, specialties } from '../data/doctors';
import DoctorCard from '../components/DoctorCard';
import SpecialtyChip from '../components/SpecialtyChip';
import SectionHeading from '../components/SectionHeading';

export default function Home() {
  const topDoctors = doctors.slice(0, 4);

  return (
    <>
      <section className="hero-section">
        <div className="hero-background" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="hero-badge">
              <Sparkles size={16} /> Trusted clinic booking platform
            </span>
            <h1>Book appointments with trusted doctors in minutes.</h1>
            <p>
              Browse specialties, compare top doctors, and schedule hassle-free visits with a clean,
              patient-first experience.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/doctors">
                Book appointment <ArrowRight size={16} />
              </Link>
              <Link className="btn btn-ghost" to="/register">
                Create account
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <strong>100+</strong>
                <span>Trusted doctors</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Support access</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Patient rating</span>
              </div>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card-top">
              <Stethoscope size={20} />
              <span>Fast appointment booking</span>
            </div>
            <div className="hero-doctor-preview">
              <div className="avatar-bubble">RJ</div>
              <div>
                <h3>Dr. Richard James</h3>
                <p>General physician</p>
              </div>
              <span className="status-pill available">Available</span>
            </div>
            <div className="hero-calendar">
              <div>
                <span>Next slot</span>
                <strong>10:00 AM</strong>
              </div>
              <div>
                <span>Fee</span>
                <strong>$80</strong>
              </div>
              <div>
                <span>Experience</span>
                <strong>8 years</strong>
              </div>
            </div>
            <div className="hero-card-footer">
              <ShieldCheck size={16} />
              Secure and user-friendly appointment flow
            </div>
          </div>
        </div>
      </section>

      <section className="container section-block">
        <SectionHeading
          eyebrow="Find by speciality"
          title="Choose the right specialist"
          description="Browse trusted doctors across the most requested medical specialties."
        />
        <div className="specialty-grid">
          {specialties.map((specialty) => (
            <SpecialtyChip key={specialty} label={specialty} active={specialty === specialties[0]} />
          ))}
        </div>
      </section>

      <section className="container section-block">
        <SectionHeading
          eyebrow="Top doctors"
          title="Top doctors to book"
          description="A curated set of available doctors with high ratings and clear appointment access."
        />
        <div className="doctor-grid">
          {topDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>

      <section className="container cta-strip">
        <div>
          <h2>Book appointment with trusted doctors</h2>
          <p>Build your patient profile, save favorites, and keep all visit history in one place.</p>
        </div>
        <Link className="btn btn-dark" to="/dashboard">
          Go to dashboard <TimerReset size={16} />
        </Link>
      </section>
    </>
  );
}
