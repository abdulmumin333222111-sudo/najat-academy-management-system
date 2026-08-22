import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  user: mongoose.Types.ObjectId; // User ID-এর সাথে কানেক্টেড
  guardian: mongoose.Types.ObjectId; // Guardian ID-এর সাথে কানেক্টেড
  studentIdNo: string;
  dateOfBirth: Date;
  course: mongoose.Types.ObjectId;
  batch?: mongoose.Types.ObjectId;
  teacher?: mongoose.Types.ObjectId;
  admissionStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'GRADUATED';
  createdAt: Date;
}

const StudentSchema = new Schema<IStudent>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  guardian: { type: Schema.Types.ObjectId, ref: 'Guardian', required: true },
  studentIdNo: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  batch: { type: Schema.Types.ObjectId, ref: 'Batch' },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  admissionStatus: { 
    type: String, 
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'GRADUATED'], 
    default: 'PENDING',
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
