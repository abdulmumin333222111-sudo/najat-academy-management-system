import mongoose, { Schema, Document } from 'mongoose';

export interface IFinancialTransaction extends Document {
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  category: string; // যেমন: Student Fee, Salary, Utility Bill
  description: string;
  date: Date;
  createdAt: Date;
}

const FinancialTransactionSchema = new Schema<IFinancialTransaction>({
  type: { type: String, enum: ['INCOME', 'EXPENSE'], required: true },
  amount: { type: Number, required: true }, // Floating-point avoidance / fixed precision
  category: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.FinancialTransaction || mongoose.model<IFinancialTransaction>('FinancialTransaction', FinancialTransactionSchema);
