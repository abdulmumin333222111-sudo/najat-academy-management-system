import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_123';

export default async function TeacherDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { role: string; email: string };
    
    // সার্ভার-সাইড রোল চেক: শিক্ষক বা অ্যাডমিন ছাড়া প্রবেশ নিষেধ
    if (decoded.role !== 'TEACHER' && decoded.role !== 'ADMIN' && decoded.role !== 'SUPER_ADMIN') {
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
            <h1 className="text-2xl font-bold">নজাত একাডেমি - শিক্ষক পোর্টাল</h1>
            <p className="text-emerald-200 text-sm mt-1">ক্লাস ও শিক্ষার্থী ব্যবস্থাপনা প্যানেল</p>
          </div>
          <div className="bg-emerald-700 px-4 py-2 rounded-lg text-sm font-medium">
            রোল: শিক্ষক (Teacher)
          </div>
        </header>

        {/* Assigned Batches Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
            <h3 className="text-gray-500 text-sm font-medium">আমার ব্যাচসমূহ</h3>
            <p className="text-3xl font-bold text-emerald-900 mt-2">৩</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
            <h3 className="text-gray-500 text-sm font-medium">মোট শিক্ষার্থী</h3>
            <p className="text-3xl font-bold text-emerald-900 mt-2">৪৫</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
            <h3 className="text-gray-500 text-sm font-medium">আসন্ন ক্লাস</h3>
            <p className="text-3xl font-bold text-emerald-900 mt-2">আজ বিকাল ৪:০০</p>
          </div>
        </div>

        {/* Teacher Actions Section */}
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <h2 className="text-xl font-bold text-emerald-900 mb-4">শিক্ষক কার্যবলি</h2>
          <p className="text-gray-600 text-sm mb-6">
            নিচের অপশনগুলো থেকে আপনি আপনার ক্লাসের শিক্ষার্থীদের দৈনিক উপস্থিতি এবং পরীক্ষার মার্কস এন্ট্রি দিতে পারবেন।
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-bold text-emerald-900">📋 উপস্থিতি গ্রহণ (Attendance)</h4>
              <p className="text-xs text-gray-600 mt-1">দৈনিক ক্লাসে শিক্ষার্থীদের উপস্থিতি মার্ক করুন।</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-bold text-emerald-900">📝 পরীক্ষার মার্কস এন্ট্রি</h4>
              <p className="text-xs text-gray-600 mt-1">ছাত্র-ছাত্রীদের পরীক্ষার নম্বর ও গ্রেড প্রদান করুন।</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
