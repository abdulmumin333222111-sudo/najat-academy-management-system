import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-emerald-50 text-gray-900 font-sans">
      {/* Header / Navbar */}
      <header className="bg-emerald-800 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-wide">নজাত একাডেমি</span>
          </div>
          <div className="space-x-4">
            <Link href="/login" className="hover:text-emerald-200 transition">লগইন</Link>
            <Link href="/register" className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md transition font-medium">নিবন্ধন</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center max-w-4xl mx-auto">
        <span className="bg-emerald-200 text-emerald-900 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          ৫–১২ বছরের শিশুদের অনলাইন কুরআন শিক্ষা
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 mt-4 mb-6 leading-tight">
          Learn Quran, Build Character <br />
          <span className="text-emerald-700">কুরআন শিখি, চরিত্র গড়ি</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          নজাত একাডেমিতে আপনার সোনামণিদের জন্য রয়েছে প্রফেশনাল ও আকর্ষণীয় পরিবেশে সহীহ কুরআন তিলাওয়াত, দোয়া ও ইসলামিক আদব শিক্ষার ব্যবস্থা।
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/register" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow transition">
            ভর্তি চলছে - নিবন্ধন করুন
          </Link>
          <Link href="/login" className="bg-white hover:bg-gray-100 text-emerald-800 border border-emerald-300 font-bold py-3 px-8 rounded-lg shadow transition">
            পোর্টালে প্রবেশ
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 text-center">
            <div className="text-3xl mb-3">📖</div>
            <h3 className="text-xl font-bold text-emerald-900 mb-2">সহীহ কুরআন শিক্ষা</h3>
            <p className="text-gray-600 text-sm">মখরাজ ও তাজবীদসহ শুদ্ধভাবে কুরআন তিলাওয়াত শেখানো হয়।</p>
          </div>
          <div className="p-6 bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 text-center">
            <div className="text-3xl mb-3">⭐</div>
            <h3 className="text-xl font-bold text-emerald-900 mb-2">ইসলামিক আদব ও চরিত্র</h3>
            <p className="text-gray-600 text-sm">দৈনন্দিন প্রয়োজনীয় দোয়া, হাদিস ও সুন্দর চরিত্র গঠনের শিক্ষা।</p>
          </div>
          <div className="p-6 bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 text-center">
            <div className="text-3xl mb-3">💻</div>
            <h3 className="text-xl font-bold text-emerald-900 mb-2">অনলাইন অভিভাবক পোর্টাল</h3>
            <p className="text-gray-600 text-sm">ঘরে বসেই সন্তানের উপস্থিতি, ক্লাস প্রোগ্রেস ও রেজাল্ট দেখতে পারবেন।</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-900 text-white text-center py-6 mt-12">
        <p className="text-sm">&copy; ২০২৬ নজাত একাডেমি ম্যানেজমেন্ট সিস্টেম। সর্বস্বত্ব সংরক্ষিত।</p>
      </footer>
    </div>
  );
}
