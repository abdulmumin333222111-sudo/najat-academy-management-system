import dbConnect from '@/lib/db';
import Certificate from '@/models/Certificate';

interface Props {
  params: Promise<{ code: string }>;
}

export default async function VerifyCertificatePage({ params }: Props) {
  const resolvedParams = await params;
  const { code } = resolvedParams;

  await dbConnect();
  const certificate = await Certificate.findOne({ certificateNumber: code })
    .populate('student')
    .populate('course');

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 border border-emerald-100 text-center">
        <h1 className="text-2xl font-bold text-emerald-900 mb-2">নজাত একাডেমি</h1>
        <p className="text-xs text-gray-500 mb-6">অফিসিয়াল সার্টিফিকেট ভেরিফিকেশন সিস্টেম</p>

        {certificate ? (
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 text-left space-y-2">
            <div className="text-emerald-700 font-bold text-center mb-2">✅ সার্টিফিকেট বৈধ (Verified)</div>
            <p className="text-sm text-gray-700"><strong>সার্টিফিকেট নং:</strong> {certificate.certificateNumber}</p>
            <p className="text-sm text-gray-700"><strong>ইস্যুর তারিখ:</strong> {new Date(certificate.issueDate).toLocaleDateString()}</p>
          </div>
        ) : (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700 text-sm font-medium">
            ❌ দুঃখিত, এই সার্টিফিকেট নম্বরের কোনো অস্তিত্ব পাওয়া যায়নি বা এটি ভুয়া।
          </div>
        )}
      </div>
    </div>
  );
}
