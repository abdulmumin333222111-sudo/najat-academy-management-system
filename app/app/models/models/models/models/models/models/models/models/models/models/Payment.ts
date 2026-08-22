import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  student: mongoose.Types.ObjectId;
  amount: number;
  transactionId: string;
  paymentMethod: string; // যেমন: bKash, Nagad, Cash
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true, unique: true },
  paymentMethod: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'], 
    default: 'PENDING',
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);
