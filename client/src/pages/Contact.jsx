import { useState } from 'react';
import { CalendarHeart, Mail, MapPin, Phone, Send, Sparkles } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="w-full relative overflow-hidden text-left py-12 md:py-20">
      {/* Floating Animated Radial Glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[450px] h-[450px] bg-teal-400/20 blur-[130px] rounded-full pointer-events-none animate-pulse-slow -z-10" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[450px] h-[450px] bg-indigo-400/15 blur-[130px] rounded-full pointer-events-none animate-pulse-slow -z-10" />

      <section className="container mx-auto px-4 flex flex-col gap-16 animate-slide-up">
        {/* Page Hero Header */}
        <div className="max-w-3xl flex flex-col gap-5">
          <span className="self-start inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-700 border border-indigo-500/20 font-bold text-xs uppercase tracking-wider">
            <Sparkles size={14} className="text-indigo-650" />
            Connect With Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800 leading-tight">
            We are here to assist you and your <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-650">family's health</span>.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Have questions about clinical slots, partnership setups, or portal technical support? Drop us a line and our administrative team will reach back within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 items-start w-full">
          {/* Left Column: Office Contacts Card */}
          <div className="flex flex-col gap-8">
            <div className="bg-white/70 backdrop-blur-2xl border border-slate-100 shadow-xl rounded-[32px] p-8 flex flex-col gap-6.5 text-left">
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Clinical Headquarters</h2>
              
              <div className="flex flex-col gap-5.5 mt-2">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-650 flex items-center justify-center flex-shrink-0 border border-teal-100">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-700 text-sm">Phone Line Support</h4>
                    <p className="text-sm text-slate-500 mt-0.5">+1 (800) 555-CARE (Emergency 24/7 active)</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-650 flex items-center justify-center flex-shrink-0 border border-indigo-100">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-700 text-sm">Direct Clinical Support</h4>
                    <p className="text-sm text-slate-500 mt-0.5">hello@doctorappoints.dev</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-650 flex items-center justify-center flex-shrink-0 border border-purple-100">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-700 text-sm">Clinic Location</h4>
                    <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">
                      450 Lexington Ave, Suite 101, New York, NY 10017
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours section */}
              <div className="border-t border-slate-100 pt-6 mt-2 flex flex-col gap-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <strong className="font-bold text-slate-700">Monday - Friday:</strong>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <strong className="font-bold text-slate-700">Saturday:</strong>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <strong className="font-bold text-slate-700">Sunday:</strong>
                  <span className="text-rose-600 font-bold">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Inquiry Form */}
          <div className="relative w-full">
            <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-teal-500 to-indigo-650 opacity-15 blur-lg -z-10 animate-pulse-slow" />
            
            <form onSubmit={handleSubmit} className="w-full bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[32px] p-8 md:p-10 flex flex-col gap-5.5 relative overflow-hidden hover:shadow-teal-500/10 hover:shadow-[0_20px_50px_rgba(20,184,166,0.12)] transition-all duration-500 hover:-translate-y-1.5">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-teal-400 to-indigo-600" />
              
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Send Message</h2>
                <p className="text-xs text-slate-450 mt-1 leading-relaxed">Fill out parameters to register an official ticket.</p>
              </div>

              {submitted && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 font-bold text-xs animate-fade-in flex items-center gap-2">
                  <CalendarHeart size={16} className="text-emerald-600" />
                  Your message has been sent successfully! Our clinic team will reach you soon.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5 text-left font-bold text-slate-700 text-sm">
                  <span>Your Full Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Steve Rogers"
                    required
                    className="w-full px-4.5 py-3 rounded-2xl border border-slate-200 bg-white/40 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-300 font-medium text-slate-850 text-sm hover:border-slate-350"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-left font-bold text-slate-700 text-sm">
                  <span>Your Email Address</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="steve@gmail.com"
                    required
                    className="w-full px-4.5 py-3 rounded-2xl border border-slate-200 bg-white/40 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-300 font-medium text-slate-855 text-sm hover:border-slate-350"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5 text-left font-bold text-slate-700 text-sm">
                <span>Inquiry Subject</span>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4.5 py-3 rounded-2xl border border-slate-200 bg-white/40 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-300 font-bold text-slate-650 text-sm hover:border-slate-350 cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Appointment Booking Issue">Appointment Booking Issue</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Clinical Partnership">Clinical Partnership</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5 text-left font-bold text-slate-700 text-sm">
                <span>Detailed Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us details of your query..."
                  rows={4}
                  required
                  className="w-full px-4.5 py-3 rounded-2xl border border-slate-200 bg-white/40 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-300 font-medium text-slate-855 text-sm hover:border-slate-350 resize-y min-h-[100px]"
                />
              </label>

              <button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-indigo-650 hover:from-teal-600 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-[0_4px_20px_rgba(20,184,166,0.2)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.3)] transition-all duration-300 transform active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2"
              >
                <Send size={14} /> Send Message Securely
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
