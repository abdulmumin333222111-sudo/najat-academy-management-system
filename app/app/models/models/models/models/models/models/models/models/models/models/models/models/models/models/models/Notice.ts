import mongoose, { Schema, Document } from 'mongoose';

export interface INotice extends Document {
  title: string;
  content: string;
  targetRole: 'ALL' | 'STUDENT' | 'GUARDIAN' | 'TEACHER' | 'ADMIN';
  batch?: mongoose.Types.ObjectId; // নির্দিষ্ট ব্যাচের জন্য হলে
  publishedBy: mongoose.Types.ObjectId; // কে প্রকাশ করেছেন
  createdAt: Date;
}

const NoticeSchema = new Schema<INotice>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  targetRole: { 
    type: String, 
    enum: ['ALL', 'STUDENT', 'GUARDIAN', 'TEACHER', 'ADMIN'], 
    default: 'ALL',
    required: true 
  },
  batch: { type: Schema.Types.ObjectId, ref: 'Batch' },
  publishedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Notice || mongoose.model<INotice>('Notice', NoticeSchema);
