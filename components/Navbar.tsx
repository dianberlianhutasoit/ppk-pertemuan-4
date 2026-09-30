'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Logo / Title */}
      <Link href="/" className="text-xl font-bold text-blue-600">
        DUITku
      </Link>

      {/* Menu Navigasi */}
      <div className="flex gap-6 items-center">
        <Link
          href="/"
          className={`font-medium ${
            pathname === '/' ? 'text-blue-600 font-semibold' : 'text-gray-600'
          }`}
        >
          Beranda
        </Link>

        {/* Tombol ke halaman Budget */}
        <Link
          href="/budget"
          className={`font-medium ${
            pathname === '/budget' ? 'text-blue-600 font-semibold' : 'text-gray-600'
          }`}
        >
          Anggaran
        </Link>
      </div>
    </nav>
  );
}