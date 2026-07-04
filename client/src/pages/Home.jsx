import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, Stethoscope, TimerReset } from 'lucide-react';
import { doctors, specialties } from '../data/doctors';
import DoctorCard from '../components/DoctorCard';
import SpecialtyChip from '../components/SpecialtyChip';
import SectionHeading from '../components/SectionHeading';

export default function Home() {
  const topDoctors = doctors.slice(0, 4);

  return (
    <div className="w-full relative overflow-hidden">
      {/* Dynamic Animated Background Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-teal-400/20 blur-[130px] animate-pulse-slow pointer-events-none -z-10" />
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 rounded-full bg-indigo-400/15 blur-[130px] animate-pulse-slow pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-16 md:py-24 px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center text-left relative z-10">
          
          {/* Hero Copy */}
          <div className="flex flex-col gap-6 animate-slide-up">
            <span className="self-start inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-indigo-500/10 text-teal-850 border border-teal-500/20 font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="text-teal-600 animate-pulse" size={14} /> 
              Trusted clinical booking platform
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-800">
              Book appointments with <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-650">trusted doctors</span> in minutes.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Browse specialties, compare top doctors, and schedule hassle-free visits with a clean, patient-first experience.
            </p>
            
            {/* Hero Actions */}
            <div className="flex flex-wrap gap-4 mt-2">
              <Link className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white font-extrabold rounded-2xl shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/35 transition-all transform active:scale-95 text-sm cursor-pointer" to="/doctors">
                Book appointment <ArrowRight size={16} />
              </Link>
              <Link className="inline-flex items-center gap-2 px-6 py-4 border border-slate-200 bg-white/40 hover:bg-slate-50 rounded-2xl text-slate-700 font-extrabold hover:shadow-md hover:-translate-y-0.5 transition-all text-sm" to="/register">
                Create account
              </Link>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-slate-200/60 max-w-lg mt-4">
              <div>
                <strong className="text-3xl sm:text-4xl font-black text-slate-800 block">100+</strong>
                <span className="text-xs font-semibold text-slate-450 uppercase tracking-wider block mt-1">Trusted doctors</span>
              </div>
              <div>
                <strong className="text-3xl sm:text-4xl font-black text-slate-800 block">24/7</strong>
                <span className="text-xs font-semibold text-slate-450 uppercase tracking-wider block mt-1">Support access</span>
              </div>
              <div>
                <strong className="text-3xl sm:text-4xl font-black text-slate-800 block">4.9/5</strong>
                <span className="text-xs font-semibold text-slate-450 uppercase tracking-wider block mt-1">Patient rating</span>
              </div>
            </div>
          </div>

          {/* Hero Card */}
          <div className="relative animate-slide-up w-full max-w-[420px] mx-auto lg:mx-0">
            <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-teal-500 to-indigo-650 opacity-15 blur-lg -z-10 animate-pulse-slow" />
            <div className="w-full bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[32px] p-6 hover:shadow-[0_20px_50px_rgba(20,184,166,0.1)] transition-all duration-500 hover:-translate-y-1.5 relative overflow-hidden flex flex-col gap-5 border-t-4 border-t-teal-500 text-left">
              
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <Stethoscope className="text-teal-600 animate-pulse" size={20} />
                <span>Fast appointment booking</span>
              </div>

              <div className="flex gap-4 items-center p-4 bg-white/80 border border-slate-100 rounded-2xl shadow-sm">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&h=300&q=80" alt="Dr. Richard James" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-slate-850 text-[0.95rem]">Dr. Richard James</h3>
                  <p className="text-xs text-slate-500 mt-0.5">General physician</p>
                </div>
                <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wider">Available</span>
              </div>

              <div className="grid grid-cols-3 gap-4 border-y border-slate-100 py-4 text-center">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Next slot</span>
                  <strong className="text-sm font-extrabold text-slate-700 block mt-0.5">10:00 AM</strong>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fee</span>
                  <strong className="text-sm font-extrabold text-teal-700 block mt-0.5">$80</strong>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Experience</span>
                  <strong className="text-sm font-extrabold text-slate-700 block mt-0.5">8 years</strong>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mt-1">
                <ShieldCheck className="text-teal-600" size={16} />
                Secure and user-friendly appointment flow
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="container mx-auto px-4 py-16 border-t border-slate-100/60">
        <SectionHeading
          eyebrow="Find by speciality"
          title="Choose the right specialist"
          description="Browse trusted doctors across the most requested medical specialties."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-8">
          {specialties.map((specialty) => (
            <SpecialtyChip key={specialty} label={specialty} active={specialty === specialties[0]} />
          ))}
        </div>
      </section>

      {/* Top Doctors Section */}
      <section className="container mx-auto px-4 py-16 border-t border-slate-100/60 text-left">
        <SectionHeading
          eyebrow="Top doctors"
          title="Top doctors to book"
          description="A curated set of available doctors with high ratings and clear appointment access."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {topDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="container mx-auto px-4 py-12 my-16 bg-gradient-to-r from-slate-800 to-slate-950 text-white rounded-[32px] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 text-left relative overflow-hidden animate-slide-up">
        {/* Glow */}
        <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-teal-500/20 blur-[90px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Book appointments with trusted doctors</h2>
          <p className="text-slate-350 text-sm sm:text-base mt-2 leading-relaxed">
            Build your patient profile, reserve custom slots in real-time, and keep all clinic logs in one secure platform.
          </p>
        </div>
        <Link className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white font-extrabold rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/35 transition-all transform active:scale-95 text-sm cursor-pointer whitespace-nowrap" to="/dashboard">
          Go to dashboard <TimerReset size={16} />
        </Link>
      </section>
    </div>
  );
}
