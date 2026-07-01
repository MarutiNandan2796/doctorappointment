import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin, Star } from 'lucide-react';

export default function DoctorCard({ doctor }) {
  return (
    <article className="doctor-card">
      <div className="doctor-avatar">{doctor.initials}</div>
      <div className="doctor-card-body">
        <div className="doctor-card-top">
          <span className={`status-pill ${doctor.available ? 'available' : 'busy'}`}>
            {doctor.available ? 'Available' : 'Busy'}
          </span>
          <span className="rating-pill">
            <Star size={14} /> {doctor.rating}
          </span>
        </div>
        <h3>{doctor.name}</h3>
        <p className="muted">{doctor.specialty}</p>
        <p className="doctor-meta">
          <span>
            <MapPin size={14} /> {doctor.location}
          </span>
          <span>
            <CalendarDays size={14} /> {doctor.experience}
          </span>
        </p>
        <p className="doctor-about">{doctor.about}</p>
        <div className="doctor-card-footer">
          <strong>${doctor.fee}</strong>
          <Link to={`/doctors/${doctor.id}`} className="text-link">
            Book now <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
