export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-900">নজাত একাডেমি ড্যাশবোর্ড</h1>
          <p className="text-gray-600">স্বাগতম, আপনার অ্যাকাউন্টে স্বাগতম।</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">মোট শিক্ষার্থী</h3>
            <p className="text-3xl font-bold text-emerald-600 mt-2">০</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">মোট শিক্ষক</h3>
            <p className="text-3xl font-bold text-emerald-600 mt-2">০</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">ক্লাসসমূহ</h3>
            <p className="text-3xl font-bold text-emerald-600 mt-2">০</p>
          </div>
        </div>
      </div>
    </div>
  );
}
