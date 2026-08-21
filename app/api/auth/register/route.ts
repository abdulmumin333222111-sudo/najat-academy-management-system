import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password, role } = await req.json();

    // ইনপুট ভ্যালিডেশন
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'সব তথ্য পূরণ করুন' }, { status: 400 });
    }

    // ইউজার আগে থেকেই আছে কি না চেক
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'এই ইমেইলটি ইতিমধ্যে ব্যবহৃত হয়েছে' }, { status: 400 });
    }

    // পাসওয়ার্ড হাশ করা
    const passwordHash = await bcrypt.hash(password, 12);

    // নতুন ইউজার তৈরি
    const newUser = new User({
      name,
      email,
      passwordHash,
      role: role || 'STUDENT',
    });

    await newUser.save();

    return NextResponse.json({ message: 'নিবন্ধন সফল হয়েছে' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'সার্ভার এরর হয়েছে' }, { status: 500 });
  }
}
