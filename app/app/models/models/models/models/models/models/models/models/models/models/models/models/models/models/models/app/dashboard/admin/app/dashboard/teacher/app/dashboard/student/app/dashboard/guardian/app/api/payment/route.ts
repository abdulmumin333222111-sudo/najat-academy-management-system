import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Payment from '@/models/Payment';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { studentId, amount, transactionId, paymentMethod } = body;

    if (!studentId || !amount || !transactionId || !paymentMethod) {
      return NextResponse.json({ success: false, message: 'সব তথ্য সঠিকভাবে প্রদান করুন।' }, { status: 400 });
    }

    const newPayment = await Payment.create({
      student: studentId,
      amount,
      transactionId,
      paymentMethod,
      status: 'SUCCESS'
    });

    return NextResponse.json({ success: true, message: 'পেমেন্ট সফলভাবে সংরক্ষিত হয়েছে।', data: newPayment }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'সার্ভারে সমস্যা হয়েছে।' }, { status: 500 });
  }
}
