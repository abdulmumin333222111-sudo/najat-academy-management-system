import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Najat Academy Management System',
  description: 'নজাত একাডেমি ম্যানেজমেন্ট সিস্টেম',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
