'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // কুকি বা সেশন ডিলিট করার লজিক এখানে আসবে
    alert('লগআউট সফল হয়েছে');
    router.push('/login');
  };

  return (
    <nav className="bg-emerald-800 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold">
          নজাত একাডেমি
        </Link>
        <div className="space-x-4">
          <Link href="/dashboard" className="hover:text-emerald-200">ড্যাশবোর্ড</Link>
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition"
          >
            লগআউট
          </button>
        </div>
      </div>
    </nav>
  );
}
