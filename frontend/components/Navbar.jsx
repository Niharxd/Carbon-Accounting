'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getToken, logout } from '@/services/auth';

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUsername(payload.username || payload.email);
      } catch {
        setUsername(null);
      }
    }
  }, []);

  function handleLogout() {
    logout();
    setUsername(null);
    router.push('/login');
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-white font-bold text-lg tracking-tight">
        🌿 GHG Platform
      </Link>
      <div className="flex items-center gap-4">
        {username ? (
          <>
            <span className="text-gray-400 text-sm">Hi, <span className="text-green-400 font-medium">{username}</span></span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-2 text-sm bg-green-600 hover:bg-green-500 text-white rounded-lg transition">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
