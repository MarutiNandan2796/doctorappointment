import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CalendarDays, Clock3, MapPin, Phone, Star } from 'lucide-react';
import { doctors, upcomingSlots } from '../data/doctors';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function DoctorDetails() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  
  const doctor = doctors.find((item) => String(item.id) === doctorId) ?? doctors[0];

  const [selectedSlot, setSelectedSlot] = useState(upcomingSlots[0]);
  const [bookingDate, setBookingDate] = useState('2026-07-10');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleBookAppointment() {
    setError('');
    setSuccess('');

    if (!isAuthenticated) {
      // Redirect to patient login
      navigate('/login', { state: { from: location } });
      return;
    }

    if (user.role !== 'patient') {
      setError('Only logged-in patients can book appointments.');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        userId: user.id,
        doctorId: doctor.id,
        slot: selectedSlot,
        date: bookingDate
      };

      const res = await api.post('/appointments', payload);
      if (res.data?.success) {
        setSuccess('Appointment booked successfully! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="container page-block detail-layout">
      <article className="detail-card glass-panel hover-lift">
        <div className="doctor-avatar large">
          {doctor.image ? (
            <img src={doctor.image} alt={doctor.name} />
          ) : (
            doctor.initials
          )}
        </div>
        <div className="detail-main">
          <div className="detail-top">
            <span className={`status-pill ${doctor.available ? 'available' : 'busy'}`}>
              {doctor.available ? 'Available today' : 'Fully booked'}
            </span>
            <span className="rating-pill">
              <Star size={14} /> {doctor.rating}
            </span>
          </div>
          <h1>{doctor.name}</h1>
          <p className="muted">{doctor.specialty}</p>
          <p>{doctor.about}</p>
          <div className="detail-info-grid">
            <span>
              <MapPin size={16} /> {doctor.location}
            </span>
            <span>
              <CalendarDays size={16} /> {doctor.experience} experience
            </span>
            <span>
              <Phone size={16} /> Consultation support available
            </span>
          </div>
        </div>
      </article>

      <aside className="booking-card">
        <h2>Book appointment</h2>
        <p>Select an available slot to reserve your visit.</p>
        
        {error && <div className="auth-alert" style={{ margin: '10px 0', fontSize: '0.9rem' }}>{error}</div>}
        {success && <div className="auth-alert" style={{ margin: '10px 0', fontSize: '0.9rem', background: 'rgba(43, 138, 125, 0.12)', color: 'var(--primary-dark)', borderColor: 'rgba(43, 138, 125, 0.2)' }}>{success}</div>}

        <div style={{ marginTop: '15px' }}>
          <label style={{ display: 'grid', gap: '6px', fontWeight: 'bold', fontSize: '0.85rem' }}>
            Select Date
            <input 
              type="date" 
              value={bookingDate} 
              onChange={(e) => setBookingDate(e.target.value)}
              style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '10px 12px', width: '100%', fontFamily: 'inherit' }}
            />
          </label>
        </div>

        <div className="slot-grid" style={{ margin: '15px 0' }}>
          {upcomingSlots.map((slot) => (
            <button 
              key={slot} 
              type="button" 
              className="slot-pill"
              onClick={() => setSelectedSlot(slot)}
              style={{
                background: selectedSlot === slot ? 'var(--accent)' : '#fff',
                borderColor: selectedSlot === slot ? 'var(--primary)' : 'var(--border)',
                color: selectedSlot === slot ? 'var(--primary-dark)' : 'var(--text)'
              }}
            >
              <Clock3 size={14} /> {slot}
            </button>
          ))}
        </div>

        <button 
          className="btn btn-primary full-width" 
          type="button"
          onClick={handleBookAppointment}
          disabled={isSubmitting || !doctor.available}
        >
          {isSubmitting ? 'Reserving...' : 'Confirm booking'}
        </button>
        <p className="booking-note" style={{ marginTop: '10px', fontSize: '0.8rem' }}>
          By confirming, you agree to show up at the scheduled slot or notify details in advance.
        </p>
      </aside>
    </section>
  );
}
