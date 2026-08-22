import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_123';

export default async function GuardianDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { role: string; email: string };
    
    // সার্ভার-সাইড রোল চেক: গার্ডিয়ান বা সংশ্লিষ্ট অথরাইজড রোল ছাড়া প্রবেশ নিষেধ
    if (decoded.role !== 'GUARDIAN' && decoded.role !== 'ADMIN' && decoded.role !== 'SUPER_ADMIN') {
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
            <h1 className="text-2xl font-bold">নজাত একাডেমি - অভিভাবক পোর্টাল</h1>
            <p className="text-emerald-200 text-sm mt-1">সন্তানের শিক্ষা ও অগ্রগতি পর্যবেক্ষণ</p>
          </div>
          <div className="bg-emerald-700 px-4 py-2 rounded-lg text-sm font-medium">
            রোল: অভিভাবক (Guardian)
          </div>
        </header>

        {/* Child Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
            <h3 className="text-gray-500 text-sm font-medium">সন্তানের নাম</h3>
            <p className="text-xl font-bold text-emerald-900 mt-2">আব্দুল্লাহ আল-আমিন</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
            <h3 className="text-gray-500 text-sm font-medium">পেমেন্ট স্ট্যাটাস</h3>
            <p className="text-xl font-bold text-emerald-900 mt-2 text-emerald-600">পেইড (আগস্ট ২০২৬)</p>
          </div>
        </div>

        {/* Guardian Features Section */}
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <h2 className="text-xl font-bold text-emerald-900 mb-4">প্যানেল সুবিধাসমূহ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-bold text-emerald-900">📊 উপস্থিতি রিপোর্ট</h4>
              <p className="text-xs text-gray-600 mt-1">সন্তানের দৈনিক ক্লাসের উপস্থিতির তথ্য দেখুন।</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-bold text-emerald-900">💳 পেমেন্ট ও রিসিট</h4>
              <p className="text-xs text-gray-600 mt-1">ফি প্রদান এবং পেমেন্ট রশিদ ডাউনলোড করুন।</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
