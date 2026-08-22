import mongoose, { Schema, Document } from 'mongoose';

export interface IGuardian extends Document {
  user: mongoose.Types.ObjectId; // User ID-এর সাথে কানেক্টেড
  phone: string;
  address: string;
  children: mongoose.Types.ObjectId[]; // একাধিক সন্তানের আইডি থাকতে পারে
  createdAt: Date;
}

const GuardianSchema = new Schema<IGuardian>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  children: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Guardian || mongoose.model<IGuardian>('Guardian', GuardianSchema);
