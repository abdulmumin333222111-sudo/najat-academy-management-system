import mongoose, { Schema, Document } from 'mongoose';

export interface IExam extends Document {
  title: string;
  course: mongoose.Types.ObjectId;
  batch: mongoose.Types.ObjectId;
  totalMarks: number;
  examDate: Date;
  createdAt: Date;
}

const ExamSchema = new Schema<IExam>({
  title: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  batch: { type: Schema.Types.ObjectId, ref: 'Batch', required: true },
  totalMarks: { type: Number, required: true },
  examDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Exam || mongoose.model<IExam>('Exam', ExamSchema);
