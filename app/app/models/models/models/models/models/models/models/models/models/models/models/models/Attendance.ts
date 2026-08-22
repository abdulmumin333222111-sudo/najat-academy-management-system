import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
  student: mongoose.Types.ObjectId;
  batch: mongoose.Types.ObjectId;
  teacher: mongoose.Types.ObjectId;
  date: Date;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  createdAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  batch: { type: Schema.Types.ObjectId, ref: 'Batch', required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['PRESENT', 'ABSENT', 'LATE'], 
    default: 'PRESENT',
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

// একটি নির্দিষ্ট দিনে একজন শিক্ষার্থীর যেন ডাবল এন্ট্রি না হয় সেজন্য ইনডেক্স তৈরি
AttendanceSchema.index({ student: 1, date: 1 }, { unique: true });

export default mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', AttendanceSchema);
