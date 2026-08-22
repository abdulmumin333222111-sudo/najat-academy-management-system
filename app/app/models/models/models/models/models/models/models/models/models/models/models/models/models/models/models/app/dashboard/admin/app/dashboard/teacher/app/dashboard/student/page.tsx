import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_123';

export default async function StudentDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { role: string; email: string };
    
    // সার্ভার-সাইড রোল চেক: স্টুডেন্ট বা সংশ্লিষ্ট অথরাইজড রোল ছাড়া প্রবেশ নিষেধ
    if (decoded.role !== 'STUDENT' && decoded.role !== 'ADMIN' && decoded.role !== 'SUPER_ADMIN') {
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
            <h1 className="text-2xl font-bold">নজাত একাডেমি - শিক্ষার্থী পোর্টাল</h1>
            <p className="text-emerald-200 text-sm mt-1">সোনামণিদের কুরআন শিক্ষা প্রোগ্রেস প্যানেল</p>
          </div>
          <div className="bg-emerald-700 px-4 py-2 rounded-lg text-sm font-medium">
            রোল: শিক্ষার্থী (Student)
          </div>
        </header>

        {/* Student Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
            <h3 className="text-gray-500 text-sm font-medium">আমার কোর্স</h3>
            <p className="text-xl font-bold text-emerald-900 mt-2">সহীহ কুরআন ও দোয়া শিক্ষা</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
            <h3 className="text-gray-500 text-sm font-medium">উপস্থিতি হার</h3>
            <p className="text-3xl font-bold text-emerald-900 mt-2">৯৫%</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
            <h3 className="text-gray-500 text-sm font-medium">সর্বশেষ পরীক্ষার গ্রেড</h3>
            <p className="text-3xl font-bold text-emerald-900 mt-2">A+</p>
          </div>
        </div>

        {/* Student Features Section */}
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <h2 className="text-xl font-bold text-emerald-900 mb-4">আমার কার্যক্রম ও পড়াশোনা</h2>
          <p className="text-gray-600 text-sm mb-6">
            এখান থেকে তুমি তোমার ক্লাসের রুটিন, পরীক্ষার ফলাফল এবং ডিজিটাল লাইব্রেরির বইপত্র দেখতে পারবে।
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-bold text-emerald-900">📚 ডিজিটাল লাইব্রেরি</h4>
              <p className="text-xs text-gray-600 mt-1">কুরআন তিলাওয়াত ও প্রয়োজনীয় পিডিএফ বইসমূহ।</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-bold text-emerald-900">🏆 সার্টিফিকেট ও মার্কশিট</h4>
              <p className="text-xs text-gray-600 mt-1">তোমার পরীক্ষার ফলাফল ও অর্জিত সার্টিফিকেট।</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
