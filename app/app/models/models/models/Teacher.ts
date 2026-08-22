import mongoose, { Schema, Document } from 'mongoose';

export interface ITeacher extends Document {
  user: mongoose.Types.ObjectId; // User ID-এর সাথে কানেক্টেড
  phone: string;
  qualification: string;
  assignedBatches: mongoose.Types.ObjectId[]; // শিক্ষকের অধীনে থাকা ব্যাচসমূহ
  assignedCourses: mongoose.Types.ObjectId[]; // শিক্ষকের অধীনে থাকা কোর্সসমূহ
  createdAt: Date;
}

const TeacherSchema = new Schema<ITeacher>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  phone: { type: String, required: true },
  qualification: { type: String, required: true },
  assignedBatches: [{ type: Schema.Types.ObjectId, ref: 'Batch' }],
  assignedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);
