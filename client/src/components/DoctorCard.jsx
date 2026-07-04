import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin, Star } from 'lucide-react';

export default function DoctorCard({ doctor }) {
  return (
    <article className="flex flex-col gap-4 bg-white border border-slate-100/80 shadow-md rounded-[28px] p-5.5 hover:shadow-xl hover:shadow-teal-500/5 hover:-translate-y-1.5 transition-all duration-300 relative text-left h-full group">
      
      {/* Card Badges Row */}
      <div className="flex justify-between items-center w-full">
        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${doctor.available ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
          {doctor.available ? 'Available' : 'Busy'}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-705 border border-amber-100">
          <Star size={11} className="fill-amber-500 text-amber-500" /> {doctor.rating}
        </span>
      </div>

      {/* Doctor Identity Header */}
      <div className="flex gap-3.5 items-center">
        <div className="w-13 h-13 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/50 flex-shrink-0 relative">
          {doctor.image ? (
            <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-slate-200 text-slate-650 flex items-center justify-center font-extrabold text-base">{doctor.initials}</div>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="font-extrabold text-slate-800 text-base tracking-tight leading-snug truncate">{doctor.name}</h3>
          <p className="text-xs text-slate-500 font-semibold truncate mt-0.5">{doctor.specialty}</p>
        </div>
      </div>

      {/* Clinic Metadata */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-3">
        <span className="flex items-center gap-1.5 min-w-0">
          <MapPin size={13} className="text-slate-400 flex-shrink-0" />
          <span className="truncate">{doctor.location}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarDays size={13} className="text-slate-400 flex-shrink-0" />
          <span>{doctor.experience}</span>
        </span>
      </div>

      {/* Summary Description */}
      <p className="text-xs text-slate-500 leading-relaxed min-h-[36px] line-clamp-2">
        {doctor.about}
      </p>

      {/* Footer fee and book triggers */}
      <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-auto w-full">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fee</span>
          <strong className="text-base font-extrabold text-teal-700 block mt-0.5">${doctor.fee}</strong>
        </div>
        <Link to={`/doctors/${doctor.id}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors">
          Book now <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

    </article>
  );
}
