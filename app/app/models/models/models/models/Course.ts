import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  duration: string; // যেমন: ৩ মাস / ৬ মাস
  fee: number; // ফি (BDT fixed precision)
  isActive: boolean;
  createdAt: Date;
}

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  fee: { type: Number, required: true, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
