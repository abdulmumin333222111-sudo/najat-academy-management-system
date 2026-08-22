import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Certificate from '@/models/Certificate';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { studentId, courseId } = body;

    if (!studentId || !courseId) {
      return NextResponse.json({ success: false, message: 'শিক্ষার্থী এবং কোর্সের আইডি আবশ্যক।' }, { status: 400 });
    }

    // ইউনিক সার্টিফিকেট নম্বর জেনারেট করা
    const certificateNumber = 'NJT-' + crypto.randomBytes(4).toString('hex').toUpperCase();

    const newCertificate = await Certificate.create({
      student: studentId,
      course: courseId,
      certificateNumber,
      pdfUrl: `/certificates/${certificateNumber}.pdf`
    });

    return NextResponse.json({ success: true, message: 'সার্টিফিকেট সফলভাবে তৈরি হয়েছে।', data: newCertificate }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'সার্ভারে সমস্যা হয়েছে।' }, { status: 500 });
  }
}
