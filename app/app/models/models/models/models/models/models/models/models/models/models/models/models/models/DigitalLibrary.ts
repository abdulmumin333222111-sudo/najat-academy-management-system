import mongoose, { Schema, Document } from 'mongoose';

export interface IDigitalLibrary extends Document {
  title: string;
  category: string; // যেমন: কুরআন শিক্ষা, দোয়া, হাদিস ইত্যাদি
  course?: mongoose.Types.ObjectId; // নির্দিষ্ট কোনো কোর্সের সাথে যুক্ত থাকলে
  fileUrl: string; // প্রাইভেট স্টোরেজ পাথ বা সাইনড ইউআরএল টার্গেট
  uploadedBy: mongoose.Types.ObjectId; // কে আপলোড করেছেন (Admin/Teacher)
  createdAt: Date;
}

const DigitalLibrarySchema = new Schema<IDigitalLibrary>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  fileUrl: { type: String, required: true },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.DigitalLibrary || mongoose.model<IDigitalLibrary>('DigitalLibrary', DigitalLibrarySchema);
