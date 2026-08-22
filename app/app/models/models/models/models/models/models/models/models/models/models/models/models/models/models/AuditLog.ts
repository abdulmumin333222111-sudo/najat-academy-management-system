import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  user: mongoose.Types.ObjectId; // ইভেন্টটি কে ঘটিয়েছে
  action: string; // যেমন: "CERTIFICATE_GENERATED", "PAYMENT_SUCCESS", "ROLE_CHANGED"
  entityType: string; // যেমন: "Certificate", "Payment", "User"
  entityId: mongoose.Types.ObjectId; // সংশ্লিষ্ট অবজেক্টের আইডি
  details: string; // অডিট ডিটেইলস (কখনো পাসওয়ার্ড বা সেন্সিটিভ সিক্রেট রাখা যাবে না)
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  entityType: { type: String, required: true },
  entityId: { type: Schema.Types.ObjectId, required: true },
  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// অডিট লগ যেন ডাটাবেজ লেভেলে ইম্যুটেবল থাকে
export default mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
