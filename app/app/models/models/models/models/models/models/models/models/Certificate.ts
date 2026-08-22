import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  certificateNumber: string; // ইউনিক কোড যা দিয়ে QR ভেরিফাই করা হবে
  issueDate: Date;
  pdfUrl: string; // প্রাইভেট স্টোরেজের সাইনড বা প্রটেক্টড পাথ
  createdAt: Date;
}

const CertificateSchema = new Schema<ICertificate>({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  certificateNumber: { type: String, required: true, unique: true },
  issueDate: { type: Date, default: Date.now },
  pdfUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);
