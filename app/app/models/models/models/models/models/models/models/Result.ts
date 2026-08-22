import mongoose, { Schema, Document } from 'mongoose';

export interface IResult extends Document {
  exam: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  obtainedMarks: number;
  grade: string; // যেমন: A+, A, B ইত্যাদি
  feedback?: string;
  createdAt: Date;
}

const ResultSchema = new Schema<IResult>({
  exam: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  obtainedMarks: { type: Number, required: true },
  grade: { type: String, required: true },
  feedback: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Result || mongoose.model<IResult>('Result', ResultSchema);
