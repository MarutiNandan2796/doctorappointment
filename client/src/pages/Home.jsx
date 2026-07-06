import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, Stethoscope, TimerReset, Star, Users, CheckCircle2, Calendar } from 'lucide-react';
import { doctors, specialties } from '../data/doctors';
import DoctorCard from '../components/DoctorCard';
import SpecialtyChip from '../components/SpecialtyChip';
import SectionHeading from '../components/SectionHeading';

export default function Home() {
  const topDoctors = doctors.slice(0, 4);

  return (
    <div className="w-full relative overflow-hidden">
      {/* High-Tech Background Grid & Blobs */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none -z-10" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-teal-400/20 blur-[130px] animate-pulse-slow pointer-events-none -z-10" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-400/15 blur-[130px] animate-pulse-slow pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-emerald-400/10 blur-[130px] animate-pulse-slow pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-16 md:py-24 px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center text-left relative z-10">
          
          {/* Hero Copy */}
          <div className="flex flex-col gap-6 animate-slide-up">
            <span className="self-start inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-indigo-500/10 text-teal-900 border border-teal-500/25 font-extrabold text-xs uppercase tracking-wider shadow-sm backdrop-blur-md">
              <Sparkles className="text-teal-600 animate-pulse" size={14} /> 
              Trusted Clinical Booking Console
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-[4.25rem] font-extrabold tracking-tight leading-[1.05] text-slate-900">
              Book appointments with <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-emerald-600 to-indigo-650">trusted doctors</span> in minutes.
            </h1>
            
            <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
              Browse professional medical specialties, compare peer-rated practitioners, and secure hassle-free clinical slots in real-time.
            </p>
            
            {/* Hero Actions */}
            <div className="flex flex-wrap gap-4 mt-2">
              <Link 
                className="inline-flex items-center gap-2.5 px-7 py-4.5 bg-gradient-to-r from-teal-500 via-teal-600 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white font-extrabold rounded-2xl shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/35 hover:-translate-y-0.5 transition-all text-sm cursor-pointer" 
                to="/doctors"
              >
                Book Appointment <ArrowRight size={16} className="animate-pulse" />
              </Link>
              <Link 
                className="inline-flex items-center gap-2 px-7 py-4.5 border border-slate-200 bg-white/60 hover:bg-white/90 backdrop-blur-md rounded-2xl text-slate-700 font-extrabold hover:shadow-md hover:-translate-y-0.5 transition-all text-sm" 
                to="/register"
              >
                Create Account
              </Link>
            </div>

            {/* Premium Interactive Hero Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200/60 max-w-lg mt-6">
              <div className="p-4 bg-white/40 border border-white/60 rounded-2xl hover:bg-white/80 transition-all hover:shadow-md group">
                <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-650 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Stethoscope size={16} />
                </span>
                <strong className="text-2xl sm:text-3xl font-black text-slate-800 block">100+</strong>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Specialists</span>
              </div>
              <div className="p-4 bg-white/40 border border-white/60 rounded-2xl hover:bg-white/80 transition-all hover:shadow-md group">
                <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={16} />
                </span>
                <strong className="text-2xl sm:text-3xl font-black text-slate-800 block">99.8%</strong>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Fulfillment</span>
              </div>
              <div className="p-4 bg-white/40 border border-white/60 rounded-2xl hover:bg-white/80 transition-all hover:shadow-md group">
                <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Star size={16} className="fill-amber-500" />
                </span>
                <strong className="text-2xl sm:text-3xl font-black text-slate-800 block">4.9/5</strong>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Patient Rating</span>
              </div>
            </div>
          </div>

          {/* Hero Premium Dashboard Widget Mockup */}
          <div className="relative animate-slide-up w-full max-w-[440px] mx-auto lg:mx-0">
            {/* Soft outer glow */}
            <div className="absolute -inset-1.5 rounded-[36px] bg-gradient-to-r from-teal-500 via-teal-400 to-indigo-600 opacity-20 blur-xl -z-10 animate-pulse-slow" />
            
            {/* Glassmorphic console card */}
            <div className="w-full bg-white/75 backdrop-blur-2xl border border-white/60 shadow-[0_24px_50px_rgba(0,0,0,0.06)] rounded-[32px] p-6 hover:shadow-[0_24px_50px_rgba(43,138,125,0.1)] transition-all duration-500 hover:-translate-y-1.5 relative overflow-hidden flex flex-col gap-5 border-t-4 border-t-teal-500 text-left">
              
              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span>Active Scheduler Monitor</span>
                </div>
                <span className="text-[10px] font-extrabold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md uppercase tracking-wider">Live</span>
              </div>

              {/* Patient Booking Preview Box */}
              <div className="flex gap-4 items-center p-4 bg-white/95 border border-slate-100 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/50 flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&h=300&q=80" 
                    alt="Dr. Richard James" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-slate-800 text-[0.95rem] truncate">Dr. Richard James</h3>
                    <ShieldCheck size={14} className="text-teal-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">General Physician &bull; 8 yrs exp</p>
                </div>
                <span className="inline-flex px-2.5 py-1 rounded-full text-[9px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wider flex-shrink-0">Available</span>
              </div>

              {/* Interactive Calendar Slots Grid */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Available Consultation Slot</span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl border border-teal-500 bg-teal-50/50 text-center cursor-pointer hover:bg-teal-50 transition-colors">
                    <span className="text-[10px] font-bold text-slate-450 block uppercase">Mon</span>
                    <strong className="text-xs font-black text-teal-800 block mt-0.5">10:00 AM</strong>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-150 bg-white/90 text-center cursor-pointer hover:border-slate-300 transition-all">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Tue</span>
                    <strong className="text-xs font-bold text-slate-700 block mt-0.5">02:30 PM</strong>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-150 bg-white/90 text-center cursor-pointer hover:border-slate-300 transition-all">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Wed</span>
                    <strong className="text-xs font-bold text-slate-700 block mt-0.5">11:00 AM</strong>
                  </div>
                </div>
              </div>

              {/* Consultation Details Footer */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-center">
                <div className="border-r border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Consultation Fee</span>
                  <strong className="text-base font-extrabold text-teal-700 block mt-0.5">$80.00</strong>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Clinic Rating</span>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <Star size={12} className="fill-amber-500 text-amber-500" />
                    <strong className="text-sm font-extrabold text-slate-700 block">4.8 (120+)</strong>
                  </div>
                </div>
              </div>

              {/* Floating micro statistics tag */}
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-lg shadow-lg border border-slate-800 scale-90 select-none">
                <Users size={10} className="text-teal-400" />
                <span className="text-[9px] font-bold tracking-wider">12 booked today</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="container mx-auto px-4 py-20 border-t border-slate-100/60 relative">
        <SectionHeading
          eyebrow="Browse by Speciality"
          title="Choose the right clinical expert"
          description="Access vetted clinical practitioners classified across the most requested medical divisions."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-10">
          {specialties.map((specialty, idx) => (
            <SpecialtyChip 
              key={specialty} 
              label={specialty} 
              active={idx === 0} 
            />
          ))}
        </div>
      </section>

      {/* Top Vetted Doctors Section */}
      <section className="container mx-auto px-4 py-20 border-t border-slate-100/60 text-left relative">
        <SectionHeading
          eyebrow="Top Recommended Doctors"
          title="Available practitioners for booking"
          description="Browse profiles, view clinical qualifications, compare ratings, and book your secure consultation slot."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {topDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>

      {/* Modern Glowing Footer CTA Strip */}
      <section className="container mx-auto px-4 py-10 my-20 relative">
        {/* Soft background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-indigo-650/15 blur-2xl rounded-[36px] -z-10" />
        
        <div className="w-full bg-gradient-to-br from-slate-850 via-slate-900 to-indigo-950 text-white rounded-[32px] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 p-8 md:p-14 text-left border border-slate-800 relative overflow-hidden">
          
          {/* Subtle inside grid layout */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <div className="absolute top-[-50%] right-[-10%] w-[320px] h-[320px] bg-teal-500/20 blur-[100px] rounded-full pointer-events-none -z-10" />
          
          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold text-xs uppercase tracking-wider mb-4">
              <ShieldCheck size={12} />
              HIPAA Cryptography Assured
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Start booking consultations in under two minutes
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
              Create your secure patient registry, lock in upcoming slots in real-time, and manage all your clinical visit summaries inside one unified interface.
            </p>
          </div>
          
          <Link 
            className="inline-flex items-center gap-2 px-7 py-4.5 bg-gradient-to-r from-teal-400 to-teal-650 hover:from-teal-500 hover:to-teal-700 text-slate-950 font-black rounded-2xl shadow-lg shadow-teal-400/10 hover:shadow-xl hover:shadow-teal-400/25 transition-all transform active:scale-95 text-sm cursor-pointer whitespace-nowrap relative z-10" 
            to="/dashboard"
          >
            Access Dashboard <TimerReset size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

// Live scheduler and statistics updates
