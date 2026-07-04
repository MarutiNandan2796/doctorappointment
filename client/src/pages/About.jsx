import { Link } from 'react-router-dom';
import { Calendar, ShieldAlert, Sparkles, Stethoscope, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full relative overflow-hidden text-left py-12 md:py-20">
      {/* Floating Animated Radial Glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[450px] h-[450px] bg-teal-400/20 blur-[130px] rounded-full pointer-events-none animate-pulse-slow -z-10" />
      <div className="absolute bottom-[10%] right-[-15%] w-[450px] h-[450px] bg-indigo-400/15 blur-[130px] rounded-full pointer-events-none animate-pulse-slow -z-10" />

      <section className="container mx-auto px-4 flex flex-col gap-16 animate-slide-up">
        {/* Page Hero Header */}
        <div className="max-w-3xl flex flex-col gap-5">
          <span className="self-start inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-teal-500/10 text-teal-700 border border-teal-500/20 font-bold text-xs uppercase tracking-wider">
            <Sparkles size={14} className="text-teal-600" />
            Our Mission & Vision
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800 leading-tight">
            We are redefining medical scheduling with a <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-650">patient-first</span> approach.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Doctor Appoints was built on a simple promise: healthcare discovery should be fast, highly transparent, and free of administrative bottlenecks. We connect patients directly to board-certified medical professionals.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {[
            {
              icon: <Stethoscope size={22} />,
              color: 'text-teal-600 bg-teal-50 border-teal-100',
              title: 'Verified Practitioners',
              desc: 'Every doctor profile hosted in our directory is board-certified, vetted, and clinically licensed.'
            },
            {
              icon: <Calendar size={22} />,
              color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
              title: 'Real-time Scheduler',
              desc: 'Book slots instantly. No back-and-forth email confirmations or long phone hold queues.'
            },
            {
              icon: <Users size={22} />,
              color: 'text-purple-600 bg-purple-50 border-purple-100',
              title: 'Unified Patient Hub',
              desc: 'Manage your visits, record histories, and consult directly through a single portal.'
            }
          ].map((val, idx) => (
            <div key={idx} className="bg-white border border-slate-100 shadow-md hover:shadow-xl hover:shadow-teal-500/5 hover:-translate-y-1.5 transition-all duration-350 p-6.5 rounded-[28px] flex flex-col gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${val.color} border`}>
                {val.icon}
              </div>
              <h3 className="font-extrabold text-slate-800 text-lg tracking-tight">{val.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>

        {/* Detailed Explanation / Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center bg-white/50 border border-slate-100 backdrop-blur-md rounded-[32px] p-8 md:p-12 shadow-xl">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">Making Quality Healthcare Accessible to All</h2>
            <p className="text-sm sm:text-base text-slate-550 leading-relaxed">
              We started as a tiny project to solve appointment bookings for local clinics. Today, Doctor Appoints helps thousands of patients coordinate consultations weekly, offering a simplified directory sorted by ratings, location, experience, and fee transparency.
            </p>
            <p className="text-sm sm:text-base text-slate-550 leading-relaxed">
              By offering specialized dashboards for patients, doctors, and system-wide clinic administrators, we align workflow operations under a secure, high-fidelity experience.
            </p>
          </div>

          {/* Stats Display */}
          <div className="grid grid-cols-2 gap-6 text-center border-l-0 lg:border-l lg:border-slate-200 lg:pl-12">
            <div className="p-4 bg-slate-50 rounded-2xl">
              <strong className="text-3xl sm:text-4xl font-black text-slate-800">500+</strong>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Verified Doctors</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <strong className="text-3xl sm:text-4xl font-black text-slate-800">10k+</strong>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Visits Booked</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <strong className="text-3xl sm:text-4xl font-black text-slate-800">99.8%</strong>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Patient Rating</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <strong className="text-3xl sm:text-4xl font-black text-slate-800">15+</strong>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Specialties Supported</span>
            </div>
          </div>
        </div>

        {/* Dynamic CTA Strip */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-950 text-white rounded-[32px] shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Glow */}
          <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-teal-500/20 blur-[90px] rounded-full pointer-events-none -z-10" />
          
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Ready to schedule your visit?</h2>
            <p className="text-slate-350 text-sm sm:text-base mt-2 leading-relaxed">
              Explore specialized practitioners, select your consultation slot, and book securely.
            </p>
          </div>
          <Link className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white font-extrabold rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/35 transition-all transform active:scale-95 text-sm cursor-pointer whitespace-nowrap" to="/doctors">
            Find Doctors Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

// Helper stub for missing imports in the workspace
function ArrowRight({ size, className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className} style={{ width: size, height: size }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}
