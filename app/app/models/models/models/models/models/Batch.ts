import mongoose, { Schema, Document } from 'mongoose';

export interface IBatch extends Document {
  name: string; // ব্যাচের নাম যেমন: ব্যাচ-০১ (সকাল)
  course: mongoose.Types.ObjectId; // কোন কোর্সের অধীনে
  teacher: mongoose.Types.ObjectId; // দায়িত্বপ্রাপ্ত শিক্ষক
  schedule: string; // ক্লাসের সময়সূচী
  isActive: boolean;
  createdAt: Date;
}

const BatchSchema = new Schema<IBatch>({
  name: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  schedule: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Batch || mongoose.model<IBatch>('Batch', BatchSchema);
