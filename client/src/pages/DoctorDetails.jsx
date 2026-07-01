import { useParams } from 'react-router-dom';
import { CalendarDays, Clock3, MapPin, Phone, Star } from 'lucide-react';
import { doctors, upcomingSlots } from '../data/doctors';

export default function DoctorDetails() {
  const { doctorId } = useParams();
  const doctor = doctors.find((item) => String(item.id) === doctorId) ?? doctors[0];

  return (
    <section className="container page-block detail-layout">
      <article className="detail-card">
        <div className="doctor-avatar large">{doctor.initials}</div>
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
        <div className="slot-grid">
          {upcomingSlots.map((slot) => (
            <button key={slot} type="button" className="slot-pill">
              <Clock3 size={14} /> {slot}
            </button>
          ))}
        </div>
        <button className="btn btn-primary full-width" type="button">
          Confirm booking
        </button>
        <p className="booking-note">This is a frontend booking flow scaffold. Connect it to the API next.</p>
      </aside>
    </section>
  );
}
