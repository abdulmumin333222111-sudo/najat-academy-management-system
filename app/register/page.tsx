'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'নিবন্ধন ব্যর্থ হয়েছে');
      }

      alert('নিবন্ধন সফল হয়েছে! এখন লগইন করুন।');
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-emerald-800 mb-6">নতুন অ্যাকাউন্ট তৈরি</h2>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" placeholder="পুরো নাম" required className="w-full px-3 py-2 border rounded-md" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="ইমেইল" required className="w-full px-3 py-2 border rounded-md" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="পাসওয়ার্ড" required className="w-full px-3 py-2 border rounded-md" onChange={(e) => setFormData({...formData, password: e.target.value})} />
          
          <button type="submit" disabled={loading} className="w-full py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
            {loading ? 'প্রক্রিয়াধীন...' : 'নিবন্ধন করুন'}
          </button>
        </form>
      </div>
    </div>
  );
}
