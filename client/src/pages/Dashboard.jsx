import { useEffect, useState } from 'react';
import {
  Calendar,
  Check,
  Clock,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Trash2,
  Users,
  XCircle,
  FileText,
  Printer,
  Eye,
  Brain,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Dashboard() {
  const { signOut, user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Doctor Form state (Admin dashboard only)
  const [doctorForm, setDoctorForm] = useState({
    name: '',
    email: '',
    password: '',
    specialty: 'General physician',
    experience: '',
    location: '',
    fee: '',
    about: ''
  });
  const [doctorFormSubmitting, setDoctorFormSubmitting] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      setLoading(true);
      setError('');
      
      // Fetch appointments
      const apptsRes = await api.get('/appointments');
      if (apptsRes.data?.success) {
        setAppointments(apptsRes.data.data);
      }

      // Fetch doctors
      const docsRes = await api.get('/doctors');
      if (docsRes.data?.success) {
        setDoctorsList(docsRes.data.data);
      }

      // If user is admin, fetch user list if we want to display it
      // Let's get it from server/src/data/store users (or mock list by looking at emails in appointments)
      // Since there's no custom GET /auth/users endpoint yet, let's create a mockup or query it
      // For now we can extract users from the appointments list as patient names or display patient accounts
      // Let's create an endpoint in backend for users? No, we don't strictly need it, we can just extract or mock it, 
      // but actually let's fetch it if possible. Let's see if we should fetch me or mock the list.
      // We can just list doctors and appointments, which is great.
    } catch (err) {
      setError('Failed to fetch dashboard data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Doctor Status update (Doctor dashboard only)
  async function updateStatus(appointmentId, status) {
    try {
      setError('');
      setSuccessMsg('');
      const res = await api.patch(`/appointments/${appointmentId}/status`, { status });
      if (res.data?.success) {
        setAppointments((prev) =>
          prev.map((appt) => (appt.id === appointmentId ? { ...appt, status } : appt))
        );
        setSuccessMsg(`Appointment marked as ${status} successfully!`);
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      setError('Could not update appointment status.');
    }
  }

  // AI Suggestion & Prescription states
  const [writePrescriptionOpen, setWritePrescriptionOpen] = useState(false);
  const [prescriptionApptId, setPrescriptionApptId] = useState(null);
  const [prescriptionForm, setPrescriptionForm] = useState({
    diagnosis: '',
    medicines: '',
    notes: ''
  });
  const [aiSuggestLoading, setAiSuggestLoading] = useState(false);
  const [aiSuggestError, setAiSuggestError] = useState('');

  const [viewPrescriptionOpen, setViewPrescriptionOpen] = useState(false);
  const [prescriptionToView, setPrescriptionToView] = useState(null);

  function handleOpenWritePrescription(appointmentId) {
    setPrescriptionApptId(appointmentId);
    setPrescriptionForm({ diagnosis: '', medicines: '', notes: '' });
    setAiSuggestError('');
    setWritePrescriptionOpen(true);
  }

  async function handleSuggestPrescription() {
    if (!prescriptionForm.diagnosis.trim()) {
      setAiSuggestError('Please enter a diagnosis first.');
      return;
    }
    try {
      setAiSuggestLoading(true);
      setAiSuggestError('');
      const res = await api.post('/ai/suggest-prescription', { diagnosis: prescriptionForm.diagnosis });
      if (res.data) {
        setPrescriptionForm(prev => ({
          ...prev,
          medicines: res.data.medicines || '',
          notes: res.data.notes || ''
        }));
      }
    } catch (err) {
      setAiSuggestError('AI suggestions offline. Please fill manually.');
    } finally {
      setAiSuggestLoading(false);
    }
  }

  async function handleSubmitPrescription(e) {
    e.preventDefault();
    if (!prescriptionForm.diagnosis.trim() || !prescriptionForm.medicines.trim()) {
      setError('Diagnosis and Medicines fields are required.');
      return;
    }
    try {
      setError('');
      setSuccessMsg('');
      const res = await api.patch(`/appointments/${prescriptionApptId}/status`, {
        status: 'completed',
        prescription: prescriptionForm
      });
      if (res.data?.success) {
        setAppointments((prev) =>
          prev.map((appt) => (appt.id === prescriptionApptId ? { ...appt, status: 'completed', prescription: prescriptionForm } : appt))
        );
        setSuccessMsg(`Appointment completed and prescription issued successfully!`);
        setWritePrescriptionOpen(false);
        setPrescriptionApptId(null);
        setPrescriptionForm({ diagnosis: '', medicines: '', notes: '' });
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      setError('Could not complete appointment with prescription.');
    }
  }
  function handlePrintPrescription() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Prescription - Doctor Appoints</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #1e293b; line-height: 1.5; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 20px; }
            .clinic-logo { font-size: 20px; font-weight: bold; color: #0d9488; }
            .rx-title { font-size: 32px; font-weight: 800; color: #4f46e5; }
            .details { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; font-size: 13px; }
            .section-title { font-size: 12px; font-weight: bold; text-transform: uppercase; color: #64748b; margin-top: 25px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
            .diagnosis { font-size: 15px; font-weight: bold; margin: 10px 0; color: #0f172a; }
            .medicines { font-size: 13px; font-family: monospace; white-space: pre-wrap; line-height: 1.6; background: #f8fafc; padding: 15px; border-radius: 10px; border: 1px solid #f1f5f9; margin-top: 8px; }
            .notes { font-size: 13px; line-height: 1.5; margin-top: 8px; }
            .footer { border-top: 2px dashed #e2e8f0; margin-top: 60px; padding-top: 20px; font-size: 10px; color: #64748b; text-align: center; }
            .signature { margin-top: 50px; text-align: right; font-size: 12px; }
            .sig-name { font-weight: bold; font-family: serif; font-style: italic; font-size: 14px; margin-top: 4px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="clinic-logo font-bold">Doctor Appoints Portal</div>
              <small>123 Health Ave, Medical Suite C, New York, NY</small><br/>
              <small>Contact: hello@doctorappoints.dev | +0-000-000-000</small>
            </div>
            <div class="rx-title">Rx</div>
          </div>
          <div class="details">
            <div>
              <strong>Doctor Details:</strong><br/>
              ${prescriptionToView?.doctor?.name || ''}<br/>
              ${prescriptionToView?.doctor?.specialty || ''}<br/>
              ${prescriptionToView?.doctor?.location || ''}
            </div>
            <div>
              <strong>Appointment Details:</strong><br/>
              Date: ${prescriptionToView?.appointment?.date || ''}<br/>
              Slot: ${prescriptionToView?.appointment?.slot || ''}<br/>
              Patient ID: Patient Account #${prescriptionToView?.appointment?.userId || ''}
            </div>
          </div>
          
          <div class="section-title">Diagnosis</div>
          <div class="diagnosis">${prescriptionToView?.appointment?.prescription?.diagnosis || 'N/A'}</div>
          
          <div class="section-title">Prescribed Medicines</div>
          <div class="medicines">${prescriptionToView?.appointment?.prescription?.medicines || 'No medicines prescribed.'}</div>
          
          ${prescriptionToView?.appointment?.prescription?.notes ? `
            <div class="section-title">Special Advice / Notes</div>
            <div class="notes">${prescriptionToView.appointment.prescription.notes}</div>
          ` : ''}
          
          <div class="signature">
            Digitally Signed By<br/>
            <div class="sig-name">${prescriptionToView?.doctor?.name || ''}</div>
          </div>
          
          <div class="footer">
            This is an official computer-generated prescription issued via Doctor Appoints.
            Disclaimer: The AI recommendations are draft templates reviewed and authorized by the human practitioner above.
          </div>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  function handleOpenViewPrescription(appointment) {
    const doctor = doctorsList.find((d) => d.id === appointment.doctorId) || {
      name: `Dr. User (ID: ${appointment.doctorId})`,
      specialty: 'Practitioner',
      location: 'Main Clinic',
      fee: 0
    };
    setPrescriptionToView({ appointment, doctor });
    setViewPrescriptionOpen(true);
  }
  // Add doctor handler (Admin dashboard only)
  async function handleAddDoctor(e) {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!doctorForm.name.trim() || !doctorForm.email.trim() || !doctorForm.password.trim() || !doctorForm.specialty) {
      setError('Name, email, password, and specialty are required.');
      return;
    }

    if (doctorForm.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setDoctorFormSubmitting(true);
      const res = await api.post('/auth/create-doctor', doctorForm);
      if (res.data?.success) {
        setSuccessMsg('Doctor account and profile created successfully!');
        setDoctorForm({
          name: '',
          email: '',
          password: '',
          specialty: 'General physician',
          experience: '',
          location: '',
          fee: '',
          about: ''
        });
        // Refresh dashboard data
        fetchDashboardData();
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create doctor account.');
    } finally {
      setDoctorFormSubmitting(false);
    }
  }

  function handleDoctorFormChange(e) {
    const { name, value } = e.target;
    setDoctorForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  if (loading) {
    return (
      <section className="container page-block auth-loading">
        <Clock className="animate-spin" size={18} />
        <span>Loading dashboard panel...</span>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12 relative overflow-hidden animate-slide-up text-left">
      {/* Floating Animated Radial Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] bg-teal-500/10 blur-[110px] rounded-full pointer-events-none animate-pulse-slow -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-indigo-500/10 blur-[110px] rounded-full pointer-events-none animate-pulse-slow -z-10" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10 pb-6 border-b border-slate-200/60">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 border border-teal-500/20 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck size={14} />
            Logged in as {user?.role} portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight mt-2.5">Welcome, {user?.name}</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your bookings, schedules, and operations in one central place.</p>
        </div>
        <button className="self-start sm:self-center px-4.5 py-2.5 border border-slate-200 hover:border-red-200 rounded-xl text-slate-600 hover:text-red-700 hover:bg-rose-50/50 font-bold transition-all text-xs cursor-pointer shadow-sm hover:shadow-md" type="button" onClick={signOut}>
          Logout Securely
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 text-red-700 border border-red-500/20 font-bold text-sm mb-6">
          {error}
        </div>
      )}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-750 border border-emerald-500/20 font-bold text-sm mb-6">
          {successMsg}
        </div>
      )}      {/* Render Patient Dashboard */}
      {user?.role === 'patient' && (
        <PatientDashboardView 
          appointments={appointments.filter(a => a.userId === user.id)}
          doctorsList={doctorsList}
          onViewPrescription={handleOpenViewPrescription}
        />
      )}

      {/* Render Doctor Dashboard */}
      {user?.role === 'doctor' && (
        <DoctorDashboardView 
          appointments={appointments.filter(a => a.doctorId === user.doctorId)}
          doctorProfile={doctorsList.find(d => d.id === user.doctorId)}
          updateStatus={updateStatus}
          onWritePrescription={handleOpenWritePrescription}
          onViewPrescription={handleOpenViewPrescription}
        />
      )}

      {/* Render Admin Dashboard */}
      {user?.role === 'admin' && (
        <AdminDashboardView 
          appointments={appointments}
          doctorsList={doctorsList}
          doctorForm={doctorForm}
          handleAddDoctor={handleAddDoctor}
          handleDoctorFormChange={handleDoctorFormChange}
          submitting={doctorFormSubmitting}
          onViewPrescription={handleOpenViewPrescription}
        />
      )}

      {/* Write Prescription Modal */}
      {writePrescriptionOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in animate-duration-200">
          <div className="bg-white border border-slate-200/50 shadow-2xl rounded-3xl p-6 md:p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto relative animate-scale-up text-left">
            <button 
              onClick={() => setWritePrescriptionOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-655 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-605 flex items-center justify-center">
                <FileText size={18} />
              </span>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Complete Appointment & Rx</h2>
            </div>
            <p className="text-xs text-slate-500 mb-6 pb-3 border-b border-slate-100">
              Provide clinical diagnosis and medicines. Use Sanjivani AI to generate standard suggestions.
            </p>

            <form onSubmit={handleSubmitPrescription} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Diagnosis / Clinical Indication</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Allergic rhinitis, Acute Tonsillitis"
                    value={prescriptionForm.diagnosis}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, diagnosis: e.target.value })}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-850 focus:ring-4 focus:ring-slate-850/5 bg-slate-50/30 text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleSuggestPrescription}
                    disabled={aiSuggestLoading}
                    className="px-4 py-2.5 bg-gradient-to-r from-teal-500 to-indigo-650 hover:from-teal-655 hover:to-indigo-700 text-white font-extrabold rounded-xl shadow-md shadow-teal-500/15 hover:shadow-lg hover:shadow-teal-500/25 transition-all text-xs cursor-pointer flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                  >
                    <Brain size={14} className={aiSuggestLoading ? "animate-spin" : ""} />
                    {aiSuggestLoading ? 'Analyzing...' : 'AI Suggest'}
                  </button>
                </div>
                {aiSuggestError && (
                  <span className="text-[10px] text-red-650 font-bold mt-1">{aiSuggestError}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Prescribed Medicines & Dosage</label>
                <textarea
                  required
                  rows="4"
                  placeholder="1. Medicine name, strength - dosage frequency - duration&#10;2. ..."
                  value={prescriptionForm.medicines}
                  onChange={(e) => setPrescriptionForm({ ...prescriptionForm, medicines: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-250 focus:outline-none focus:border-slate-850 focus:ring-4 focus:ring-slate-850/5 bg-slate-50/30 text-sm font-sans resize-y min-h-[100px]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Advice & Patient Notes (Optional)</label>
                <textarea
                  rows="3"
                  placeholder="e.g. Diet guidelines, hydration instructions, warning signs, follow-up advice..."
                  value={prescriptionForm.notes}
                  onChange={(e) => setPrescriptionForm({ ...prescriptionForm, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-250 focus:outline-none focus:border-slate-850 focus:ring-4 focus:ring-slate-855/5 bg-slate-50/30 text-sm resize-y min-h-[80px]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setWritePrescriptionOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-655 font-bold transition-all text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white font-extrabold rounded-xl shadow-lg transition-all text-xs cursor-pointer active:scale-95"
                >
                  Complete & Issue Rx
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Prescription Modal */}
      {viewPrescriptionOpen && prescriptionToView && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in animate-duration-200">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto relative animate-scale-up text-left">
            <button 
              onClick={() => setViewPrescriptionOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-655 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
            
            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <span className="w-9 h-9 rounded-xl bg-teal-50 text-teal-650 flex items-center justify-center">
                <FileText size={18} />
              </span>
              <h2 className="text-lg font-black text-slate-800 tracking-tight">Prescription Receipt</h2>
            </div>

            {/* Printable Rx Area */}
            <div id="printable-prescription" className="border border-slate-200 rounded-2xl p-5 bg-slate-50/30">
              <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-800">Doctor Appoints</h3>
                  <p className="text-[10px] text-slate-450 mt-0.5 font-semibold">123 Health Ave, Suite C, NY</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">hello@doctorappoints.dev</p>
                </div>
                <span className="text-3xl font-black text-indigo-655 font-serif">Rx</span>
              </div>

              {/* Doctor / Patient Details */}
              <div className="grid grid-cols-2 gap-4 py-4 text-xs border-b border-slate-100">
                <div>
                  <span className="font-bold text-slate-450 block uppercase tracking-wider text-[9px]">Practitioner</span>
                  <strong className="text-slate-855 text-xs block mt-0.5">{prescriptionToView.doctor.name}</strong>
                  <span className="text-slate-500 text-[10px] block">{prescriptionToView.doctor.specialty}</span>
                  <span className="text-slate-400 text-[10px] block mt-0.5">{prescriptionToView.doctor.location}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-450 block uppercase tracking-wider text-[9px]">Consultation</span>
                  <span className="text-slate-655 block mt-0.5">Date: <strong>{prescriptionToView.appointment.date}</strong></span>
                  <span className="text-slate-655 block">Slot: <strong>{prescriptionToView.appointment.slot}</strong></span>
                  <span className="text-slate-400 block mt-0.5">Patient ID: #{prescriptionToView.appointment.userId}</span>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="py-4 border-b border-slate-100">
                <span className="font-bold text-slate-450 block uppercase tracking-wider text-[9px]">Diagnosis</span>
                <p className="text-sm font-extrabold text-slate-800 mt-1">
                  {prescriptionToView.appointment.prescription?.diagnosis}
                </p>
              </div>

              {/* Medicines */}
              <div className="py-4 border-b border-slate-100">
                <span className="font-bold text-slate-455 block uppercase tracking-wider text-[9px] mb-1.5">Prescribed Medicines</span>
                <div className="bg-white border border-slate-200/60 rounded-xl p-3.5 text-xs text-slate-700 font-mono whitespace-pre-wrap leading-relaxed">
                  {prescriptionToView.appointment.prescription?.medicines}
                </div>
              </div>

              {/* Advice */}
              {prescriptionToView.appointment.prescription?.notes && (
                <div className="py-4">
                  <span className="font-bold text-slate-450 block uppercase tracking-wider text-[9px]">Special Advice & Notes</span>
                  <p className="text-xs text-slate-655 mt-1.5 leading-relaxed bg-white border border-slate-200/30 rounded-xl p-3">
                    {prescriptionToView.appointment.prescription?.notes}
                  </p>
                </div>
              )}

              {/* Signature */}
              <div className="mt-6 pt-4 border-t border-slate-100/80 flex flex-col items-end">
                <span className="text-[10px] text-slate-400">Digitally Signed By</span>
                <strong className="text-slate-750 text-xs mt-1 font-serif italic">{prescriptionToView.doctor.name}</strong>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[9px] text-slate-405 text-center leading-relaxed mt-4">
              This Rx slip represents a digital record of consultation. Disclaimers: AI draft recommendation was reviewed, edited, and approved by the practitioner listed above.
            </p>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setViewPrescriptionOpen(false)}
                className="px-4 py-2 border border-slate-250 hover:bg-slate-50 text-slate-505 rounded-xl text-xs font-bold cursor-pointer transition-all"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handlePrintPrescription}
                className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-indigo-650 hover:from-teal-600 hover:to-indigo-700 text-white font-extrabold rounded-xl shadow-md shadow-teal-500/15 hover:shadow-lg hover:shadow-teal-500/25 transition-all text-xs cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <Printer size={13} />
                Print Rx Slip
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function PatientDashboardView({ appointments, doctorsList, onViewPrescription }) {
  return (
    <div className="flex flex-col gap-8 w-full text-left">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-white border border-slate-100 shadow-md rounded-3xl p-6 hover:shadow-xl hover:shadow-teal-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center font-bold">
            <Calendar size={20} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-500">My Scheduled Bookings</h2>
            <strong className="text-4xl font-extrabold text-slate-800 block mt-1">{appointments.length}</strong>
          </div>
          <p className="text-xs text-slate-400">Total upcoming and past consultation appointments.</p>
        </div>

        <div className="bg-gradient-to-br from-teal-500/5 to-white border border-teal-500/10 shadow-md rounded-3xl p-6 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center font-bold">
            <Sparkles size={20} />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-slate-600">Need Medical Consultation?</h2>
            <div>
              <Link className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/35 transition-all text-xs" to="/doctors">
                Find Doctors &rarr;
              </Link>
            </div>
          </div>
          <p className="text-xs text-slate-400">Schedule appointments with specialized healthcare practitioners.</p>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white border border-slate-100 shadow-xl rounded-3xl p-6 md:p-8">
        <h2 className="text-xl font-bold tracking-tight text-slate-800 mb-5">My Scheduled Appointments</h2>
        
        {appointments.length === 0 ? (
          <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
            <p className="text-slate-500 text-sm">You don't have any booked appointments yet.</p>
            <Link className="text-sm font-bold text-teal-600 hover:text-teal-700 underline transition-colors" to="/doctors">
              Browse doctor specialties and book your first slot &rarr;
            </Link>
          </div>
        ) : (
          <div className="border border-slate-150 shadow-md shadow-slate-50 rounded-2xl overflow-hidden bg-white">
            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-150">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Doctor Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Specialty</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Time Slot</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.map((appt) => {
                    const doctor = doctorsList.find((d) => d.id === appt.doctorId);
                    return (
                      <tr key={appt.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-slate-700">
                          {doctor ? doctor.name : `Dr. User (ID: ${appt.doctorId})`}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{doctor ? doctor.specialty : 'N/A'}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{appt.date}</td>
                        <td className="px-6 py-4 text-sm font-bold text-teal-700">{appt.slot}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${appt.status === 'confirmed' || appt.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'} capitalize`}>
                            {appt.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-right">
                          {appt.status === 'completed' && appt.prescription ? (
                            <button
                              type="button"
                              onClick={() => onViewPrescription(appt)}
                              className="px-3.5 py-1.5 bg-gradient-to-r from-teal-500 to-indigo-650 hover:from-teal-600 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-1.5 ml-auto cursor-pointer"
                            >
                              <FileText size={12} />
                              View Rx
                            </button>
                          ) : appt.status === 'completed' ? (
                            <span className="text-xs text-slate-400 font-semibold italic">No Rx issued</span>
                          ) : (
                            <span className="text-xs text-slate-400 font-semibold italic">Pending visit</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// DOCTOR VIEW COMPONENT
// ----------------------------------------------------
function DoctorDashboardView({ appointments, doctorProfile, updateStatus, onWritePrescription, onViewPrescription }) {
  return (
    <div className="flex flex-col gap-8 w-full text-left">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="bg-white border border-slate-100 border-l-4 border-l-blue-500 shadow-md rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold">
            <Calendar size={20} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-500">Active Appointments</h2>
            <strong className="text-4xl font-extrabold text-slate-800 block mt-1">{appointments.length}</strong>
          </div>
          <p className="text-xs text-slate-400">Total patients booked in your schedule queue.</p>
        </div>

        <div className="bg-white border border-slate-100 shadow-md rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center font-bold">
            <Stethoscope size={20} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-500">Specialty Category</h2>
            <strong className="text-lg font-bold text-slate-800 block mt-1">
              {doctorProfile ? doctorProfile.specialty : 'Practitioner'}
            </strong>
          </div>
          <p className="text-xs text-slate-400">Hourly Consultation Rate: ${doctorProfile ? doctorProfile.fee : '0'}</p>
        </div>

        <div className="bg-white border border-slate-100 shadow-md rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center font-bold">
            <Calendar size={20} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-500">Registered Location</h2>
            <strong className="text-sm font-bold text-slate-800 block mt-1">
              {doctorProfile ? doctorProfile.location : 'Main Clinic'}
            </strong>
          </div>
          <p className="text-xs text-slate-400">Experience: {doctorProfile ? doctorProfile.experience : 'N/A'}</p>
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white border border-slate-100 shadow-xl rounded-3xl p-6 md:p-8">
        <h2 className="text-xl font-bold tracking-tight text-slate-800 mb-5">Upcoming Patient Appointments</h2>
        
        {appointments.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-slate-500 text-sm">No patient bookings found in your calendar queue.</p>
          </div>
        ) : (
          <div className="border border-slate-150 shadow-md shadow-slate-50 rounded-2xl overflow-hidden bg-white">
            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-150">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Scheduled Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Time Slot</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-slate-700">Patient Account #{appt.userId}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{appt.date}</td>
                      <td className="px-6 py-4 text-sm font-bold text-blue-700">{appt.slot}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${appt.status === 'completed' || appt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'} capitalize`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-right">
                        <div className="inline-flex gap-2.5 items-center justify-end">
                          {appt.status === 'completed' && appt.prescription && (
                            <button
                              type="button"
                              onClick={() => onViewPrescription(appt)}
                              className="px-3 py-1.5 bg-gradient-to-r from-teal-500 to-indigo-650 hover:from-teal-600 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <FileText size={12} /> View Rx
                            </button>
                          )}
                          {appt.status !== 'completed' && appt.status !== 'cancelled' && (
                            <button
                              type="button"
                              className="px-3.5 py-1.5 rounded-lg border border-teal-500 text-teal-700 font-bold hover:bg-teal-50 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
                              onClick={() => onWritePrescription(appt.id)}
                            >
                              <Check size={12} /> Complete
                            </button>
                          )}
                          {appt.status !== 'cancelled' && appt.status !== 'completed' && (
                            <button
                              type="button"
                              className="px-3.5 py-1.5 rounded-lg border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
                              onClick={() => updateStatus(appt.id, 'cancelled')}
                            >
                              <XCircle size={12} /> Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// ADMIN VIEW COMPONENT
// ----------------------------------------------------
function AdminDashboardView({
  appointments,
  doctorsList,
  doctorForm,
  handleAddDoctor,
  handleDoctorFormChange,
  submitting,
  onViewPrescription
}) {
  return (
    <div className="flex flex-col gap-8 w-full text-left">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-white border border-slate-100 border-l-4 border-l-slate-800 shadow-md rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center font-bold">
            <Stethoscope size={20} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-500">Registered Doctors</h2>
            <strong className="text-4xl font-extrabold text-slate-800 block mt-1">{doctorsList.length}</strong>
          </div>
          <p className="text-xs text-slate-400">Active practitioner profiles hosted on the system.</p>
        </div>

        <div className="bg-white border border-slate-100 shadow-md rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold">
            <Calendar size={20} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-500">Global Appointments</h2>
            <strong className="text-4xl font-extrabold text-slate-800 block mt-1">{appointments.length}</strong>
          </div>
          <p className="text-xs text-slate-400">Total clinic bookings processed globally.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 items-start">
        {/* All Doctors List */}
        <div className="bg-white border border-slate-100 shadow-xl rounded-3xl p-6 md:p-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-800">Platform Doctors Directory</h2>
          <div className="overflow-y-auto max-h-[420px] pr-2 divide-y divide-slate-100">
            {doctorsList.map((doc) => (
              <div key={doc.id} className="flex justify-between items-center py-4">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/50 flex-shrink-0">
                    {doc.image ? (
                      <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-200 text-slate-600 flex items-center justify-center font-extrabold text-sm">{doc.initials}</div>
                    )}
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-850 text-[0.95rem]">{doc.name}</div>
                    <div className="text-xs text-slate-450 mt-1">
                      {doc.specialty} &bull; <strong className="text-teal-700 font-bold">{doc.experience}</strong> exp
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Location: {doc.location}
                    </div>
                  </div>
                </div>
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-100">
                    ${doc.fee} / visit
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Doctor Form */}
        <div className="bg-white/95 backdrop-blur-md border border-slate-200/50 shadow-2xl rounded-3xl p-6 md:p-8 border-t-4 border-t-slate-800">
          <h2 className="text-xl font-bold tracking-tight text-slate-850">Register Clinical Doctor</h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Create secure practitioner login credentials and establish their clinical profile parameters in real-time.
          </p>

          <form onSubmit={handleAddDoctor} className="flex flex-col gap-4 mt-6">
            <label className="flex flex-col gap-1.5 text-sm font-bold text-slate-700">
              <span>Doctor Full Name</span>
              <input
                type="text"
                name="name"
                value={doctorForm.name}
                onChange={handleDoctorFormChange}
                placeholder="Dr. Richard James"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-800/10 outline-none transition-all text-sm font-normal"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5 text-sm font-bold text-slate-700">
                <span>Login Email</span>
                <input
                  type="email"
                  name="email"
                  value={doctorForm.email}
                  onChange={handleDoctorFormChange}
                  placeholder="richard@doctorappoints.dev"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-800/10 outline-none transition-all text-sm font-normal"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-bold text-slate-700">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  value={doctorForm.password}
                  onChange={handleDoctorFormChange}
                  placeholder="Min 6 chars"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-800/10 outline-none transition-all text-sm font-normal"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex flex-col gap-1.5 text-sm font-bold text-slate-700">
                <span>Specialty</span>
                <select
                  name="specialty"
                  value={doctorForm.specialty}
                  onChange={handleDoctorFormChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-800/10 outline-none transition-all text-xs font-semibold cursor-pointer"
                >
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-bold text-slate-700">
                <span>Experience</span>
                <input
                  type="text"
                  name="experience"
                  value={doctorForm.experience}
                  onChange={handleDoctorFormChange}
                  placeholder="8 years"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-800/10 outline-none transition-all text-sm font-normal"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-bold text-slate-700">
                <span>Fee ($)</span>
                <input
                  type="number"
                  name="fee"
                  value={doctorForm.fee}
                  onChange={handleDoctorFormChange}
                  placeholder="80"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-800/10 outline-none transition-all text-sm font-normal"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5 text-sm font-bold text-slate-700">
              <span>Consultation Location</span>
              <input
                type="text"
                name="location"
                value={doctorForm.location}
                onChange={handleDoctorFormChange}
                placeholder="e.g. New York, USA"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-800/10 outline-none transition-all text-sm font-normal"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-bold text-slate-700">
              <span>Profile Summary</span>
              <textarea
                name="about"
                value={doctorForm.about}
                onChange={handleDoctorFormChange}
                placeholder="Physician qualifications, details..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-800/10 outline-none transition-all text-sm font-normal min-h-[80px] resize-y"
              />
            </label>

            <button 
              type="submit" 
              className="w-full py-3.5 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-850 hover:to-black text-white font-bold rounded-xl shadow-lg shadow-slate-800/20 hover:shadow-xl hover:shadow-slate-850/30 transition-all active:scale-[0.98] mt-2 cursor-pointer text-sm" 
              disabled={submitting}
            >
              {submitting ? 'Registering Doctor...' : 'Activate Practitioner Profile'}
            </button>
          </form>
        </div>
      </div>

      {/* Global Appointments Audit */}
      <div className="bg-white border border-slate-100 shadow-xl rounded-3xl p-6 md:p-8">
        <h2 className="text-xl font-bold tracking-tight text-slate-800 mb-5">Global Appointments Audit Log</h2>
        
        {appointments.length === 0 ? (
          <p className="text-slate-500 text-sm">No appointments booked on the system yet.</p>
        ) : (
          <div className="border border-slate-150 shadow-md shadow-slate-50 rounded-2xl overflow-hidden bg-white">
            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-150">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Appt ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Doctor Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Scheduled Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Time Slot</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.map((appt) => {
                    const doctor = doctorsList.find((d) => d.id === appt.doctorId);
                    return (
                      <tr key={appt.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-slate-700">#{appt.id}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">Patient Account #{appt.userId}</td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-700">
                          {doctor ? doctor.name : `Dr. User (ID: ${appt.doctorId})`}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{appt.date}</td>
                        <td className="px-6 py-4 text-sm font-bold text-teal-700">{appt.slot}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${appt.status === 'confirmed' || appt.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'} capitalize`}>
                            {appt.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-right">
                          {appt.status === 'completed' && appt.prescription ? (
                            <button
                              type="button"
                              onClick={() => onViewPrescription(appt)}
                              className="px-3.5 py-1.5 bg-gradient-to-r from-teal-555 to-indigo-605 hover:from-teal-650 hover:to-indigo-650 text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-1.5 ml-auto cursor-pointer"
                            >
                              <FileText size={12} />
                              View Rx
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400 font-semibold italic">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
