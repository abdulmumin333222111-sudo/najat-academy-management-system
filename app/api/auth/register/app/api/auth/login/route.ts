import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    // ইউজার খুঁজে বের করা
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'ইউজার খুঁজে পাওয়া যায়নি' }, { status: 404 });
    }

    // পাসওয়ার্ড চেক করা
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'পাসওয়ার্ড ভুল হয়েছে' }, { status: 401 });
    }

    // লগইন সফল হলে একটি মেসেজ পাঠানো
    return NextResponse.json({ 
        message: 'লগইন সফল হয়েছে',
        user: { name: user.name, email: user.email, role: user.role } 
    }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ message: 'সার্ভার এরর হয়েছে' }, { status: 500 });
  }
}
