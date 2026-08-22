import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmission extends Document {
  studentName: string;
  guardianName: string;
  phone: string;
  email: string;
  course: mongoose.Types.ObjectId;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
}

const AdmissionSchema = new Schema<IAdmission>({
  studentName: { type: String, required: true },
  guardianName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  status: { 
    type: String, 
    enum: ['PENDING', 'APPROVED', 'REJECTED'], 
    default: 'PENDING',
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Admission || mongoose.model<IAdmission>('Admission', AdmissionSchema);
