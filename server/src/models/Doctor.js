import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: String, required: true },
    location: { type: String, required: true },
    fee: { type: Number, required: true },
    available: { type: Boolean, default: true },
    rating: { type: Number, default: 4.8 },
    about: { type: String },
    initials: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Doctor', doctorSchema);
