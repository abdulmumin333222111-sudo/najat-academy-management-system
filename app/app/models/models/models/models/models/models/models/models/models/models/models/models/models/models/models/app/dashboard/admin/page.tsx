import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_123';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { role: string; email: string };
    
    // সার্ভার-সাইড রোল চেক: অ্যাডমিন বা সুপার অ্যাডমিন ছাড়া কেউ ঢুকতে পারবে না
    if (decoded.role !== 'ADMIN' && decoded.role !== 'SUPER_ADMIN') {
      redirect('/dashboard');
    }
  } catch (error) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="bg-emerald-800 text-white p-6 rounded-xl shadow-md mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">নজাত একাডেমি - অ্যাডমিন প্যানেল</h1>
            <p className="text-emerald-200 text-sm mt-1">সেন্ট্রাল ম্যানেজমেন্ট ও কন্ট্রোল সিস্টেম</p>
          </div>
          <div className="bg-emerald-700 px-4 py-2 rounded-lg text-sm font-medium">
            রোল: অ্যাডমিন (Admin)
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
            <h3 className="text-gray-500 text-sm font-medium">মোট শিক্ষার্থী</h3>
            <p className="text-3xl font-bold text-emerald-900 mt-2">১২০+</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
            <h3 className="text-gray-500 text-sm font-medium">শিক্ষকবৃন্দ</h3>
            <p className="text-3xl font-bold text-emerald-900 mt-2">১৫</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
            <h3 className="text-gray-500 text-sm font-medium">সচল ব্যাচ</h3>
            <p className="text-3xl font-bold text-emerald-900 mt-2">৮</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
            <h3 className="text-gray-500 text-sm font-medium">আজকের উপস্থিতি</h3>
            <p className="text-3xl font-bold text-emerald-900 mt-2">৯২%</p>
          </div>
        </div>

        {/* Management Sections Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <h2 className="text-xl font-bold text-emerald-900 mb-4">দ্রুত ব্যবস্থাপনা মডিউল</h2>
          <p className="text-gray-600 text-sm mb-6">
            নিচের সেকশনগুলো থেকে আপনি শিক্ষার্থী, শিক্ষক, পেমেন্ট, এবং পরীক্ষার ফলাফল সরাসরি পরিচালনা করতে পারবেন।
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-bold text-emerald-900">👩‍🎓 স্টুডেন্ট ম্যানেজমেন্ট</h4>
              <p className="text-xs text-gray-600 mt-1">নতুন ভর্তি, প্রোফাইল ও ব্যাচ এসাইনমেন্ট।</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-bold text-emerald-900">💰 ফিন্যান্স ও পেমেন্ট</h4>
              <p className="text-xs text-gray-600 mt-1">ফি কালেকশন, ইনকাম-এক্সপেন্স ও রিপোর্ট।</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-bold text-emerald-900">📜 সার্টিফিকেট ও এক্সাম</h4>
              <p className="text-xs text-gray-600 mt-1">পরীক্ষার মার্কস ও সিকিউর সার্টিফিকেট জেনারেট।</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
