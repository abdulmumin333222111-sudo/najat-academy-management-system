import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // পাবলিক পাথ (যেখানে লগইন ছাড়াই যাওয়া যাবে)
  const isPublicPath = path === '/login' || path === '/register';

  // টোকেন বা সেশন চেক করা (এখানে একটি সিম্পল লজিক ব্যবহার করা হয়েছে)
  const token = request.cookies.get('token')?.value || '';

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

// কোন কোন পেজে এই প্রোটেকশন কাজ করবে
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/login',
    '/register'
  ]
};
